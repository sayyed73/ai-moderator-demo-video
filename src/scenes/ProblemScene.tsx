import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {content} from '../config/content';
import {scenes, t} from '../config/timing';
import {problemCustomerIds, inbox} from '../data/demo';
import {Headline} from '../components/Headline';
import {MessageCard} from '../components/MessageCard';
import {GHOST_POSES, SCATTER_POSES} from '../lib/layout';
import {easeOut, progress} from '../lib/timeline';

const at = t.problem;
const ghostIds = inbox.filter((i) => !problemCustomerIds.includes(i.customerId) && i.customerId !== 'maya').map((i) => i.customerId);

/** Scene 1 - scattered incoming messages from three channels. */
export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const settle = 1 - progress(frame, scenes.problem.duration - 20, 20); // drift stops so scene 2 can pick up exactly
  const ghostOut = 1 - progress(frame, at.headlineOut, 12);
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 64, top: 100, width: 952}}>
        <Headline text={content.problem.headline} at={at.headlineIn} exitAt={at.headlineOut} />
      </div>
      {GHOST_POSES.map((g, i) => {
        const p = progress(frame, 12 + i * 8, 24);
        return (
          <div key={i} style={{position: 'absolute', left: g.x, top: g.y, opacity: p * 0.45 * ghostOut, rotate: `${g.rot}deg`, scale: String(g.scale), transformOrigin: '0 0'}}>
            <MessageCard customerId={ghostIds[i]} />
          </div>
        );
      })}
      {problemCustomerIds.map((id, i) => {
        const pose = SCATTER_POSES[i];
        const p = progress(frame, at.cards[i], 22, easeOut);
        const drift = Math.sin(frame / 38 + i * 2) * 7 * settle;
        return (
          <div
            key={id}
            style={{
              position: 'absolute',
              left: pose.x,
              top: pose.y,
              opacity: p,
              translate: `0 ${(1 - p) * 70 + drift}px`,
              rotate: `${pose.rot}deg`,
              scale: String(0.9 + p * 0.1),
              transformOrigin: '0 0',
            }}
          >
            <MessageCard customerId={id} />
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
