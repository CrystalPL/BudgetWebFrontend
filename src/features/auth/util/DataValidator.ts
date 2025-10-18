import {PasswordValidationMessage} from "../api/AuthResponseMessages";
import {EmailValidationConstraints, PasswordValidationConstraints} from "@/validator/ValidationModel";

export function validatePassword(passwordConstraints: PasswordValidationConstraints, password: string): PasswordValidationMessage {
    if (password.length < passwordConstraints.passwordMinLength) {
        return PasswordValidationMessage.PASSWORD_TOO_SHORT;
    }

    if (password.length > passwordConstraints.passwordMaxLength) {
        return PasswordValidationMessage.PASSWORD_TOO_LONG;
    }

    const upperCaseRegex = new RegExp(passwordConstraints.uppercaseRegex);
    if (!upperCaseRegex.test(password)) {
        return PasswordValidationMessage.MISSING_UPPERCASE
    }

    const lowerCaseRegex = new RegExp(passwordConstraints.lowercaseRegex);
    if (!lowerCaseRegex.test(password)) {
        return PasswordValidationMessage.MISSING_LOWERCASE
    }

    const numberRegex = new RegExp(passwordConstraints.numberRegex);
    if (!numberRegex.test(password)) {
        return PasswordValidationMessage.MISSING_NUMBER
    }

    const specialCharRegex = new RegExp(passwordConstraints.specialCharacters);
    if (!specialCharRegex.test(password)) {
        return PasswordValidationMessage.MISSING_SPECIAL_CHAR
    }

    return PasswordValidationMessage.OK;
}

export function validateLength(field: string, maxFieldLength: number): boolean {
    return field.length <= maxFieldLength;
}

export function validateEmailFormat(emailConstraints: EmailValidationConstraints, email: string): boolean {
    const emailRegexPattern = new RegExp(emailConstraints.emailRegex);
    if (email.length > emailConstraints.emailMaxLength) {
        return false;
    }

    return emailRegexPattern.test(email);
}