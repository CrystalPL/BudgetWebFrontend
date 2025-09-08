export interface ChangeEmailRequest {
    email: string
    confirmEmail: string
    password: string
}

export interface ChangePasswordRequest {
    oldPassword: string
    newPassword: string
    confirmNewPassword: string
}

export interface AccountInfoResponse {
    nickname: string,
    email: string
}