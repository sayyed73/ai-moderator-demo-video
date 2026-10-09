import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

/** Checks (once) which of the given public/ files really exist. A missing file just means "skip it". */
export const useExistingFiles = (srcs: string[], enabled: boolean) => {
  const key = srcs.join('|');
  const [found, setFound] = useState<Record<string, boolean>>({});
  const [handle] = useState(() => (enabled ? delayRender('Checking audio files') : null));
  useEffect(() => {
    if (!enabled || handle === null) return;
    Promise.all(
      srcs.map((src) =>
        fetch(staticFile(src), {method: 'HEAD'})
          .then((r) => [src, r.ok && !(r.headers.get('content-type') ?? '').includes('text/html')] as const)
          .catch(() => [src, false] as const),
      ),
    )
      .then((r) => setFound(Object.fromEntries(r)))
      .finally(() => continueRender(handle));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, enabled, handle]);
  return found;
};
