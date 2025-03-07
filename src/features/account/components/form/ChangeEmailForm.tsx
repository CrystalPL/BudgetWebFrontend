import {IconButton} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {ChangeEmailMessage} from "../../api/AccountResponseMessage";
import {ResponseAPI} from "../../../../service/ResponseAPI";
import {changeEmailAddress} from "../../api/AccountService";
import {validateEmailFormat} from "../../../auth/util/DataValidator";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import BasicForm from "./BasicForm";
import {CustomFormControl, CustomFormControlProps} from "../../../../components/CustomFormControl";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

export default function ChangeEmailForm() {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const [confirmEmail, setConfirmEmail] = useState('');
    const [confirmEmailError, setConfirmEmailError] = useState('');

    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const snackbarController = useSnackbarContext()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const emailValidationError = validateNewEmail()
        setEmailError(emailValidationError)
        if (emailValidationError !== '') {
            return
        }

        const confirmEmailValidationError = validateConfirmNewEmail()
        setConfirmEmailError(confirmEmailValidationError)
        if (confirmEmailValidationError !== '') {
            return
        }

        const passwordValidationError = validatePassword()
        setPasswordError(passwordValidationError)
        if (passwordValidationError !== '') {
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
                snackbarController.setStatus(response.success ? 'success' : 'error')
                snackbarController.setOpenSnackbar(true)
                snackbarController.setStatusMessage(message)
        }

        if (response.success) {
            setEmail("")
            setConfirmEmail("")
            setPassword("")
        }
    }

    const validateNewEmail = (): string => {
        if (!email) {
            return ChangeEmailMessage.MISSING_EMAIL
        }

        if (!validateEmailFormat(email)) {
            return ChangeEmailMessage.INVALID_EMAIL
        }

        return ""
    }

    const newEmailFieldProps: CustomFormControlProps = {
        valueState: [email, setEmail],
        errorState: [emailError, setEmailError],
        label: 'Nowy adres e-mail',
        name: 'newEmail',
        validateFunction: validateNewEmail
    };

    const validateConfirmNewEmail = (): string => {
        if (!confirmEmail) {
            return ChangeEmailMessage.MISSING_EMAIL
        }

        if (!validateEmailFormat(confirmEmail)) {
            return ChangeEmailMessage.INVALID_EMAIL
        }

        if (email !== confirmEmail) {
            return ChangeEmailMessage.EMAIL_MISMATCH
        }

        return ""
    }

    const confirmNewEmailFieldProps: CustomFormControlProps = {
        valueState: [confirmEmail, setConfirmEmail],
        errorState: [confirmEmailError, setConfirmEmailError],
        label: 'Potwierdź nowy adres e-mail',
        name: 'confirmNewEmail',
        validateFunction: validateConfirmNewEmail
    };

    const validatePassword = (): string => {
        if (!password) {
            return ChangeEmailMessage.MISSING_PASSWORD
        }

        return ""
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