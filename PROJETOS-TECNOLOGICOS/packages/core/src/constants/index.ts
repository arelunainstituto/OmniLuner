// Application constants
export const APP_NAME = 'AreLuna ERP'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Sistema ERP integrado do Grupo AreLuna'

// API constants
export const API_VERSION = 'v1'
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Pagination constants
export const DEFAULT_PAGE_SIZE = 20
export const MAX_PAGE_SIZE = 100
export const MIN_PAGE_SIZE = 5

// File upload constants
export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml']
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv'
]

// Date formats
export const DATE_FORMAT = 'dd/MM/yyyy'
export const DATETIME_FORMAT = 'dd/MM/yyyy HH:mm'
export const TIME_FORMAT = 'HH:mm'
export const ISO_DATE_FORMAT = 'yyyy-MM-dd'

// Currency
export const DEFAULT_CURRENCY = 'BRL'
export const CURRENCY_SYMBOL = 'R$'

// Validation constants
export const MIN_PASSWORD_LENGTH = 8
export const MAX_PASSWORD_LENGTH = 128
export const MIN_NAME_LENGTH = 2
export const MAX_NAME_LENGTH = 100

// Cache keys
export const CACHE_KEYS = {
  USER_PROFILE: 'user:profile',
  TENANT_CONFIG: 'tenant:config',
  PERMISSIONS: 'user:permissions',
  DEPARTMENTS: 'tenant:departments',
  COMPANIES: 'tenant:companies',
} as const

// Cache TTL (in seconds)
export const CACHE_TTL = {
  SHORT: 5 * 60, // 5 minutes
  MEDIUM: 30 * 60, // 30 minutes
  LONG: 60 * 60, // 1 hour
  VERY_LONG: 24 * 60 * 60, // 24 hours
} as const

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const

// Error codes
export const ERROR_CODES = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  CONFLICT: 'CONFLICT',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  TENANT_NOT_FOUND: 'TENANT_NOT_FOUND',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  PERMISSION_DENIED: 'PERMISSION_DENIED',
} as const

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const

// Theme constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const

// Language constants
export const LANGUAGES = {
  PT_BR: 'pt-BR',
  EN_US: 'en-US',
} as const

// Default language
export const DEFAULT_LANGUAGE = LANGUAGES.PT_BR

// Time zones
export const TIMEZONES = {
  SAO_PAULO: 'America/Sao_Paulo',
  UTC: 'UTC',
} as const

// Default timezone
export const DEFAULT_TIMEZONE = TIMEZONES.SAO_PAULO

// Module names
export const MODULES = {
  DASHBOARD: 'dashboard',
  USERS: 'users',
  COMPANIES: 'companies',
  DEPARTMENTS: 'departments',
  INTERCOMPANY: 'intercompany',
  PROCUREMENT: 'procurement',
  FINANCE: 'finance',
  LOGISTICS: 'logistics',
  CLINIC: 'clinic',
  CATALOG: 'catalog',
  REPORTS: 'reports',
  SETTINGS: 'settings',
} as const

// Priority levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const

// Status types
export const STATUS_TYPES = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  SUSPENDED: 'suspended',
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

// Order status
export const ORDER_STATUS = {
  DRAFT: 'draft',
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  OVERDUE: 'overdue',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const

// Integration providers
export const INTEGRATION_PROVIDERS = {
  MICROSOFT_GRAPH: 'microsoft_graph',
  ZOHO_CRM: 'zoho_crm',
  EVOLUTION_API: 'evolution_api',
} as const