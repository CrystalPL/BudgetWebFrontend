export enum CreateAdvancedFilterMessage {
    EMPTY_FILTER_NAME = "Podaj nazwę filtra",
    EMPTY_DESCRIPTION = "Podaj opis",
    FILTER_NAME_EXISTS = "Filter o takiej nazwie już istnieje"
}

export enum ActivateFilterMessage {
    FILTER_NOT_EXISTS = "Nie znaleziono filtra",
    SUCCESS = "Filtr aktywowany"
}

export enum SaveFilterMessage {
    FILTER_NOT_EXISTS = "Nie znaleziono filtra",
    SUCCESS_UPDATE = "Filtr zaktualizowany",
    SUCCESS_CREATE = "Filtr utworzony"
}

export enum DeleteFilterMessage {
    FILTER_NOT_EXISTS = "Nie znaleziono filtra",
    SUCCESS = "Filtr usunięty"
}

export enum DuplicateFilterMessage {
    FILTER_NOT_EXISTS = "Nie znaleziono filtra",
    SUCCESS = "Utworzono nowy filtr"
}

export enum SaveFilterConditionMessage {
    FILTER_NOT_EXISTS = "Nie znaleziono filtra",
    FIRST_GROUP_CAN_NOT_HAVE_OPERATOR = "Pierwsza grupa nie może posiadać operatora",
    GROUP_NOT_HAVE_OPERATOR_BEFORE = "Grupa musi być poprzedzona operatorem",
    INVALID_FIELD_NAME = "Nieprawidłowa nazwa pola",
    INVALID_FIRST_VALUE = "Nieprawidłowa pierwsza wartość",
    INVALID_SECOND_VALUE = "Nieprawidłowa druga wartość",
    OPERATOR_NOT_BETWEEN_WHEN_SECOND_VALUE_SET = "Operator musi być typu 'pomiędzy', gdy ustawiona jest druga wartość",
    MISMATCH_OPEN_CLOSED_PARENTHESIS_NUMBER = "Niezgodna liczba nawiasów otwierających i zamykających",
    UNNECESSARY_PARENTHESES = "Wykryto zbędne nawiasy",
    OPERATOR_NOT_AVAILABLE_FOR_FIELD = "Operator nie jest dostępny dla wybranego pola",
    FIRST_CONDITION_CAN_NOT_HAVE_OPERATOR = "Pierwszy warunek nie może posiadać operatora",
    CONDITION_NOT_HAVE_OPERATOR_BEFORE = "Warunek musi być poprzedzony operatorem",
    SUCCESS = "Warunki filtra zostały zapisane"
}