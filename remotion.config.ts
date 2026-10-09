import {Config} from '@remotion/cli/config';

// Render defaults. Output files go to out/ (see package.json scripts).
Config.setEntryPoint('./src/index.ts');
Config.setVideoImageFormat('jpeg');
Config.setOverwriteOutput(true);
Config.setCodec('h264');
