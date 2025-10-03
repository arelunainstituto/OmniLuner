import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const TENANT_SEEDS = [
  {
    id: 'vespasian-ventures',
    name: 'Vespasian Ventures',
    subdomain: 'vespasian-ventures',
    domain: 'vespasianventures.com',
    isActive: true,
    settings: {
      theme: 'corporate',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      features: {
        intercompany: true,
        procurement: true,
        logistics: false,
        clinic: false
      }
    }
  },
  {
    id: 'instituto-areluna',
    name: 'Instituto AreLuna',
    subdomain: 'instituto-areluna',
    domain: 'instituto-areluna.com',
    isActive: true,
    settings: {
      theme: 'healthcare',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      features: {
        intercompany: true,
        procurement: true,
        logistics: true,
        clinic: true
      }
    }
  },
  {
    id: 'pinklegion',
    name: 'Pinklegion',
    subdomain: 'pinklegion',
    domain: 'pinklegion.com',
    isActive: true,
    settings: {
      theme: 'creative',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      features: {
        intercompany: true,
        procurement: true,
        logistics: true,
        clinic: false
      }
    }
  },
  {
    id: 'papagaio-fotografico',
    name: 'Papagaio Fotogénico',
    subdomain: 'papagaio-fotografico',
    domain: 'papagaiofotogenico.com',
    isActive: true,
    settings: {
      theme: 'photography',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      features: {
        intercompany: true,
        procurement: true,
        logistics: true,
        clinic: false
      }
    }
  },
  {
    id: 'nuvens-autoctones',
    name: 'Nuvens Autóctones',
    subdomain: 'nuvens-autoctones',
    domain: 'nuvensautoctones.com',
    isActive: true,
    settings: {
      theme: 'technology',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      features: {
        intercompany: true,
        procurement: true,
        logistics: true,
        clinic: false
      }
    }
  },
  {
    id: 'prostoral',
    name: 'ProStoral',
    subdomain: 'prostoral',
    domain: 'prostoral.com',
    isActive: true,
    settings: {
      theme: 'healthcare',
      currency: 'BRL',
      timezone: 'America/Sao_Paulo',
      language: 'pt-BR',
      features: {
        intercompany: true,
        procurement: true,
        logistics: true,
        clinic: true
      }
    }
  }
]

export async function seedTenants() {
  console.log('🌱 Seeding tenants...')
  
  for (const tenantData of TENANT_SEEDS) {
    const tenant = await prisma.tenant.upsert({
      where: { id: tenantData.id },
      update: tenantData,
      create: tenantData
    })
    
    console.log(`✅ Tenant created/updated: ${tenant.name} (${tenant.subdomain})`)
  }
  
  console.log('🎉 Tenants seeded successfully!')
}

if (require.main === module) {
  seedTenants()
    .catch((e) => {
      console.error('❌ Error seeding tenants:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}