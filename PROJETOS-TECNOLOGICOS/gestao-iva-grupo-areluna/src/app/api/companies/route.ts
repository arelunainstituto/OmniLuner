import { NextRequest, NextResponse } from 'next/server'
import { CompanyService } from '@/lib/services/company-service'

export async function GET() {
  try {
    const companies = await CompanyService.getAllCompanies()
    return NextResponse.json(companies)
  } catch (error) {
    console.error('Error fetching companies:', error)
    return NextResponse.json(
      { error: 'Failed to fetch companies' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, nif, address, vatRegime } = body

    if (!name || !nif || !address || !vatRegime) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const company = await CompanyService.createCompany({
      name,
      nif,
      address,
      vatRegime,
    })

    return NextResponse.json(company, { status: 201 })
  } catch (error) {
    console.error('Error creating company:', error)
    return NextResponse.json(
      { error: 'Failed to create company' },
      { status: 500 }
    )
  }
}