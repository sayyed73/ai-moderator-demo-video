import {ReactNode} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {sceneOpacity} from '../lib/timeline';

/** Wraps a scene with a short fade at its edges. Shorten/disable per scene in ProductDemo.tsx. */
export const SceneFade: React.FC<{duration: number; fadeIn: boolean; fadeOut: boolean; children: ReactNode}> = ({duration, fadeIn, fadeOut, children}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{opacity: sceneOpacity(frame, duration, {fadeIn, fadeOut})}}>{children}</AbsoluteFill>;
};
