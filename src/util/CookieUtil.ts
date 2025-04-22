import {cookies} from "next/headers";

export function getCookie() {
    return cookies().get('auth_token')?.value
}