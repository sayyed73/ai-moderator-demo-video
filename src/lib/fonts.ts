import {continueRender, delayRender, staticFile} from 'remotion';
import {brand} from '../config/brand';

let started = false;

/** Loads the local fonts from brand.fonts.files and holds the render until they are ready. */
export const loadBrandFonts = () => {
  if (started || typeof document === 'undefined') return;
  started = true;
  const handle = delayRender('Loading brand fonts');
  Promise.all(
    brand.fonts.files.map(async ({weight, file}) => {
      const face = new FontFace(brand.fonts.family, `url(${staticFile(file)}) format("woff2")`, {weight: String(weight)});
      await face.load();
      (document.fonts as FontFaceSet & {add(f: FontFace): void}).add(face);
    }),
  )
    .catch((err) => console.warn('Font loading failed, using fallback font:', err))
    .finally(() => continueRender(handle));
};
