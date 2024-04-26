'use client';
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import React, {PropsWithChildren} from "react";
import ThemeProvider from "@/components/theme/theme-provider";
import Grid from "@mui/material/Unstable_Grid2";
import HeaderComponent from "@/components/header";
import SidebarComponent from "@/components/sidebar";

export default function RootLayout(props: PropsWithChildren) {
    return (
        <html style={{height: "100%"}} lang="pl">
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider>
                <Grid container direction="column" sx={{minHeight: "100vh"}} display="flex">
                    <HeaderComponent></HeaderComponent>
                    <Grid container display="flex" direction="row" sx={{flex: "1 1 auto"}}>
                        <SidebarComponent></SidebarComponent>
                        <Grid lg={10} display="flex">
                            {props.children}
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
            {/*<ResponsiveDrawer></ResponsiveDrawer>*/}
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
