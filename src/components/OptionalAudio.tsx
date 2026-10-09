import {useEffect, useState} from 'react';
import {Html5Audio, Sequence, continueRender, delayRender, staticFile} from 'remotion';
import {audio} from '../config/audio';
import {sec} from '../config/timing';

type Track = {enabled: boolean; src: string; volume: number; startAtSeconds?: number};

/** Plays a track only if it is enabled AND the file really exists (a missing file never breaks rendering). */
const Track: React.FC<{track: Track}> = ({track}) => {
  const [exists, setExists] = useState(false);
  const [handle] = useState(() => (track.enabled ? delayRender(`Checking ${track.src}`) : null));
  useEffect(() => {
    if (!track.enabled || handle === null) return;
    fetch(staticFile(track.src), {method: 'HEAD'})
      .then((r) => setExists(r.ok && !(r.headers.get('content-type') ?? '').includes('text/html')))
      .catch(() => setExists(false))
      .finally(() => continueRender(handle));
  }, [track.enabled, track.src, handle]);
  if (!track.enabled || !exists) return null;
  return (
    <Sequence from={sec(track.startAtSeconds ?? 0)} layout="none">
      <Html5Audio src={staticFile(track.src)} volume={track.volume} />
    </Sequence>
  );
};

export const OptionalAudio: React.FC = () => (
  <>
    <Track track={audio.voiceover} />
    <Track track={audio.music} />
  </>
);
