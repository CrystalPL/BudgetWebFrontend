export enum CreateHouseholdMessage {
    NAME_TOO_LONG = "Nazwa gospodarstwa może zawierać maksymalnie 64 znaki",
    NAME_TOO_SHORT = "Nazwa gospodarstwa musi zawierać minimalnie 2 znaki",
    NAME_NOT_EXISTS = "Podaj nazwe gospodarstwa",
    USER_IS_ALREADY_OWNER = "Jesteś już włascicielem gospodarstwa!",
    USER_IS_MEMBER = "Jesteś już członkiem gospodarstwa!",
    SUCCESS = "Pomyślnie utworzono gospodarstwo domowe!"
}

export enum InviteUserToHousehold {
    MISSING_EMAIL = "Podaj adres email",
    INVALID_EMAIL = "Niepoprawny format adresu email",
    EMAIL_TOO_LONG = "Adres email może mieć maksymalnie 255 znaków",
    NO_PERMISSION = "Nie masz uprawnień do zapraszania użytkowników do gospodarstwa domowego!",
    USER_ALREADY_INVITE = "Użytkownik został już zaproszony",
    USER_NOT_FOUND = "Nie odnaleziono użytkownika z takim adresem email",
    USER_ALREADY_HAS_HOUSEHOLD = "Użytkownik jest już w gospodarstwie",
    SUCCESS = "Pomyślnie zaproszono użytkownika"
}

export enum UndoInvitationMessage {
    SUCCESS = "Pomyślnie cofnięto zaproszenie!",
    NO_PERMISSION = "Nie masz uprawnień do wycofywania zaproszeń",
    MISSING_MEMBER_ID = "Błąd strony: Nie podano id użytkownika",
    ERROR_NUMBER_FORMAT = "Błąd strony: Nieprawidłowe id użytkownika",
    INVITATION_NOT_FOUND = "Nie znaleziono użytkownika"
}

export enum ChangeUserRoleMessage {
    SUCCESS = "Pomyślnie zmieniono role użytkownika",
    NO_PERMISSION = "Nie masz uprawnień do zmiany roli",
    MISSING_MEMBER_ID = "Nie odnaleziono id użytkownika",
    MISSING_ROLE_ID = "Nie odnaleziono id roli",
    ERROR_NUMBER_FORMAT = "Błąd strony: Nieprawidłowe id użytkownika lub roli",
    UNDEFINED_ERROR = "Wystąpił nieoczekiwany błąd",
    USER_NOT_FOUND = "Taki użytkownik nie istnieje",
    DIFFERENT_HOUSEHOLD = "Użytkownik nie jest w twoim gospodarstwie",
    ROLE_NOT_FOUND = "Taka rola nie istnieje",
    SET_OWNER_ROLE_ERROR = "Nie można ustawiać roli właścicielskiej",
    CHANGE_OWNER_ROLE = "Nie możesz zmienić roli właściciela gospodarstwa"
}

export enum DeleteUserMessage {
    SUCCESS = "Pomyślnie usunięto użytkownika",
    NO_PERMISSION = "Nie masz uprawnień do usuwania użytkowników",
    MISSING_MEMBER_ID = "Błąd strony: Nie podano id użytkownika",
    ERROR_NUMBER_FORMAT = "Błąd strony: Nieprawidłowe id użytkownika",
    DIFFERENT_HOUSEHOLD = "Użytkownik nie znajduje się w twoim gospodarstwie",
    YOURSELF_DELETE = "Nie możesz usunąć samego siebie",
    USER_IS_OWNER = "Nie możesz usunąć właściciela gospodarstwa"
}

export enum ChangeHouseholdNameMessage {
    SUCCESS = "Pomyślnie zmieniono nazwę gospodarstwa",
    NO_PERMISSION = "Nie masz uprawnień do zmiany nazwy gospodarstwa",
}

export enum DeleteHouseholdMessage {
    SUCCESS = "Pomyślnie usunięto gospodarstwo",
    NO_PERMISSION = "Nie masz uprawnień do usuwania gospodarstwa",
}

export enum LeaveHouseholdMessage {
    SUCCESS = "Pomyślnie opuszczono gospodarstwo",
    HOUSEHOLD_NOT_FOUND = "Nie odnaleziono gospodarstwa",
    ONE_MEMBER_IN_HOUSEHOLD = "Nie możesz opuścić jednoosobowego gospodarstwa, użyj opcji usuń gospodarstwo",
}

export enum TransferOwnerMessage {
    SUCCESS = "Pomyślnie ustawiono nowego właściciela gospodarstwa",
    NO_OWNER = "Nie jesteś właścicielem gospodarstwa",
    YOURSELF_TRANSFER = "Nie możesz przekazać sobie gospodarstwa",
    USER_NOT_FOUND = "Użytkownik nie jest w twoim gospodarstwie!"
}