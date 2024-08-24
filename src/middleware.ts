import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {HttpStatusCode} from "axios";
import {VerifyAccess} from "./auth/AuthorizationService";

export async function middleware(request: NextRequest) {

    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = new URLSearchParams(cookieHeader.replace(/; /g, '&'));
    const authToken = cookies.get('auth_token') || '';

    const hasAccess = await VerifyAccess(authToken);
    if (hasAccess !== HttpStatusCode.Ok) {
        // console.log(url.pathname)
        // if (url.pathname.startsWith('/sign-in') || url.pathname.startsWith('/account-inactive')) {
        //     return NextResponse.next();
        // }

        const url = request.nextUrl.clone();
        const response = NextResponse.redirect(url);
        switch (hasAccess) {
            case HttpStatusCode.Unauthorized:
                url.pathname = '/sign-in';
                response.headers.set('Set-Cookie', `redirectPath=${request.nextUrl.pathname}; Path=/;`);
                return NextResponse.redirect(url);
            case HttpStatusCode.Forbidden:
                url.pathname = '/account-inactive';
                return NextResponse.redirect(url);
            default:
                console.error('Wystąpił błąd podczas weryfikacji: ', hasAccess);
                return NextResponse.error();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/profile/:path*', '/users/:path*', '/logs/:path*', '/'],
};
