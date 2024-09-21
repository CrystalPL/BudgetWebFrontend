'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

export default function EmailChangeConfirmation() {
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
                    <CheckCircleIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Potwierdzenie zmiany adresu e-mail
                </Typography>
                <Typography sx={{mt: 2}} variant="body1" textAlign='justify'>
                    Twój adres e-mail został pomyślnie zmieniony.
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
