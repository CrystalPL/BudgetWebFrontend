export interface Category {
    id: number;
    name: string
    color: string
}

export interface GetCategoryResponse {
    id: number,
    name: string,
    color: string
}

export interface EditCategoryRequest {
    categoryId: number;
    name: string;
    color: string
}
