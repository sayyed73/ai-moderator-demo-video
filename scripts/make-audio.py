#!/usr/bin/env python3
"""Synthesises the original background music and UI sound effects (no external assets, no network).
Usage: python3 scripts/make-audio.py   -> writes public/audio/music.mp3 and sfx-*.wav
Edit BPM / CHORDS / NOTE volumes below to change the music."""
import math, random, struct, subprocess, wave, os

SR = 44100
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'audio')
random.seed(7)  # deterministic

def hz(midi): return 440.0 * 2 ** ((midi - 69) / 12)
def write(path, left, right=None):
    right = right or left
    peak = max(max(map(abs, left)), max(map(abs, right)), 1e-9)
    with wave.open(path, 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b''.join(struct.pack('<hh', int(l / peak * 0.85 * 32767), int(r / peak * 0.85 * 32767)) for l, r in zip(left, right)))

# ---------- music ----------
BPM = 96
BAR = 60 / BPM * 4              # 2.5 s
DUR = 60.0
CHORDS = [[48, 55, 59, 64], [45, 52, 60, 64], [41, 48, 57, 64], [43, 50, 57, 62]]  # Cmaj7 Am7 Fmaj7 G6
ARP = [0, 1, 2, 3, 2, 1, 2, 3]
n = int(DUR * SR)
L = [0.0] * n; R = [0.0] * n

def add(buf, start, samples):
    s = int(start * SR)
    for i, v in enumerate(samples):
        if s + i < n: buf[s + i] += v

for bar in range(int(DUR / BAR)):
    chord = CHORDS[bar % 4]
    t0 = bar * BAR
    # pad: soft detuned sines, slow attack/release
    length = int(BAR * SR * 1.15)
    for note in chord:
        for det, pan in ((-0.004, 0.35), (0.004, 0.65)):
            f = hz(note) * (1 + det)
            seg = []
            for i in range(length):
                t = i / SR
                env = min(1, t / 0.7) * min(1, (length - i) / (0.7 * SR))
                seg.append(math.sin(2 * math.pi * f * t) * env * 0.05)
            add(L, t0, [v * (1 - pan) * 2 for v in seg]); add(R, t0, [v * pan * 2 for v in seg])
    # pluck arpeggio (eighth notes, an octave up)
    step = BAR / 8
    for k, idx in enumerate(ARP):
        f = hz(chord[idx] + 12)
        ln = int(0.55 * SR)
        seg = [(math.sin(2 * math.pi * f * i / SR) + 0.3 * math.sin(4 * math.pi * f * i / SR)) * math.exp(-i / SR * 7) * 0.07 * min(1, i / 60) for i in range(ln)]
        pan = 0.35 + 0.3 * (k % 2)
        add(L, t0 + k * step, [v * (1 - pan) * 2 for v in seg]); add(R, t0 + k * step, [v * pan * 2 for v in seg])
    # soft bass note on beat 1
    f = hz(chord[0] - 12)
    ln = int(BAR * 0.9 * SR)
    seg = [math.sin(2 * math.pi * f * i / SR) * min(1, i / 400) * math.exp(-i / SR * 1.2) * 0.12 for i in range(ln)]
    add(L, t0, seg); add(R, t0, seg)

for i in range(n):  # fade in / out
    t = i / SR
    g = min(1, t / 2.0) * min(1, (DUR - t) / 3.0)
    L[i] *= g; R[i] *= g
tmp = os.path.join(OUT, '_music.wav')
write(tmp, L, R)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', tmp, '-af', 'loudnorm=I=-20:TP=-2', '-b:a', '160k', os.path.join(OUT, 'music.mp3')], check=True)
os.remove(tmp)

# ---------- sound effects (mono) ----------
def sfx(name, samples): write(os.path.join(OUT, f'sfx-{name}.wav'), samples)
def tone(f0, f1, dur, vol=0.6, decay=9):
    out, ph = [], 0.0
    for i in range(int(dur * SR)):
        t = i / SR
        f = f0 + (f1 - f0) * (t / dur)
        ph += 2 * math.pi * f / SR
        out.append(math.sin(ph) * math.exp(-t * decay) * min(1, i / 80) * vol)
    return out
sfx('pop', tone(520, 880, 0.14, decay=22))                       # message appears
click = [(random.uniform(-1, 1) * math.exp(-i / SR * 220) * 0.7) for i in range(int(0.06 * SR))]
click = [c + s for c, s in zip(click, tone(1500, 900, 0.06, 0.4, 60))]
sfx('click', click)                                              # mouse click
a, b = tone(660, 660, 0.5, 0.5, 6), tone(990, 990, 0.7, 0.45, 5)
chime = a + [0.0] * 0
chime = [0.0] * int(0.16 * SR) + b
chime = [x + (a[i] if i < len(a) else 0) for i, x in enumerate(chime)]
sfx('chime', chime)                                              # success / state change
print('audio written to', os.path.abspath(OUT))
