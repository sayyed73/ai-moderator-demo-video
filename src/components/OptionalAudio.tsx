import {Html5Audio, Sequence, staticFile} from 'remotion';
import {audio} from '../config/audio';
import {sec} from '../config/timing';
import {useExistingFiles} from '../lib/audio';
import {SfxLayer} from './SfxLayer';

/** Voiceover + music (each only if enabled and the file exists), plus UI sound effects. */
export const OptionalAudio: React.FC = () => {
  const tracks: {enabled: boolean; src: string; volume: number; startAtSeconds?: number}[] = [audio.voiceover, audio.music].filter((t) => t.enabled);
  const found = useExistingFiles(tracks.map((t) => t.src), tracks.length > 0);
  return (
    <>
      {tracks.map((track) =>
        found[track.src] ? (
          <Sequence key={track.src} from={sec(track.startAtSeconds ?? 0)} layout="none">
            <Html5Audio src={staticFile(track.src)} volume={track.volume} />
          </Sequence>
        ) : null,
      )}
      <SfxLayer />
    </>
  );
};
