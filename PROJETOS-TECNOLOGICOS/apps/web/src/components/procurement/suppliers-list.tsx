'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface SuppliersListProps {
  statusFilter: string
}

// Mock data for suppliers
const mockSuppliers = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    email: 'contact@techcorp.com',
    phone: '+55 11 9999-8888',
    status: 'active',
    category: 'Technology',
    totalOrders: 15,
    totalSpent: 125000.00,
    lastOrderDate: '2024-01-16',
    rating: 4.8,
    paymentTerms: '30 days'
  },
  {
    id: '2',
    name: 'Office Supplies Ltd',
    email: 'sales@officesupplies.com',
    phone: '+55 11 8888-7777',
    status: 'active',
    category: 'Office Supplies',
    totalOrders: 28,
    totalSpent: 45000.00,
    lastOrderDate: '2024-01-15',
    rating: 4.5,
    paymentTerms: '15 days'
  },
  {
    id: '3',
    name: 'Emergency Repairs Inc',
    email: 'emergency@repairs.com',
    phone: '+55 11 7777-6666',
    status: 'active',
    category: 'Maintenance',
    totalOrders: 8,
    totalSpent: 85000.00,
    lastOrderDate: '2024-01-14',
    rating: 4.9,
    paymentTerms: 'Immediate'
  },
  {
    id: '4',
    name: 'Industrial Equipment Co',
    email: 'info@industrial.com',
    phone: '+55 11 6666-5555',
    status: 'inactive',
    category: 'Equipment',
    totalOrders: 5,
    totalSpent: 32000.00,
    lastOrderDate: '2023-12-20',
    rating: 4.2,
    paymentTerms: '45 days'
  },
  {
    id: '5',
    name: 'Software Licensing Corp',
    email: 'licenses@software.com',
    phone: '+55 11 5555-4444',
    status: 'pending',
    category: 'Software',
    totalOrders: 0,
    totalSpent: 0,
    lastOrderDate: null,
    rating: 0,
    paymentTerms: '30 days'
  }
]

const getStatusBadge = (status: string) => {
  const variants = {
    active: 'default',
    inactive: 'secondary',
    pending: 'default',
    blocked: 'destructive'
  } as const

  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    blocked: 'bg-red-100 text-red-800'
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

const getRatingStars = (rating: number) => {
  const stars = []
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span key={i} className={i <= rating ? 'text-yellow-400' : 'text-gray-300'}>
        ★
      </span>
    )
  }
  return <div className="flex">{stars}</div>
}

export function SuppliersList({ statusFilter }: SuppliersListProps) {
  const filteredSuppliers = mockSuppliers.filter(supplier => {
    return statusFilter === 'all' || supplier.status === statusFilter
  })

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Suppliers</h3>
          <span className="text-sm text-muted-foreground">
            {filteredSuppliers.length} suppliers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-sm">Supplier</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Contact</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Category</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Orders</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Total Spent</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Last Order</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Rating</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Payment Terms</th>
                <th className="text-right py-3 px-2 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSuppliers.map((supplier) => (
                <tr key={supplier.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-2">
                    <div className="font-medium">{supplier.name}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="text-sm">
                      <div>{supplier.email}</div>
                      <div className="text-muted-foreground">{supplier.phone}</div>
                    </div>
                  </td>
                  <td className="py-3 px-2">
                    {getStatusBadge(supplier.status)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {supplier.category}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {supplier.totalOrders}
                  </td>
                  <td className="py-3 px-2 font-medium">
                    {formatCurrency(supplier.totalSpent)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {supplier.lastOrderDate 
                      ? new Date(supplier.lastOrderDate).toLocaleDateString()
                      : 'Never'
                    }
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-1">
                      {getRatingStars(supplier.rating)}
                      <span className="text-sm text-muted-foreground ml-1">
                        {supplier.rating > 0 ? supplier.rating.toFixed(1) : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {supplier.paymentTerms}
                  </td>
                  <td className="py-3 px-2">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Icons.eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Icons.edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSuppliers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No suppliers found matching the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}