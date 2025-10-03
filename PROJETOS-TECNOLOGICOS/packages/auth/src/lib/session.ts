import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { RBACContext, createRBACContext } from './rbac'

export interface SessionUser {
  id: string
  email: string
  name: string
  image?: string
  tenantId: string
  role: string
  permissions: string[]
}

export interface SessionContext {
  user: SessionUser | null
  rbac: RBACContext | null
  tenantId: string
  isAuthenticated: boolean
}

/**
 * Get current session (server-side)
 * This would integrate with NextAuth in a real implementation
 */
export async function getSession(): Promise<SessionContext> {
  // In a real implementation, this would use NextAuth's getServerSession
  // For now, we'll simulate with headers or environment
  
  const headersList = headers()
  const tenantId = headersList.get('x-tenant-id') || 'instituto-areluna'
  
  // Mock user data - in real implementation, get from NextAuth session
  const mockUser: SessionUser = {
    id: 'user-1',
    email: 'admin@instituto-areluna.com',
    name: 'Admin User',
    tenantId,
    role: 'admin',
    permissions: [
      'users:read',
      'users:write',
      'companies:read',
      'companies:write',
      'intercompany:read',
      'intercompany:write'
    ]
  }
  
  const rbac = createRBACContext(
    mockUser.id,
    mockUser.tenantId,
    [mockUser.role],
    mockUser.permissions
  )
  
  return {
    user: mockUser,
    rbac,
    tenantId,
    isAuthenticated: true
  }
}

/**
 * Require authentication - redirect to login if not authenticated
 */
export async function requireAuth(): Promise<SessionContext> {
  const session = await getSession()
  
  if (!session.isAuthenticated) {
    redirect('/auth/signin')
  }
  
  return session
}

/**
 * Require specific permission - throw error if not authorized
 */
export async function requirePermission(permission: string): Promise<SessionContext> {
  const session = await requireAuth()
  
  if (!session.rbac?.permissions.includes(permission)) {
    throw new Error(`Permission denied: ${permission}`)
  }
  
  return session
}

/**
 * Require specific role - throw error if not authorized
 */
export async function requireRole(role: string): Promise<SessionContext> {
  const session = await requireAuth()
  
  if (!session.rbac?.roles.includes(role)) {
    throw new Error(`Role required: ${role}`)
  }
  
  return session
}

/**
 * Require admin role
 */
export async function requireAdmin(): Promise<SessionContext> {
  return requireRole('admin')
}

/**
 * Require super admin role
 */
export async function requireSuperAdmin(): Promise<SessionContext> {
  return requireRole('super_admin')
}

/**
 * Check if user can access resource
 */
export async function canAccess(
  resource: string,
  action: string
): Promise<boolean> {
  const session = await getSession()
  
  if (!session.isAuthenticated || !session.rbac) {
    return false
  }
  
  const permission = `${resource}:${action}`
  return session.rbac.permissions.includes(permission)
}

/**
 * Get user's tenant-scoped context
 */
export async function getTenantContext(): Promise<{
  tenantId: string
  userId: string
  isAuthenticated: boolean
}> {
  const session = await getSession()
  
  return {
    tenantId: session.tenantId,
    userId: session.user?.id || '',
    isAuthenticated: session.isAuthenticated
  }
}

/**
 * Validate tenant access for current user
 */
export async function validateTenantAccess(tenantId: string): Promise<boolean> {
  const session = await getSession()
  
  if (!session.isAuthenticated || !session.user) {
    return false
  }
  
  // User can only access their own tenant unless they're super admin
  if (session.rbac?.roles.includes('super_admin')) {
    return true
  }
  
  return session.user.tenantId === tenantId
}

/**
 * Create audit context for logging
 */
export async function createAuditContext(): Promise<{
  userId: string
  tenantId: string
  userAgent: string
  ip: string
}> {
  const session = await getSession()
  const headersList = headers()
  
  return {
    userId: session.user?.id || 'anonymous',
    tenantId: session.tenantId,
    userAgent: headersList.get('user-agent') || '',
    ip: headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || ''
  }
}