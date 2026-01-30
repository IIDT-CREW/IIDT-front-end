import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require authentication
const protectedRoutes = ['/write', '/memorials']

// Routes that should redirect to home if authenticated
const authRoutes = ['/login']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check for auth cookie (if you add cookie-based session later)
  // const authSession = request.cookies.get('iidt_session')

  // For now, we'll do client-side auth checks since token is in localStorage
  // This middleware can be enhanced later to use cookies for SSR auth

  // Basic path matching for potential future use
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Pass through for now - auth is handled client-side
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all paths except static files and API routes
    '/((?!_next/static|_next/image|favicon.ico|api|public).*)',
  ],
}
