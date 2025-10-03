import { prisma } from '@/lib/prisma'
import { GRUPO_ARELUNA_COMPANIES } from '@/lib/data/companies'

// Using Prisma generated types
type Company = {
  id: string
  name: string
  nif: string
  address: string
  vatRegime: 'NORMAL' | 'SIMPLIFIED' | 'EXEMPTION' | 'GROUP'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

type VATRegime = 'NORMAL' | 'SIMPLIFIED' | 'EXEMPTION' | 'GROUP'

export class CompanyService {
  static async getAllCompanies(): Promise<Company[]> {
    return await prisma.company.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    })
  }

  static async getCompanyById(id: string): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: { id },
    })
  }

  static async getCompanyByNif(nif: string): Promise<Company | null> {
    return await prisma.company.findUnique({
      where: { nif },
    })
  }

  static async createCompany(data: {
    name: string
    nif: string
    address: string
    vatRegime: VATRegime
  }): Promise<Company> {
    return await prisma.company.create({
      data,
    })
  }

  static async updateCompany(
    id: string,
    data: Partial<{
      name: string
      address: string
      vatRegime: VATRegime
      isActive: boolean
    }>
  ): Promise<Company> {
    return await prisma.company.update({
      where: { id },
      data,
    })
  }

  static async seedCompanies(): Promise<Company[]> {
    const companies: Company[] = []

    for (const companyData of GRUPO_ARELUNA_COMPANIES) {
      const existingCompany = await this.getCompanyByNif(companyData.nif)
      
      if (!existingCompany) {
        const company = await this.createCompany({
          name: companyData.name,
          nif: companyData.nif,
          address: companyData.address,
          vatRegime: companyData.vatRegime as VATRegime,
        })
        companies.push(company)
      } else {
        companies.push(existingCompany)
      }
    }

    return companies
  }

  static async getCompaniesWithVATSummary() {
    return await prisma.company.findMany({
      where: { isActive: true },
      include: {
        invoices: {
          where: {
            date: {
              gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            },
          },
        },
        vatReturns: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
        vatExemptions: {
          where: { isActive: true },
        },
      },
    })
  }
}