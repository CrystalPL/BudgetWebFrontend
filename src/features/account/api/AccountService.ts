import axios from "axios";
import {API_URL, handleRequest, ResponseAPI} from "@/service/ResponseAPI";
import {
    ChangeEmailMessage,
    ChangeNicknameMessage,
    ChangePasswordMessage,
    ConfirmEmailChanging,
    UploadAvatarMessage
} from "@/features/account/api/AccountResponseMessage";
import {AccountInfoResponse, ChangeEmailRequest, ChangePasswordRequest} from "@/features/account/api/AccountModel";

export async function changeNickname(nickname: string): Promise<ResponseAPI<ChangeNicknameMessage>> {
    return handleRequest<typeof ChangeNicknameMessage>("/account/change-nickname", {nickname}, ChangeNicknameMessage);
}

export async function changePassword(changePasswordRequest: ChangePasswordRequest): Promise<ResponseAPI<ChangePasswordMessage>> {
    return handleRequest<typeof ChangePasswordMessage>("/account/change-password", changePasswordRequest, ChangePasswordMessage);
}

export async function changeEmailAddress(changeEmailRequest: ChangeEmailRequest): Promise<ResponseAPI<ChangeEmailMessage>> {
    return handleRequest<typeof ChangeEmailMessage>("/account/change-email", changeEmailRequest, ChangeEmailMessage);
}

export async function getAccountInfo(): Promise<AccountInfoResponse> {
    const response = await axios.get<AccountInfoResponse>(API_URL + "/account/info", {withCredentials: true,})

    return response.data
}

export async function confirmEmailChanging(confirmationToken: string): Promise<ResponseAPI<ConfirmEmailChanging>> {
    return handleRequest<typeof ConfirmEmailChanging>("/account/confirm-change-email", {token: confirmationToken}, ConfirmEmailChanging);
}

export async function uploadAvatar(formData: FormData): Promise<ResponseAPI<UploadAvatarMessage>> {
    return handleRequest<typeof UploadAvatarMessage>("/account/avatar", formData, UploadAvatarMessage, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export async function isEmailChangingWaitingToConfirm(): Promise<boolean> {
    const response = await axios.get<{
        emailWaitingToConfirm: boolean
    }>(API_URL + "/account/email-changing-wait-to-confirm", {withCredentials: true,})

    return response.data.emailWaitingToConfirm
}