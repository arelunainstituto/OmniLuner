import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const testUsers = [
  // Vespasian Ventures (Holding)
  {
    email: 'admin@vespasianventures.com',
    name: 'Leonardo Saraiva',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    companyNif: '123456789', // Vespasian Ventures NIF
  },
  {
    email: 'manager@vespasianventures.com',
    name: 'Maria Silva',
    role: 'MANAGER' as const,
    status: 'ACTIVE' as const,
    companyNif: '123456789',
  },

  // Instituto AreLuna
  {
    email: 'admin@institutoareluna.pt',
    name: 'Dr. Ana Costa',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    companyNif: '234567890',
  },
  {
    email: 'clinico@institutoareluna.pt',
    name: 'Dr. João Santos',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    companyNif: '234567890',
  },
  {
    email: 'recepcao@institutoareluna.pt',
    name: 'Sofia Oliveira',
    role: 'VIEWER' as const,
    status: 'ACTIVE' as const,
    companyNif: '234567890',
  },

  // Pinklegion
  {
    email: 'admin@pinklegion.com',
    name: 'Carlos Mendes',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    companyNif: '345678901',
  },
  {
    email: 'vendas@pinklegion.com',
    name: 'Rita Ferreira',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    companyNif: '345678901',
  },
  {
    email: 'oficina@pinklegion.com',
    name: 'Miguel Rodrigues',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    companyNif: '345678901',
  },

  // Papagaio Fotogénico
  {
    email: 'admin@papagaiofotogenico.pt',
    name: 'Inês Martins',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    companyNif: '456789012',
  },
  {
    email: 'producao@papagaiofotogenico.pt',
    name: 'Pedro Alves',
    role: 'MANAGER' as const,
    status: 'ACTIVE' as const,
    companyNif: '456789012',
  },
  {
    email: 'criativo@papagaiofotogenico.pt',
    name: 'Catarina Lopes',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    companyNif: '456789012',
  },

  // Nuvens Autóctones
  {
    email: 'admin@nuvensautoctones.pt',
    name: 'Rui Pereira',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    companyNif: '567890123',
  },
  {
    email: 'logistica@nuvensautoctones.pt',
    name: 'Teresa Gomes',
    role: 'MANAGER' as const,
    status: 'ACTIVE' as const,
    companyNif: '567890123',
  },
  {
    email: 'motorista@nuvensautoctones.pt',
    name: 'António Sousa',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    companyNif: '567890123',
  },

  // ProStoral
  {
    email: 'admin@prostoral.com',
    name: 'Dra. Luísa Carvalho',
    role: 'ADMIN' as const,
    status: 'ACTIVE' as const,
    companyNif: '678901234',
  },
  {
    email: 'tecnico@prostoral.com',
    name: 'Nuno Ribeiro',
    role: 'USER' as const,
    status: 'ACTIVE' as const,
    companyNif: '678901234',
  },
  {
    email: 'comercial@prostoral.com',
    name: 'Sandra Teixeira',
    role: 'MANAGER' as const,
    status: 'ACTIVE' as const,
    companyNif: '678901234',
  }
]

export async function seedTestUsers() {
  console.log('🌱 Seeding test users...')

  for (const userData of testUsers) {
    // Find the company by NIF
    const company = await prisma.company.findUnique({
      where: { nif: userData.companyNif }
    })

    if (!company) {
      console.warn(`⚠️  Company with NIF ${userData.companyNif} not found, skipping user ${userData.email}`)
      continue
    }

    // Create or update user
    const user = await prisma.user.upsert({
      where: { email: userData.email },
      update: {
        name: userData.name,
        role: userData.role,
        status: userData.status,
        companyId: company.id
      },
      create: {
        email: userData.email,
        name: userData.name,
        role: userData.role,
        status: userData.status,
        companyId: company.id,
      }
    })

    console.log(`✅ Created/updated user: ${user.email} (${user.name}) - ${company.name}`)
  }

  console.log('🎉 Test users seeded successfully!')
}

// Run if called directly
if (require.main === module) {
  seedTestUsers()
    .catch((e) => {
      console.error('❌ Error seeding test users:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}