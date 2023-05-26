import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // token will exist if the user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl

  // Allow the request if the following is true:
  // 1) it's a request to next-auth session
  // 2) the token exists

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  // Redirect to login page if the user is not logged in and they are requesting a protected route
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
      ],
}
