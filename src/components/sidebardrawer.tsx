import {MobileSidebarController} from "@/controllers/MobileSidebarController";
import Drawer from "@mui/material/Drawer";
import {Button, Stack, Typography} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import React from "react";
import Box from "@mui/material/Box";
import {usePathname} from "next/navigation";

export default function DrawerSidebar({sidebarController}: { sidebarController: MobileSidebarController }) {
    const location = usePathname();

    return (
        <Drawer open={sidebarController.open} onClose={sidebarController.handleClose}>
            <Box bgcolor="#a9be77" height="100vh">
                <Stack component="ul" spacing={1} sx={{listStyle: 'none', mt: '7px', p: 0, width: '100%'}}>
                    <Button
                        sx={{
                            color: '#080B0D',
                            textTransform: 'none',
                            pl: '30px',
                            justifyContent: 'initial',
                            '&:hover': {
                                backgroundColor: '#768b45'
                            },
                            ...(location === "/xd" && {
                                backgroundColor: '#768b45'
                            })
                        }} variant="text" startIcon={<SettingsOutlinedIcon/>} size="large">
                        <Typography sx={{pl: '10px'}} variant="h5">Paragony</Typography>
                    </Button>
                    <Button
                        sx={{
                            color: '#080B0D',
                            textTransform: 'none',
                            pl: '30px',
                            justifyContent: 'initial',
                            '&:hover': {
                                backgroundColor: '#768b45'
                            },
                            ...(location === "/a" && {
                                backgroundColor: '#768b45'
                            })
                        }} variant="text" startIcon={<SettingsOutlinedIcon/>} size="large">
                        <Typography sx={{pl: '10px'}} variant="h5">Użytkownicy</Typography>
                    </Button>
                    <Button
                        sx={{
                            color: '#080B0D',
                            textTransform: 'none',
                            pl: '30px',
                            justifyContent: 'initial',
                            '&:hover': {
                                backgroundColor: '#768b45'
                            },
                            ...(location === "/b" && {
                                backgroundColor: '#768b45'
                            })
                        }} variant="text" startIcon={<SettingsOutlinedIcon/>} size="large">
                        <Typography sx={{pl: '10px'}} variant="h5">Kategorie</Typography>
                    </Button>
                </Stack>
            </Box>
        </Drawer>
    );
}