import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const companies = [
  {
    name: 'Vespasian Ventures',
    nif: '123456789',
    address: 'Rua Principal, 123, 1000-001 Lisboa',
    vatRegime: 'NORMAL' as const,
    isActive: true
  },
  {
    name: 'Instituto AreLuna',
    nif: '234567890',
    address: 'Avenida da Saúde, 456, 4000-002 Porto',
    vatRegime: 'NORMAL' as const,
    isActive: true
  },
  {
    name: 'Pinklegion',
    nif: '345678901',
    address: 'Rua da Indústria, 789, 2000-003 Santarém',
    vatRegime: 'NORMAL' as const,
    isActive: true
  },
  {
    name: 'Papagaio Fotogénico',
    nif: '456789012',
    address: 'Praça das Artes, 321, 3000-004 Coimbra',
    vatRegime: 'NORMAL' as const,
    isActive: true
  },
  {
    name: 'Nuvens Autóctones',
    nif: '567890123',
    address: 'Estrada Nacional, 654, 5000-005 Vila Real',
    vatRegime: 'NORMAL' as const,
    isActive: true
  },
  {
    name: 'ProStoral',
    nif: '678901234',
    address: 'Rua da Tecnologia, 987, 6000-006 Castelo Branco',
    vatRegime: 'NORMAL' as const,
    isActive: true
  }
]

export async function seedCompanies() {
  console.log('🏢 Seeding companies...')

  for (const companyData of companies) {
    const company = await prisma.company.upsert({
      where: { nif: companyData.nif },
      update: companyData,
      create: companyData
    })

    console.log(`✅ Created/updated company: ${company.name} (NIF: ${company.nif})`)
  }

  console.log('🎉 Companies seeded successfully!')
}

// Run if called directly
if (require.main === module) {
  seedCompanies()
    .catch((e) => {
      console.error('❌ Error seeding companies:', e)
      process.exit(1)
    })
    .finally(async () => {
      await prisma.$disconnect()
    })
}