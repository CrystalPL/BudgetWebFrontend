export enum EditCategoryResponseMessage {
    NOT_YOUR_HOUSEHOLD = "Nie masz uprawnień do edycji tej kategorii (nie należy do Twojego gospodarstwa domowego).",
    CATEGORY_EXISTS = "Kategoria o takiej nazwie już istnieje.",
    SUCCESS = "Kategoria została pomyślnie zaktualizowana.",
    CATEGORY_NOT_FOUND = "Nie znaleziono podanej kategorii.",
    NO_PERMISSION = "Brak uprawnień do edytowania kategorii."
}

export enum CreateCategoryResponseMessage {
    SUCCESS = "Kategoria została pomyślnie utworzona.",
    CATEGORY_EXISTS = "Kategoria o takiej nazwie już istnieje.",
    NO_PERMISSION = "Brak uprawnień do tworzenia kategorii."
}

export enum DeleteCategoryResponseMessage {
    ERROR_NUMBER_FORMAT = "Nieprawidłowy format ID kategorii.",
    CATEGORY_NOT_FOUND = "Nie znaleziono podanej kategorii.",
    NOT_YOUR_HOUSEHOLD = "Nie masz uprawnień do usunięcia tej kategorii (nie należy do Twojego gospodarstwa domowego).",
    SUCCESS = "Kategoria została pomyślnie usunięta.",
    MISSING_CATEGORY_ID = "Brak ID kategorii.",
    NO_PERMISSION = "Brak uprawnień do usunięcia kategorii."
}