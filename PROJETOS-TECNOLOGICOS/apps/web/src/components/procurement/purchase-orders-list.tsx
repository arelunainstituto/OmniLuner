'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface PurchaseOrdersListProps {
  statusFilter: string
}

// Mock data for purchase orders
const mockPurchaseOrders = [
  {
    id: '1',
    orderNumber: 'PO-2024-001',
    supplier: 'TechCorp Solutions',
    status: 'approved',
    orderDate: '2024-01-16',
    expectedDelivery: '2024-01-30',
    totalAmount: 15000.00,
    itemsCount: 3,
    requestNumber: 'PR-2024-001'
  },
  {
    id: '2',
    orderNumber: 'PO-2024-002',
    supplier: 'Office Supplies Ltd',
    status: 'sent',
    orderDate: '2024-01-15',
    expectedDelivery: '2024-02-15',
    totalAmount: 8500.00,
    itemsCount: 2,
    requestNumber: 'PR-2024-002'
  },
  {
    id: '3',
    orderNumber: 'PO-2024-003',
    supplier: 'Emergency Repairs Inc',
    status: 'received',
    orderDate: '2024-01-14',
    expectedDelivery: '2024-01-25',
    totalAmount: 25000.00,
    itemsCount: 5,
    requestNumber: 'PR-2024-004'
  },
  {
    id: '4',
    orderNumber: 'PO-2024-004',
    supplier: 'Industrial Equipment Co',
    status: 'draft',
    orderDate: '2024-01-17',
    expectedDelivery: '2024-02-28',
    totalAmount: 12000.00,
    itemsCount: 2,
    requestNumber: 'PR-2024-005'
  }
]

const getStatusBadge = (status: string) => {
  const variants = {
    draft: 'secondary',
    approved: 'default',
    sent: 'default',
    received: 'default',
    invoiced: 'default',
    paid: 'default',
    cancelled: 'destructive'
  } as const

  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    approved: 'bg-green-100 text-green-800',
    sent: 'bg-blue-100 text-blue-800',
    received: 'bg-purple-100 text-purple-800',
    invoiced: 'bg-orange-100 text-orange-800',
    paid: 'bg-emerald-100 text-emerald-800',
    cancelled: 'bg-red-100 text-red-800'
  } as const

  return (
    <Badge 
      variant={variants[status as keyof typeof variants] || 'secondary'}
      className={colors[status as keyof typeof colors]}
    >
      {status.toUpperCase()}
    </Badge>
  )
}

export function PurchaseOrdersList({ statusFilter }: PurchaseOrdersListProps) {
  const filteredOrders = mockPurchaseOrders.filter(order => {
    return statusFilter === 'all' || order.status === statusFilter
  })

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Purchase Orders</h3>
          <span className="text-sm text-muted-foreground">
            {filteredOrders.length} orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-sm">Order #</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Supplier</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Order Date</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Expected Delivery</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Total Amount</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Items</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Request #</th>
                <th className="text-right py-3 px-2 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-2">
                    <div className="font-medium">{order.orderNumber}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-medium">{order.supplier}</div>
                  </td>
                  <td className="py-3 px-2">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {new Date(order.expectedDelivery).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 font-medium">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {order.itemsCount} items
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {order.requestNumber}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Icons.eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icons.edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icons.arrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No purchase orders found matching the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}