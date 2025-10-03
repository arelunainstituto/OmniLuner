import { NextRequest, NextResponse } from 'next/server'

export interface TenantContext {
  tenantId: string
  subdomain: string
  host: string
  isValidTenant: boolean
}

/**
 * Extract tenant information from request
 */
export function extractTenantFromRequest(request: NextRequest): TenantContext {
  const host = request.headers.get('host') || ''
  const url = new URL(request.url)
  
  // Extract subdomain
  const hostParts = host.split('.')
  let subdomain = ''
  let tenantId = ''
  
  // Handle different scenarios
  if (hostParts.length >= 3) {
    // subdomain.domain.com
    subdomain = hostParts[0]
    tenantId = subdomain
  } else if (url.pathname.startsWith('/tenant/')) {
    // /tenant/tenant-id/...
    const pathParts = url.pathname.split('/')
    tenantId = pathParts[2]
    subdomain = tenantId
  } else {
    // Default tenant for development
    tenantId = 'instituto-areluna'
    subdomain = 'instituto-areluna'
  }
  
  const isValidTenant = isValidTenantId(tenantId)
  
  return {
    tenantId: isValidTenant ? tenantId : 'instituto-areluna',
    subdomain,
    host,
    isValidTenant
  }
}

/**
 * Validate tenant ID against known tenants
 */
function isValidTenantId(tenantId: string): boolean {
  const validTenants = [
    'vespasian-ventures',
    'instituto-areluna',
    'pinklegion',
    'papagaio-fotografico',
    'nuvens-autoctones',
    'prostoral'
  ]
  
  return validTenants.includes(tenantId)
}

/**
 * Create tenant middleware for Next.js
 */
export function createTenantMiddleware() {
  return function tenantMiddleware(request: NextRequest) {
    const tenantContext = extractTenantFromRequest(request)
    
    // Skip tenant resolution for API routes that don't need it
    if (shouldSkipTenantResolution(request.nextUrl.pathname)) {
      return NextResponse.next()
    }
    
    // Redirect to valid tenant if invalid
    if (!tenantContext.isValidTenant && !request.nextUrl.pathname.startsWith('/auth')) {
      const redirectUrl = new URL('/auth/tenant-not-found', request.url)
      return NextResponse.redirect(redirectUrl)
    }
    
    // Add tenant context to headers for API routes
    const response = NextResponse.next()
    response.headers.set('x-tenant-id', tenantContext.tenantId)
    response.headers.set('x-tenant-subdomain', tenantContext.subdomain)
    response.headers.set('x-tenant-host', tenantContext.host)
    
    return response
  }
}

/**
 * Check if path should skip tenant resolution
 */
function shouldSkipTenantResolution(pathname: string): boolean {
  const skipPaths = [
    '/api/health',
    '/api/docs',
    '/_next',
    '/favicon.ico',
    '/robots.txt',
    '/sitemap.xml'
  ]
  
  return skipPaths.some(path => pathname.startsWith(path))
}

/**
 * Get tenant context from request headers (for API routes)
 */
export function getTenantFromHeaders(request: NextRequest): TenantContext {
  const tenantId = request.headers.get('x-tenant-id') || 'instituto-areluna'
  const subdomain = request.headers.get('x-tenant-subdomain') || ''
  const host = request.headers.get('x-tenant-host') || ''
  
  return {
    tenantId,
    subdomain,
    host,
    isValidTenant: isValidTenantId(tenantId)
  }
}

/**
 * Tenant-aware URL builder
 */
export function buildTenantUrl(
  tenantId: string,
  path: string,
  baseUrl?: string
): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  
  // For production, use subdomain
  if (process.env.NODE_ENV === 'production') {
    const url = new URL(base)
    url.hostname = `${tenantId}.${url.hostname}`
    url.pathname = path
    return url.toString()
  }
  
  // For development, use path-based routing
  return `${base}/tenant/${tenantId}${path}`
}

/**
 * Get current tenant from environment or default
 */
export function getCurrentTenant(): string {
  return process.env.CURRENT_TENANT || 'instituto-areluna'
}