import { NextRequest, NextResponse } from 'next/server';


export function middleware(request: NextRequest) {
const token=request.cookies.get("mpay_token")?.value
    const pathname = request.nextUrl.pathname;

    const isAuthPage = ['/login', '/register', '/reset'].includes(pathname);

    // ✅ যদি user logged in হয় এবং login/register page এ যেতে চায়
    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/main', request.url));
    }

    // // ✅ যদি user logged in না থাকে এবং protected route এ যেতে চায়
    if (!token && pathname.startsWith('/main')) {
        return NextResponse.redirect(new URL('/login', request.url));
    }


    return NextResponse.next();
}

export const config = {
    matcher: ['/main/:path*', '/login', '/register', '/reset'],
};
