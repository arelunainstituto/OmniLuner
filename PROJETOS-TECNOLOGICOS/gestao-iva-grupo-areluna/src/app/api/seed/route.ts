import { NextResponse } from 'next/server'
import { CompanyService } from '@/lib/services/company-service'

export async function POST() {
  try {
    const companies = await CompanyService.seedCompanies()
    
    return NextResponse.json({
      message: 'Database seeded successfully',
      companies: companies.length,
      data: companies,
    })
  } catch (error) {
    console.error('Error seeding database:', error)
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    )
  }
}