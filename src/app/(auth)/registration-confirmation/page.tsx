'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import EmailIcon from '@mui/icons-material/Email';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button";

export default function RegistrationConfirmation() {
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
                    <EmailIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Rejestracja zakończona
                </Typography>
                <Typography sx={{mt: 2}} variant="body1" textAlign='justify'>
                    Na podany adres e-mail został wysłany link aktywacyjny. Sprawdź swoją skrzynkę pocztową i
                    postępuj
                    zgodnie z instrukcjami, aby aktywować konto.
                </Typography>
                <Button
                    fullWidth
                    href="/sign-in"
                    variant="contained"
                    sx={{mt: 2, mb: 2}}
                >
                    Zaloguj się, aby wysłać ponownie wysłać email z linkiem aktywacyjnym.
                </Button>
            </Box>
        </Container>
    );
}
