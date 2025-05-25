import {PasswordValidationMessage} from "../api/AuthResponseMessages";

export function validatePassword(password: string): PasswordValidationMessage {
    if (password.length < 8) {
        return PasswordValidationMessage.PASSWORD_TOO_SHORT;
    }

    if (password.length > 255) {
        return PasswordValidationMessage.PASSWORD_TOO_LONG;
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

export function validateLength(field: string, maxFieldLength: number): boolean {
    return field.length <= maxFieldLength;
}

export function validateEmailFormat(email: string): boolean {
    return /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/.test(email);
}