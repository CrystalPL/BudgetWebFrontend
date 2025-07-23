export interface Category {
    id: number
    name: string
}

export interface Receipt {
    id: number;
    shop: string;
    shoppingTime: Date
    receiptAmount: number
    whoPaid: UserWhoPaid
    settled: boolean
}

export interface ReceiptItem {
    id: number
    productName: string;
    quantity: number;
    price: number;
    category: Category
    moneyDividing: number;
    userToReturnMoney: UserWhoPaid | null
}

export interface AIReceipt {
    shop: string | null;
    shoppingTime: Date | null
    items: AIReceiptItem[]
}

export interface AIReceiptItem {
    productName: string | null;
    quantity: number | null;
    price: number | null;
    category: Category | null
}

export interface UserWhoPaid {
    userId: number,
    userName: string,
}

export interface ShopOccurrence {
    shopName: string,
    occurrence: number
}

export interface CreateReceiptDetails {
    whoPaidLists: UserWhoPaid[]
    shopOccurrences: ShopOccurrence[]
}

export interface GetProductListResponse {
    name: string
}

export interface SuggestCategoryResponse {
    categoryId: number
}

export interface ReceiptCreateRequest {
    receiptId: number
    shopName: string
    whoPaidId: number
    date: Date | null
    isSettled: boolean
}

export interface ReceiptItemCreateRequest {
    receiptItemId: number
    productName: string
    quantity: number
    price: number
    categoryId: number
    moneyDividing: number | null
    userToReturnMoneyId: number | null;
}

export interface SaveReceiptRequest {
    receiptDetails: ReceiptCreateRequest
    itemsDataList: ReceiptItemCreateRequest[]
}