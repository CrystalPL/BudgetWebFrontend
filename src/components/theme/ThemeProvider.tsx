import React, {PropsWithChildren} from "react";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider as DefaultThemeProvider} from "@mui/material";
import {MuiButton} from "../../styles/components/Button";
import {colorSchem} from "../../styles/components/color/Colors";
import {typography} from "../../styles/Typography";
import {MuiCardHeader} from "../../styles/components/card/CardHeader";
import {MuiCardContent} from "../../styles/components/card/CardContent";
import {MuiCard} from "../../styles/components/card/Card";

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