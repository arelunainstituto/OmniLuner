'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'
import { cn } from '@/lib/utils'

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

interface IntercompanyOrdersKanbanProps {
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
  {
    id: '4',
    orderNumber: 'ICO-2024-004',
    fromCompany: { name: 'Vespasian Ventures' },
    toCompany: { name: 'Instituto AreLuna' },
    status: 'DRAFT',
    priority: 'MEDIUM',
    totalAmount: 12000,
    currency: 'BRL',
    requestedDate: '2024-01-18',
    itemsCount: 4,
  },
  {
    id: '5',
    orderNumber: 'ICO-2024-005',
    fromCompany: { name: 'ProStoral' },
    toCompany: { name: 'Pinklegion' },
    status: 'COMPLETED',
    priority: 'HIGH',
    totalAmount: 25000,
    currency: 'BRL',
    requestedDate: '2024-01-10',
    requiredDate: '2024-01-25',
    itemsCount: 8,
  },
]

const statusColumns = [
  { id: 'DRAFT', title: 'Draft', color: 'bg-gray-50 border-gray-200' },
  { id: 'PENDING', title: 'Pending Approval', color: 'bg-yellow-50 border-yellow-200' },
  { id: 'APPROVED', title: 'Approved', color: 'bg-green-50 border-green-200' },
  { id: 'IN_PROGRESS', title: 'In Progress', color: 'bg-blue-50 border-blue-200' },
  { id: 'COMPLETED', title: 'Completed', color: 'bg-emerald-50 border-emerald-200' },
  { id: 'CANCELLED', title: 'Cancelled', color: 'bg-red-50 border-red-200' },
]

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'HIGH':
      return 'bg-red-100 text-red-800 border-red-200'
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    case 'LOW':
      return 'bg-green-100 text-green-800 border-green-200'
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200'
  }
}

function OrderCard({ order }: { order: IntercompanyOrder }) {
  return (
    <Card className="mb-3 hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">
            {order.orderNumber}
          </CardTitle>
          <Badge className={cn('text-xs', getPriorityColor(order.priority))}>
            {order.priority}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <Icons.building className="h-3 w-3 mr-1" />
            <span className="truncate">{order.fromCompany.name}</span>
            <Icons.arrowRight className="h-3 w-3 mx-1" />
            <span className="truncate">{order.toCompany.name}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              {formatCurrency(order.totalAmount, order.currency)}
            </span>
            <span className="text-xs text-muted-foreground">
              {order.itemsCount} items
            </span>
          </div>
          
          <div className="text-xs text-muted-foreground">
            Requested: {new Date(order.requestedDate).toLocaleDateString()}
          </div>
          
          {order.requiredDate && (
            <div className="text-xs text-muted-foreground">
              Required: {new Date(order.requiredDate).toLocaleDateString()}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-1 mt-3">
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Icons.eye className="h-3 w-3 mr-1" />
            View
          </Button>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Icons.edit className="h-3 w-3 mr-1" />
            Edit
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export function IntercompanyOrdersKanban({
  tenantId,
  selectedStatus,
  selectedCompany,
}: IntercompanyOrdersKanbanProps) {
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

  // Group orders by status
  const ordersByStatus = statusColumns.reduce((acc, column) => {
    acc[column.id] = orders.filter(order => order.status === column.id)
    return acc
  }, {} as Record<string, IntercompanyOrder[]>)

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statusColumns.map((column) => (
          <div key={column.id} className="space-y-3">
            <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            {Array.from({ length: 2 }).map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {statusColumns.map((column) => {
        const columnOrders = ordersByStatus[column.id] || []
        
        return (
          <div key={column.id} className="space-y-3">
            <div className={cn(
              'rounded-lg border-2 border-dashed p-3',
              column.color
            )}>
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{column.title}</h3>
                <Badge variant="secondary" className="text-xs">
                  {columnOrders.length}
                </Badge>
              </div>
            </div>
            
            <div className="min-h-[200px]">
              {columnOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Icons.package className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">No orders</p>
                </div>
              ) : (
                columnOrders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))
              )}
            </div>
            
            {column.id === 'DRAFT' && (
              <Button variant="outline" size="sm" className="w-full">
                <Icons.plus className="h-4 w-4 mr-2" />
                Add Order
              </Button>
            )}
          </div>
        )
      })}
    </div>
  )
}