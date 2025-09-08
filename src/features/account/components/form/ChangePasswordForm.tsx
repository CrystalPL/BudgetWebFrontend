import {IconButton} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ChangePasswordMessage} from "../../api/AccountResponseMessage";
import {validatePassword} from "../../../auth/util/DataValidator";
import {PasswordValidationMessage} from "../../../auth/api/AuthResponseMessages";
import BasicForm from "./BasicForm";
import {ResponseAPI} from "../../../../service/ResponseAPI";
import {changePassword} from "../../api/AccountService";
import {CustomFormControl, CustomFormControlProps} from "../../../../components/CustomFormControl";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

export default function ChangePasswordForm() {
    const [oldPassword, setOldPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showConfirmNewPassword, setConfirmShowNewPassword] = useState(false);
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    const snackbarController = useSnackbarContext()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const oldPasswordValidationError = validateOldPassword()
        setOldPasswordError(oldPasswordValidationError)
        if (oldPasswordValidationError !== '') {
            return
        }

        const newPasswordValidationError = validateNewPassword()
        setNewPasswordError(newPasswordValidationError)
        if (newPasswordValidationError !== '') {
            return
        }

        const confirmPasswordValidationError = validateConfirmNewPassword()
        setConfirmNewPasswordError(confirmPasswordValidationError)
        if (confirmPasswordValidationError !== '') {
            return
        }

        const response: ResponseAPI<ChangePasswordMessage> = await changePassword({
            oldPassword,
            newPassword,
            confirmNewPassword
        })

        const message: string = response.message;
        switch (message) {
            case ChangePasswordMessage.BAD_CREDENTIALS:
                setOldPasswordError(message)
                break
            default:
                snackbarController.setStatus(response.success ? 'success' : 'error')
                snackbarController.setOpenSnackbar(true)
                snackbarController.setStatusMessage(message)
        }

        if (response.success) {
            setNewPassword("")
            setOldPassword("")
            setConfirmNewPassword("")
        }

    }

    const validateOldPassword = (): string => {
        if (!oldPassword) {
            return ChangePasswordMessage.MISSING_PASSWORD
        }

        return ""
    }

    const oldPasswordFieldProps: CustomFormControlProps = {
        valueState: [oldPassword, setOldPassword],
        errorState: [oldPasswordError, setOldPasswordError],
        label: 'Stare hasło',
        name: 'oldPassword',
        type: showOldPassword ? 'text' : 'password',
        validateFunction: validateOldPassword,
        endAdornment: (
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowOldPassword(!showOldPassword)}
                edge="end"
                style={{color: 'black'}}
            >
                {showOldPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        ),
    };

    const validateNewPassword = () => {
        if (!newPassword) {
            return ChangePasswordMessage.MISSING_PASSWORD
        }

        const validatePasswordResult: PasswordValidationMessage = validatePassword(newPassword)
        if (validatePasswordResult !== PasswordValidationMessage.OK) {
            return validatePasswordResult
        }

        return ""
    }

    const newPasswordFieldProps: CustomFormControlProps = {
        valueState: [newPassword, setNewPassword],
        errorState: [newPasswordError, setNewPasswordError],
        label: 'Nowe hasło',
        name: 'newPassword',
        type: showNewPassword ? 'text' : 'password',
        validateFunction: validateNewPassword,
        endAdornment: (
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowNewPassword(!showNewPassword)}
                edge="end"
                style={{color: 'black'}}
            >
                {showNewPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        ),
    };

    const validateConfirmNewPassword = () => {
        if (!confirmNewPassword) {
            return ChangePasswordMessage.MISSING_PASSWORD
        }

        if (newPassword !== confirmNewPassword) {
            return ChangePasswordMessage.PASSWORD_MISMATCH
        }

        return ""
    }

    const confirmNewPasswordFieldProps: CustomFormControlProps = {
        valueState: [confirmNewPassword, setConfirmNewPassword],
        errorState: [confirmNewPasswordError, setConfirmNewPasswordError],
        label: 'Potwierdź nowe hasło',
        name: 'confirmNewPassword',
        type: showConfirmNewPassword ? 'text' : 'password',
        validateFunction: validateConfirmNewPassword,
        endAdornment: (
            <IconButton
                aria-label="toggle password visibility"
                onClick={() => setConfirmShowNewPassword(!showConfirmNewPassword)}
                edge="end"
                style={{color: 'black'}}
            >
                {showConfirmNewPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
        ),
    };

    return <BasicForm onSubmit={handleSubmit} title="Zmiana hasła">
        <CustomFormControl {...oldPasswordFieldProps}></CustomFormControl>
        <CustomFormControl {...newPasswordFieldProps}></CustomFormControl>
        <CustomFormControl {...confirmNewPasswordFieldProps}></CustomFormControl>
    </BasicForm>
}