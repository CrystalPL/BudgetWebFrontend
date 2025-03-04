import axios, {HttpStatusCode} from "axios";
import {cookies} from "next/headers";
import {API_URL} from "@/service/ResponseAPI";

export async function VerifyAccessAxios(): Promise<boolean> {
    const authCookie = cookies().get("auth_token")

    try {
        const response = await axios.post(API_URL + "/auth/verify", {}, {
            withCredentials: true,
            headers: {
                Cookie: `${authCookie?.name}=${authCookie?.value}`,
            },
        })

        return response.status == 200
    } catch (error) {
        if (!axios.isAxiosError(error)) {
            console.error('Wystąpił nieoczekiwany błąd:', error);
        }

        return false;
    }
}

export async function VerifyAccess(authToken: string): Promise<number> {
    try {
        if (!authToken) {
            return HttpStatusCode.Unauthorized
        }

        const response = await fetch(`${API_URL}/auth/verify`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'auth_token=' + authToken
            }
        });

        return response.status;
    } catch (error) {
        console.error('Wystąpił błąd podczas weryfikacji:', error);
        return HttpStatusCode.Unauthorized
    }
}

