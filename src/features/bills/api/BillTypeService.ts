import {ResponseAPI} from "../../../service/ResponseAPI";

export interface CreateBillTypeRequest {
    name: string;
    icon: string;
    unit?: string;
    description?: string;
}

export interface UpdateBillTypeRequest extends CreateBillTypeRequest {
    id: number;
}

const BASE_URL = '/api/bill-types';

export const getBillTypes = async (): Promise<ResponseAPI> => {
    const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};

export const createBillType = async (request: CreateBillTypeRequest): Promise<ResponseAPI> => {
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    return await response.json();
};

export const updateBillType = async (request: UpdateBillTypeRequest): Promise<ResponseAPI> => {
    const response = await fetch(`${BASE_URL}/${request.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    });

    return await response.json();
};

export const deleteBillType = async (id: number): Promise<ResponseAPI> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return await response.json();
};
