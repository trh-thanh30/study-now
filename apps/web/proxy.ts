import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const cookie = request.cookies.get('refresh_token')?.value;
  if (request.nextUrl.pathname.includes('/auth/:path*')) {
    return NextResponse.next();
  }
  // If there is no refresh token, we reject to login page and path name not include "/dashboard"
  if (!cookie) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
