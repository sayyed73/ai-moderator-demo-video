/**
 * Optional audio. Both tracks are OFF by default; the video renders fine without them.
 * To enable: drop the file into public/audio/, set the path, and set enabled: true.
 * If an enabled file is missing, it is skipped (the render does not fail).
 */
export const audio = {
  voiceover: {
    enabled: false,
    src: 'audio/voiceover.mp3', // path inside public/
    volume: 1,
    startAtSeconds: 0.3, // delay before narration starts
  },
  music: {
    enabled: false,
    src: 'audio/music.mp3',
    volume: 0.18, // keep low so it never covers the voice
  },
};
