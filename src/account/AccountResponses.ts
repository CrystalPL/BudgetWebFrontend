export enum UploadAvatarMessage {
    INVALID_FILE_TYPE = "Nieprawidłowy typ pliku. Dozwolone są tylko pliki obrazów.",
    INVALID_FILE_EXTENSION = "Nieprawidłowe rozszerzenie pliku. Dozwolone są tylko rozszerzenia .jpeg, .jpg, .png.",
    FILE_SIZE_EXCEEDED = "Przekroczono maksymalny rozmiar pliku. Proszę przesłać mniejszy plik.",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    FILE_UPLOAD_ERROR = "Wystąpił błąd podczas zapisywania pliku. Spróbuj ponownie.",
    SUCCESS = "Pomyślnie wgrano avatar!"
}

export enum ChangeEmailMessage {
    INVALID_EMAIL = "Niepoprawny format adresu email",
    EMAIL_MISMATCH = "Podane adresy email nie są takie same",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    MISSING_EMAIL = "Podaj adres e-mail",
    MISSING_PASSWORD = "Podaj hasło",
    BAD_CREDENTIALS = "Niepoprawne hasło!",
    EMAIL_ALREADY_EXISTS = "Konto z podanym adresem e-mail już istnieje",
    SUCCESS = "Na podany adres email został wysłany link z potwierdzeniem zmiany adresu email"
}

export enum ChangePasswordMessage {
    MISSING_PASSWORD = "Podaj hasło",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    BAD_CREDENTIALS = "Niepoprawne hasło!",
    SUCCESS = "Hasło zostało zmienione, zaloguj się, aby móc dalej korzystać z serwisu",
    PASSWORD_MISMATCH = "Podane hasła nie są takie same"
}

export enum ChangeNicknameMessage {
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    SUCCESS = "Pomyślnie ustawiono nowy pseudonim",
    TOO_LONG_USERNAME = "Nazwa użytkownika może mieć maksymalnie 64 znaki",
    MISSING_USERNAME = "Podaj nazwę użytkownika"
}

export enum ConfirmEmailChanging {
    INVALID_TOKEN = "Token jest nieprawidłowy.",
    TOKEN_EXPIRED = "Adres email został już zmieniony",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    SUCCESS = "Twój adres e-mail został pomyślnie zmieniony.",
}

export interface AccountInfoResponse {
    nickname: string,
    email: string,
    userId: number
}