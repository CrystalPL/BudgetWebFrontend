'use client'
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import React, {PropsWithChildren} from "react";
import ThemeProvider from "../../styles/ThemeProvider";
import HeaderComponent from "../../components/common/Header";
import {SidebarComponent} from "../../components/common/Sidebar";
import Box from "@mui/material/Box";
import {GlobalStyles} from "@mui/material";
import EmailToConfirmAlert from "../../components/common/EmailToConfirmAlert";
import {AvatarProvider} from "../../context/AccountHeaderInfo";
import SnackbarProvider from "../../context/SnackbarContext";

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
                <AvatarProvider>
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
                        <SnackbarProvider>
                            {props.children}
                        </SnackbarProvider>
                    </Box>
                </AvatarProvider>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
