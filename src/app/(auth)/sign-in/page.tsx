'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert, IconButton} from "@mui/material";
import {useRouter} from "next/navigation";
import {login} from "../../../auth/AuthenticationService";
import {LoginMessage} from "../../../auth/AuthResponseMessages";
import {validateEmailFormat} from "../../../auth/DataValidator";
import {CustomFormControl, CustomFormControlProps} from "../../../account/components/AccountDetails";
import Stack from "@mui/material/Stack";

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

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        validateEmail()
        if (emailError !== '') {
            return
        }

        validatePasswordHandler()
        if (passwordError !== '') {
            return
        }

        const response = await login(email, password, rememberMe);
        if (!response.success) {
            const message: string = response.message;
            switch (message) {
                case LoginMessage.ACCOUNT_NOT_CONFIRMED:
                    router.push('/account-inactive')
                    break
                case LoginMessage.USER_NOT_EXIST:
                    setEmailError(message)
                    break
                case LoginMessage.BAD_CREDENTIALS:
                    setPasswordError(message)
                    break
                default:
                    setError(response.message)
            }

            return
        }

        const cookiePath = readCookie("redirectPath")
        if (cookiePath) {
            router.push(cookiePath)
            document.cookie = `redirectPath=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
        } else {
            router.push('/');
        }
    };

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

    const validatePasswordHandler = () => {
        if (!password) {
            setPasswordError(LoginMessage.MISSING_PASSWORD)
            return
        }
    }

    const passwordFieldProps: CustomFormControlProps = {
        valueState: [password, setPassword],
        errorState: [passwordError, setPasswordError],
        label: 'Nowe hasło',
        name: 'password',
        type: showPassword ? 'text' : 'password',
        validateFunction: validatePasswordHandler,
        endAdornment: (
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
                style={{color: 'black'}}
            >
                {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        ),
    };

    const validateEmail = () => {
        if (!email) {
            setEmailError(LoginMessage.MISSING_EMAIL)
            return
        }

        if (!validateEmailFormat(email)) {
            setEmailError(LoginMessage.INVALID_EMAIL)
            return
        }
    }

    const emailFieldProps: CustomFormControlProps = {
        valueState: [email, setEmail],
        errorState: [emailError, setEmailError],
        label: 'Adres e-mail',
        name: 'email',
        validateFunction: validateEmail
    };

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1, width: '100%'}}>
                    <Stack sx={{mt: 1}} spacing={1}>
                        <CustomFormControl {...emailFieldProps}></CustomFormControl>
                        <CustomFormControl {...passwordFieldProps}></CustomFormControl>
                    </Stack>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"
                                           onChange={(event) => setRememberMe(event.target.checked)}/>}
                        label="Zapamiętaj mnie" sx={{pl: 1}}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mb: 2}}
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