'use client'
import ThemeProvider from "../../components/theme/ThemeProvider";
import {PropsWithChildren} from "react";

export default function RootLayout(props: PropsWithChildren) {
    return (
        <html lang="pl">
        <body>
        <ThemeProvider>
            {props.children}
        </ThemeProvider>
        </body>
        </html>
    )
}
