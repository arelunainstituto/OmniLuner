'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface AccountsReceivableProps {
  period: string
  statusFilter: string
}

// Mock accounts receivable data
const mockReceivables = [
  {
    id: '1',
    invoiceNumber: 'AR-2024-001',
    customer: 'Instituto AreLuna',
    amount: 25000.00,
    dueDate: '2024-02-10',
    issueDate: '2024-01-11',
    status: 'pending',
    service: 'Consulting Services',
    paymentTerms: '30 days',
    contactEmail: 'finance@instituto.areluna.com'
  },
  {
    id: '2',
    invoiceNumber: 'AR-2024-002',
    customer: 'Pinklegion',
    amount: 18500.00,
    dueDate: '2024-01-28',
    issueDate: '2024-01-13',
    status: 'overdue',
    service: 'Marketing Campaign',
    paymentTerms: '15 days',
    contactEmail: 'billing@pinklegion.com'
  },
  {
    id: '3',
    invoiceNumber: 'AR-2024-003',
    customer: 'Papagaio Fotogénico',
    amount: 12000.00,
    dueDate: '2024-01-20',
    issueDate: '2024-01-05',
    status: 'paid',
    service: 'Photography Services',
    paymentTerms: '15 days',
    contactEmail: 'admin@papagaio.com'
  },
  {
    id: '4',
    invoiceNumber: 'AR-2024-004',
    customer: 'Nuvens Autóctones',
    amount: 8750.00,
    dueDate: '2024-02-15',
    issueDate: '2024-01-16',
    status: 'pending',
    service: 'Cloud Services',
    paymentTerms: '30 days',
    contactEmail: 'finance@nuvens.com'
  },
  {
    id: '5',
    invoiceNumber: 'AR-2024-005',
    customer: 'ProStoral',
    amount: 15600.00,
    dueDate: '2024-02-05',
    issueDate: '2024-01-21',
    status: 'pending',
    service: 'Storage Solutions',
    paymentTerms: '15 days',
    contactEmail: 'accounts@prostoral.com'
  }
]

const getStatusBadge = (status: string, dueDate: string) => {
  const isOverdue = new Date(dueDate) < new Date() && status === 'pending'
  const actualStatus = isOverdue ? 'overdue' : status

  const variants = {
    pending: 'default',
    overdue: 'destructive',
    paid: 'default',
    cancelled: 'secondary'
  } as const

  const colors = {
    pending: 'bg-blue-100 text-blue-800',
    overdue: 'bg-red-100 text-red-800',
    paid: 'bg-green-100 text-green-800',
    cancelled: 'bg-gray-100 text-gray-800'
  } as const

  return (
    <Badge 
      variant={variants[actualStatus as keyof typeof variants] || 'secondary'}
      className={colors[actualStatus as keyof typeof colors]}
    >
      {actualStatus.toUpperCase()}
    </Badge>
  )
}

const getDaysUntilDue = (dueDate: string) => {
  const today = new Date()
  const due = new Date(dueDate)
  const diffTime = due.getTime() - today.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 0) {
    return `${Math.abs(diffDays)} days overdue`
  } else if (diffDays === 0) {
    return 'Due today'
  } else {
    return `${diffDays} days remaining`
  }
}

export function AccountsReceivable({ period, statusFilter }: AccountsReceivableProps) {
  const filteredReceivables = mockReceivables.filter(receivable => {
    if (statusFilter === 'all') return true
    
    const isOverdue = new Date(receivable.dueDate) < new Date() && receivable.status === 'pending'
    const actualStatus = isOverdue ? 'overdue' : receivable.status
    
    return actualStatus === statusFilter
  })

  const totalAmount = filteredReceivables.reduce((sum, receivable) => sum + receivable.amount, 0)
  const overdueAmount = filteredReceivables
    .filter(r => new Date(r.dueDate) < new Date() && r.status === 'pending')
    .reduce((sum, receivable) => sum + receivable.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Receivable</CardTitle>
            <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredReceivables.length} invoices
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Amount</CardTitle>
            <Icons.warning className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {formatCurrency(overdueAmount)}
            </div>
            <p className="text-xs text-muted-foreground">
              Requires follow-up
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
            <Icons.check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <p className="text-xs text-muted-foreground">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Receivables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts Receivable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-sm">Invoice #</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Customer</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Due Date</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Days</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Service</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Contact</th>
                  <th className="text-right py-3 px-2 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReceivables.map((receivable) => (
                  <tr key={receivable.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="font-medium">{receivable.invoiceNumber}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium">{receivable.customer}</div>
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {formatCurrency(receivable.amount)}
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {new Date(receivable.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(receivable.status, receivable.dueDate)}
                    </td>
                    <td className="py-3 px-2 text-sm">
                      <span className={
                        receivable.status === 'pending' && new Date(receivable.dueDate) < new Date()
                          ? 'text-red-600 font-medium'
                          : 'text-muted-foreground'
                      }>
                        {getDaysUntilDue(receivable.dueDate)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {receivable.service}
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {receivable.contactEmail}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Icons.eye className="h-4 w-4" />
                        </Button>
                        {receivable.status === 'pending' && (
                          <>
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <Icons.arrowRight className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <Icons.check className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredReceivables.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No receivable invoices found matching the current filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}