// Portuguese VAT Management System Types

export interface Company {
  id: string
  name: string
  taxId: string // NIF (Número de Identificação Fiscal)
  vatRegime: VATRegime
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export enum VATRegime {
  NORMAL = 'NORMAL',      // Regime normal (23%)
  EXEMPT = 'EXEMPT',      // Isento (Art. 9º CIVA)
  REDUCED = 'REDUCED',    // Taxa reduzida (6%)
  MIXED = 'MIXED',        // Regime misto (com prorrata)
  GROUP = 'GROUP',        // Regime de IVA de Grupo (Art. 70º CIVA)
}

export interface Invoice {
  id: string
  number: string
  companyId: string
  issueDate: Date
  dueDate?: Date
  type: InvoiceType
  
  // VAT amounts
  netAmount: number
  vatAmount: number
  totalAmount: number
  vatRate: number
  
  // VAT classification
  vatType: VATType
  isDeductible: boolean
  exemptionReason?: string
  
  description?: string
  createdAt: Date
  updatedAt: Date
}

export enum InvoiceType {
  SALE = 'SALE',              // Venda (IVA liquidado)
  PURCHASE = 'PURCHASE',      // Compra (IVA dedutível)
  CREDIT_NOTE = 'CREDIT_NOTE', // Nota de crédito
  DEBIT_NOTE = 'DEBIT_NOTE',  // Nota de débito
}

export enum VATType {
  STANDARD = 'STANDARD',  // 23% - Taxa normal
  REDUCED = 'REDUCED',    // 6% - Taxa reduzida
  ZERO = 'ZERO',          // 0% - Exportações/Intracomunitárias
  EXEMPT = 'EXEMPT',      // Isento
}

export interface VATReturn {
  id: string
  companyId: string
  period: string // "2024-Q1" or "2024-01"
  year: number
  quarter?: number
  month?: number
  
  // VAT amounts
  vatLiquidated: number   // IVA liquidado
  vatDeductible: number   // IVA dedutível
  vatToPay: number        // IVA a pagar
  vatToRecover: number    // IVA a recuperar
  
  status: ReturnStatus
  submittedAt?: Date
  paidAt?: Date
  
  createdAt: Date
  updatedAt: Date
}

export enum ReturnStatus {
  DRAFT = 'DRAFT',        // Rascunho
  SUBMITTED = 'SUBMITTED', // Submetida
  PAID = 'PAID',          // Paga
  OVERDUE = 'OVERDUE',    // Em atraso
}

export interface VATExemption {
  id: string
  companyId: string
  article: string         // "Art. 9º CIVA", "Art. 12º CIVA"
  description: string
  isActive: boolean
  
  // Renunciation tracking
  canRenounce: boolean
  hasRenounced: boolean
  renouncedAt?: Date
  commitmentUntil?: Date  // 5 years commitment
  
  createdAt: Date
  updatedAt: Date
}

export interface VATGroup {
  id: string
  name: string
  dominantCompany: string // Company ID
  isActive: boolean
  memberCompanies: string[] // Array of company IDs
  
  createdAt: Date
  updatedAt: Date
}

export interface VATSimulation {
  id: string
  name: string
  type: SimulationType
  companyId?: string
  
  parameters: Record<string, any>
  
  // Results
  currentVAT: number
  projectedVAT: number
  savings: number
  
  createdAt: Date
  updatedAt: Date
}

export enum SimulationType {
  EXEMPTION_RENUNCIATION = 'EXEMPTION_RENUNCIATION', // Renúncia à isenção
  GROUP_REGIME = 'GROUP_REGIME',                     // Adesão ao regime de grupo
  PRORRATA_CALCULATION = 'PRORRATA_CALCULATION',     // Cálculo de prorrata
  INVESTMENT_IMPACT = 'INVESTMENT_IMPACT',           // Impacto de investimentos
}

// Dashboard summary types
export interface VATSummaryData {
  totalVATLiquidated: number
  totalVATDeductible: number
  totalVATPending: number
  totalVATOverdue: number
  companiesCount: number
  activeExemptions: number
}

export interface CompanyVATSummary {
  company: Company
  currentPeriodVAT: {
    liquidated: number
    deductible: number
    balance: number
  }
  lastReturn?: VATReturn
  exemptions: VATExemption[]
  alerts: VATAlert[]
}

export interface VATAlert {
  id: string
  type: AlertType
  severity: AlertSeverity
  title: string
  description: string
  companyId?: string
  dueDate?: Date
  isRead: boolean
  createdAt: Date
}

export enum AlertType {
  PAYMENT_DUE = 'PAYMENT_DUE',
  RETURN_DUE = 'RETURN_DUE',
  EXEMPTION_EXPIRY = 'EXEMPTION_EXPIRY',
  LARGE_DEDUCTION = 'LARGE_DEDUCTION',
  GROUP_OPPORTUNITY = 'GROUP_OPPORTUNITY',
}

export enum AlertSeverity {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

// Portuguese VAT rates
export const VAT_RATES = {
  STANDARD: 23,    // Taxa normal (continente)
  REDUCED: 6,      // Taxa reduzida (produtos de saúde)
  ZERO: 0,         // Exportações/Intracomunitárias
  EXEMPT: 0,       // Isento
} as const

// Portuguese VAT articles
export const VAT_ARTICLES = {
  ART_9: 'Art. 9º CIVA',   // Isenções obrigatórias
  ART_12: 'Art. 12º CIVA', // Renúncia à isenção
  ART_70: 'Art. 70º CIVA', // Regime de IVA de Grupo
} as const