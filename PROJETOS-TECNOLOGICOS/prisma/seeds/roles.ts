// Role and permission seeds for AreLuna Group
// This file will be used to seed default roles and permissions for each tenant

export const SYSTEM_PERMISSIONS = [
  // User Management
  'users:read',
  'users:write',
  'users:delete',
  
  // Company Management
  'companies:read',
  'companies:write',
  'companies:delete',
  
  // Intercompany Orders
  'intercompany:read',
  'intercompany:write',
  'intercompany:delete',
  'intercompany:approve',
  
  // Procurement
  'procurement:read',
  'procurement:write',
  'procurement:delete',
  'procurement:approve',
  
  // Purchase Orders
  'purchase_orders:read',
  'purchase_orders:write',
  'purchase_orders:delete',
  'purchase_orders:approve',
  
  // Suppliers
  'suppliers:read',
  'suppliers:write',
  'suppliers:delete',
  
  // Logistics
  'logistics:read',
  'logistics:write',
  'logistics:delete',
  'logistics:approve',
  
  // Fleet Management
  'fleet:read',
  'fleet:write',
  'fleet:delete',
  
  // Clinic (MVP)
  'clinic:read',
  'clinic:write',
  'clinic:delete',
  'appointments:read',
  'appointments:write',
  'appointments:delete',
  
  // Catalog Management
  'catalog:read',
  'catalog:write',
  'catalog:delete',
  
  // Price Lists
  'price_lists:read',
  'price_lists:write',
  'price_lists:delete',
  
  // Reports & Analytics
  'reports:read',
  'reports:export',
  'analytics:read',
  
  // System Administration
  'system:admin',
  'audit:read',
  'roles:read',
  'roles:write',
  'roles:delete',
  'tenants:read',
  'tenants:write'
]

export const DEFAULT_ROLES = [
  {
    name: 'super_admin',
    description: 'Super Administrator with full system access',
    permissions: SYSTEM_PERMISSIONS,
    isSystem: true
  },
  {
    name: 'admin',
    description: 'Administrator with tenant-wide access',
    permissions: [
      'users:read',
      'users:write',
      'companies:read',
      'companies:write',
      'intercompany:read',
      'intercompany:write',
      'intercompany:approve',
      'procurement:read',
      'procurement:write',
      'procurement:approve',
      'purchase_orders:read',
      'purchase_orders:write',
      'purchase_orders:approve',
      'suppliers:read',
      'suppliers:write',
      'logistics:read',
      'logistics:write',
      'logistics:approve',
      'fleet:read',
      'fleet:write',
      'clinic:read',
      'clinic:write',
      'appointments:read',
      'appointments:write',
      'catalog:read',
      'catalog:write',
      'price_lists:read',
      'price_lists:write',
      'reports:read',
      'reports:export',
      'analytics:read',
      'audit:read',
      'roles:read'
    ],
    isSystem: true
  },
  {
    name: 'manager',
    description: 'Manager with departmental access',
    permissions: [
      'users:read',
      'companies:read',
      'intercompany:read',
      'intercompany:write',
      'procurement:read',
      'procurement:write',
      'purchase_orders:read',
      'suppliers:read',
      'logistics:read',
      'logistics:write',
      'fleet:read',
      'clinic:read',
      'clinic:write',
      'appointments:read',
      'appointments:write',
      'catalog:read',
      'price_lists:read',
      'reports:read',
      'analytics:read'
    ],
    isSystem: true
  },
  {
    name: 'user',
    description: 'Standard user with basic access',
    permissions: [
      'users:read',
      'companies:read',
      'intercompany:read',
      'procurement:read',
      'suppliers:read',
      'logistics:read',
      'fleet:read',
      'clinic:read',
      'appointments:read',
      'catalog:read',
      'price_lists:read',
      'reports:read'
    ],
    isSystem: true
  },
  {
    name: 'guest',
    description: 'Guest user with read-only access',
    permissions: [
      'companies:read',
      'catalog:read',
      'price_lists:read'
    ],
    isSystem: true
  }
]

export async function seedRoles(prisma: any, tenantId: string) {
  console.log(`🔐 Seeding roles for tenant: ${tenantId}`)
  
  for (const roleData of DEFAULT_ROLES) {
    const role = await prisma.role.upsert({
      where: { 
        tenantId_name: {
          tenantId,
          name: roleData.name
        }
      },
      update: {
        description: roleData.description,
        permissions: roleData.permissions,
        isSystem: roleData.isSystem
      },
      create: {
        tenantId,
        name: roleData.name,
        description: roleData.description,
        permissions: roleData.permissions,
        isSystem: roleData.isSystem
      }
    })
    
    console.log(`✅ Role created/updated: ${role.name}`)
  }
  
  console.log(`🎉 Roles seeded successfully for tenant: ${tenantId}`)
}