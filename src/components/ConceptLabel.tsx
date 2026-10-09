import {brand, fontFamily} from '../config/brand';
import {content} from '../config/content';

/** Discreet always-visible disclosure ("Concept demo • Sample data"). */
export const ConceptLabel: React.FC = () => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 36, display: 'flex', justifyContent: 'center'}}>
    <div
      style={{
        fontFamily,
        fontSize: 24,
        fontWeight: 600,
        color: brand.colors.textMuted,
        padding: '10px 24px',
        borderRadius: brand.radii.pill,
        background: 'rgba(255,255,255,0.8)',
        border: `1.5px solid ${brand.colors.border}`,
      }}
    >
      {content.conceptLabel}
    </div>
  </div>
);
