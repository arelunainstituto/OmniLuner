// Configuration
export { authOptions } from './config/auth'

// RBAC utilities
export {
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  hasRole,
  hasAnyRole,
  isAdmin,
  isSuperAdmin,
  canAccessResource,
  getResourcePermissions,
  createRBACContext,
  requirePermission,
  requireRole,
  requireAdmin,
  requireSuperAdmin
} from './lib/rbac'

// Session management
export {
  getSession,
  requireAuth,
  requirePermission as requirePermissionSession,
  requireRole as requireRoleSession,
  requireAdmin as requireAdminSession,
  requireSuperAdmin as requireSuperAdminSession,
  canAccess,
  getTenantContext,
  validateTenantAccess,
  createAuditContext
} from './lib/session'

// Tenant middleware
export {
  extractTenantFromRequest,
  createTenantMiddleware,
  getTenantFromHeaders,
  buildTenantUrl,
  getCurrentTenant
} from './middleware/tenant'

// Types
export type {
  AuthUser,
  Permission,
  Role,
  RBACContext,
  TenantContext,
  SessionUser,
  SessionContext,
  AuthError,
  LoginCredentials,
  TokenPayload,
  AuthConfig,
  TenantConfig,
  AuthPermission,
  AuthRole,
  AuthErrorCode
} from './types'

// Constants
export {
  AUTH_PERMISSIONS,
  AUTH_ROLES,
  AUTH_ERROR_CODES
} from './types'