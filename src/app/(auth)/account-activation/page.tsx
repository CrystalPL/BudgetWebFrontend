'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import Box from '@mui/material/Box';
import {confirmRegister} from "../../../features/auth/api/AuthenticationService";
import InfoIcon from '@mui/icons-material/Info';
import {AccountConfirmationMessage} from "../../../features/auth/api/AuthResponseMessages";

export default function AccountActivation() {
    const [headMessage, setHeadMessage] = useState<string>("Trwa weryfikowanie...");
    const [secondMessage, setSecondMessage] = useState<string>("Trwa potwierdzenia założenia konta.");
    const [icon, setIcon] = useState(<InfoIcon/>)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (!token) {
            setIcon(<ErrorIcon/>)
            setHeadMessage('Błąd aktywacji konta')
            setSecondMessage(AccountConfirmationMessage.MISSING_TOKEN);
            return;
        }

        const confirmRegistration = async () => {
            const response = await confirmRegister(token)
            setIcon(response.success ? <CheckCircleIcon/> : <ErrorIcon/>)
            setHeadMessage(response.success ? 'Konto aktywowane' : 'Błąd aktywacji konta')
            setSecondMessage(response.message)
        }

        confirmRegistration()
    }, [])

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                marginTop={{lg: 5, xl: 20}}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'primary.main'}}>
                    {icon}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {headMessage}
                </Typography>
                <Typography sx={{mt: 2}} variant="body1">
                    {secondMessage}
                </Typography>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{mt: 2, mb: 2}}
                    href="/sign-in"
                >
                    Wróć do logowania
                </Button>
            </Box>
        </Container>
    );
}
