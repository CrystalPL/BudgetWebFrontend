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