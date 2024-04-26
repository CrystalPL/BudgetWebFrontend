import React, {PropsWithChildren} from "react";
import {MuiButton} from "@/styles/components/button";
import {typography} from "@/styles/typography";
import {colorSchem} from "@/styles/components/color/color-schem";
import {createTheme, CssBaseline, responsiveFontSizes, ThemeProvider as DefaultThemeProvider} from "@mui/material";
import {MuiCard} from "@/styles/components/card/card";
import {MuiCardContent} from "@/styles/components/card/card-content";
import {MuiCardHeader} from "@/styles/components/card/card-header";

let theme = createTheme({
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1440 } },
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