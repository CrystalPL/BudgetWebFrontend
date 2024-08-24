'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {resetPassword} from "../../../auth/AuthenticationService";

export default function ResetPasswordForm() {
    const [status, setStatus] = useState<'success' | 'error'>('error');
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [token, setToken] = useState<string | null>();


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = queryParams.get('token');
        if (!tokenFromUrl) {
            setStatusMessage("Token aktywacyjny jest wymagany.");
            return
        }

        setToken(tokenFromUrl);
    }, []);
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!token) {
            setStatusMessage("Token aktywacyjny jest wymagany.");
            return
        }

        const data = new FormData(event.currentTarget);
        const password = data.get("password") as string;
        const confirmPassword = data.get("confirmPassword") as string;

        if (!password) {
            setStatusMessage("Podaj nowe hasło");
            return;
        }

        if (password.length < 6) {
            setStatusMessage("Hasło musi mieć co najmniej 6 znaków");
            return;
        }

        if (password !== confirmPassword) {
            setStatusMessage("Hasła nie są zgodne");
            return;
        }

        const response = await resetPassword(token, password, confirmPassword);
        setStatus(response.success ? 'success' : 'error')
        setStatusMessage(response.message)

        if (response.success) {
            setNewPassword("");
            setConfirmPassword("");
        }
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
                        name="password"
                        label="Nowe hasło"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="new-password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        InputProps={{
                            endAdornment: showPassword ? <Visibility
                                cursor="pointer"
                                onClick={(): void => {
                                    setShowPassword(false);
                                }}/> : <VisibilityOff
                                cursor="pointer"
                                onClick={(): void => {
                                    setShowPassword(true);
                                }}/>
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Potwierdź hasło"
                        type={showPassword ? 'text' : 'password'}
                        id="confirmPassword"
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        InputProps={{
                            endAdornment: showPassword ? <Visibility
                                cursor="pointer"
                                onClick={(): void => {
                                    setShowPassword(false);
                                }}/> : <VisibilityOff
                                cursor="pointer"
                                onClick={(): void => {
                                    setShowPassword(true);
                                }}/>
                        }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Potwierdź
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
