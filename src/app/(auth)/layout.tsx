'use client'
import {PropsWithChildren} from "react";
import ThemeProvider from "../../styles/ThemeProvider";

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
