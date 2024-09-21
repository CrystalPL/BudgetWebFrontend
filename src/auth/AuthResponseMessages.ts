export enum AccountConfirmationMessage {
    INVALID_TOKEN = "Token jest nieprawidłowy.",
    TOKEN_EXPIRED = "Konto zostało już aktywowane.",
    SUCCESS = "Twoje konto zostało pomyślnie aktywowane. Jeśli byłeś zalogowany, możesz teraz przejść do serwisu, w przeciwnym wypadku prosimy się zalogować.",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd"
}

export enum AccountConfirmationResendEmailMessage {
    ACCOUNT_CONFIRMED = "Rejestracja konta jest już potwierdzona.",
    SUCCESS = "Email z linkiem aktywacyjnym został wysłany.",
    TOKEN_EXPIRED = "Czas na potwierdzenie założenia konta minął, załóż ponownie konto.",
    UNDEFINED_ERROR = "Brak odpowiedzi z serwera."
}

export enum PasswordResetMessage {
    INVALID_TOKEN = "Niepoprawny token resetowania hasła",
    SUCCESS = "Hasło zostało pomyślnie zresetowane, możesz teraz się zalogować.",
    TOKEN_EXPIRED = "Hasło zostało już zresetowane",
    PASSWORD_MISMATCH = "Podane hasła do siebie nie pasują.",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd"
}

export enum PasswordValidationMessage {
    SHORT_PASSWORD = "Hasło musi mieć co najmniej 8 znaków",
    TOO_LONG_PASSWORD = "Hasło może mieć maksymalnie 255 znaków",
    MISSING_UPPERCASE = "Hasło musi zawierać przynajmniej jedną wielką literę",
    MISSING_LOWERCASE = "Hasło musi zawierać przynajmniej jedną małą literę",
    MISSING_NUMBER = "Hasło musi zawierać przynajmniej jedną cyfrę",
    MISSING_SPECIAL_CHAR = "Hasło musi zawierać przynajmniej jeden znak specjalny",
    OK = ""
}

export enum PasswordRecoveryMessage {
    USER_NOT_FOUND = "Nie odnaleziono użytkownika o podanym adresie email.",
    SUCCESS = "Email z linikiem do resetowania hasła został wysłany.",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd"
}

export enum LoginMessage {
    ACCOUNT_NOT_CONFIRMED = "Konto nie zostało aktywowane. Potwierdź założenie konta klikając w link aktywacyjny wysyłany na adres e-mail podany podczas rejestracji.",
    SUCCESS = "Zalogowano",
    BAD_CREDENTIALS = "Niepoprawne hasło!",
    USER_NOT_EXIST = "Nie odnaleziono użytkownika z takim adresem e-mail!",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd"
}

export enum RegisterMessage {
    MISSING_USERNAME = "Podaj nazwę użytkownika",
    TOO_LONG_USERNAME = "Nazwa użytkownika może mieć maksymalnie 64 znaki",
    MISSING_EMAIL = "Podaj adres e-mail",
    INVALID_EMAIL = "Niepoprawny format adresu email",
    TOO_LONG_EMAIL = "Adres email może mieć maksymalnie 255 znaków",
    MISSING_CONFIRM_EMAIL = "Powtórz adres e-mail",
    EMAIL_MISMATCH = "Podane adresy email nie są takie same",
    MISSING_PASSWORD = "Podaj hasło",
    MISSING_CONFIRM_PASSWORD = "Powtórz hasło",
    PASSWORD_MISMATCH = "Podane hasła nie są takie same",
    ACCOUNT_NOT_ENABLED = "Konto o podanym adresie e-mail już istnieje, ale nie zostało aktywowane.",
    ACCOUNT_EXISTS = "Konto o podanym adresie e-mail już istnieje.",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    SUCCESS = "Zarejestrowano"
}
