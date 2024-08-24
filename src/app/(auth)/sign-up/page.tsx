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
import {Alert, CircularProgress} from "@mui/material";
import {useRouter} from "next/navigation";
import {validatePassword, validateUserData} from "../../../auth/RegisterDataValidator";
import {PasswordValidationMessage, RegisterMessage} from "../../../auth/ResponseMessages";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {register} from "../../../auth/AuthenticationService";

export default function SignUp() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [receiveUpdates, setReceiveUpdates] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

    const [error, setError] = useState<string>();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validateResult: RegisterMessage = validateUserData(username, email, confirmEmail, password, confirmPassword);
        if (validateResult !== RegisterMessage.SUCCESS) {
            setError(validateResult)
            return
        }

        const validatePasswordResult = validatePassword(password);
        if (validatePasswordResult !== PasswordValidationMessage.OK) {
            setError(validatePasswordResult);
            return;
        }

        const registerResponse: ResponseAPI<any> = await register({
            username,
            email,
            confirmEmail,
            password,
            confirmPassword,
            receiveUpdates
        });

        if (!registerResponse.success) {
            setError(registerResponse.message)
            return
        }

        router.push('/registration-confirmation');
    };

    useEffect(() => {
        const handleBeforeUnload = () => {
            setUsername("");
            setEmail("")
            setConfirmEmail("")
            setPassword("")
            setConfirmPassword("")
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
                marginTop={{lg: 3, xl: 8}}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Rejestracja
                </Typography>
                {error && (
                    <Alert sx={{mt: 2}} severity='error'>{error}</Alert>
                )}
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="userName"
                                label="Nazwa użytkownika"
                                name="userName"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Adres e-mail"
                                name="email"
                                autoComplete="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="confirmEmail"
                                label="Powtórz adres e-mail"
                                name="confirmEmail"
                                autoComplete="email"
                                value={confirmEmail}
                                onChange={(event) => setConfirmEmail(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
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
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Powtórz hasło"
                                type={confirmPasswordShow ? 'text' : 'password'}
                                id="confirmPassword"
                                autoComplete="password"
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                InputProps={{
                                    endAdornment: confirmPasswordShow ? <Visibility
                                        cursor="pointer"
                                        onClick={(): void => {
                                            setConfirmPasswordShow(false);
                                        }}/> : <VisibilityOff
                                        cursor="pointer"
                                        onClick={(): void => {
                                            setConfirmPasswordShow(true);
                                        }}/>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"
                                                   onChange={(event) => setReceiveUpdates(event.target.checked)}/>}
                                label="Chce otrzymywać informacje o aktualizacjach na adres e-mail."

                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Zarejestruj
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="sign-in" variant="body2" underline="none">
                                Posiadasz już konto? Zaloguj się
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}