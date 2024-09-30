import {CustomFormControl, CustomFormControlProps, StatusController} from "../AccountDetails";
import BasicForm from "./BasicForm";
import * as React from "react";
import {useState} from "react";
import {ChangeNicknameMessage} from "../../AccountResponses";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {changeNickname} from "../../AccountService";
import {AvatarContextType, useAvatarContext} from "../../../components/AccountHeaderInfo";

export default function ChangeNicknameForm(form: StatusController) {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');
    const avatarContext: AvatarContextType = useAvatarContext();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateNickname()
        setNicknameError(validationError)
        if (validationError !== '') {
            return
        }

        const response: ResponseAPI<ChangeNicknameMessage> = await changeNickname(nickname)
        form.setStatus(response.success ? 'success' : 'error')
        form.setOpenSnackbar(true)
        form.setStatusMessage(response.message)

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