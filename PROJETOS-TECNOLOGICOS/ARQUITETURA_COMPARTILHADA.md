# Arquitetura Compartilhada - Grupo AreLuna SaaS

## 🏗️ Visão Geral da Arquitetura

Esta documentação define a arquitetura compartilhada que será implementada em todos os projetos do Grupo AreLuna, seguindo as melhores práticas de ERP SaaS de elite.

## 📦 Estrutura de Packages Compartilhados

### **@areluna/ui** - Sistema de Design Unificado

```typescript
// packages/ui/src/index.ts
export * from './components/layout'
export * from './components/forms'
export * from './components/data-display'
export * from './components/charts'
export * from './components/feedback'
export * from './theme'
export * from './tokens'
```

#### Componentes Essenciais:
```typescript
// Layout Components
export const Sidebar: React.FC<SidebarProps>
export const Navigation: React.FC<NavigationProps>
export const UserNav: React.FC<UserNavProps>
export const ThemeToggle: React.FC

// Form Components
export const FormField: React.FC<FormFieldProps>
export const FormSelect: React.FC<FormSelectProps>
export const FormDatePicker: React.FC<FormDatePickerProps>
export const FormFileUpload: React.FC<FormFileUploadProps>

// Data Display
export const DataTable: React.FC<DataTableProps>
export const StatsCard: React.FC<StatsCardProps>
export const StatusBadge: React.FC<StatusBadgeProps>
export const DashboardCard: React.FC<DashboardCardProps>

// Charts (Recharts integration)
export const LineChart: React.FC<LineChartProps>
export const BarChart: React.FC<BarChartProps>
export const PieChart: React.FC<PieChartProps>
export const MetricsChart: React.FC<MetricsChartProps>
```

### **@areluna/core** - Schemas e Utilities

```typescript
// packages/core/src/schemas/index.ts
export const CompanySchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  cnpj: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.date(),
  updated_at: z.date()
})

export const DepartmentSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  company_id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  parent_id: z.string().uuid().optional(),
  manager_id: z.string().uuid().optional(),
  is_active: z.boolean().default(true)
})

export const UserSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().min(1),
  avatar_url: z.string().url().optional(),
  department_id: z.string().uuid().optional(),
  roles: z.array(z.string()),
  is_active: z.boolean().default(true)
})
```

#### Utilities Compartilhados:
```typescript
// packages/core/src/utils/index.ts
export const formatCurrency = (value: number, currency = 'BRL'): string
export const formatDate = (date: Date, format = 'dd/MM/yyyy'): string
export const validateCPF = (cpf: string): boolean
export const validateCNPJ = (cnpj: string): boolean
export const generateSlug = (text: string): string
export const maskPhone = (phone: string): string
export const maskCPF = (cpf: string): string
export const maskCNPJ = (cnpj: string): string
```

### **@areluna/auth** - Sistema de Autenticação Unificado

```typescript
// packages/auth/src/config.ts
export const authConfig: NextAuthConfig = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    })
  ],
  callbacks: {
    jwt: async ({ token, account, profile }) => {
      // Inject tenant_id and roles
      if (account && profile) {
        token.tenant_id = resolveTenantId(profile.email)
        token.roles = await getUserRoles(profile.email)
      }
      return token
    },
    session: async ({ session, token }) => {
      session.user.tenant_id = token.tenant_id
      session.user.roles = token.roles
      return session
    }
  }
}
```

#### RBAC System:
```typescript
// packages/auth/src/rbac.ts
export enum Role {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MANAGER = 'manager',
  USER = 'user',
  VIEWER = 'viewer'
}

export enum Permission {
  // Companies
  COMPANIES_READ = 'companies:read',
  COMPANIES_WRITE = 'companies:write',
  COMPANIES_DELETE = 'companies:delete',
  
  // Departments
  DEPARTMENTS_READ = 'departments:read',
  DEPARTMENTS_WRITE = 'departments:write',
  DEPARTMENTS_DELETE = 'departments:delete',
  
  // Intercompany
  INTERCOMPANY_READ = 'intercompany:read',
  INTERCOMPANY_WRITE = 'intercompany:write',
  INTERCOMPANY_APPROVE = 'intercompany:approve'
}

export const hasPermission = (
  userRoles: Role[], 
  permission: Permission
): boolean => {
  // Implementation logic
}
```

### **@areluna/database** - Schemas e Migrações

```typescript
// packages/database/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// Core Models
model Company {
  id          String   @id @default(uuid())
  tenant_id   String   @db.Uuid
  name        String
  slug        String
  cnpj        String?
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
  
  departments Department[]
  users       User[]
  
  @@unique([tenant_id, slug])
  @@map("companies")
}

model Department {
  id          String   @id @default(uuid())
  tenant_id   String   @db.Uuid
  company_id  String   @db.Uuid
  name        String
  slug        String
  description String?
  parent_id   String?  @db.Uuid
  manager_id  String?  @db.Uuid
  is_active   Boolean  @default(true)
  created_at  DateTime @default(now())
  updated_at  DateTime @updatedAt
  
  company     Company     @relation(fields: [company_id], references: [id])
  parent      Department? @relation("DepartmentHierarchy", fields: [parent_id], references: [id])
  children    Department[] @relation("DepartmentHierarchy")
  manager     User?       @relation("DepartmentManager", fields: [manager_id], references: [id])
  users       User[]      @relation("DepartmentUsers")
  
  @@unique([tenant_id, slug])
  @@map("departments")
}
```

## 🔧 Configurações Padronizadas

### **ESLint Config Compartilhado**
```javascript
// packages/eslint-config/index.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': 'error'
  }
}
```

### **TypeScript Config Base**
```json
// packages/typescript-config/base.json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@areluna/ui": ["../../packages/ui/src"],
      "@areluna/core": ["../../packages/core/src"],
      "@areluna/auth": ["../../packages/auth/src"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### **Tailwind Config com Tema AreLuna**
```javascript
// packages/tailwind-config/index.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // AreLuna Brand Colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#0c4a6e'
        },
        secondary: {
          50: '#fafaf9',
          100: '#f5f5f4',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          900: '#1c1917'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

## 🔄 Middleware Multi-tenant

```typescript
// packages/core/src/middleware/multi-tenant.ts
import { NextRequest, NextResponse } from 'next/server'

const TENANT_CONFIG = {
  'vespasian': '00000000-0000-0000-0000-000000000001',
  'instituto': '00000000-0000-0000-0000-000000000002',
  'pinklegion': '00000000-0000-0000-0000-000000000003',
  'papagaio': '00000000-0000-0000-0000-000000000004',
  'nuvens': '00000000-0000-0000-0000-000000000005',
  'prostoral': '00000000-0000-0000-0000-000000000006',
  'localhost': '00000000-0000-0000-0000-000000000001'
} as const

export function createMultiTenantMiddleware() {
  return async (request: NextRequest) => {
    const hostname = request.headers.get('host') || 'localhost'
    const subdomain = hostname.split('.')[0]
    
    const tenantId = TENANT_CONFIG[subdomain as keyof typeof TENANT_CONFIG] 
      || TENANT_CONFIG.localhost
    
    // Clone the request headers and add tenant info
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-tenant-id', tenantId)
    requestHeaders.set('x-subdomain', subdomain)
    
    return NextResponse.next({
      request: {
        headers: requestHeaders
      }
    })
  }
}
```

## 📊 Sistema de Analytics Compartilhado

```typescript
// packages/core/src/analytics/index.ts
export interface AnalyticsEvent {
  event: string
  properties: Record<string, any>
  tenant_id: string
  user_id?: string
  timestamp: Date
}

export class AnalyticsService {
  static track(event: AnalyticsEvent) {
    // Send to Vercel Analytics
    // Send to Sentry for error tracking
    // Store in database for custom analytics
  }
  
  static identify(userId: string, traits: Record<string, any>) {
    // User identification for analytics
  }
  
  static page(name: string, properties?: Record<string, any>) {
    // Page view tracking
  }
}
```

## 🤖 Sistema de Integrações

```typescript
// packages/integrations/src/microsoft-graph.ts
export class MicrosoftGraphService {
  private client: Client
  
  constructor(accessToken: string) {
    this.client = Client.init({
      authProvider: (done) => done(null, accessToken)
    })
  }
  
  async getOrganizationalStructure(): Promise<OrganizationalUnit[]> {
    // Implementation
  }
  
  async syncUsers(): Promise<User[]> {
    // Implementation
  }
  
  async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Implementation
  }
}

// packages/integrations/src/zoho-crm.ts
export class ZohoCRMService {
  private apiKey: string
  
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
  
  async getLeads(): Promise<Lead[]> {
    // Implementation
  }
  
  async createDeal(deal: Deal): Promise<Deal> {
    // Implementation
  }
}

// packages/integrations/src/evolution-api.ts
export class EvolutionAPIService {
  private apiKey: string
  
  constructor(apiKey: string) {
    this.apiKey = apiKey
  }
  
  async sendMessage(to: string, message: string): Promise<void> {
    // Implementation
  }
  
  async sendTemplate(to: string, template: string, params: any[]): Promise<void> {
    // Implementation
  }
}
```

## 🔍 Sistema de Auditoria

```typescript
// packages/core/src/audit/index.ts
export interface AuditLog {
  id: string
  tenant_id: string
  user_id: string
  action: string
  entity: string
  entity_id: string
  before: any
  after: any
  ip_address: string
  user_agent: string
  timestamp: Date
}

export class AuditService {
  static async log(entry: Omit<AuditLog, 'id' | 'timestamp'>) {
    // Store audit log in database
    // Send to external audit system if required
  }
  
  static async getAuditTrail(
    entityType: string, 
    entityId: string
  ): Promise<AuditLog[]> {
    // Retrieve audit trail for specific entity
  }
}
```

## 🚀 Deployment e CI/CD

### **Vercel Configuration**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "apps/web/package.json",
      "use": "@vercel/next"
    },
    {
      "src": "apps/instituto-portal/package.json", 
      "use": "@vercel/next"
    },
    {
      "src": "apps/inventory/package.json",
      "use": "@vercel/next"
    }
  ],
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "AZURE_AD_CLIENT_ID": "@azure-ad-client-id",
    "AZURE_AD_CLIENT_SECRET": "@azure-ad-client-secret"
  }
}
```

### **GitHub Actions Workflow**
```yaml
# .github/workflows/ci.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  lint-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run test
      - run: npm run build
      
  deploy:
    needs: lint-and-test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

**Esta arquitetura compartilhada garante consistência, reutilização e escalabilidade em todos os projetos do Grupo AreLuna, seguindo as melhores práticas de desenvolvimento SaaS moderno.**