'use client'

import { useState } from 'react'
import { getTenantById } from '@/lib/tenant'
import { ProcurementHeader } from '@/components/procurement/procurement-header'
import { RequestsList } from '@/components/procurement/requests-list'
import { PurchaseOrdersList } from '@/components/procurement/purchase-orders-list'
import { SuppliersList } from '@/components/procurement/suppliers-list'
import { Skeleton } from '@/components/ui/skeleton'

type ViewType = 'requests' | 'orders' | 'suppliers'
type StatusFilter = 'all' | 'draft' | 'submitted' | 'approved' | 'rejected'

export default function ProcurementPage() {
  const [currentView, setCurrentView] = useState<ViewType>('requests')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<string>('all')

  // Mock tenant - in real app, get from session/middleware
  const tenant = getTenantById('vespasian-ventures')

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status as StatusFilter)
  }

  if (!tenant) {
    return (
      <div className="container mx-auto py-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-96 w-full" />
      </div>
    )
  }

  const renderContent = () => {
    switch (currentView) {
      case 'requests':
        return (
          <RequestsList 
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
          />
        )
      case 'orders':
        return (
          <PurchaseOrdersList 
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
          />
        )
      case 'suppliers':
        return <SuppliersList />
      default:
        return <RequestsList statusFilter={statusFilter} priorityFilter={priorityFilter} />
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Procurement & Finance</h1>
          <p className="text-muted-foreground">
            Manage procurement requests, purchase orders, and suppliers
          </p>
        </div>
      </div>

      <ProcurementHeader
        currentView={currentView}
        onViewChange={setCurrentView}
        statusFilter={statusFilter}
        onStatusChange={handleStatusFilterChange}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
      />

      {renderContent()}
    </div>
  )
}