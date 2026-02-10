import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

const protectedRoutes = ['/write', '/memorials']

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtected && !req.auth) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api|public).*)'],
}
