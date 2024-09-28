'use client';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import ErrorIcon from "@mui/icons-material/Error";
import {confirmEmailChanging} from "../../../../../account/AccountService";

//TODO gdy użytkownik ma otwarte /profile, dynamicznie zmienić mu wyświetlany adres email (bez potrzeby odświeżania całej strony)
export default function EmailChangeConfirmation() {
    const [headMessage, setHeadMessage] = useState<string>("Trwa weryfikowanie...");
    const [secondMessage, setSecondMessage] = useState<string>("Trwa zmiana adresu email...");
    const [icon, setIcon] = useState(<InfoIcon/>)

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');

        if (!token) {
            setIcon(<ErrorIcon/>)
            setHeadMessage('Błąd zmiany adresu')
            setSecondMessage('Token jest wymagany.');
            return;
        }

        const confirmEmail = async () => {
            const response = await confirmEmailChanging(token)
            setIcon(response.success ? <CheckCircleIcon/> : <ErrorIcon/>)
            setHeadMessage(response.success ? 'Potwierdzenie zmiany adresu e-mail' : 'Błąd zmiany adresu e-mail')
            setSecondMessage(response.message)
        }

        confirmEmail()
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
                <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
                    {icon}
                </Avatar>
                <Typography component="h1" variant="h5">
                    {headMessage}
                </Typography>
                <Typography sx={{mt: 2}} variant="body1" textAlign='justify'>
                    {secondMessage}
                </Typography>
                <Button
                    fullWidth
                    href="/"
                    variant="contained"
                    sx={{mt: 2, mb: 2}}
                >
                    Przejdź do strony głównej
                </Button>
            </Box>
        </Container>
    );
}
