/**
 * Optional audio. Missing files are skipped, so rendering never fails because of audio.
 * Files live in public/audio/. Set enabled: true/false to switch a layer on or off.
 */
export const audio = {
  voiceover: {
    enabled: false, // turn on after adding public/audio/voiceover.mp3 (see docs/voiceover-script.md)
    src: 'audio/voiceover.mp3',
    volume: 1,
    startAtSeconds: 0.3, // delay before narration starts
  },
  music: {
    enabled: true, // original synthesised track (regenerate: python3 scripts/make-audio.py)
    src: 'audio/music.mp3',
    volume: 0.35, // lower to ~0.15 when a voiceover is added
  },
  sfx: {
    enabled: true, // soft UI sounds synced to on-screen events (see components/SfxLayer.tsx)
    volume: 0.5,
    files: {
      pop: 'audio/sfx-pop.wav', // message appears
      click: 'audio/sfx-click.wav', // cursor click
      chime: 'audio/sfx-chime.wav', // state change (approved, delivery received, takeover)
    },
  },
};
