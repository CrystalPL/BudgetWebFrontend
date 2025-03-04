import BasicForm from "./BasicForm";
import * as React from "react";
import {useState} from "react";
import {ChangeNicknameMessage} from "../../api/AccountResponseMessage";
import {ResponseAPI} from "../../../../service/ResponseAPI";
import {changeNickname} from "../../api/AccountService";
import {useAvatarContext} from "../../../../context/AccountHeaderInfo";
import {CustomFormControl, CustomFormControlProps} from "../../../../components/CustomFormControl";
import {useSnackbarContext} from "../../../../context/SnackbarContext";

export default function ChangeNicknameForm() {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const avatarContext = useAvatarContext();
    const snackbarController = useSnackbarContext()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateNickname()
        setNicknameError(validationError)
        if (validationError !== '') {
            return
        }

        const response: ResponseAPI<ChangeNicknameMessage> = await changeNickname(nickname)
        snackbarController.setStatus(response.success ? 'success' : 'error')
        snackbarController.setOpenSnackbar(true)
        snackbarController.setStatusMessage(response.message)

        if (response.success) {
            avatarContext.setAccountInfo({nickname: nickname, email: avatarContext.accountInfo!.email})
            setNickname("")
        }
    }

    const validateNickname = () => {
        if (!nickname || nickname.trim() === '') {
            return ChangeNicknameMessage.MISSING_USERNAME
        }

        if (nickname.length > 64) {
            return ChangeNicknameMessage.TOO_LONG_USERNAME
        }

        return ""
    }

    const nicknameFieldProps: CustomFormControlProps = {
        valueState: [nickname, setNickname],
        errorState: [nicknameError, setNicknameError],
        label: 'Nowy nickname',
        name: 'newNickname',
        validateFunction: validateNickname
    };

    return <BasicForm title="Zmiana pseudonimu" onSubmit={handleSubmit}>
        <CustomFormControl {...nicknameFieldProps}></CustomFormControl>
    </BasicForm>
}