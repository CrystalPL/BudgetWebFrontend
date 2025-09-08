export enum DeleteReceiptMessage {
    MISSING_RECEIPT_ID = "Brak identyfikatora paragonu",
    ERROR_NUMBER_FORMAT = "Nieprawidłowy format identyfikatora paragonu",
    RECEIPT_NOT_FOUND = "Nie znaleziono paragonu",
    USER_NOT_FOUND_IN_HOUSEHOLD = "Użytkownik nie należy do gospodarstwa domowego",
    SUCCESS = "Paragon został pomyślnie usunięty"
}

export enum CreateReceiptDetailMessage {
    SHOP_NAME_TOO_LONG = "Nazwa sklepu musi być krótsza niż 64 znaki",
    SHOP_NAME_TOO_SHORT = "Nazwa sklepu musi być dłuższe niż 1 znak",
    SHOP_NAME_EMPTY = "Podaj nazwę sklepu",

    WHO_PAID_EMPTY = "Kto zapłacił za paragon?",
    DATE_EMPTY = "Podaj datę",
}

export enum CreateReceiptItemMessage {
    PRODUCT_NAME_TOO_LONG = "Nazwa musi być krótsza niż 64 znaki",
    PRODUCT_NAME_TOO_SHORT = "Nazwa musi być dłuższe niż 1 znak",
    PRODUCT_NAME_EMPTY = "Podaj nazwę",

    PRICE_EMPTY = "Podaj cenę",
    PRICE_INVALID = "Cena musi być liczbą",
    PRICE_NEGATIVE = "Cena nie może być ujemna",

    AMOUNT_EMPTY = "Podaj ilość",
    AMOUNT_INVALID = "Ilość musi być liczbą",
    AMOUNT_NEGATIVE = "Ilość nie może być ujemna",

    EMPTY_CATEGORY = "Wybierz kategorię",

    INVALID_DIVIDING = "Podaj wartość procentową",
    DIVIDING_TOO_HIGH = "Wartość procentowa nie może być większa niż 100",
    DIVIDING_TOO_LOW = "Wartość procentowa nie może być mniejsza niż 0",
    WHO_RETURN_EMPTY = "Wybierz osobę, której należy się zwrot",
    DIVIDING_EMPTY = "Podaj wartość procentową",
}

export enum SaveReceiptMessage {
    // komunikaty dla szczegółów paragonu
    MISSING_RECEIPT_ID = "Brak identyfikatora paragonu",
    INVALID_CATEGORY_ID = "Nieprawidłowy identyfikator kategorii",
    MISSING_NAME = "Brak nazwy",
    NAME_TOO_SHORT = "Nazwa musi być dłuższa niż 1 znak",
    NAME_TOO_LONG = "Nazwa musi być krótsza niż 64 znaki",
    MISSING_WHO_PAID_ID = "Brak identyfikatora osoby płacącej",
    INVALID_WHO_PAID_ID = "Nieprawidłowy identyfikator osoby płacącej",
    MISSING_DATE = "Brak daty",
    MISSING_SETTLED = "Nie określono statusu rozliczenia",

    // komunikaty dla pozycji paragonu
    INVALID_NUMBER_FORMAT = "Nieprawidłowy format liczby",
    MISSING_RECEIPT_ITEM_ID = "Brak identyfikatora pozycji paragonu",
    INVALID_RECEIPT_ITEM_ID = "Nieprawidłowy identyfikator pozycji paragonu",
    MISSING_QUANTITY = "Brak ilości",
    INVALID_QUANTITY = "Nieprawidłowa ilość",
    MISSING_PRICE = "Brak ceny",
    INVALID_PRICE = "Nieprawidłowa cena",
    MISSING_CATEGORY_ID = "Brak kategorii",

    // komunikaty odpowiedzi
    SUCCESS = "Paragon został pomyślnie zapisany",
    CATEGORY_NOT_FOUND = "Nie znaleziono kategorii",
    REQUESTER_HOUSEHOLD_NOT_FOUND = "Nie znaleziono gospodarstwa domowego",
    USER_NOT_FOUND_IN_HOUSEHOLD = "Użytkownik nie należy do gospodarstwa domowego",
    USER_NOT_FOUND = "Nie znaleziono użytkownika"
}

export interface SaveReceiptAdditionalMessage {
    additionalMessage: string
}