'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {Alert, IconButton} from "@mui/material";
import {useRouter} from "next/navigation";
import {validateEmailFormat, validateLength, validatePassword} from "../../../auth/DataValidator";
import {PasswordValidationMessage, RegisterMessage} from "../../../auth/AuthResponseMessages";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {register} from "../../../auth/AuthenticationService";
import {CustomFormControl, CustomFormControlProps} from "../../../account/components/AccountDetails";
import Stack from "@mui/material/Stack";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

export default function SignUp() {
    const router = useRouter();
    const [receiveUpdates, setReceiveUpdates] = useState(false);
    const [error, setError] = useState<string>();

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        validateUsername()
        if (usernameError !== '') {
            return
        }

        validateEmail()
        if (emailError !== '') {
            return
        }

        validateConfirmEmail()
        if (confirmEmailError !== '') {
            return
        }

        validatePasswordHandler()
        if (passwordError !== '') {
            return
        }

        validateConfirmEmail()
        if (confirmPasswordError !== '') {
            return
        }

        const response: ResponseAPI<RegisterMessage> = await register({
            username,
            email,
            confirmEmail,
            password,
            confirmPassword,
            receiveUpdates
        });

        if (response.success) {
            router.push('/registration-confirmation');
            return
        }

        const message: string = response.message;
        switch (message) {
            case RegisterMessage.ACCOUNT_EXISTS:
                setEmailError(message)
                break
            default:
                setError(message)
        }
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

    const validateUsername = (): string => {
        if (!username || username.trim() === '') {
            return RegisterMessage.MISSING_USERNAME
        }

        if (!validateLength(username, 64)) {
            return RegisterMessage.TOO_LONG_USERNAME
        }

        return ""
    }

    const usernameFieldProps: CustomFormControlProps = {
        valueState: [username, setUsername],
        errorState: [usernameError, setUsernameError],
        label: 'Nazwa użytkownika',
        name: 'username',
        validateFunction: validateUsername
    };

    const validateEmail = (): string => {
        if (!email) {
            return RegisterMessage.MISSING_EMAIL
        }

        if (!validateLength(email, 255)) {
            return RegisterMessage.EMAIL_TOO_LONG
        }

        if (!validateEmailFormat(email)) {
            return RegisterMessage.INVALID_EMAIL
        }

        return ""
    }

    const emailFieldProps: CustomFormControlProps = {
        valueState: [email, setEmail],
        errorState: [emailError, setEmailError],
        label: 'Adres e-mail',
        name: 'email',
        validateFunction: validateEmail
    };

    const validateConfirmEmail = (): string => {
        if (!confirmEmail) {
            return RegisterMessage.MISSING_CONFIRM_EMAIL
        }

        if (email !== confirmEmail) {
            return RegisterMessage.EMAIL_MISMATCH
        }

        return ""
    }

    const confirmEmailFieldProps: CustomFormControlProps = {
        valueState: [confirmEmail, setConfirmEmail],
        errorState: [confirmEmailError, setConfirmEmailError],
        label: 'Powtórz adres e-mail',
        name: 'confirmEmail',
        validateFunction: validateConfirmEmail
    };

    const validatePasswordHandler = (): string => {
        if (!password) {
            return RegisterMessage.MISSING_PASSWORD
        }

        const validatePasswordResult: PasswordValidationMessage = validatePassword(password)
        if (validatePasswordResult !== PasswordValidationMessage.OK) {
            return validatePasswordResult
        }

        return ""
    }

    const passwordFieldProps: CustomFormControlProps = {
        valueState: [password, setPassword],
        errorState: [passwordError, setPasswordError],
        label: 'Hasło',
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

    const validateConfirmPassword = (): string => {
        if (!confirmPassword) {
            return RegisterMessage.MISSING_CONFIRM_PASSWORD
        }

        if (password !== confirmPassword) {
            return RegisterMessage.PASSWORD_MISMATCH
        }

        return ""
    }

    const confirmPasswordFieldProps: CustomFormControlProps = {
        valueState: [confirmPassword, setConfirmPassword],
        errorState: [confirmPasswordError, setConfirmPasswordError],
        label: 'Powtórz hasło',
        name: 'confirmPassword',
        type: showConfirmPassword ? 'text' : 'password',
        validateFunction: validateConfirmPassword,
        endAdornment: (
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
                style={{color: 'black'}}
            >
                {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        ),
    };

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
                <Stack noValidate component="form" onSubmit={handleSubmit} sx={{mt: 2, width: '91%'}} spacing={1}>
                    <CustomFormControl {...usernameFieldProps}></CustomFormControl>
                    <CustomFormControl {...emailFieldProps}></CustomFormControl>
                    <CustomFormControl {...confirmEmailFieldProps}></CustomFormControl>
                    <CustomFormControl {...passwordFieldProps}></CustomFormControl>
                    <CustomFormControl {...confirmPasswordFieldProps}></CustomFormControl>
                    <FormControlLabel sx={{width: '100%'}}
                                      control={<Checkbox value="allowExtraEmails" color="primary"
                                                         onChange={(event) => setReceiveUpdates(event.target.checked)}/>}
                                      label="Chce otrzymywać informacje o aktualizacjach na adres e-mail."
                    />
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
                </Stack>
            </Box>
        </Container>
    );
}