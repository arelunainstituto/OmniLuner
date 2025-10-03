'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface IntercompanyOrder {
  id: string
  orderNumber: string
  fromCompany: { name: string }
  toCompany: { name: string }
  status: string
  priority: string
  totalAmount: number
  currency: string
  requestedDate: string
  requiredDate?: string
  itemsCount: number
}

interface IntercompanyOrdersListProps {
  tenantId: string
  selectedStatus?: string
  selectedCompany?: string
}

// Mock data - in real app, fetch from API
const mockOrders: IntercompanyOrder[] = [
  {
    id: '1',
    orderNumber: 'ICO-2024-001',
    fromCompany: { name: 'Instituto AreLuna' },
    toCompany: { name: 'ProStoral' },
    status: 'PENDING',
    priority: 'HIGH',
    totalAmount: 15000,
    currency: 'BRL',
    requestedDate: '2024-01-15',
    requiredDate: '2024-01-30',
    itemsCount: 5,
  },
  {
    id: '2',
    orderNumber: 'ICO-2024-002',
    fromCompany: { name: 'Pinklegion' },
    toCompany: { name: 'Nuvens Autóctones' },
    status: 'APPROVED',
    priority: 'MEDIUM',
    totalAmount: 8500,
    currency: 'BRL',
    requestedDate: '2024-01-16',
    requiredDate: '2024-02-05',
    itemsCount: 3,
  },
  {
    id: '3',
    orderNumber: 'ICO-2024-003',
    fromCompany: { name: 'Papagaio Fotogénico' },
    toCompany: { name: 'Instituto AreLuna' },
    status: 'IN_PROGRESS',
    priority: 'LOW',
    totalAmount: 3200,
    currency: 'BRL',
    requestedDate: '2024-01-17',
    itemsCount: 2,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case 'DRAFT':
      return 'bg-gray-100 text-gray-800'
    case 'PENDING':
      return 'bg-yellow-100 text-yellow-800'
    case 'APPROVED':
      return 'bg-green-100 text-green-800'
    case 'IN_PROGRESS':
      return 'bg-blue-100 text-blue-800'
    case 'COMPLETED':
      return 'bg-emerald-100 text-emerald-800'
    case 'CANCELLED':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-100 text-red-800'
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800'
    case 'LOW':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export function IntercompanyOrdersList({
  tenantId,
  selectedStatus,
  selectedCompany,
}: IntercompanyOrdersListProps) {
  const [orders, setOrders] = useState<IntercompanyOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true)
      // Filter mock data based on selected filters
      let filteredOrders = mockOrders

      if (selectedStatus) {
        filteredOrders = filteredOrders.filter(order => order.status === selectedStatus)
      }

      if (selectedCompany) {
        filteredOrders = filteredOrders.filter(
          order => order.fromCompany.name.includes(selectedCompany) || 
                   order.toCompany.name.includes(selectedCompany)
        )
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setOrders(filteredOrders)
      setLoading(false)
    }

    fetchOrders()
  }, [tenantId, selectedStatus, selectedCompany])

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Icons.package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No orders found</h3>
          <p className="text-muted-foreground text-center mb-4">
            No intercompany orders match your current filters.
          </p>
          <Button>
            <Icons.plus className="h-4 w-4 mr-2" />
            Create New Order
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">
                {order.orderNumber}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getPriorityColor(order.priority)}>
                  {order.priority}
                </Badge>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.replace('_', ' ')}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">From</p>
                <p className="font-medium">{order.fromCompany.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">To</p>
                <p className="font-medium">{order.toCompany.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Amount</p>
                <p className="font-medium">
                  {formatCurrency(order.totalAmount, order.currency)}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Items</p>
                <p className="font-medium">{order.itemsCount} items</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Requested: {new Date(order.requestedDate).toLocaleDateString()}</span>
                {order.requiredDate && (
                  <span>Required: {new Date(order.requiredDate).toLocaleDateString()}</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Icons.eye className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button variant="outline" size="sm">
                  <Icons.edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}