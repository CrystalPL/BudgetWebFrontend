import axios, {HttpStatusCode} from "axios";

// export const API_URL: string = "https://budgetapp.pl/api"
export const API_URL: string = "http://localhost:8092"

// export const WEBSOCKET_URL: string = "wss://budgetapp.pl/ws"
export const WEBSOCKET_URL: string = "ws://localhost:8092/ws"

export class ResponseAPI<T, U = {}> {
    private readonly _message: T;
    private readonly _success: boolean;
    private readonly _additionalData: U;

    constructor(success: boolean | string, message: T, additionalData: U = {} as U) {
        this._success = typeof success === "boolean" ? success : success === "SUCCESS";
        this._message = message;
        this._additionalData = additionalData;
    }

    get message(): string {
        return this._message as unknown as string;
    }

    get success(): boolean {
        return this._success;
    }

    get additionalData(): U {
        return this._additionalData;
    }
}

async function handleApiRequest<T extends Record<string, string>, U>(
    method: 'post' | 'delete' | 'patch' | 'get',
    url: string,
    responseEnum: T,
    data?: any,
    config = {}
): Promise<ResponseAPI<T[keyof T], U>> {
    try {
        const response = await axios({
            method,
            url: API_URL + url,
            data,
            withCredentials: true,
            ...config
        });

        const message = response.data.message;

        const additionalData: U = response.data as U;

        return new ResponseAPI<T[keyof T], U>(message, responseEnum[message as keyof T], additionalData);
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response || (error.response.status !== HttpStatusCode.Forbidden && !error.response.data)) {
            return new ResponseAPI<T[keyof T], U>(false, responseEnum['UNDEFINED_ERROR'] as T[keyof T], {} as U);
        }

        if (error.response.status === HttpStatusCode.Forbidden) {
            return new ResponseAPI<T[keyof T], U>(false, responseEnum['NO_PERMISSION'] as T[keyof T], {} as U);
        }

        return new ResponseAPI<T[keyof T], U>(error.response.data.message, responseEnum[error.response.data.message as keyof T], error.response.data as U);
    }
}

export async function handleGetRequest<T extends Record<string, string>, U = {}>(url: string, responseEnum: T, config = {}): Promise<ResponseAPI<T[keyof T], U>> {
    return handleApiRequest<T, U>('get', url, responseEnum, {}, config);
}

export async function handlePostRequest<T extends Record<string, string>, U = {}>(url: string, data: any, responseEnum: T, config = {}): Promise<ResponseAPI<T[keyof T], U>> {
    return handleApiRequest<T, U>('post', url, responseEnum, data, config);
}

export async function handlePatchRequest<T extends Record<string, string>, U = {}>(url: string, data: any, responseEnum: T, config = {}): Promise<ResponseAPI<T[keyof T], U>> {
    return handleApiRequest<T, U>('patch', url, responseEnum, data, config);
}

export async function handleDeleteRequest<T extends Record<string, string>>(urlWithData: string, data: any, responseEnum: T, config = {}): Promise<ResponseAPI<T[keyof T]>> {
    return handleApiRequest('delete', urlWithData, responseEnum, data, config);
}