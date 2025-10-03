import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { getTenantFromHeaders } from '@/lib/tenant-server'

// Protected routes that require authentication
const PROTECTED_ROUTES = [
  '/dashboard',
  '/intercompany',
  '/finance',
  '/logistics',
  '/clinic',
  '/settings',
  '/profile',
]

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/auth/signin',
  '/auth/signup',
  '/auth/error',
  '/auth/verify-request',
  '/api/auth',
  '/api/health',
]

function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route))
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const url = request.nextUrl.clone()
  
  // Skip middleware for static files and API routes (except auth)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/icons') ||
    (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth'))
  ) {
    return NextResponse.next()
  }
  
  // Get tenant information
  const tenant = await getTenantFromHeaders(request.headers)
  
  if (!tenant && !pathname.startsWith('/auth/signin')) {
    // Redirect to sign-in if no tenant found
    url.pathname = '/auth/signin'
    url.searchParams.set('error', 'invalid_tenant')
    return NextResponse.redirect(url)
  }
  
  // Get authentication token
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  })
  
  // Handle authentication logic
  if (isProtectedRoute(pathname)) {
    if (!token) {
      // Redirect to sign-in for protected routes
      url.pathname = '/auth/signin'
      url.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(url)
    }
    
    // Check if user has access to this tenant
    if (tenant && token.tenantId && token.tenantId !== tenant.id) {
      url.pathname = '/auth/signin'
      url.searchParams.set('error', 'unauthorized_tenant')
      return NextResponse.redirect(url)
    }
  }
  
  // Add tenant information to request headers for server components
  const requestHeaders = new Headers(request.headers)
  if (tenant) {
    requestHeaders.set('x-tenant-id', tenant.id)
    requestHeaders.set('x-tenant-name', tenant.name)
    if (tenant.domain) {
      requestHeaders.set('x-tenant-domain', tenant.domain)
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
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