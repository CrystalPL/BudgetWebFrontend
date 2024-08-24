import {paperClasses} from '@mui/material/Paper';
import type {Components} from '@mui/material/styles';
import {Theme} from "@mui/system";

export const MuiCard = {
    styleOverrides: {
        root: {
            borderRadius: '20px',
            [`&.${paperClasses.elevation1}`]: {
                boxShadow: '0 5px 22px 0 rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.06)',
            },
        },
    },
} satisfies Components<Theme>['MuiCard'];
