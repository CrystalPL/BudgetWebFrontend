import {ReceiptItem, UserWhoPaid} from "@/features/receipts/api/ReceiptModel";

export interface UserDebt {
    user: UserWhoPaid;
    totalDebt: number;
    items: ReceiptItem[];
}