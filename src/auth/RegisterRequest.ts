export interface RegisterRequest {
    username: string
    email: string
    confirmEmail: string
    password: string
    confirmPassword: string
    receiveUpdates: boolean
}