import {API_URL, handleDeleteRequest, handlePatchRequest, handlePostRequest} from "@/service/ResponseAPI";
import axios from "axios";
import {EditCategoryRequest, GetCategoryResponse} from "@/features/categories/api/CategoryModel";
import {
    CreateCategoryResponseMessage,
    DeleteCategoryResponseMessage,
    EditCategoryResponseMessage
} from "@/features/categories/api/CategoryMessages";

export async function getCategories(cookie?: string) {
    const response = await axios.get<GetCategoryResponse[]>(API_URL + "/categories", {
        withCredentials: true,
        headers: cookie ? {Cookie: `auth_token=${cookie}`} : {}
    })

    return response.data
}

export async function editCategory(request: EditCategoryRequest) {
    return handlePatchRequest<typeof EditCategoryResponseMessage>("/categories/edit", request, EditCategoryResponseMessage);
}

export async function createCategory(name: string, color: string) {
    return handlePostRequest<typeof CreateCategoryResponseMessage>("/categories/create", {
        name,
        color
    }, CreateCategoryResponseMessage);
}

export async function deleteCategory(categoryId: number | undefined) {
    return handleDeleteRequest<typeof DeleteCategoryResponseMessage>(`/categories/delete/${categoryId}`, {}, DeleteCategoryResponseMessage);
}