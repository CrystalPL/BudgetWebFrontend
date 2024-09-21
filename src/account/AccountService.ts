import axios from "axios";
import {ResponseAPI} from "@/components/share/ResponseAPI";
import {API_URL} from "@/auth/AuthenticationService";
import {
    AccountInfoResponse,
    ChangeEmailMessage,
    ChangeNicknameMessage,
    ChangePasswordMessage,
    UploadAvatarMessage
} from "@/account/AccountResponses";
import {ChangeEmailRequest} from "@/account/ChangeEmailRequest";
import {ChangePasswordRequest} from "@/account/ChangePasswordRequest";

export async function changeNickname(nickname: string): Promise<ResponseAPI<ChangeNicknameMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/account/change-nickname", nickname, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<ChangeNicknameMessage>(false, ChangeNicknameMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<ChangeNicknameMessage>(message, ChangeNicknameMessage[message as keyof typeof ChangeNicknameMessage])
}

export async function changePassword(changePasswordRequest: ChangePasswordRequest): Promise<ResponseAPI<ChangePasswordMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/account/change-password", changePasswordRequest, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<ChangePasswordMessage>(false, ChangePasswordMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<ChangePasswordMessage>(message, ChangePasswordMessage[message as keyof typeof ChangePasswordMessage])
}

export async function changeEmailAddress(changeEmailRequest: ChangeEmailRequest): Promise<ResponseAPI<ChangeEmailMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/account/change-email", changeEmailRequest, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<ChangeEmailMessage>(false, ChangeEmailMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<ChangeEmailMessage>(message, ChangeEmailMessage[message as keyof typeof ChangeEmailMessage])
}

export async function getAccountInfo(): Promise<AccountInfoResponse> {
    const response = await axios.get<AccountInfoResponse>(API_URL + "/account/info", {withCredentials: true,})

    return response.data
}

export async function uploadAvatar(formData: FormData): Promise<ResponseAPI<UploadAvatarMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/account/avatar", formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<UploadAvatarMessage>(false, UploadAvatarMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<UploadAvatarMessage>(message, UploadAvatarMessage[message as keyof typeof UploadAvatarMessage])
}