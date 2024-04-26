import type {PaletteOptions} from '@mui/material/styles';
import {california, kepple, neonBlue, nevada, redOrange, shakespeare} from "@/styles/components/color/colors";

export const colorSchem = {
    action: {disabledBackground: 'rgba(0, 0, 0, 0.06)'},
    common: {black: '#000000', white: '#ffffff'},
    error: {
        ...redOrange,
        light: redOrange[400],
        main: redOrange[500],
        dark: redOrange[600],
    },
    info: {
        ...shakespeare,
        light: shakespeare[400],
        main: shakespeare[500],
        dark: shakespeare[600],
    },
    primary: {
        ...neonBlue,
        light: neonBlue[400],
        main: neonBlue[500],
        dark: neonBlue[600],
    },
    secondary: {
        ...nevada,
        light: nevada[600],
        main: nevada[700],
        dark: nevada[800],
    },
    success: {
        ...kepple,
        light: kepple[400],
        main: kepple[500],
        dark: kepple[600],
    },
    warning: {
        ...california,
        light: california[400],
        main: california[500],
        dark: california[600],
    },
} satisfies PaletteOptions;
