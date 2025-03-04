import React, {PropsWithChildren} from "react";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider as DefaultThemeProvider} from "@mui/material";
import {MuiButton} from "../components/Button";
import {colorSchem} from "../components/color/Colors";
import {typography} from "./Typography";
import {MuiCardHeader} from "../components/card/CardHeader";
import {MuiCardContent} from "../components/card/CardContent";
import {MuiCard} from "../components/card/Card";

let theme = createTheme({
    breakpoints: {values: {xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440}},
    components: {MuiButton, MuiCard, MuiCardContent, MuiCardHeader},
    typography: typography,
    palette: colorSchem,
});

theme = responsiveFontSizes(theme);

export default function ThemeProvider(props: PropsWithChildren): React.JSX.Element {
    return (
        <DefaultThemeProvider theme={theme}>
            <CssBaseline/>
            {props.children}
        </DefaultThemeProvider>
    );
}