import * as React from 'react';
import {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import {
    Avatar,
    Badge,
    Divider,
    IconButton,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    MenuItem,
    MenuList,
    Popover,
    Typography
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import {LogoutOutlined} from "@mui/icons-material";
import {GetUserPopoverController, UserPopoverController} from "../../controllers/UserPopoverController";
import GetMobileSidebarController, {MobileSidebarController} from "../../controllers/MobileSidebarController";
import {DrawerSidebar} from "./Sidebar";
import {API_URL, WEBSOCKET_URL} from "../share/ResponseAPI";
import {AvatarContextType, useAvatarContext} from "../AccountHeaderInfo";
import {useRouter} from "next/navigation";
import {logout} from "../../auth/AuthenticationService";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Stack from "@mui/material/Stack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CloseIcon from "@mui/icons-material/Close";
import {
    GetNotificationsPopoverController,
    NotificationsPopoverController
} from "../../controllers/NotifcationsPopoverController";
import {Client} from "@stomp/stompjs";

const HeaderComponent = () => {
    const popoverController: UserPopoverController = GetUserPopoverController();
    const sidebarController: MobileSidebarController = GetMobileSidebarController();
    const notificationsController: NotificationsPopoverController = GetNotificationsPopoverController();
    const avatarContext: AvatarContextType = useAvatarContext();

    return (
        <>
            <Box bgcolor="secondary.main" display="flex" flexDirection="row" component="header" sx={{
                width: '100%',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                height: 'var(--Header-height)',
                zIndex: '999'
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
                <Stack alignItems="center" display="flex" direction="row" spacing={2} sx={{mr: 2}}>
                    <IconButton color="inherit" onClick={notificationsController.handleOpen}>
                        <Badge badgeContent={3} color="error" ref={notificationsController.anchorElement}>
                            <NotificationsIcon fontSize="large" sx={{color: 'white'}}/>
                        </Badge>
                    </IconButton>
                    <Avatar
                        onClick={popoverController.handleOpen}
                        ref={popoverController.anchorElement}
                        key={avatarContext.reloadKey}
                        src={`${API_URL}/account/avatar`}
                        sx={{
                            cursor: 'pointer',
                            width: 50,
                            height: 50
                        }}
                    />
                </Stack>
                <ShowMenuItems popoverController={popoverController}></ShowMenuItems>
                <ShowNotifications popoverController={notificationsController}></ShowNotifications>
            </Box>
            <DrawerSidebar sidebarController={sidebarController}></DrawerSidebar>
        </>
    );
}

function ShowNotifications({popoverController}: { popoverController: NotificationsPopoverController }) {
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<string[]>([]);

    const avatarContext: AvatarContextType = useAvatarContext();
    const [client, setClient] = useState<Client>();
    useEffect(() => {
        const stompClient = new Client({
            brokerURL: WEBSOCKET_URL, // Adres serwera WebSocket
            onConnect: () => {
                stompClient.subscribe(`/user/${avatarContext.accountInfo!.userId}/topic/notifications`, (message) => {
                    console.log(message.body)
                    setMessages((prevMessages) => [...prevMessages, message.body]);
                });
            }
        });

        // Łączymy się z serwerem
        stompClient.activate();
        setClient(stompClient);

        // Sprzątamy połączenie po odmontowaniu komponentu
        return () => {
            stompClient.deactivate();
        };
    }, []);

    const notifications = [
        {
            id: 1,
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            name: 'Jie Yan',
            description: 'Logistics management is now available',
            date: 'Oct 1, 09:42 AM',
        },
        {
            id: 2,
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            name: 'Fran Perez',
            description: 'Logistics man1233333agement is now available',
            date: 'Sep 27, 11:31 AM',
        },
        {
            id: 3,
            icon: <MailOutlineIcon/>,
            action: 'New feature!',
            description: 'Logistics management is now available',
            date: 'Sep 25, 09:45 AM'
        }
    ];

    return (
        <Popover
            id="notification-popover"
            open={popoverController.open}
            anchorEl={popoverController.anchorElement.current}
            onClose={popoverController.handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            slotProps={{
                paper: {
                    sx: {
                        width: 400,
                        maxHeight: {xs: 250, sm: 400},
                        borderRadius: 3
                    }
                }
            }}
        >
            <Box
                p={2}
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'white',
                    zIndex: 999999,
                }}
            >
                <Typography variant="h6" sx={{ml: 2}}>
                    Notifications
                </Typography>
                <IconButton>
                    <MailOutlineIcon/>
                </IconButton>
            </Box>

            <List>
                {notifications.map((notification, index) => (
                    <React.Fragment key={notification.id}>
                        <ListItem alignItems="flex-start" sx={{position: 'relative'}}>
                            <ListItemAvatar>
                                <Avatar src={notification.avatar}/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <>
                                        <Typography variant="subtitle1">{notification.name}</Typography>
                                        <Typography variant="body2">{notification.description}</Typography>
                                    </>
                                }
                                secondary={
                                    <Typography variant="body2" color="textSecondary">
                                        {notification.date}
                                    </Typography>
                                }
                            />
                            <IconButton
                                edge="end"
                                size="small"
                                sx={{top: 0, right: 0}}
                            >
                                <CloseIcon fontSize="small"/>
                            </IconButton>
                        </ListItem>
                        {index < notifications.length - 1 && <Divider/>}
                    </React.Fragment>
                ))}
            </List>
        </Popover>
    );
}


function ShowMenuItems({popoverController}: { popoverController: UserPopoverController }): React.JSX.Element {
    const avatarContext: AvatarContextType = useAvatarContext();
    const router = useRouter()

    const handleLogout = () => {
        logout()
        router.push("/sign-in")
    }

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
            disableScrollLock
        >
            <Box sx={{p: '16px 20px '}}>
                <Typography variant="subtitle1">{avatarContext.accountInfo?.nickname}</Typography>
                <Typography variant="body2">{avatarContext.accountInfo?.email}</Typography>
            </Box>
            <Divider/>
            <MenuList disablePadding sx={{p: '8px'}}>
                <MenuItem onClick={() => router.push("/profile")}>
                    <ListItemIcon>
                        <PersonOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Profil"/>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
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
