import {cookies} from "next/headers";

export async function getCookie() {
    const cookieStore = await cookies();
    const cookie = cookieStore.get('auth_token');
    return cookie?.value;
}
