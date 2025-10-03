'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, ArrowDownRight, FileText, Calendar, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatCurrency, formatDate } from '@/lib/utils'

// Mock transaction data
const mockTransactions = [
  {
    id: 1,
    type: 'INVOICE_ISSUED',
    company: 'Papagaio Fotogénico',
    description: 'Fatura #2024-001 - Serviços de fotografia',
    amount: 2450.50,
    vatAmount: 563.62,
    date: new Date('2024-01-15'),
    status: 'PROCESSED',
    direction: 'out',
  },
  {
    id: 2,
    type: 'INVOICE_RECEIVED',
    company: 'ProStoral',
    description: 'Fatura #SUP-2024-045 - Material médico',
    amount: 1850.75,
    vatAmount: 425.67,
    date: new Date('2024-01-14'),
    status: 'PENDING',
    direction: 'in',
  },
  {
    id: 3,
    type: 'VAT_RETURN',
    company: 'Nuvens Autóctones',
    description: 'Declaração IVA - Dezembro 2023',
    amount: 0,
    vatAmount: 3250.80,
    date: new Date('2024-01-12'),
    status: 'SUBMITTED',
    direction: 'out',
  },
  {
    id: 4,
    type: 'EXEMPTION_APPLIED',
    company: 'Instituto AreLuna',
    description: 'Aplicação isenção Art. 9.º CIVA',
    amount: 1200.00,
    vatAmount: 0,
    date: new Date('2024-01-10'),
    status: 'PROCESSED',
    direction: 'neutral',
  },
  {
    id: 5,
    type: 'INVOICE_ISSUED',
    company: 'Pinklegion',
    description: 'Fatura #2024-003 - Venda de veículo',
    amount: 15000.00,
    vatAmount: 3450.00,
    date: new Date('2024-01-08'),
    status: 'PROCESSED',
    direction: 'out',
  },
]

const typeLabels: Record<string, string> = {
  INVOICE_ISSUED: 'Fatura Emitida',
  INVOICE_RECEIVED: 'Fatura Recebida',
  VAT_RETURN: 'Declaração IVA',
  EXEMPTION_APPLIED: 'Isenção Aplicada',
}

const statusLabels: Record<string, string> = {
  PROCESSED: 'Processado',
  PENDING: 'Pendente',
  SUBMITTED: 'Submetido',
}

const statusColors: Record<string, string> = {
  PROCESSED: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  SUBMITTED: 'bg-blue-100 text-blue-800',
}

export function RecentTransactions() {
  const getTransactionIcon = (type: string, direction: string) => {
    switch (type) {
      case 'VAT_RETURN':
        return <FileText className="h-4 w-4" />
      case 'EXEMPTION_APPLIED':
        return <Calendar className="h-4 w-4" />
      default:
        return direction === 'out' ? (
          <ArrowUpRight className="h-4 w-4" />
        ) : direction === 'in' ? (
          <ArrowDownRight className="h-4 w-4" />
        ) : (
          <Building2 className="h-4 w-4" />
        )
    }
  }

  const getTransactionColor = (type: string, direction: string) => {
    switch (type) {
      case 'VAT_RETURN':
        return 'text-blue-600 bg-blue-50'
      case 'EXEMPTION_APPLIED':
        return 'text-purple-600 bg-purple-50'
      default:
        return direction === 'out' 
          ? 'text-green-600 bg-green-50'
          : direction === 'in'
            ? 'text-orange-600 bg-orange-50'
            : 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Transações Recentes
        </CardTitle>
        <Button variant="outline" size="sm">
          Ver Todas
        </Button>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {mockTransactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-2 rounded-lg ${getTransactionColor(transaction.type, transaction.direction)}`}>
                {getTransactionIcon(transaction.type, transaction.direction)}
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">
                    {typeLabels[transaction.type]}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${statusColors[transaction.status]}`}
                  >
                    {statusLabels[transaction.status]}
                  </Badge>
                </div>
                
                <p className="text-sm text-gray-600">
                  {transaction.company}
                </p>
                
                <p className="text-xs text-gray-500 max-w-md truncate">
                  {transaction.description}
                </p>
              </div>
            </div>
            
            <div className="text-right space-y-1">
              <div className="space-y-1">
                {transaction.amount > 0 && (
                  <p className="text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.amount)}
                  </p>
                )}
                
                {transaction.vatAmount > 0 && (
                  <p className={`text-xs font-medium ${
                    transaction.direction === 'out' 
                      ? 'text-red-600' 
                      : transaction.direction === 'in'
                        ? 'text-green-600'
                        : 'text-blue-600'
                  }`}>
                    IVA: {formatCurrency(transaction.vatAmount)}
                  </p>
                )}
              </div>
              
              <p className="text-xs text-gray-500">
                {formatDate(transaction.date)}
              </p>
            </div>
          </motion.div>
        ))}
        
        {mockTransactions.length === 0 && (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhuma transação recente</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}