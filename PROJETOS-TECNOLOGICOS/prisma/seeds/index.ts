// Main seed file for AreLuna Group ERP
// This file orchestrates the seeding of all tenants and their data

import { seedTenants, TENANT_SEEDS } from './tenants'
import { seedRoles } from './roles'
import { seedCompanies } from './companies'

// Mock PrismaClient for now - will be replaced with actual Prisma client
const mockPrisma = {
  tenant: {
    upsert: async (data: any) => ({ id: data.where.id, ...data.create }),
  },
  role: {
    upsert: async (data: any) => ({ id: 'role-id', ...data.create }),
  },
  company: {
    upsert: async (data: any) => ({ id: 'company-id', ...data.create }),
  },
  unit: {
    upsert: async (data: any) => ({ id: 'unit-id', ...data.create }),
  },
  department: {
    upsert: async (data: any) => ({ id: 'dept-id', ...data.create }),
  },
  $disconnect: async () => {},
}

async function main() {
  console.log('🚀 Starting AreLuna Group ERP database seeding...')
  
  try {
    // 1. Seed tenants first
    await seedTenants()
    
    // 2. Seed roles and companies for each tenant
    for (const tenant of TENANT_SEEDS) {
      console.log(`\n📋 Processing tenant: ${tenant.name}`)
      
      // Seed roles for this tenant
      await seedRoles(mockPrisma, tenant.id)
      
      // Seed companies and organizational structure
      await seedCompanies(mockPrisma, tenant.id)
    }
    
    console.log('\n🎉 Database seeding completed successfully!')
    console.log('\n📊 Summary:')
    console.log(`- ${TENANT_SEEDS.length} tenants seeded`)
    console.log('- Default roles created for each tenant')
    console.log('- Company structures established')
    console.log('- Organizational hierarchy in place')
    
  } catch (error) {
    console.error('❌ Error during seeding:', error)
    throw error
  }
}

// Seed specific tenant (for development)
export async function seedTenant(tenantId: string) {
  console.log(`🌱 Seeding specific tenant: ${tenantId}`)
  
  const tenant = TENANT_SEEDS.find(t => t.id === tenantId)
  if (!tenant) {
    throw new Error(`Tenant not found: ${tenantId}`)
  }
  
  try {
    // Seed roles for this tenant
    await seedRoles(mockPrisma, tenant.id)
    
    // Seed companies and organizational structure
    await seedCompanies(mockPrisma, tenant.id)
    
    console.log(`✅ Tenant ${tenantId} seeded successfully!`)
  } catch (error) {
    console.error(`❌ Error seeding tenant ${tenantId}:`, error)
    throw error
  }
}

// Export for use in other files
export { seedTenants, seedRoles, seedCompanies }

// Run if called directly
if (require.main === module) {
  main()
    .catch((e) => {
      console.error('❌ Seeding failed:', e)
      process.exit(1)
    })
    .finally(async () => {
      await mockPrisma.$disconnect()
    })
}