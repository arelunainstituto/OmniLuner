'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icons } from '@/components/ui/icons'

interface ProcurementHeaderProps {
  currentView: 'requests' | 'orders' | 'suppliers'
  onViewChange: (view: 'requests' | 'orders' | 'suppliers') => void
  statusFilter: string
  onStatusChange: (status: string) => void
  priorityFilter: string
  onPriorityChange: (priority: string) => void
}

export function ProcurementHeader({
  currentView,
  onViewChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
}: ProcurementHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      {/* View Toggle */}
      <div className="flex items-center gap-2">
        <Button
          variant={currentView === 'requests' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('requests')}
          className="flex items-center gap-2"
        >
          <Icons.post className="h-4 w-4" />
          Requests
        </Button>
        <Button
          variant={currentView === 'orders' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('orders')}
          className="flex items-center gap-2"
        >
          <Icons.package className="h-4 w-4" />
          Purchase Orders
        </Button>
        <Button
          variant={currentView === 'suppliers' ? 'default' : 'outline'}
          size="sm"
          onClick={() => onViewChange('suppliers')}
          className="flex items-center gap-2"
        >
          <Icons.building className="h-4 w-4" />
          Suppliers
        </Button>
      </div>

      {/* Filters */}
      {currentView !== 'suppliers' && (
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Button size="sm" className="flex items-center gap-2">
            <Icons.plus className="h-4 w-4" />
            New {currentView === 'requests' ? 'Request' : 'Order'}
          </Button>
        </div>
      )}

      {currentView === 'suppliers' && (
        <Button size="sm" className="flex items-center gap-2">
          <Icons.plus className="h-4 w-4" />
          New Supplier
        </Button>
      )}
    </div>
  )
}