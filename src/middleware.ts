import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {HttpStatusCode} from "axios";
import {VerifyAccess} from "./auth/AuthorizationService";

export async function middleware(request: NextRequest) {

    const cookieHeader = request.headers.get('cookie') || '';
    const cookies = new URLSearchParams(cookieHeader.replace(/; /g, '&'));
    const authToken = cookies.get('auth_token') || '';

    const hasAccess = await VerifyAccess(authToken);
    const url = request.nextUrl.clone();
    if (hasAccess === HttpStatusCode.Ok) {
        if (url.pathname.startsWith('/account-inactive') || url.pathname.startsWith('/sign-in')) {
            url.pathname = '/';
            return NextResponse.redirect(url);
        }

        return NextResponse.next();
    }

    const response = NextResponse.redirect(url);
    switch (hasAccess) {
        case HttpStatusCode.Unauthorized:
            url.pathname = '/sign-in';
            response.headers.set('Set-Cookie', `redirectPath=${request.nextUrl.pathname}; Path=/;`);
            return NextResponse.redirect(url);
        case HttpStatusCode.Forbidden:
            if (url.pathname.startsWith('/account-inactive')) {
                return NextResponse.next();
            }

            url.pathname = '/account-inactive';
            return NextResponse.redirect(url);
        default:
            console.error('Wystąpił błąd podczas weryfikacji: ', hasAccess);
            return NextResponse.error();
    }
}

export const config = {
    matcher: ['/account-inactive/:path*', '/profile/:path*', '/house-hold/:path*', '/logs/:path*', '/'], //sign-in
};
