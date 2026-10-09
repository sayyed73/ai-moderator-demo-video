import {Html5Audio, Sequence, staticFile} from 'remotion';
import {audio} from '../config/audio';
import {scenes, sec, SceneKey, t} from '../config/timing';
import {useExistingFiles} from '../lib/audio';

type Sound = keyof typeof audio.sfx.files;

const at = (scene: SceneKey, frame: number) => scenes[scene].from + frame;

/** Which sound plays when. Times come from timing.ts, so they follow any timing change. */
const hits: {frame: number; sound: Sound}[] = [
  ...t.problem.cards.map((f) => ({frame: at('problem', f), sound: 'pop' as Sound})),
  {frame: at('conversation', t.conversation.customer1), sound: 'pop'},
  {frame: at('conversation', t.conversation.assistant1), sound: 'pop'},
  {frame: at('conversation', t.conversation.productCard), sound: 'pop'},
  {frame: at('conversation', t.conversation.customer2), sound: 'pop'},
  {frame: at('conversation', t.conversation.assistant2), sound: 'pop'},
  {frame: at('conversation', t.conversation.toDelivery), sound: 'chime'},
  {frame: at('orderApproval', t.orderApproval.click), sound: 'click'},
  {frame: at('orderApproval', t.orderApproval.approved), sound: 'chime'},
  {frame: at('humanTakeover', t.humanTakeover.customerMsg), sound: 'pop'},
  {frame: at('humanTakeover', t.humanTakeover.attention), sound: 'pop'},
  {frame: at('humanTakeover', t.humanTakeover.click), sound: 'click'},
  {frame: at('humanTakeover', t.humanTakeover.takeover), sound: 'chime'},
];

export const SfxLayer: React.FC = () => {
  const {enabled, volume, files} = audio.sfx;
  const found = useExistingFiles(Object.values(files), enabled);
  if (!enabled) return null;
  return (
    <>
      {hits.map((h, i) =>
        found[files[h.sound]] ? (
          <Sequence key={i} from={h.frame} durationInFrames={sec(1.5)} layout="none">
            <Html5Audio src={staticFile(files[h.sound])} volume={volume} />
          </Sequence>
        ) : null,
      )}
    </>
  );
};
