import {Img, staticFile} from 'remotion';
import {brand, fontFamily} from '../config/brand';

/** Logo tile. In 'tinted' mode it follows the accent colour (see brand.logo). */
export const LogoMark: React.FC<{size?: number}> = ({size = 48}) => {
  const {src, mode} = brand.logo;
  if (mode === 'original') {
    return <Img src={staticFile(src)} style={{width: size, height: size, objectFit: 'contain'}} />;
  }
  const url = `url(${staticFile(src)})`;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: brand.colors.accent,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: size * 0.66,
          height: size * 0.66,
          background: brand.colors.onAccent,
          WebkitMaskImage: url,
          maskImage: url,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      />
    </div>
  );
};

/** Logo + product name. */
export const Wordmark: React.FC<{size?: number}> = ({size = 56}) => (
  <div style={{display: 'flex', alignItems: 'center', gap: size * 0.3}}>
    <LogoMark size={size} />
    <span
      style={{
        fontFamily,
        fontWeight: 800,
        fontSize: size * 0.82,
        letterSpacing: '-0.03em',
        color: brand.colors.text,
      }}
    >
      {brand.productName}
    </span>
  </div>
);
