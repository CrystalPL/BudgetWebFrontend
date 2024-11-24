import React from "react";
import {Button, Link, Stack, Typography} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {usePathname} from "next/navigation";
import {MobileSidebarController} from "../../controllers/MobileSidebarController";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Groups} from "@mui/icons-material";

interface SidebarItem {
    buttonName: string
    href: string
    icon: React.ReactNode;
}

function CreateSidebarButton(item: SidebarItem): React.JSX.Element {
    const location = usePathname();
    return (
        <Button
            component={Link}
            href={item.href}
            sx={{
                color: '#080B0D',
                textTransform: 'none',
                pl: '30px',
                justifyContent: 'initial',
                '&:hover': {
                    backgroundColor: 'secondary.main'
                },
                ...(location === item.href && {
                    backgroundColor: 'secondary.main'
                }),
            }} variant="text" size="large" startIcon={item.icon}>
            <Typography variant={'h5'}>{item.buttonName}</Typography>
        </Button>
    )
}

function GetSidebarItems(): React.JSX.Element {
    return (
        <Stack
            component="ul"
            spacing={1}
            sx={{
                listStyle: 'none',
                mt: '7px',
                p: 0,
                width: '100%'
            }}
        >
            <CreateSidebarButton
                buttonName="Logi"
                href="/logs"
                icon={<SettingsOutlinedIcon/>}
            ></CreateSidebarButton>
            <CreateSidebarButton
                buttonName="Gospodarstwo domowe"
                href="/house-hold"
                icon={<Groups/>}
            ></CreateSidebarButton>
        </Stack>
    );
}

export function SidebarComponent(): React.JSX.Element {
    return (
        <Box
            component="aside"
            sx={{
                display: {
                    xs: 'none',
                    lg: 'flex'
                },
                width: 'var(--SideBar-width)'
            }}
            bgcolor="primary.main"
            top="var(--Header-height)"
            position="fixed"
            height="calc(100vh - var(--Header-height))">
            <GetSidebarItems></GetSidebarItems>
        </Box>
    );
}

export function DrawerSidebar({sidebarController}: { sidebarController: MobileSidebarController }): React.JSX.Element {
    return (
        <Drawer open={sidebarController.open} onClose={sidebarController.handleClose}>
            <Box bgcolor="#a9be77" height="100vh">
                <GetSidebarItems></GetSidebarItems>
            </Box>
        </Drawer>
    );
}