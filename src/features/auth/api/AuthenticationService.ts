import {API_URL, handlePostRequest, ResponseAPI} from "@/service/ResponseAPI";
import {
    AccountConfirmationMessage,
    AccountConfirmationResendEmailMessage,
    LoginMessage,
    PasswordRecoveryMessage,
    PasswordResetMessage,
    PasswordValidationMessage,
    RegisterMessage
} from "./AuthResponseMessages";
import {RegisterRequest} from "./RegisterRequest";
import axios from "axios";

export async function resendEmail(token: string | null): Promise<ResponseAPI<AccountConfirmationResendEmailMessage>> {
    return handlePostRequest<typeof AccountConfirmationResendEmailMessage>("/auth/resend-email", {registrationToken: token}, AccountConfirmationResendEmailMessage);
}

export async function confirmRegister(confirmationToken: string): Promise<ResponseAPI<AccountConfirmationMessage>> {
    return handlePostRequest<typeof AccountConfirmationMessage>("/auth/confirm", {confirmationToken}, AccountConfirmationMessage);
}

export async function resetPassword(token: string, password: string, confirmPassword: string): Promise<ResponseAPI<any>> {
    return handlePostRequest<typeof PasswordResetMessage>("/auth/password/reset", {
        token,
        password,
        confirmPassword
    }, PasswordResetMessage)
        .then(response => {
            if (PasswordValidationMessage[response.message as keyof typeof PasswordValidationMessage] !== undefined) {
                return new ResponseAPI<PasswordValidationMessage>(response.message, PasswordValidationMessage[response.message as keyof typeof PasswordValidationMessage]);
            }

            return response;
        });
}

export async function passwordRecovery(emailToReset: string): Promise<ResponseAPI<PasswordRecoveryMessage>> {
    return handlePostRequest<typeof PasswordRecoveryMessage>("/auth/password/recovery", {emailToReset}, PasswordRecoveryMessage);
}

export interface RegistrationToken {
    registrationToken: string;
}

export async function login(email: string, password: string, rememberMe: boolean): Promise<ResponseAPI<LoginMessage, RegistrationToken>> {
    return handlePostRequest<typeof LoginMessage, RegistrationToken>("/auth/login", {
        email,
        password,
        rememberMe
    }, LoginMessage);
}

export async function register(registerRequest: RegisterRequest): Promise<ResponseAPI<any>> {
    return handlePostRequest<typeof RegisterMessage>("/auth/register", registerRequest, RegisterMessage)
        .then(response => {
            if (PasswordValidationMessage[response.message as keyof typeof PasswordValidationMessage] !== undefined) {
                return new ResponseAPI<PasswordValidationMessage>(response.message, PasswordValidationMessage[response.message as keyof typeof PasswordValidationMessage]);
            }

            return response;
        });
}

export async function logout() {
    try {
        await axios.post(API_URL + "/auth/logout", {}, {withCredentials: true})
    } catch (error) {

    }
}