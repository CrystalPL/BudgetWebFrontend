export enum DeleteReceiptMessage {

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
}