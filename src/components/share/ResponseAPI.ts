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