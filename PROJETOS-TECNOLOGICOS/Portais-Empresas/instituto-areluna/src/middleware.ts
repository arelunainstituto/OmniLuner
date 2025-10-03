import { auth } from '@/auth'
import { NextRequest, NextResponse } from 'next/server'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Protected routes that require authentication
  const protectedRoutes = [
    '/admin',
    '/dashboard', 
    '/projetos',
    '/eventos',
    '/noticias'
  ]

  const isProtectedRoute = protectedRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  )

  // Redirect to signin if not authenticated and trying to access protected route
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/auth/signin', nextUrl))
  }

  // Admin-only routes
  const adminRoutes = ['/admin', '/dashboard']
  const isAdminRoute = adminRoutes.some(route => 
    nextUrl.pathname.startsWith(route)
  )

  if (isAdminRoute && isLoggedIn && req.auth?.user?.role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/projetos/:path*',
    '/eventos/:path*',
    '/noticias/:path*',
  ],
}