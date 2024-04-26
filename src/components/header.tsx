import * as React from 'react';
import Box from '@mui/material/Box';
import {
    Avatar,
    Divider,
    IconButton,
    Link,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {LogoutOutlined} from "@mui/icons-material";
import {GetUserPopoverController, UserPopoverController} from "@/controllers/UserPopoverController";
import DrawerSidebar from "@/components/sidebardrawer";
import GetMobileSidebarController, {MobileSidebarController} from "@/controllers/MobileSidebarController";

const HeaderComponent = () => {
    const popoverController: UserPopoverController = GetUserPopoverController();
    const sidebarController: MobileSidebarController = GetMobileSidebarController();

    return (
        <>
            <Box bgcolor="#768b45" display="flex" flexDirection="row" component="header" sx={{
                width: '100%',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                height: '60px'
            }}>
                <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center">
                    <IconButton
                        sx={{
                            display: {lg: 'none'}
                        }}
                        onClick={sidebarController.handleOpen}
                    >
                        <MenuIcon fontSize={"large"}/>
                    </IconButton>
                    <Link sx={{ml: 2}} underline="none">
                        <Typography variant="h2" color="#080B0D">Mój budżet</Typography>
                    </Link>
                </Box>
                <Box alignItems="center" display="flex" flexDirection="row">
                    <Avatar
                        onClick={popoverController.handleOpen}
                        ref={popoverController.anchorElement}
                        src="/avatar-1.png"
                        sx={{
                            cursor: 'pointer',
                            width: 50,
                            height: 50,
                            mr: 2
                        }}
                    />
                </Box>
                <ShowMenuItems popoverController={popoverController}></ShowMenuItems>
            </Box>
            <DrawerSidebar sidebarController={sidebarController}></DrawerSidebar>
        </>
    );
}

function ShowMenuItems({popoverController}: { popoverController: UserPopoverController }): React.JSX.Element {
    return (
        <Popover
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={popoverController.open}
            anchorEl={popoverController.anchorElement.current}
            onClose={popoverController.handleClose}
            slotProps={{paper: {sx: {width: '240px'}}}}
        >
            <Box sx={{p: '16px 20px '}}>
                <Typography variant="subtitle1">twój star pies</Typography>
                <Typography color="text.secondary" variant="body2">
                    Twój stary pies jebany@gmail.com
                </Typography>
            </Box>
            <Divider/>
            <MenuList disablePadding sx={{p: '8px'}}>
                <MenuItem>
                    <ListItemIcon>
                        <SettingsOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Ustawienia"/>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <PersonOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profil"/>
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <LogoutOutlined></LogoutOutlined>
                    </ListItemIcon>
                    <ListItemText primary="Wyloguj się"/>
                </MenuItem>
            </MenuList>
        </Popover>
    )
}

export default HeaderComponent;
