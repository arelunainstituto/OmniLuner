import { z } from 'zod'

export const UserRoleSchema = z.enum([
  'super_admin',
  'admin',
  'manager',
  'user',
  'viewer'
])

export const UserStatusSchema = z.enum([
  'active',
  'inactive',
  'pending',
  'suspended'
])

export const UserSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  email: z.string().email('Email inválido'),
  name: z.string().min(1, 'Nome é obrigatório'),
  avatar: z.string().url().optional(),
  role: UserRoleSchema,
  status: UserStatusSchema.default('pending'),
  permissions: z.array(z.string()).default([]),
  lastLoginAt: z.date().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  lastLoginAt: true,
})

export const UpdateUserSchema = CreateUserSchema.partial().omit({
  tenantId: true,
})

export const LoginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export type User = z.infer<typeof UserSchema>
export type CreateUser = z.infer<typeof CreateUserSchema>
export type UpdateUser = z.infer<typeof UpdateUserSchema>
export type UserRole = z.infer<typeof UserRoleSchema>
export type UserStatus = z.infer<typeof UserStatusSchema>
export type Login = z.infer<typeof LoginSchema>

// Permission constants
export const PERMISSIONS = {
  // User management
  USERS_READ: 'users:read',
  USERS_CREATE: 'users:create',
  USERS_UPDATE: 'users:update',
  USERS_DELETE: 'users:delete',
  
  // Tenant management
  TENANTS_READ: 'tenants:read',
  TENANTS_UPDATE: 'tenants:update',
  
  // Financial
  FINANCE_READ: 'finance:read',
  FINANCE_CREATE: 'finance:create',
  FINANCE_UPDATE: 'finance:update',
  FINANCE_DELETE: 'finance:delete',
  
  // Procurement
  PROCUREMENT_READ: 'procurement:read',
  PROCUREMENT_CREATE: 'procurement:create',
  PROCUREMENT_UPDATE: 'procurement:update',
  PROCUREMENT_DELETE: 'procurement:delete',
  
  // Logistics
  LOGISTICS_READ: 'logistics:read',
  LOGISTICS_CREATE: 'logistics:create',
  LOGISTICS_UPDATE: 'logistics:update',
  LOGISTICS_DELETE: 'logistics:delete',
  
  // Clinic
  CLINIC_READ: 'clinic:read',
  CLINIC_CREATE: 'clinic:create',
  CLINIC_UPDATE: 'clinic:update',
  CLINIC_DELETE: 'clinic:delete',
  
  // Reports
  REPORTS_READ: 'reports:read',
  REPORTS_EXPORT: 'reports:export',
  
  // Settings
  SETTINGS_READ: 'settings:read',
  SETTINGS_UPDATE: 'settings:update',
} as const