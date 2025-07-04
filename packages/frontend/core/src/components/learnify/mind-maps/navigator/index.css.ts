import { cssVarV2 } from '@toeverything/theme/v2';
import { style } from '@vanilla-extract/css';

export const root = style({
  transition: 'all 0.8s ease',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: 8,
  height: '210px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  selectors: {
    '&::after': {
      content: '',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: cssVarV2('layer/insideBorder/border'),
      opacity: 0.3,
      pointerEvents: 'none',
    },
  },
});

export const image = style({
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 8,
});
