'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert} from "@mui/material";
import {useRouter} from "next/navigation";
import {login} from "../../../auth/AuthenticationService";
import {LoginMessage} from "../../../auth/ResponseMessages";

function readCookie(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());

    for (const cookie of cookies) {
        if (cookie.startsWith(nameEQ)) {
            return cookie.substring(nameEQ.length);
        }
    }

    return null;
}

export default function SignIn() {
    const router = useRouter();

    const [error, setError] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get("email") as string;
        const password = data.get("password") as string;
        if (!email) {
            setError("Podaj adres e-mail")
            return
        }

        if (!email.includes("@")) {
            setError("Adres email musi mieć znak @!")
            return
        }

        if (!password) {
            setError("Podaj hasło")
            return
        }

        const response = await login(email, password, rememberMe);
        if (!response.success) {
            if (response.message === LoginMessage.ACCOUNT_NOT_CONFIRMED) {
                router.push('/account-inactive');
            } else {
                setError(response.message)
            }

            return
        }

        const cookiePath = readCookie("redirectPath")
        if (cookiePath) {
            router.push(cookiePath)
            document.cookie = `redirectPath=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        } else {
            router.push('/dashboard');
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        const handleBeforeUnload = () => {
            setEmail("");
            setPassword("")
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);
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
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">Logowanie</Typography>
                {error !== "" && (
                    <Alert sx={{mt: 2}} severity="error">{error}</Alert>
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Hasło"
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"
                                           onChange={(event) => setRememberMe(event.target.checked)}/>}
                        label="Zapamiętaj mnie"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Zaloguj
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="password-recovery" variant="body2" underline="none" fontWeight="bold">
                                Zapomniałeś hasła?
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