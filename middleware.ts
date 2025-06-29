// middleware.ts
import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = [
    '/shipping-address',
    '/payment-method',
    '/place-order',
    '/profile',
    '/user',
    '/order',
    '/admin',
  ];

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path),
  );

  const sessionCartId = request.cookies.get('sessionCartId');

  // Set session cart cookie if missing
  if (!sessionCartId) {
    const response = NextResponse.next();
    response.cookies.set('sessionCartId', crypto.randomUUID());
    return response;
  }

  if (isProtected) {
    // 🔥 DO NOT use prisma/auth here
    // Rely only on cookies or JWT checks if needed
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/shipping-address',
    '/payment-method',
    '/place-order',
    '/profile',
    '/user/:path*',
    '/order/:path*',
    '/admin/:path*',
  ],
};
