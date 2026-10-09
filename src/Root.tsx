import {Composition} from 'remotion';
import {video} from './config/video';
import {TOTAL_FRAMES} from './config/timing';
import {ProductDemo} from './compositions/ProductDemo';
import {loadBrandFonts} from './lib/fonts';

loadBrandFonts();

export const RemotionRoot: React.FC = () => (
  <Composition
    id={video.id}
    component={ProductDemo}
    durationInFrames={TOTAL_FRAMES}
    fps={video.fps}
    width={video.width}
    height={video.height}
  />
);
