import {CustomFormControl, CustomFormControlProps, StatusController} from "../AccountDetails";
import BasicForm from "./BasicForm";
import * as React from "react";
import {useState} from "react";
import {ChangeNicknameMessage} from "../../AccountResponses";
import {ResponseAPI} from "../../../components/share/ResponseAPI";
import {changeNickname} from "../../AccountService";
import {AccountProps} from "../../../app/(dashboard)/profile/page";

export default function ChangeNicknameForm(form: StatusController & AccountProps) {
    const [nickname, setNickname] = useState('');
    const [nicknameError, setNicknameError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateNickname()
        if (nicknameError !== '') {
            return
        }

        const response: ResponseAPI<ChangeNicknameMessage> = await changeNickname(nickname)
        form.setStatus(response.success ? 'success' : 'error')
        form.setOpenSnackbar(true)
        form.setStatusMessage(response.message)

        if (response.success) {
            form.setAccountInfo({nickname: nickname, email: form.accountInfo!.email})
            setNickname("")
        }
    }

    const validateNickname = () => {
        if (!nickname || nickname.trim() === '') {
            setNicknameError(ChangeNicknameMessage.MISSING_USERNAME)
            return
        }

        if (nickname.length > 64) {
            setNicknameError(ChangeNicknameMessage.TOO_LONG_USERNAME)
            return
        }
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