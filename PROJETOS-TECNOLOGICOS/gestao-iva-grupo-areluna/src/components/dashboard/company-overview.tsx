'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Building2, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCurrency } from '@/lib/utils'

// Mock data for the 6 companies
const mockCompanies = [
  {
    id: 1,
    name: 'Instituto AreLuna',
    nif: '123456789',
    vatRegime: 'EXEMPT',
    vatLiquidated: 0,
    vatDeductible: 2450.50,
    vatPending: -2450.50,
    exemptionArticle: 'Art. 9.º CIVA',
    canRenounce: true,
    status: 'active',
    color: 'bg-blue-50 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-800',
  },
  {
    id: 2,
    name: 'ProStoral',
    nif: '987654321',
    vatRegime: 'MIXED',
    vatLiquidated: 8750.25,
    vatDeductible: 3200.75,
    vatPending: 5549.50,
    exemptionArticle: 'Art. 9.º CIVA (parcial)',
    canRenounce: true,
    status: 'active',
    color: 'bg-orange-50 border-orange-200',
    badgeColor: 'bg-orange-100 text-orange-800',
  },
  {
    id: 3,
    name: 'Papagaio Fotogénico',
    nif: '456789123',
    vatRegime: 'NORMAL',
    vatLiquidated: 15230.80,
    vatDeductible: 4850.25,
    vatPending: 10380.55,
    exemptionArticle: null,
    canRenounce: false,
    status: 'active',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    id: 4,
    name: 'Nuvens Autóctones',
    nif: '789123456',
    vatRegime: 'NORMAL',
    vatLiquidated: 12450.30,
    vatDeductible: 1850.90,
    vatPending: 10599.40,
    exemptionArticle: null,
    canRenounce: false,
    status: 'active',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    id: 5,
    name: 'Pinklegion',
    nif: '321654987',
    vatRegime: 'NORMAL',
    vatLiquidated: 8799.15,
    vatDeductible: 450.35,
    vatPending: 8348.80,
    exemptionArticle: null,
    canRenounce: false,
    status: 'active',
    color: 'bg-green-50 border-green-200',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    id: 6,
    name: 'Vespasian Ventures',
    nif: '654987321',
    vatRegime: 'NORMAL',
    vatLiquidated: 0,
    vatDeductible: 0,
    vatPending: 0,
    exemptionArticle: null,
    canRenounce: false,
    status: 'holding',
    color: 'bg-purple-50 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-800',
  },
]

const regimeLabels: Record<string, string> = {
  EXEMPT: 'Isento',
  NORMAL: 'Normal',
  MIXED: 'Misto',
}

const statusLabels: Record<string, string> = {
  active: 'Ativa',
  holding: 'Holding',
}

export function CompanyOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Visão Geral das Empresas
        </h2>
        <Badge variant="outline" className="text-sm">
          {mockCompanies.length} empresas
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCompanies.map((company, index) => (
          <motion.div
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`hover:shadow-lg transition-all duration-300 ${company.color}`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-5 w-5 text-gray-600" />
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">
                        {company.name}
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        NIF: {company.nif}
                      </p>
                    </div>
                  </div>
                  <Badge className={company.badgeColor}>
                    {regimeLabels[company.vatRegime]}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* VAT Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">IVA Liquidado</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(company.vatLiquidated)}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-500">IVA Dedutível</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(company.vatDeductible)}
                    </p>
                  </div>
                </div>

                {/* VAT Pending */}
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">Saldo IVA</p>
                    <div className="flex items-center space-x-1">
                      {company.vatPending > 0 ? (
                        <TrendingUp className="h-3 w-3 text-red-500" />
                      ) : company.vatPending < 0 ? (
                        <TrendingDown className="h-3 w-3 text-green-500" />
                      ) : null}
                      <p className={`text-sm font-semibold ${
                        company.vatPending > 0 
                          ? 'text-red-600' 
                          : company.vatPending < 0 
                            ? 'text-green-600' 
                            : 'text-gray-600'
                      }`}>
                        {formatCurrency(Math.abs(company.vatPending))}
                      </p>
                    </div>
                  </div>
                  
                  {company.vatPending !== 0 && (
                    <p className="text-xs text-gray-400 mt-1">
                      {company.vatPending > 0 ? 'A pagar' : 'A receber'}
                    </p>
                  )}
                </div>

                {/* Exemption Info */}
                {company.exemptionArticle && (
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-3 w-3 text-blue-500" />
                      <p className="text-xs text-blue-600">
                        {company.exemptionArticle}
                      </p>
                    </div>
                    {company.canRenounce && (
                      <p className="text-xs text-gray-500 mt-1">
                        Pode renunciar à isenção
                      </p>
                    )}
                  </div>
                )}

                {/* Status */}
                <div className="flex items-center justify-between pt-2">
                  <Badge variant="outline" className="text-xs">
                    {statusLabels[company.status]}
                  </Badge>
                  {company.status === 'holding' && (
                    <p className="text-xs text-purple-600">
                      Candidata a IVA Grupo
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}