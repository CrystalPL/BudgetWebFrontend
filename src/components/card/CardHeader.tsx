import type {Components} from '@mui/material/styles';
import {Theme} from "@mui/system";

export const MuiCardHeader = {
    defaultProps: {titleTypographyProps: {variant: 'h6'}, subheaderTypographyProps: {variant: 'body2'}},
    styleOverrides: {root: {padding: '32px 24px 16px'}},
} satisfies Components<Theme>['MuiCardHeader'];
