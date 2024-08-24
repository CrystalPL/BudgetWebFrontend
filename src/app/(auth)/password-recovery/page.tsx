'use client'
import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert} from "@mui/material";
import {useRouter} from "next/navigation";
import {passwordRecovery, resetPassword} from "../../../auth/AuthenticationService";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {PasswordRecoveryMessage} from "../../../auth/ResponseMessages";

export default function ResetPassword() {
    const [status, setStatus] = useState<'success' | 'error'>('error');
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [email, setEmail] = useState("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;

        setStatus('error')
        if (!email) {
            setStatusMessage("Podaj adres e-mail");
            return;
        }

        if (!email.includes("@")) {
            setStatusMessage("Adres email musi mieć znak @!");
            return;
        }

        const response: ResponseAPI<PasswordRecoveryMessage> = await passwordRecovery(email)
        setStatus(response.success ? 'success' : 'error')
        setStatusMessage(response.message)
        setEmail("");
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">Resetowanie hasła</Typography>
                {statusMessage && (
                    <Alert sx={{mt: 2}} severity={status}>{statusMessage}</Alert>
                )}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Adres e-mail"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Wyślij link resetujący
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="sign-in" variant="body2" underline="none" fontWeight="bold">
                                Zaloguj się
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="sign-up" variant="body2" underline="none" fontWeight="bold">
                                Nie masz konta? Zarejestruj się!
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
