import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/tournaments/:path*',
    '/games/:path*',
    '/teams/:path*',
    '/blogs',
    '/news',
    '/contact',
    '/sign-in',
    '/sign-up',
    '/',
    '/verify/:path*'
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  // If the user is signed in and tries to access sign-in, sign-up, verify, or the homepage, redirect them to the dashboard
  if (
    token &&
    (url.pathname.startsWith('/sign-in') ||
      url.pathname.startsWith('/sign-up') ||
      url.pathname.startsWith('/verify') ||
      url.pathname === '/')
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is not signed in and tries to access protected routes, redirect them to the sign-in page
  if (!token && (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/tournaments') ||
    url.pathname.startsWith('/games') ||
    url.pathname.startsWith('/teams') ||
    url.pathname.startsWith('/blogs') ||
    url.pathname.startsWith('/news') ||
    url.pathname.startsWith('/contact')
  )) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}
