import {IconButton} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {ChangeEmailMessage} from "../../AccountResponses";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {changeEmailAddress} from "../../AccountService";
import {validateEmailFormat} from "../../../auth/DataValidator";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {CustomFormControl, CustomFormControlProps, StatusController} from "../AccountDetails";
import BasicForm from "./BasicForm";

export default function ChangeEmailForm(form: StatusController) {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateNewEmail()
        if (emailError !== '') {
            return
        }

        validateConfirmNewEmail()
        if (confirmEmailError !== '') {
            return
        }

        validatePassword()
        if (passwordError !== '') {
            return
        }

        const response: ResponseAPI<ChangeEmailMessage> = await changeEmailAddress({email, confirmEmail, password})
        const message = response.message;
        switch (message) {
            case ChangeEmailMessage.EMAIL_ALREADY_EXISTS:
                setEmailError(message)
                setConfirmEmailError(message)
                break
            case ChangeEmailMessage.BAD_CREDENTIALS:
                setPasswordError(message)
                break
            default:
                form.setStatus(response.success ? 'success' : 'error')
                form.setOpenSnackbar(true)
                form.setStatusMessage(message)
        }

        if (response.success) {
            setEmail("")
            setConfirmEmail("")
            setPassword("")
        }
    }

    const validateNewEmail = () => {
        if (!email) {
            setEmailError(ChangeEmailMessage.MISSING_EMAIL)
            return
        }

        if (!validateEmailFormat(email)) {
            setEmailError(ChangeEmailMessage.INVALID_EMAIL)
            return;
        }
    }

    const newEmailFieldProps: CustomFormControlProps = {
        valueState: [email, setEmail],
        errorState: [emailError, setEmailError],
        label: 'Nowy adres e-mail',
        name: 'newEmail',
        validateFunction: validateNewEmail
    };

    const validateConfirmNewEmail = () => {
        if (!confirmEmail) {
            setConfirmEmailError(ChangeEmailMessage.MISSING_EMAIL)
            return
        }

        if (!validateEmailFormat(confirmEmail)) {
            setConfirmEmailError(ChangeEmailMessage.INVALID_EMAIL)
            return
        }

        if (email !== confirmEmail) {
            setConfirmEmailError(ChangeEmailMessage.EMAIL_MISMATCH)
            return
        }
    }

    const confirmNewEmailFieldProps: CustomFormControlProps = {
        valueState: [confirmEmail, setConfirmEmail],
        errorState: [confirmEmailError, setConfirmEmailError],
        label: 'Potwierdź nowy adres e-mail',
        name: 'confirmNewEmail',
        validateFunction: validateConfirmNewEmail
    };

    const validatePassword = () => {
        if (!password) {
            setPasswordError(ChangeEmailMessage.MISSING_PASSWORD)
            return
        }
    }

    const passwordFieldProps: CustomFormControlProps = {
        valueState: [password, setPassword],
        errorState: [passwordError, setPasswordError],
        label: 'Hasło',
        name: 'password',
        type: showPassword ? 'text' : 'password',
        validateFunction: validatePassword,
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

    return <BasicForm title="Zmiana adresu e-mail" onSubmit={handleSubmit}>
        <CustomFormControl {...newEmailFieldProps}></CustomFormControl>
        <CustomFormControl {...confirmNewEmailFieldProps}></CustomFormControl>
        <CustomFormControl {...passwordFieldProps}></CustomFormControl>
    </BasicForm>
}