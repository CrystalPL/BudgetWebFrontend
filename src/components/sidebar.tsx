import React from "react";
import {Button, Stack, Typography} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Grid from "@mui/material/Unstable_Grid2";
import {usePathname} from "next/navigation";


const SidebarComponent = () => {
    const location = usePathname();
    return (
        <Grid lg={2} sx={{display: {xs: 'none', lg: 'flex'}}} bgcolor="#a9be77" top={"60px"} position="sticky"
              height="calc(100vh - 60px)">
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
        </Grid>
    );
}
export default SidebarComponent;
