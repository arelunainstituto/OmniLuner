// Re-export types from other modules
export type { AuthUser } from '../config/auth'
export type { Permission, Role, RBACContext } from '../lib/rbac'
export type { TenantContext } from '../middleware/tenant'
export type { SessionUser, SessionContext } from '../lib/session'

// Additional auth-related types
export interface AuthError {
  code: string
  message: string
  details?: any
}

export interface LoginCredentials {
  email: string
  password: string
  tenantId?: string
}

export interface TokenPayload {
  userId: string
  tenantId: string
  role: string
  permissions: string[]
  iat: number
  exp: number
}

export interface AuthConfig {
  providers: string[]
  sessionMaxAge: number
  jwtMaxAge: number
  requireEmailVerification: boolean
  allowedDomains?: string[]
  defaultRole: string
}

export interface TenantConfig {
  id: string
  name: string
  domain: string
  subdomain: string
  isActive: boolean
  settings: Record<string, any>
}

// Permission constants
export const AUTH_PERMISSIONS = {
  // User management
  USERS_READ: 'users:read',
  USERS_WRITE: 'users:write',
  USERS_DELETE: 'users:delete',
  
  // Role management
  ROLES_READ: 'roles:read',
  ROLES_WRITE: 'roles:write',
  ROLES_DELETE: 'roles:delete',
  
  // Tenant management
  TENANTS_READ: 'tenants:read',
  TENANTS_WRITE: 'tenants:write',
  TENANTS_DELETE: 'tenants:delete',
  
  // System administration
  SYSTEM_ADMIN: 'system:admin',
  AUDIT_READ: 'audit:read'
} as const

// Role constants
export const AUTH_ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
  GUEST: 'guest'
} as const

// Error codes
export const AUTH_ERROR_CODES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  INVALID_TOKEN: 'INVALID_TOKEN',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  TENANT_NOT_FOUND: 'TENANT_NOT_FOUND',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
  ROLE_REQUIRED: 'ROLE_REQUIRED'
} as const

export type AuthPermission = typeof AUTH_PERMISSIONS[keyof typeof AUTH_PERMISSIONS]
export type AuthRole = typeof AUTH_ROLES[keyof typeof AUTH_ROLES]
export type AuthErrorCode = typeof AUTH_ERROR_CODES[keyof typeof AUTH_ERROR_CODES]