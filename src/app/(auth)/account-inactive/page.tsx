'use client';
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation";
import {ResendEmailButton} from "../../../auth/components/ResendEmailComponent";
import Button from "@mui/material/Button";

export default function AccountInactive() {
    const router = useRouter();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                marginTop={{ lg: 5, xl: 20 }}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">Konto nieaktywne</Typography>

                <ResendEmailButton>
                    <Typography sx={{ mt: 2 }} variant="body1">
                        Twoje konto nie zostało jeszcze aktywowane. Prosimy sprawdzić swoją skrzynkę pocztową i kliknąć w
                        link aktywacyjny.
                    </Typography>
                </ResendEmailButton>
                <Button
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 2, mb: 2 }}
                    onClick={() => router.push('/sign-in')}
                >
                    Wróć do logowania
                </Button>
            </Box>
        </Container>
    );
}
