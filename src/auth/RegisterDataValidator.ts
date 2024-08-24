import {PasswordValidationMessage, RegisterMessage} from "./ResponseMessages";

export function validatePassword(password: string): PasswordValidationMessage {
    if (password.length < 8) {
        return PasswordValidationMessage.SHORT_PASSWORD;
    }

    if (password.length > 255) {
        return PasswordValidationMessage.TOO_LONG_PASSWORD;
    }

    if (!/[A-Z]/.test(password)) {
        return PasswordValidationMessage.MISSING_UPPERCASE
    }

    if (!/[a-z]/.test(password)) {
        return PasswordValidationMessage.MISSING_LOWERCASE
    }

    if (!/[0-9]/.test(password)) {
        return PasswordValidationMessage.MISSING_NUMBER
    }

    if (!/[!@#$%^&*]/.test(password)) {
        return PasswordValidationMessage.MISSING_SPECIAL_CHAR
    }

    return PasswordValidationMessage.OK;
}

export function validateUserData(username: string, email: string, confirmEmail: string, password: string, confirmPassword: string): RegisterMessage {
    if (!username) {
        return RegisterMessage.MISSING_USERNAME
    }

    if (!validateLength(username, 64)) {
        return RegisterMessage.TOO_LONG_USERNAME
    }

    if (!email) {
        return RegisterMessage.MISSING_EMAIL
    }

    if (!confirmEmail) {
        return RegisterMessage.MISSING_CONFIRM_EMAIL
    }

    if (email !== confirmEmail) {
        return RegisterMessage.EMAIL_MISMATCH
    }

    if (!validateEmailFormat(email)) {
        return RegisterMessage.INVALID_EMAIL;
    }

    if (!validateLength(email, 255)) {
        return RegisterMessage.TOO_LONG_EMAIL
    }

    if (!password) {
        return RegisterMessage.MISSING_PASSWORD
    }

    if (!confirmPassword) {
        return RegisterMessage.MISSING_CONFIRM_PASSWORD
    }

    if (password !== confirmPassword) {
        return RegisterMessage.PASSWORD_MISMATCH
    }

    return RegisterMessage.SUCCESS;
}

function validateLength(field: string, maxFieldLength: number): boolean {
    return field.length <= maxFieldLength;
}

function validateEmailFormat(email: string): boolean {
    return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
}