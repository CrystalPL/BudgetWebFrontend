import {handleRequest, ResponseAPI} from "@/components/share/ResponseAPI";
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

export async function resendEmail(): Promise<ResponseAPI<AccountConfirmationResendEmailMessage>> {
    return handleRequest<typeof AccountConfirmationResendEmailMessage>("/auth/resend-email", {}, AccountConfirmationResendEmailMessage);
}

export async function confirmRegister(confirmationToken: string): Promise<ResponseAPI<AccountConfirmationMessage>> {
    return handleRequest<typeof AccountConfirmationMessage>("/auth/confirm", {confirmationToken}, AccountConfirmationMessage);
}

export async function resetPassword(token: string, password: string, confirmPassword: string): Promise<ResponseAPI<any>> {
    return handleRequest<typeof PasswordResetMessage>("/auth/password/reset", {
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
    return handleRequest<typeof PasswordRecoveryMessage>("/auth/password/recovery", {emailToReset}, PasswordRecoveryMessage);
}

export async function login(email: string, password: string, rememberMe: boolean): Promise<ResponseAPI<LoginMessage>> {
    return handleRequest<typeof LoginMessage>("/auth/login", {email, password, rememberMe}, LoginMessage);
}

export async function register(registerRequest: RegisterRequest): Promise<ResponseAPI<any>> {
    return handleRequest<typeof RegisterMessage>("/auth/register", registerRequest, RegisterMessage)
        .then(response => {
            if (PasswordValidationMessage[response.message as keyof typeof PasswordValidationMessage] !== undefined) {
                return new ResponseAPI<PasswordValidationMessage>(response.message, PasswordValidationMessage[response.message as keyof typeof PasswordValidationMessage]);
            }

            return response;
        });
}