/**
 * Format number to Brazilian Real currency
 */
export function formatCurrency(value: number, currency: string = 'BRL'): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format number to percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100)
}

/**
 * Format number with thousand separators
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value)
}

/**
 * Parse currency string to number
 */
export function parseCurrency(value: string): number {
  if (!value) return 0
  
  // Remove currency symbols and spaces
  const cleanValue = value
    .replace(/[R$\s]/g, '')
    .replace(/\./g, '') // Remove thousand separators
    .replace(',', '.') // Replace decimal comma with dot
  
  const parsed = parseFloat(cleanValue)
  return isNaN(parsed) ? 0 : parsed
}

/**
 * Calculate percentage change between two values
 */
export function calculatePercentageChange(oldValue: number, newValue: number): number {
  if (oldValue === 0) return newValue > 0 ? 100 : 0
  return ((newValue - oldValue) / oldValue) * 100
}

/**
 * Calculate tax amount
 */
export function calculateTax(amount: number, taxRate: number): number {
  return amount * (taxRate / 100)
}

/**
 * Calculate amount with tax
 */
export function calculateAmountWithTax(amount: number, taxRate: number): number {
  return amount + calculateTax(amount, taxRate)
}

/**
 * Calculate discount amount
 */
export function calculateDiscount(amount: number, discountRate: number): number {
  return amount * (discountRate / 100)
}

/**
 * Calculate amount with discount
 */
export function calculateAmountWithDiscount(amount: number, discountRate: number): number {
  return amount - calculateDiscount(amount, discountRate)
}

/**
 * Round to 2 decimal places (for financial calculations)
 */
export function roundCurrency(value: number): number {
  return Math.round(value * 100) / 100
}

/**
 * Convert cents to currency value
 */
export function centsToValue(cents: number): number {
  return cents / 100
}

/**
 * Convert currency value to cents
 */
export function valueToCents(value: number): number {
  return Math.round(value * 100)
}