'use client'
import * as React from 'react';
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert, Box} from "@mui/material";
import {passwordRecovery} from "../../../features/auth/api/AuthenticationService";
import {ResponseAPI} from "../../../service/ResponseAPI";
import {PasswordRecoveryMessage} from "../../../features/auth/api/AuthResponseMessages";
import {validateEmailFormat} from "../../../features/auth/util/DataValidator";
import {CustomFormControl, CustomFormControlProps} from "../../../components/CustomFormControl";

export default function ResetPassword() {
    const [status, setStatus] = useState<'success' | 'error'>();
    const [statusMessage, setStatusMessage] = useState<string>("");

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        validateEmail()
        if (emailError !== '') {
            return
        }

        const response: ResponseAPI<PasswordRecoveryMessage> = await passwordRecovery(email)
        const message: string = response.message;
        switch (message) {
            case PasswordRecoveryMessage.USER_NOT_FOUND:
                setEmailError(message)
                break
            default:
                setStatus(response.success ? 'success' : 'error')
                setStatusMessage(response.message)
        }
    };


    const validateEmail = () => {
        if (!email) {
            setEmailError(PasswordRecoveryMessage.MISSING_EMAIL)
            return ""
        }

        if (!validateEmailFormat(email)) {
            setEmailError(PasswordRecoveryMessage.INVALID_EMAIL)
            return ""
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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 2, width: '90%'}}>
                    <CustomFormControl {...emailFieldProps}></CustomFormControl>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 1, mb: 2}}
                    >
                        Wyślij link resetujący
                    </Button>
                    <Grid container>
                        <Grid>
                            <Link href="sign-in" variant="body2" underline="none" fontWeight="bold">
                                Zaloguj się
                            </Link>
                        </Grid>
                        <Grid>
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
