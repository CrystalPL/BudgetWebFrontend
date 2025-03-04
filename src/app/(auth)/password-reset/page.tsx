'use client'
import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert, IconButton} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {resetPassword} from "../../../features/auth/api/AuthenticationService";
import {PasswordResetMessage, PasswordValidationMessage} from "../../../features/auth/api/AuthResponseMessages";
import {validatePassword} from "../../../features/auth/util/DataValidator";
import {CustomFormControl, CustomFormControlProps} from "../../../features/account/components/AccountDetails";
import Stack from "@mui/material/Stack";

export default function ResetPasswordForm() {
    const [status, setStatus] = useState<'success' | 'error'>('error');
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [token, setToken] = useState<string | null>();

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = queryParams.get('token');
        if (!tokenFromUrl) {
            setStatusMessage(PasswordResetMessage.MISSING_TOKEN);
            return
        }

        setToken(tokenFromUrl);
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!token) {
            setStatusMessage(PasswordResetMessage.MISSING_TOKEN);
            return
        }

        validateNewPassword()
        if (passwordError !== '') {
            return
        }

        validateConfirmPassword()
        if (confirmPasswordError !== '') {
            return
        }

        const response = await resetPassword(token, password, confirmPassword);
        setStatus(response.success ? 'success' : 'error')
        setStatusMessage(response.message)

        if (response.success) {
            setPassword("");
            setConfirmPassword("");
        }
    };

    const validateNewPassword = () => {
        if (!password) {
            setPasswordError(PasswordResetMessage.MISSING_PASSWORD)
            return ""
        }

        const validatePasswordResult: PasswordValidationMessage = validatePassword(password)
        if (validatePasswordResult !== PasswordValidationMessage.OK) {
            setPasswordError(validatePasswordResult)
            return ""
        }

        return ""
    }

    const newPasswordFieldProps: CustomFormControlProps = {
        valueState: [password, setPassword],
        errorState: [passwordError, setPasswordError],
        label: 'Nowe hasło',
        name: 'newPassword',
        type: showPassword ? 'text' : 'password',
        validateFunction: validateNewPassword,
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

    const validateConfirmPassword = () => {
        if (!confirmPassword) {
            setConfirmPasswordError(PasswordResetMessage.MISSING_CONFIRM_PASSWORD)
            return ""
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError(PasswordResetMessage.PASSWORD_MISMATCH)
            return ""
        }

        return ""
    }

    const confirmNewPasswordFieldProps: CustomFormControlProps = {
        valueState: [confirmPassword, setConfirmPassword],
        errorState: [confirmPasswordError, setConfirmPasswordError],
        label: 'Potwierdź nowe hasło',
        name: 'confirmNewPassword',
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
                    <Alert sx={{mt: 1, mb: 1}} severity={status}>{statusMessage}</Alert>
                )}

                <Stack component="form" onSubmit={handleSubmit} sx={{mt: 1, width: '90%'}} spacing={1}>
                    <CustomFormControl {...newPasswordFieldProps}></CustomFormControl>
                    <CustomFormControl {...confirmNewPasswordFieldProps}></CustomFormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1}}
                    >
                        Potwierdź
                    </Button>
                </Stack>
            </Box>
        </Container>
    );
}
