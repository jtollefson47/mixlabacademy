import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple middleware - we'll disable complex auth checking for now
export function middleware(_request: NextRequest) {
  // Just pass through all requests for now
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
