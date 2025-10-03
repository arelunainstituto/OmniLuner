'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface AccountsPayableProps {
  period: string
  statusFilter: string
}

// Mock accounts payable data
const mockPayables = [
  {
    id: '1',
    invoiceNumber: 'INV-2024-001',
    supplier: 'TechCorp Solutions',
    amount: 15000.00,
    dueDate: '2024-02-15',
    issueDate: '2024-01-16',
    status: 'pending',
    category: 'Equipment',
    paymentTerms: '30 days',
    purchaseOrder: 'PO-2024-001'
  },
  {
    id: '2',
    invoiceNumber: 'INV-2024-002',
    supplier: 'Office Supplies Ltd',
    amount: 2500.00,
    dueDate: '2024-01-30',
    issueDate: '2024-01-15',
    status: 'overdue',
    category: 'Office Supplies',
    paymentTerms: '15 days',
    purchaseOrder: 'PO-2024-002'
  },
  {
    id: '3',
    invoiceNumber: 'INV-2024-003',
    supplier: 'Emergency Repairs Inc',
    amount: 8750.00,
    dueDate: '2024-01-25',
    issueDate: '2024-01-14',
    status: 'paid',
    category: 'Maintenance',
    paymentTerms: 'Immediate',
    purchaseOrder: 'PO-2024-003'
  },
  {
    id: '4',
    invoiceNumber: 'INV-2024-004',
    supplier: 'Software Licensing Corp',
    amount: 12000.00,
    dueDate: '2024-02-20',
    issueDate: '2024-01-17',
    status: 'pending',
    category: 'Software',
    paymentTerms: '30 days',
    purchaseOrder: 'PO-2024-004'
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
    pending: 'bg-yellow-100 text-yellow-800',
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

export function AccountsPayable({ period, statusFilter }: AccountsPayableProps) {
  const filteredPayables = mockPayables.filter(payable => {
    if (statusFilter === 'all') return true
    
    const isOverdue = new Date(payable.dueDate) < new Date() && payable.status === 'pending'
    const actualStatus = isOverdue ? 'overdue' : payable.status
    
    return actualStatus === statusFilter
  })

  const totalAmount = filteredPayables.reduce((sum, payable) => sum + payable.amount, 0)
  const overdueAmount = filteredPayables
    .filter(p => new Date(p.dueDate) < new Date() && p.status === 'pending')
    .reduce((sum, payable) => sum + payable.amount, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payable</CardTitle>
            <Icons.dollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalAmount)}</div>
            <p className="text-xs text-muted-foreground">
              {filteredPayables.length} invoices
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
              Requires immediate attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Days</CardTitle>
            <Icons.calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">
              Payment cycle average
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Payables Table */}
      <Card>
        <CardHeader>
          <CardTitle>Accounts Payable</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-2 font-medium text-sm">Invoice #</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Supplier</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Amount</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Due Date</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Status</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Days</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">Category</th>
                  <th className="text-left py-3 px-2 font-medium text-sm">PO #</th>
                  <th className="text-right py-3 px-2 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayables.map((payable) => (
                  <tr key={payable.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">
                      <div className="font-medium">{payable.invoiceNumber}</div>
                    </td>
                    <td className="py-3 px-2">
                      <div className="font-medium">{payable.supplier}</div>
                    </td>
                    <td className="py-3 px-2 font-medium">
                      {formatCurrency(payable.amount)}
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {new Date(payable.dueDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2">
                      {getStatusBadge(payable.status, payable.dueDate)}
                    </td>
                    <td className="py-3 px-2 text-sm">
                      <span className={
                        payable.status === 'pending' && new Date(payable.dueDate) < new Date()
                          ? 'text-red-600 font-medium'
                          : 'text-muted-foreground'
                      }>
                        {getDaysUntilDue(payable.dueDate)}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {payable.category}
                    </td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">
                      {payable.purchaseOrder}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Icons.eye className="h-4 w-4" />
                        </Button>
                        {payable.status === 'pending' && (
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <Icons.check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredPayables.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No payable invoices found matching the current filters.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}