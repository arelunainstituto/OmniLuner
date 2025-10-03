import { PERMISSIONS, USER_ROLES } from '@areluna/core'

export interface Permission {
  id: string
  name: string
  resource: string
  action: string
  description?: string
}

export interface Role {
  id: string
  name: string
  description?: string
  permissions: string[]
  tenantId: string
}

export interface RBACContext {
  userId: string
  tenantId: string
  roles: string[]
  permissions: string[]
}

/**
 * Check if user has specific permission
 */
export function hasPermission(
  context: RBACContext,
  permission: string
): boolean {
  return context.permissions.includes(permission)
}

/**
 * Check if user has any of the specified permissions
 */
export function hasAnyPermission(
  context: RBACContext,
  permissions: string[]
): boolean {
  return permissions.some(permission => 
    context.permissions.includes(permission)
  )
}

/**
 * Check if user has all specified permissions
 */
export function hasAllPermissions(
  context: RBACContext,
  permissions: string[]
): boolean {
  return permissions.every(permission => 
    context.permissions.includes(permission)
  )
}

/**
 * Check if user has specific role
 */
export function hasRole(
  context: RBACContext,
  role: string
): boolean {
  return context.roles.includes(role)
}

/**
 * Check if user has any of the specified roles
 */
export function hasAnyRole(
  context: RBACContext,
  roles: string[]
): boolean {
  return roles.some(role => context.roles.includes(role))
}

/**
 * Check if user is admin (has admin role)
 */
export function isAdmin(context: RBACContext): boolean {
  return hasRole(context, USER_ROLES.ADMIN)
}

/**
 * Check if user is super admin (has super_admin role)
 */
export function isSuperAdmin(context: RBACContext): boolean {
  return hasRole(context, USER_ROLES.SUPER_ADMIN)
}

/**
 * Check if user can access resource
 */
export function canAccessResource(
  context: RBACContext,
  resource: string,
  action: string
): boolean {
  const permission = `${resource}:${action}`
  return hasPermission(context, permission)
}

/**
 * Get user's effective permissions for a resource
 */
export function getResourcePermissions(
  context: RBACContext,
  resource: string
): string[] {
  return context.permissions.filter(permission => 
    permission.startsWith(`${resource}:`)
  )
}

/**
 * Create RBAC context from user data
 */
export function createRBACContext(
  userId: string,
  tenantId: string,
  roles: string[],
  permissions: string[]
): RBACContext {
  return {
    userId,
    tenantId,
    roles,
    permissions
  }
}

/**
 * Permission decorator for API routes
 */
export function requirePermission(permission: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    
    descriptor.value = function (...args: any[]) {
      const context = this.rbacContext as RBACContext
      
      if (!context) {
        throw new Error('RBAC context not found')
      }
      
      if (!hasPermission(context, permission)) {
        throw new Error(`Permission denied: ${permission}`)
      }
      
      return originalMethod.apply(this, args)
    }
    
    return descriptor
  }
}

/**
 * Role decorator for API routes
 */
export function requireRole(role: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    
    descriptor.value = function (...args: any[]) {
      const context = this.rbacContext as RBACContext
      
      if (!context) {
        throw new Error('RBAC context not found')
      }
      
      if (!hasRole(context, role)) {
        throw new Error(`Role required: ${role}`)
      }
      
      return originalMethod.apply(this, args)
    }
    
    return descriptor
  }
}

/**
 * Admin only decorator
 */
export function requireAdmin() {
  return requireRole(USER_ROLES.ADMIN)
}

/**
 * Super admin only decorator
 */
export function requireSuperAdmin() {
  return requireRole(USER_ROLES.SUPER_ADMIN)
}