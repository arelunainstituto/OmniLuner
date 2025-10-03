import { PrismaClient, VATRegime, VATType } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with Grupo AreLuna companies...')

  // Create the 6 companies of Grupo AreLuna
  const companies = await Promise.all([
    // 1. Vespasian Ventures (Holding)
    prisma.company.create({
      data: {
        name: 'Vespasian Ventures',
        taxId: '123456789', // Replace with real NIF
        vatRegime: VATRegime.NORMAL,
        isActive: true,
      },
    }),

    // 2. Instituto AreLuna (Dental clinic - VAT exempt)
    prisma.company.create({
      data: {
        name: 'Instituto AreLuna',
        taxId: '234567890', // Replace with real NIF
        vatRegime: VATRegime.EXEMPT,
        isActive: true,
      },
    }),

    // 3. ProStoral (Medical lab + real estate)
    prisma.company.create({
      data: {
        name: 'ProStoral',
        taxId: '345678901', // Replace with real NIF
        vatRegime: VATRegime.MIXED, // Mixed regime due to real estate
        isActive: true,
      },
    }),

    // 4. Papagaio Fotogénico (Audiovisual production)
    prisma.company.create({
      data: {
        name: 'Papagaio Fotogénico',
        taxId: '456789012', // Replace with real NIF
        vatRegime: VATRegime.NORMAL,
        isActive: true,
      },
    }),

    // 5. Nuvens Autóctones (Logistics)
    prisma.company.create({
      data: {
        name: 'Nuvens Autóctones',
        taxId: '567890123', // Replace with real NIF
        vatRegime: VATRegime.NORMAL,
        isActive: true,
      },
    }),

    // 6. Pinklegion (Automotive commerce)
    prisma.company.create({
      data: {
        name: 'Pinklegion',
        taxId: '678901234', // Replace with real NIF
        vatRegime: VATRegime.NORMAL,
        isActive: true,
      },
    }),
  ])

  console.log(`✅ Created ${companies.length} companies`)

  // Create VAT exemptions for health companies
  const exemptions = await Promise.all([
    // Instituto AreLuna - Health services exemption
    prisma.vATExemption.create({
      data: {
        companyId: companies[1].id, // Instituto AreLuna
        article: 'Art. 9º CIVA',
        description: 'Isenção obrigatória - Prestações de cuidados médicos e dentários',
        isActive: true,
        canRenounce: true, // Can renounce for private services
        hasRenounced: false,
      },
    }),

    // ProStoral - Medical services exemption
    prisma.vATExemption.create({
      data: {
        companyId: companies[2].id, // ProStoral
        article: 'Art. 9º CIVA',
        description: 'Isenção obrigatória - Análises clínicas e exames médicos',
        isActive: true,
        canRenounce: true,
        hasRenounced: false,
      },
    }),

    // ProStoral - Real estate exemption (can renounce)
    prisma.vATExemption.create({
      data: {
        companyId: companies[2].id, // ProStoral
        article: 'Art. 12º CIVA',
        description: 'Isenção de arrendamento de imóveis (possibilidade de renúncia)',
        isActive: true,
        canRenounce: true,
        hasRenounced: false,
      },
    }),
  ])

  console.log(`✅ Created ${exemptions.length} VAT exemptions`)

  // Create sample invoices for demonstration
  const sampleInvoices = await Promise.all([
    // Instituto AreLuna - Exempt health service
    prisma.invoice.create({
      data: {
        number: 'FA2024001',
        companyId: companies[1].id,
        issueDate: new Date('2024-01-15'),
        type: 'SALE',
        netAmount: 150.00,
        vatAmount: 0.00,
        totalAmount: 150.00,
        vatRate: 0.00,
        vatType: VATType.EXEMPT,
        isDeductible: false,
        exemptionReason: 'Art. 9º CIVA - Prestações de cuidados dentários',
        description: 'Consulta de medicina dentária',
      },
    }),

    // Papagaio Fotogénico - Normal VAT service
    prisma.invoice.create({
      data: {
        number: 'FA2024002',
        companyId: companies[3].id,
        issueDate: new Date('2024-01-20'),
        type: 'SALE',
        netAmount: 1000.00,
        vatAmount: 230.00,
        totalAmount: 1230.00,
        vatRate: 23.00,
        vatType: VATType.STANDARD,
        isDeductible: true,
        description: 'Produção de vídeo publicitário',
      },
    }),

    // Nuvens Autóctones - Logistics service
    prisma.invoice.create({
      data: {
        number: 'FA2024003',
        companyId: companies[4].id,
        issueDate: new Date('2024-01-25'),
        type: 'SALE',
        netAmount: 500.00,
        vatAmount: 115.00,
        totalAmount: 615.00,
        vatRate: 23.00,
        vatType: VATType.STANDARD,
        isDeductible: true,
        description: 'Serviços de transporte e logística',
      },
    }),
  ])

  console.log(`✅ Created ${sampleInvoices.length} sample invoices`)

  // Create a VAT group configuration (inactive by default)
  const vatGroup = await prisma.vATGroup.create({
    data: {
      name: 'Grupo AreLuna VAT Group',
      dominantCompany: companies[0].id, // Vespasian Ventures
      isActive: false,
      memberCompanies: companies.map(c => c.id),
    },
  })

  console.log(`✅ Created VAT group configuration`)

  // Create sample VAT returns
  const vatReturns = await Promise.all([
    // Q4 2023 return for Papagaio Fotogénico
    prisma.vATReturn.create({
      data: {
        companyId: companies[3].id,
        period: '2023-Q4',
        year: 2023,
        quarter: 4,
        vatLiquidated: 5000.00,
        vatDeductible: 1200.00,
        vatToPay: 3800.00,
        vatToRecover: 0.00,
        status: 'PAID',
        submittedAt: new Date('2024-01-31'),
        paidAt: new Date('2024-02-15'),
      },
    }),

    // Q4 2023 return for Nuvens Autóctones
    prisma.vATReturn.create({
      data: {
        companyId: companies[4].id,
        period: '2023-Q4',
        year: 2023,
        quarter: 4,
        vatLiquidated: 3200.00,
        vatDeductible: 800.00,
        vatToPay: 2400.00,
        vatToRecover: 0.00,
        status: 'PAID',
        submittedAt: new Date('2024-01-31'),
        paidAt: new Date('2024-02-10'),
      },
    }),
  ])

  console.log(`✅ Created ${vatReturns.length} VAT returns`)

  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })