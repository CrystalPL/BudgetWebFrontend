export enum MakeRoleDefaultMessage {
    ROLE_NOT_FOUND = "Rola nie została znaleziona.",
    NOT_YOUR_HOUSEHOLD = "Nie masz dostępu do tej grupy domowej.",
    ROLE_ALREADY_DEFAULT = "Ta rola jest już domyślną.",
    OWNER_ROLE_CANNOT_DEFAULT = "Roli właściciela nie można ustawić jako domyślnej.",
    NO_PERMISSION = "Nie masz uprawnień do ustawienia domyślnej roli.",
    SUCCESS = "Pomyślnie ustawiono rolę jako domyślną."
}

export enum DeleteRoleMessage {
    ROLE_NOT_FOUND = "Nie znaleziono roli.",
    NOT_YOUR_HOUSEHOLD = "Nie masz uprawnień do tej roli.",
    CANNOT_DELETE_OWNER_ROLE = "Nie można usunąć roli właściciela.",
    CANNOT_DELETE_DEFAULT_ROLE = "Nie można usunąć domyślnej roli.",
    NO_PERMISSION = "Nie masz uprawnień do usunięcia roli.",
    SUCCESS = "Pomyślnie usunięto rolę."
}

export enum EditRoleMessage {
    SUCCESS = "Rola została pomyślnie zaktualizowana.",
    NOT_YOUR_HOUSEHOLD = "Nie masz uprawnień do edycji ról w tym gospodarstwie domowym.",
    ROLE_NAME_EXISTS = "Rola o podanej nazwie już istnieje.",
    ROLE_NOT_FOUND = "Nie znaleziono roli do edycji.",
    NO_PERMISSION = "Nie masz uprawnień do edytowania tej roli."
}

export enum CreateRoleMessages {
    ROLE_EXISTS = "Rola o tej nazwie już istnieje.",
    NO_PERMISSION = "Nie masz uprawnień do tworzenia nowych ról.",
    SUCCESS = "Pomyślnie utworzono rolę."
}

export enum GetRolePermissionMessages {
    NO_PERMISSION = "Nie masz uprawnień do podglądania uprawnień ról.",
    SUCCESS = "",
    ERROR_NUMBER_FORMAT = "Nieprawidłowy format identyfikatora roli.",
    NOT_YOUR_HOUSEHOLD = "Nie masz dostępu do tej grupy domowej.",
    MISSING_ROLE_ID = "Brakuje identyfikatora roli.",
    ROLE_NOT_FOUND = "Rola nie została znaleziona."
}