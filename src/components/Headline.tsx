import {useCurrentFrame} from 'remotion';
import {brand, fontFamily} from '../config/brand';
import {easeOut, progress} from '../lib/timeline';

type Props = {
  text: string;
  /** Frame (relative to the scene) when the headline starts revealing. */
  at?: number;
  /** Optional frame when the headline fades out. */
  exitAt?: number;
  size?: number;
  subtext?: string;
  subtextAt?: number;
  align?: 'left' | 'center';
};

/** Bold headline with a word-by-word masked reveal, plus optional supporting line. */
export const Headline: React.FC<Props> = ({text, at = 0, exitAt, size = 84, subtext, subtextAt, align = 'left'}) => {
  const frame = useCurrentFrame();
  const words = text.split(' ');
  const out = exitAt === undefined ? 0 : progress(frame, exitAt, 12);
  const sub = progress(frame, subtextAt ?? at + 14, 20);
  return (
    <div style={{fontFamily, textAlign: align, opacity: 1 - out, translate: `0 ${-out * 16}px`}}>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
          columnGap: size * 0.26,
          fontSize: size,
          fontWeight: 800,
          lineHeight: 1.06,
          letterSpacing: '-0.035em',
          color: brand.colors.text,
        }}
      >
        {words.map((w, i) => {
          const p = progress(frame, at + i * 4, 22, easeOut);
          return (
            <span key={i} style={{overflow: 'hidden', display: 'inline-block', paddingBottom: size * 0.12, marginBottom: -size * 0.12}}>
              <span style={{display: 'inline-block', translate: `0 ${(1 - p) * 110}%`, opacity: p > 0 ? 1 : 0}}>{w}</span>
            </span>
          );
        })}
      </div>
      {subtext && (
        <div
          style={{
            marginTop: 22,
            fontSize: size * 0.4,
            fontWeight: 600,
            color: brand.colors.textMuted,
            opacity: sub,
            translate: `0 ${(1 - sub) * 14}px`,
            letterSpacing: '-0.01em',
          }}
        >
          {subtext}
        </div>
      )}
    </div>
  );
};
