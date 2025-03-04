import axios, {HttpStatusCode} from "axios";

// export const API_URL: string = "https://budgetapp.pl/api"
export const API_URL: string = "http://localhost:8092"

// export const WEBSOCKET_URL: string = "wss://budgetapp.pl/ws"
export const WEBSOCKET_URL: string = "ws://localhost:8092/ws"

export class ResponseAPI<T> {
    private readonly _message: T;
    private readonly _success: boolean

    constructor(success: boolean, message: T);
    constructor(success: string, message: T);

    constructor(success: boolean | string, message: T) {
        this._success = typeof success === "boolean" ? success : success === "SUCCESS"
        this._message = message;
    }

    get message(): string {
        return this._message as unknown as string;
    }

    get success(): boolean {
        return this._success;
    }
}

export async function handleRequest<T extends Record<string, string>>(url: string, data: any, responseEnum: T, config = {}): Promise<ResponseAPI<T[keyof T]>> {
    let message: string;
    try {
        const response = await axios.post(API_URL + url, data, {withCredentials: true, ...config});
        message = response.data.message;
    } catch (error) {
        if (!axios.isAxiosError(error) || !error.response || (error.response.status !== HttpStatusCode.Forbidden && !error.response.data)) {
            return new ResponseAPI<T[keyof T]>(false, responseEnum['UNDEFINED_ERROR'] as T[keyof T]);
        }

        if (error.response.status === HttpStatusCode.Forbidden) {
            return new ResponseAPI<T[keyof T]>(false, responseEnum['NO_PERMISSION'] as T[keyof T]);
        }

        message = error.response.data.message;
    }

    return new ResponseAPI<T[keyof T]>(message, responseEnum[message as keyof T]);
}