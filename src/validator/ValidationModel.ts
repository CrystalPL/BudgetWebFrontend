export interface PasswordValidationConstraints {
    passwordMinLength: number;
    passwordMaxLength: number;
    uppercaseRegex: string;
    lowercaseRegex: string;
    numberRegex: string;
    specialCharacters: string;
}

export interface EmailValidationConstraints {
    emailMaxLength: number;
    emailRegex: string;
}

export interface UsernameValidationConstraints {
    usernameMaxLength: number;
}

export interface HouseholdValidationConstraints {
    householdNameMaxLength: number;
    householdNameMinLength: number;
}

export interface CategoryValidationConstraints {
    categoryNameMaxLength: number;
    categoryNameMinLength: number;
    colorFormatRegex: string;
}

export interface ReceiptValidationConstraints {
    shopNameMaxLength: number;
    shopNameMinLength: number;
}

export interface ReceiptItemValidationConstraints {
    productNameMaxLength: number;
    productNameMinLength: number;
}

export interface SignInValidationConstraints {
    email: EmailValidationConstraints;
}

export interface SignUpValidationConstraints {
    email: EmailValidationConstraints;
    password: PasswordValidationConstraints;
    username: UsernameValidationConstraints;
}

export interface PasswordResetValidationConstraints {
    password: PasswordValidationConstraints;
}

export interface CreateHouseholdValidationConstraints {
    household: HouseholdValidationConstraints;
}

export interface CreateCategoryValidationConstraints {
    category: CategoryValidationConstraints;
}

export interface CreateReceiptValidationConstraints {
    receipt: ReceiptValidationConstraints;
}

export interface CreateReceiptItemValidationConstraints {
    receiptItem: ReceiptItemValidationConstraints;
}

export type ValidationEntityType =
    'EMAIL'
    | 'PASSWORD'
    | 'USERNAME'
    | 'HOUSEHOLD'
    | 'CATEGORY'
    | 'RECEIPT'
    | 'RECEIPT_ITEM';