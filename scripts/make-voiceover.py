#!/usr/bin/env python3
"""Generate public/audio/voiceover.mp3 from docs/voiceover-script.md with Kokoro (free, offline).

Run this on your own computer (needs internet once, to download the model).

Setup (once):
  macOS:   brew install espeak-ng ffmpeg
  Ubuntu:  sudo apt install espeak-ng ffmpeg
  Windows: install espeak-ng (https://github.com/espeak-ng/espeak-ng/releases) and ffmpeg
  then:    python3 -m venv .venv-tts && source .venv-tts/bin/activate   (Windows: .venv-tts\\Scripts\\activate)
           pip install kokoro soundfile numpy

Use:  python3 scripts/make-voiceover.py [--voice af_heart] [--speed 1.0]
Each scene's narration starts exactly at its scene start (read from the "(0–6 s)" headings in the
script). If a scene's audio is longer than its slot, a warning is printed: shorten the text, raise
--speed a little, or lengthen the scene in src/config/timing.ts.
Try voices: af_heart, af_bella, af_nicole, am_michael, bf_emma (British), bm_george.
"""
import argparse, os, re, subprocess, sys
import numpy as np
import soundfile as sf
from kokoro import KPipeline

SR = 24000
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
SCRIPT = os.path.join(ROOT, 'docs', 'voiceover-script.md')
OUT = os.path.join(ROOT, 'public', 'audio')

ap = argparse.ArgumentParser()
ap.add_argument('--voice', default='af_heart')
ap.add_argument('--speed', type=float, default=1.0)
args = ap.parse_args()

# Parse "**1 · Problem (0–6 s)**" headings followed by a paragraph.
text = open(SCRIPT, encoding='utf-8').read()
scenes = re.findall(r'\*\*\d+ · [^(]*\((\d+)[–-](\d+) s\)\*\*\s*\n(.+?)(?=\n\s*\n\*\*|\n\s*\n##|\Z)', text, flags=re.S)
if not scenes:
    sys.exit('Could not find scene sections in docs/voiceover-script.md')

pipe = KPipeline(lang_code='a')  # American English; use 'b' for British voices
total = int(max(int(e) for _, e, _ in scenes) * SR)
track = np.zeros(total + SR, dtype=np.float32)
for start, end, para in scenes:
    para = ' '.join(para.split())
    audio = np.concatenate([np.asarray(chunk, dtype=np.float32) for _, _, chunk in pipe(para, voice=args.voice, speed=args.speed)])
    s = int(float(start) * SR) + int(0.2 * SR)  # tiny lead-in
    slot = (int(end) - int(start)) * SR
    dur = len(audio) / SR
    flag = '  <-- LONGER than its scene!' if len(audio) > slot - int(0.2 * SR) else ''
    print(f'{start}-{end}s: {dur:.1f}s of speech ({slot / SR:.0f}s slot){flag}')
    track[s:s + len(audio)] += audio[: len(track) - s]

os.makedirs(OUT, exist_ok=True)
wav = os.path.join(OUT, '_voiceover.wav')
sf.write(wav, track, SR)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-af', 'loudnorm=I=-16:TP=-1.5', '-b:a', '160k', os.path.join(OUT, 'voiceover.mp3')], check=True)
os.remove(wav)
print('Wrote public/audio/voiceover.mp3. Now set voiceover.enabled: true in src/config/audio.ts and lower music.volume to ~0.15.')
