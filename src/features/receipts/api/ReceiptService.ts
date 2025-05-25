import {API_URL, handleDeleteRequest} from "@/service/ResponseAPI";
import axios from "axios";
import {
    Category,
    CreateReceiptDetails,
    GetProductListResponse,
    Receipt,
    ReceiptItem,
    SuggestCategoryResponse
} from "@/features/receipts/api/ReceiptModel";
import {DeleteReceiptMessage} from "@/features/receipts/api/ReceiptMessages";

export async function getReceipts(cookie?: string) {
    const response = await axios.get<Receipt[]>(API_URL + "/receipts", {
        withCredentials: true,
        headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
    })

    return response.data
}

export async function getCreateReceiptDetails() {
    const response = await axios.get<CreateReceiptDetails>(API_URL + "/receipts/getCreateDetails", {withCredentials: true,})

    return response.data
}

export async function getProductListResponse() {
    const response = await axios.get<GetProductListResponse[]>(API_URL + "/receipts/getProductList", {withCredentials: true,})

    return response.data
}

export async function deleteReceipt(receiptId: number | undefined) {
    return handleDeleteRequest<typeof DeleteReceiptMessage>(`/household/receipts/${receiptId}`, {}, DeleteReceiptMessage);
}

export async function suggestCategory(productName: string) {
    const response = await axios.get<SuggestCategoryResponse>(API_URL + `/receipts/suggestCategory/${productName}`, {withCredentials: true,})

    return response.data
}

export async function getCategories() {
    const response = await axios.get<Category[]>(API_URL + "/categories", {withCredentials: true,})

    return response.data
}

export async function getReceiptItems(receiptId: number) {
    const response = await axios.get<ReceiptItem[]>(API_URL + `/receipts/items/${receiptId}`, {withCredentials: true,})

    return response.data
}

