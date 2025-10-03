// Company and organizational structure seeds for AreLuna Group

export const COMPANY_SEEDS = {
  'vespasian-ventures': [
    {
      name: 'Vespasian Ventures Holding',
      legalName: 'Vespasian Ventures Participações Ltda.',
      cnpj: '12.345.678/0001-90',
      email: 'contato@vespasianventures.com',
      phone: '+55 11 99999-0001',
      address: {
        street: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
        country: 'Brasil'
      },
      isActive: true,
      units: [
        {
          name: 'Sede Administrativa',
          code: 'ADM',
          address: {
            street: 'Av. Paulista, 1000 - 15º andar',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01310-100',
            country: 'Brasil'
          },
          departments: [
            { name: 'Diretoria Executiva', code: 'DIR' },
            { name: 'Controladoria', code: 'CTR' },
            { name: 'Jurídico', code: 'JUR' },
            { name: 'Recursos Humanos', code: 'RH' }
          ]
        }
      ]
    }
  ],
  
  'instituto-areluna': [
    {
      name: 'Instituto AreLuna',
      legalName: 'Instituto AreLuna de Saúde e Bem-Estar Ltda.',
      cnpj: '23.456.789/0001-01',
      email: 'contato@instituto-areluna.com',
      phone: '+55 11 99999-0002',
      address: {
        street: 'Rua da Saúde, 500',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '04038-001',
        country: 'Brasil'
      },
      isActive: true,
      units: [
        {
          name: 'Clínica Principal',
          code: 'CLI',
          address: {
            street: 'Rua da Saúde, 500',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '04038-001',
            country: 'Brasil'
          },
          departments: [
            { name: 'Recepção', code: 'REC' },
            { name: 'Atendimento Clínico', code: 'CLI' },
            { name: 'Administração', code: 'ADM' },
            { name: 'Financeiro', code: 'FIN' }
          ]
        },
        {
          name: 'Centro de Pesquisa',
          code: 'PES',
          address: {
            street: 'Rua da Pesquisa, 100',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '04038-002',
            country: 'Brasil'
          },
          departments: [
            { name: 'Pesquisa e Desenvolvimento', code: 'P&D' },
            { name: 'Laboratório', code: 'LAB' }
          ]
        }
      ]
    }
  ],
  
  'pinklegion': [
    {
      name: 'Pinklegion Creative Studio',
      legalName: 'Pinklegion Comunicação e Design Ltda.',
      cnpj: '34.567.890/0001-12',
      email: 'hello@pinklegion.com',
      phone: '+55 11 99999-0003',
      address: {
        street: 'Rua Augusta, 2000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01412-100',
        country: 'Brasil'
      },
      isActive: true,
      units: [
        {
          name: 'Estúdio Criativo',
          code: 'EST',
          address: {
            street: 'Rua Augusta, 2000 - 8º andar',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '01412-100',
            country: 'Brasil'
          },
          departments: [
            { name: 'Design', code: 'DES' },
            { name: 'Desenvolvimento', code: 'DEV' },
            { name: 'Marketing', code: 'MKT' },
            { name: 'Atendimento', code: 'ATD' }
          ]
        }
      ]
    }
  ],
  
  'papagaio-fotografico': [
    {
      name: 'Papagaio Fotogénico',
      legalName: 'Papagaio Fotogénico Serviços Fotográficos Ltda.',
      cnpj: '45.678.901/0001-23',
      email: 'contato@papagaiofotogenico.com',
      phone: '+55 11 99999-0004',
      address: {
        street: 'Rua dos Fotógrafos, 300',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '05422-001',
        country: 'Brasil'
      },
      isActive: true,
      units: [
        {
          name: 'Estúdio Principal',
          code: 'EST',
          address: {
            street: 'Rua dos Fotógrafos, 300',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '05422-001',
            country: 'Brasil'
          },
          departments: [
            { name: 'Fotografia', code: 'FOT' },
            { name: 'Edição', code: 'EDI' },
            { name: 'Produção', code: 'PRO' },
            { name: 'Comercial', code: 'COM' }
          ]
        }
      ]
    }
  ],
  
  'nuvens-autoctones': [
    {
      name: 'Nuvens Autóctones',
      legalName: 'Nuvens Autóctones Tecnologia Ltda.',
      cnpj: '56.789.012/0001-34',
      email: 'contato@nuvensautoctones.com',
      phone: '+55 11 99999-0005',
      address: {
        street: 'Av. Faria Lima, 3000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '04538-132',
        country: 'Brasil'
      },
      isActive: true,
      units: [
        {
          name: 'Centro de Desenvolvimento',
          code: 'DEV',
          address: {
            street: 'Av. Faria Lima, 3000 - 12º andar',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '04538-132',
            country: 'Brasil'
          },
          departments: [
            { name: 'Engenharia de Software', code: 'ENG' },
            { name: 'DevOps', code: 'OPS' },
            { name: 'Produto', code: 'PRD' },
            { name: 'Qualidade', code: 'QA' }
          ]
        }
      ]
    }
  ],
  
  'prostoral': [
    {
      name: 'ProStoral Clínica Odontológica',
      legalName: 'ProStoral Serviços Odontológicos Ltda.',
      cnpj: '67.890.123/0001-45',
      email: 'contato@prostoral.com',
      phone: '+55 11 99999-0006',
      address: {
        street: 'Rua dos Dentistas, 400',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '04567-001',
        country: 'Brasil'
      },
      isActive: true,
      units: [
        {
          name: 'Clínica Odontológica',
          code: 'CLI',
          address: {
            street: 'Rua dos Dentistas, 400',
            city: 'São Paulo',
            state: 'SP',
            zipCode: '04567-001',
            country: 'Brasil'
          },
          departments: [
            { name: 'Atendimento', code: 'ATD' },
            { name: 'Clínica Geral', code: 'CLG' },
            { name: 'Especialidades', code: 'ESP' },
            { name: 'Administração', code: 'ADM' }
          ]
        }
      ]
    }
  ]
}

export async function seedCompanies(prisma: any, tenantId: string) {
  console.log(`🏢 Seeding companies for tenant: ${tenantId}`)
  
  const companiesData = COMPANY_SEEDS[tenantId as keyof typeof COMPANY_SEEDS]
  
  if (!companiesData) {
    console.log(`⚠️ No company data found for tenant: ${tenantId}`)
    return
  }
  
  for (const companyData of companiesData) {
    const { units, ...companyInfo } = companyData
    
    const company = await prisma.company.upsert({
      where: {
        tenantId_name: {
          tenantId,
          name: companyInfo.name
        }
      },
      update: companyInfo,
      create: {
        tenantId,
        ...companyInfo
      }
    })
    
    console.log(`✅ Company created/updated: ${company.name}`)
    
    // Seed units and departments
    for (const unitData of units) {
      const { departments, ...unitInfo } = unitData
      
      const unit = await prisma.unit.upsert({
        where: {
          companyId_name: {
            companyId: company.id,
            name: unitInfo.name
          }
        },
        update: unitInfo,
        create: {
          companyId: company.id,
          ...unitInfo
        }
      })
      
      console.log(`  ✅ Unit created/updated: ${unit.name}`)
      
      // Seed departments
      for (const deptData of departments) {
        const department = await prisma.department.upsert({
          where: {
            unitId_name: {
              unitId: unit.id,
              name: deptData.name
            }
          },
          update: deptData,
          create: {
            unitId: unit.id,
            ...deptData
          }
        })
        
        console.log(`    ✅ Department created/updated: ${department.name}`)
      }
    }
  }
  
  console.log(`🎉 Companies seeded successfully for tenant: ${tenantId}`)
}