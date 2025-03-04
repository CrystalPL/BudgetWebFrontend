import type {Components} from '@mui/material/styles';
import {Theme} from "@mui/system";

export const MuiButton = {
  styleOverrides: {
    root: { borderRadius: '12px', textTransform: 'none' },
    sizeSmall: { padding: '6px 16px' },
    sizeMedium: { padding: '8px 20px' },
    sizeLarge: { padding: '11px 24px' },
    textSizeSmall: { padding: '7px 12px' },
    textSizeMedium: { padding: '9px 16px' },
    textSizeLarge: { padding: '12px 16px' },
  },
} satisfies Components<Theme>['MuiButton'];
