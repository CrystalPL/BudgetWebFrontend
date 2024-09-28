import {IconButton} from "@mui/material";
import * as React from "react";
import {useState} from "react";
import {CustomFormControl, CustomFormControlProps, StatusController} from "../AccountDetails";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ChangePasswordMessage} from "../../AccountResponses";
import {validatePassword} from "../../../auth/DataValidator";
import {PasswordValidationMessage} from "../../../auth/AuthResponseMessages";
import BasicForm from "./BasicForm";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {changePassword} from "../../AccountService";

export default function ChangePasswordForm(form: StatusController) {
    const [oldPassword, setOldPassword] = useState('');
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [oldPasswordError, setOldPasswordError] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [newPasswordError, setNewPasswordError] = useState('');

    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showConfirmNewPassword, setConfirmShowNewPassword] = useState(false);
    const [confirmNewPasswordError, setConfirmNewPasswordError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        validateOldPassword()
        if (oldPassword !== '') {
            return
        }

        validateNewPassword()
        if (newPasswordError !== '') {
            return
        }

        validateConfirmNewPassword()
        if (confirmNewPasswordError !== '') {
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
                form.setStatus(response.success ? 'success' : 'error')
                form.setOpenSnackbar(true)
                form.setStatusMessage(message)
        }

        if (response.success) {
            setNewPassword("")
            setOldPassword("")
            setConfirmNewPassword("")
        }

    }

    const validateOldPassword = () => {
        if (!oldPassword) {
            setOldPasswordError(ChangePasswordMessage.MISSING_PASSWORD)
            return
        }
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
            setNewPasswordError(ChangePasswordMessage.MISSING_PASSWORD)
            return
        }

        const validatePasswordResult: PasswordValidationMessage = validatePassword(newPassword)
        if (validatePasswordResult !== PasswordValidationMessage.OK) {
            setNewPasswordError(validatePasswordResult)
            return
        }
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
            setConfirmNewPasswordError(ChangePasswordMessage.MISSING_PASSWORD)
            return
        }

        if (newPassword !== confirmNewPassword) {
            setConfirmNewPasswordError(ChangePasswordMessage.PASSWORD_MISMATCH)
            return
        }
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