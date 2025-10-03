// Portuguese VAT Rules Implementation
// Based on CIVA (Código do IVA) - Portuguese VAT Code

import { VATType, VATRegime, InvoiceType } from './types'

export class PortugueseVATRules {
  
  /**
   * Calculate VAT amount based on Portuguese rules
   */
  static calculateVAT(netAmount: number, vatType: VATType, vatRegime: VATRegime): {
    vatAmount: number
    vatRate: number
    totalAmount: number
  } {
    let vatRate = 0
    
    switch (vatType) {
      case VATType.STANDARD:
        vatRate = 23 // Taxa normal (continente)
        break
      case VATType.REDUCED:
        vatRate = 6 // Taxa reduzida (produtos de saúde)
        break
      case VATType.ZERO:
        vatRate = 0 // Exportações/Intracomunitárias
        break
      case VATType.EXEMPT:
        vatRate = 0 // Isento
        break
    }
    
    // Apply regime-specific rules
    if (vatRegime === VATRegime.EXEMPT) {
      vatRate = 0
    }
    
    const vatAmount = (netAmount * vatRate) / 100
    const totalAmount = netAmount + vatAmount
    
    return {
      vatAmount: Math.round(vatAmount * 100) / 100, // Round to 2 decimals
      vatRate,
      totalAmount: Math.round(totalAmount * 100) / 100,
    }
  }
  
  /**
   * Determine if VAT is deductible based on Portuguese rules
   */
  static isVATDeductible(
    invoiceType: InvoiceType,
    vatType: VATType,
    companyVATRegime: VATRegime,
    expenseCategory?: string
  ): boolean {
    // Only purchases can have deductible VAT
    if (invoiceType !== InvoiceType.PURCHASE) {
      return false
    }
    
    // Exempt companies cannot deduct VAT (except in mixed regime)
    if (companyVATRegime === VATRegime.EXEMPT) {
      return false
    }
    
    // Zero-rated and exempt transactions have no VAT to deduct
    if (vatType === VATType.ZERO || vatType === VATType.EXEMPT) {
      return false
    }
    
    // Special rules for specific expense categories
    if (expenseCategory) {
      // Vehicles: limited deductibility (50% for mixed use)
      if (expenseCategory === 'VEHICLES') {
        return true // Will be handled with 50% limitation in calculation
      }
      
      // Entertainment expenses: generally not deductible
      if (expenseCategory === 'ENTERTAINMENT') {
        return false
      }
      
      // Fuel: limited deductibility for passenger vehicles
      if (expenseCategory === 'FUEL_PASSENGER') {
        return false
      }
      
      if (expenseCategory === 'FUEL_COMMERCIAL') {
        return true
      }
    }
    
    return true
  }
  
  /**
   * Calculate prorrata for mixed regime companies
   * Art. 23º CIVA - Prorrata de dedução
   */
  static calculateProrrata(
    exemptTurnover: number,
    totalTurnover: number
  ): number {
    if (totalTurnover === 0) return 0
    
    const taxableTurnover = totalTurnover - exemptTurnover
    const prorrata = (taxableTurnover / totalTurnover) * 100
    
    // Round to nearest integer as per Portuguese rules
    return Math.round(prorrata)
  }
  
  /**
   * Apply prorrata to deductible VAT
   */
  static applyProrrata(vatAmount: number, prorrata: number): number {
    return Math.round((vatAmount * prorrata / 100) * 100) / 100
  }
  
  /**
   * Check if company can renounce VAT exemption
   * Art. 12º CIVA - Renúncia à isenção
   */
  static canRenounceExemption(
    exemptionArticle: string,
    activityType: string
  ): boolean {
    // Art. 9º exemptions (health services) can be renounced for private services
    if (exemptionArticle === 'Art. 9º CIVA') {
      return ['PRIVATE_HEALTH', 'DENTAL_PRIVATE'].includes(activityType)
    }
    
    // Art. 12º exemptions (real estate) can generally be renounced
    if (exemptionArticle === 'Art. 12º CIVA') {
      return true
    }
    
    return false
  }
  
  /**
   * Calculate VAT Group consolidation
   * Art. 70º CIVA - Regime de IVA de Grupo
   */
  static calculateGroupVAT(memberCompaniesVAT: Array<{
    companyId: string
    vatLiquidated: number
    vatDeductible: number
  }>): {
    totalVATLiquidated: number
    totalVATDeductible: number
    netVAT: number
    savings: number
  } {
    const totalVATLiquidated = memberCompaniesVAT.reduce(
      (sum, company) => sum + company.vatLiquidated, 0
    )
    
    const totalVATDeductible = memberCompaniesVAT.reduce(
      (sum, company) => sum + company.vatDeductible, 0
    )
    
    const netVAT = totalVATLiquidated - totalVATDeductible
    
    // Calculate individual company net VAT for comparison
    const individualNetVAT = memberCompaniesVAT.reduce(
      (sum, company) => {
        const companyNet = company.vatLiquidated - company.vatDeductible
        return sum + Math.max(companyNet, 0) // Only positive amounts are payable
      }, 0
    )
    
    const savings = individualNetVAT - Math.max(netVAT, 0)
    
    return {
      totalVATLiquidated: Math.round(totalVATLiquidated * 100) / 100,
      totalVATDeductible: Math.round(totalVATDeductible * 100) / 100,
      netVAT: Math.round(netVAT * 100) / 100,
      savings: Math.round(savings * 100) / 100,
    }
  }
  
  /**
   * Validate VAT return periods
   */
  static getVATReturnPeriod(
    annualTurnover: number,
    year: number
  ): 'MONTHLY' | 'QUARTERLY' {
    // Companies with annual turnover > €650,000 must file monthly
    const monthlyThreshold = 650000
    
    return annualTurnover > monthlyThreshold ? 'MONTHLY' : 'QUARTERLY'
  }
  
  /**
   * Calculate VAT return due dates
   */
  static getVATReturnDueDate(
    period: string,
    periodType: 'MONTHLY' | 'QUARTERLY'
  ): Date {
    const [year, periodNumber] = period.split('-')
    const yearNum = parseInt(year)
    
    if (periodType === 'MONTHLY') {
      const month = parseInt(periodNumber)
      // Due by 20th of following month
      return new Date(yearNum, month, 20)
    } else {
      // Quarterly
      const quarter = parseInt(periodNumber.replace('Q', ''))
      const dueMonth = quarter * 3 + 1 // Q1->April, Q2->July, Q3->October, Q4->January
      const dueYear = dueMonth > 12 ? yearNum + 1 : yearNum
      const adjustedMonth = dueMonth > 12 ? 1 : dueMonth
      
      // Due by 15th of the month following the quarter
      return new Date(dueYear, adjustedMonth - 1, 15)
    }
  }
  
  /**
   * Validate Portuguese NIF (Tax ID)
   */
  static validateNIF(nif: string): boolean {
    if (!nif || nif.length !== 9) return false
    
    const digits = nif.split('').map(Number)
    if (digits.some(isNaN)) return false
    
    // Check first digit (entity type)
    const firstDigit = digits[0]
    const validFirstDigits = [1, 2, 3, 5, 6, 7, 8, 9]
    if (!validFirstDigits.includes(firstDigit)) return false
    
    // Calculate check digit
    let sum = 0
    for (let i = 0; i < 8; i++) {
      sum += digits[i] * (9 - i)
    }
    
    const remainder = sum % 11
    const checkDigit = remainder < 2 ? 0 : 11 - remainder
    
    return digits[8] === checkDigit
  }
  
  /**
   * Get VAT regime recommendations based on company activity
   */
  static getVATRegimeRecommendation(
    activityType: string,
    annualTurnover: number,
    hasExemptActivities: boolean,
    hasTaxableActivities: boolean
  ): {
    recommendedRegime: VATRegime
    reason: string
    considerations: string[]
  } {
    const considerations: string[] = []
    
    // Health services
    if (activityType === 'HEALTH') {
      if (hasExemptActivities && hasTaxableActivities) {
        considerations.push('Considere renúncia à isenção para serviços privados')
        considerations.push('Avalie regime misto com cálculo de prorrata')
        return {
          recommendedRegime: VATRegime.MIXED,
          reason: 'Atividades mistas (isentas e tributáveis)',
          considerations,
        }
      }
      
      return {
        recommendedRegime: VATRegime.EXEMPT,
        reason: 'Prestações de cuidados de saúde (Art. 9º CIVA)',
        considerations: ['Possibilidade de renúncia para serviços privados'],
      }
    }
    
    // Normal commercial activities
    if (annualTurnover > 650000) {
      considerations.push('Obrigatoriedade de declarações mensais')
    }
    
    return {
      recommendedRegime: VATRegime.NORMAL,
      reason: 'Atividade comercial normal',
      considerations,
    }
  }
}