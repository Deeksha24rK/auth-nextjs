import { NextResponse , NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
    //Public paths - login and signup 
    const path = request.nextUrl.pathname

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

    // Get the token from the cookie - returns the token or empty value
    const token = request.cookies.get('token')?.value || ''

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl))
    }
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }
}
// See "Matching Paths" below to learn more ,
// On what route you want to use middleware

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
        '/resetPassword',
    ]
}