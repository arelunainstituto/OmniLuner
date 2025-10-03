'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface RequestsListProps {
  statusFilter: string
  priorityFilter: string
}

// Mock data for procurement requests
const mockRequests = [
  {
    id: '1',
    requestNumber: 'PR-2024-001',
    requester: 'João Silva',
    status: 'submitted',
    priority: 'high',
    requestedDate: '2024-01-15',
    requiredDate: '2024-01-30',
    totalEstimate: 15000.00,
    itemsCount: 3,
    justification: 'Equipment replacement for production line'
  },
  {
    id: '2',
    requestNumber: 'PR-2024-002',
    requester: 'Maria Santos',
    status: 'approved',
    priority: 'medium',
    requestedDate: '2024-01-14',
    requiredDate: '2024-02-15',
    totalEstimate: 8500.00,
    itemsCount: 2,
    justification: 'Office supplies and furniture'
  },
  {
    id: '3',
    requestNumber: 'PR-2024-003',
    requester: 'Carlos Oliveira',
    status: 'draft',
    priority: 'low',
    requestedDate: '2024-01-16',
    requiredDate: '2024-03-01',
    totalEstimate: 3200.00,
    itemsCount: 1,
    justification: 'Software licenses renewal'
  },
  {
    id: '4',
    requestNumber: 'PR-2024-004',
    requester: 'Ana Costa',
    status: 'in_progress',
    priority: 'urgent',
    requestedDate: '2024-01-13',
    requiredDate: '2024-01-25',
    totalEstimate: 25000.00,
    itemsCount: 5,
    justification: 'Emergency equipment repair'
  }
]

const getStatusBadge = (status: string) => {
  const variants = {
    draft: 'secondary',
    submitted: 'default',
    approved: 'default',
    rejected: 'destructive',
    in_progress: 'default',
    completed: 'default'
  } as const

  const colors = {
    draft: 'bg-gray-100 text-gray-800',
    submitted: 'bg-blue-100 text-blue-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-emerald-100 text-emerald-800'
  } as const

  return (
    <Badge 
      variant={variants[status as keyof typeof variants] || 'secondary'}
      className={colors[status as keyof typeof colors]}
    >
      {status.replace('_', ' ').toUpperCase()}
    </Badge>
  )
}

const getPriorityBadge = (priority: string) => {
  const colors = {
    low: 'bg-gray-100 text-gray-600',
    medium: 'bg-blue-100 text-blue-600',
    high: 'bg-orange-100 text-orange-600',
    urgent: 'bg-red-100 text-red-600'
  } as const

  return (
    <Badge 
      variant="outline" 
      className={colors[priority as keyof typeof colors]}
    >
      {priority.toUpperCase()}
    </Badge>
  )
}

export function RequestsList({ statusFilter, priorityFilter }: RequestsListProps) {
  const filteredRequests = mockRequests.filter(request => {
    const statusMatch = statusFilter === 'all' || request.status === statusFilter
    const priorityMatch = priorityFilter === 'all' || request.priority === priorityFilter
    return statusMatch && priorityMatch
  })

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Procurement Requests</h3>
          <span className="text-sm text-muted-foreground">
            {filteredRequests.length} requests
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-2 font-medium text-sm">Request #</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Requester</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Status</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Priority</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Requested</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Required By</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Estimate</th>
                <th className="text-left py-3 px-2 font-medium text-sm">Items</th>
                <th className="text-right py-3 px-2 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-muted/50">
                  <td className="py-3 px-2">
                    <div className="font-medium">{request.requestNumber}</div>
                  </td>
                  <td className="py-3 px-2">
                    <div className="font-medium">{request.requester}</div>
                  </td>
                  <td className="py-3 px-2">
                    {getStatusBadge(request.status)}
                  </td>
                  <td className="py-3 px-2">
                    {getPriorityBadge(request.priority)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {new Date(request.requestedDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {new Date(request.requiredDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-2 font-medium">
                    {formatCurrency(request.totalEstimate)}
                  </td>
                  <td className="py-3 px-2 text-sm text-muted-foreground">
                    {request.itemsCount} items
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

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No procurement requests found matching the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}