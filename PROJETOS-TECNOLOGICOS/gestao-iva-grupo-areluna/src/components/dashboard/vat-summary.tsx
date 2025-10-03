'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

// Mock data - will be replaced with real data from API
const mockVATSummary = {
  totalVATLiquidated: 45230.50,
  totalVATDeductible: 12450.75,
  totalVATPending: 32779.75,
  totalVATOverdue: 0,
  companiesCount: 6,
  activeExemptions: 3,
  monthlyChange: 8.5,
  quarterlyChange: -2.3,
}

export function VATSummary() {
  const cards = [
    {
      title: 'IVA Liquidado',
      value: mockVATSummary.totalVATLiquidated,
      change: mockVATSummary.monthlyChange,
      icon: TrendingUp,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Total do período atual',
    },
    {
      title: 'IVA Dedutível',
      value: mockVATSummary.totalVATDeductible,
      change: 12.8,
      icon: TrendingDown,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Deduções disponíveis',
    },
    {
      title: 'IVA a Pagar',
      value: mockVATSummary.totalVATPending,
      change: -5.2,
      icon: AlertTriangle,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Pendente de pagamento',
    },
    {
      title: 'Empresas Ativas',
      value: mockVATSummary.companiesCount,
      change: 0,
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: `${mockVATSummary.activeExemptions} com isenções`,
      isCount: true,
    },
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-PT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value)
  }

  const formatChange = (change: number) => {
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(1)}%`
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon
        const isPositive = card.change > 0
        const changeColor = isPositive ? 'text-green-600' : 'text-red-600'
        
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`h-4 w-4 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {card.isCount 
                      ? card.value 
                      : formatCurrency(card.value)
                    }
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {card.description}
                    </p>
                    
                    {card.change !== 0 && (
                      <div className={`flex items-center text-xs ${changeColor}`}>
                        {isPositive ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        )}
                        {formatChange(card.change)}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}