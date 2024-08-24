import axios from "axios";
import {ResponseAPI} from "@/components/share/ResponseAPI";
import {
    AccountConfirmationMessage,
    AccountConfirmationResendEmailMessage, LoginMessage, PasswordRecoveryMessage,
    PasswordResetMessage, PasswordValidationMessage, RegisterMessage
} from "./ResponseMessages";
import {RegisterRequest} from "./RegisterRequest";

export const API_URL: string = "https://budgetapp.pl/api"
// export const API_URL: string = "http://localhost:8092"

export async function resendEmail(): Promise<ResponseAPI<AccountConfirmationResendEmailMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/auth/resend-email", {}, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<AccountConfirmationResendEmailMessage>(false, AccountConfirmationResendEmailMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<AccountConfirmationResendEmailMessage>(message, AccountConfirmationResendEmailMessage[message as keyof typeof AccountConfirmationResendEmailMessage])
}

export async function confirmRegister(confirmationToken: string): Promise<ResponseAPI<AccountConfirmationMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/auth/confirm", {confirmationToken}, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<AccountConfirmationMessage>(false, AccountConfirmationMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<AccountConfirmationMessage>(message, AccountConfirmationMessage[message as keyof typeof AccountConfirmationMessage])
}

export async function resetPassword(token: string, password: string, confirmPassword: string): Promise<ResponseAPI<any>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/auth/password/reset", {
            token,
            password,
            confirmPassword
        }, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<PasswordResetMessage>(false, PasswordResetMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    if (PasswordResetMessage[message as keyof typeof PasswordResetMessage] !== undefined) {
        return new ResponseAPI<PasswordResetMessage>(message, PasswordResetMessage[message as keyof typeof PasswordResetMessage])
    }

    return new ResponseAPI<PasswordValidationMessage>(message, PasswordValidationMessage[message as keyof typeof PasswordValidationMessage])
}

export async function passwordRecovery(emailToReset: string): Promise<ResponseAPI<PasswordRecoveryMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/auth/password/recovery", {emailToReset}, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<PasswordRecoveryMessage>(false, PasswordRecoveryMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<PasswordRecoveryMessage>(message, PasswordRecoveryMessage[message as keyof typeof PasswordRecoveryMessage])
}

export async function login(email: string, password: string, rememberMe: boolean): Promise<ResponseAPI<LoginMessage>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/auth/login", {
            email,
            password,
            rememberMe
        }, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<LoginMessage>(false, LoginMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message
    }

    return new ResponseAPI<LoginMessage>(message, LoginMessage[message as keyof typeof LoginMessage])
}

export async function register(register: RegisterRequest): Promise<ResponseAPI<any>> {
    let message: string
    try {
        const response = await axios.post(API_URL + "/auth/register", register, {withCredentials: true})
        message = response.data.message
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response?.data) {
            return new ResponseAPI<RegisterMessage>(false, RegisterMessage.UNDEFINED_ERROR)
        }

        message = error.response.data.message;
    }

    if (PasswordValidationMessage[message as keyof typeof PasswordValidationMessage] !== undefined) {
        return new ResponseAPI<PasswordValidationMessage>(message, PasswordValidationMessage[message as keyof typeof PasswordValidationMessage])
    }

    return new ResponseAPI<RegisterMessage>(message, RegisterMessage[message as keyof typeof RegisterMessage])
}