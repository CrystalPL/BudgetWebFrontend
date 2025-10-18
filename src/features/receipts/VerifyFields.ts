import {CreateReceiptItemMessage} from "@/features/receipts/api/ReceiptMessages";
import {ReceiptItem} from "@/features/receipts/api/ReceiptModel";
import {ReceiptItemValidationConstraints} from "@/validator/ValidationModel";

export function verifyFields(validationConstraints: ReceiptItemValidationConstraints, receiptItem: ReceiptItem): string {
    if (receiptItem.productName === '') {
        return CreateReceiptItemMessage.PRODUCT_NAME_EMPTY;
    } else if (receiptItem.productName.length <= validationConstraints.productNameMinLength) {
        return CreateReceiptItemMessage.PRODUCT_NAME_TOO_SHORT;
    } else if (receiptItem.productName.length > validationConstraints.productNameMaxLength) {
        return CreateReceiptItemMessage.PRODUCT_NAME_TOO_LONG;
    }

    if (receiptItem.quantity < 0) {
        return CreateReceiptItemMessage.AMOUNT_NEGATIVE;
    }

    if (receiptItem.price < 0) {
        return CreateReceiptItemMessage.PRICE_NEGATIVE;
    }

    if (receiptItem.category === null) {
        return CreateReceiptItemMessage.EMPTY_CATEGORY;
    }

    if (typeof receiptItem.moneyDividing === 'string') {
        const dividingNumberValue = Number((receiptItem.moneyDividing as string).replace("%", ""));
        if (isNaN(dividingNumberValue)) {
            return CreateReceiptItemMessage.INVALID_DIVIDING;
        } else if (dividingNumberValue > 100) {
            return CreateReceiptItemMessage.DIVIDING_TOO_HIGH;
        } else if (dividingNumberValue <= 0) {
            return CreateReceiptItemMessage.DIVIDING_TOO_LOW;
        }
    }

    if (receiptItem.moneyDividing && receiptItem.userToReturnMoney === null) {
        return CreateReceiptItemMessage.WHO_RETURN_EMPTY;
    }

    if (receiptItem.moneyDividing === null && receiptItem.userToReturnMoney !== null) {
        return CreateReceiptItemMessage.DIVIDING_EMPTY;
    }

    return "";
}