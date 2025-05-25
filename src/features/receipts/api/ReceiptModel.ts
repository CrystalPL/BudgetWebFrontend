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