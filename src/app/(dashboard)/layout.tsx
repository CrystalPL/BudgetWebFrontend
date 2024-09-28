'use client'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import React, {PropsWithChildren} from "react";
import ThemeProvider from "../../components/theme/ThemeProvider";
import HeaderComponent from "../../components/layout/Header";
import {SidebarComponent} from "../../components/layout/Sidebar";
import Box from "@mui/material/Box";
import {GlobalStyles} from "@mui/material";
import EmailToConfirmAlert from "../../components/layout/EmailToConfirmAlert";

export default function RootLayout(props: PropsWithChildren) {
    return (
        <html lang="pl">
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider>
                <GlobalStyles styles={{
                    body: {
                        '--SideBar-width': '300px',
                        '--Header-height': '60px'
                    }
                }}></GlobalStyles>
                <EmailToConfirmAlert></EmailToConfirmAlert>
                <HeaderComponent></HeaderComponent>
                <SidebarComponent></SidebarComponent>
                <Box
                    component={"main"}
                    sx={{
                        pl: {
                            xs: '0px',
                            lg: 'var(--SideBar-width)'
                        }
                    }}>
                    {props.children}
                </Box>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
