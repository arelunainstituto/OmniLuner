'use client'

import { useState } from 'react'
import { getTenantById } from '@/lib/tenant'
import { IntercompanyOrdersHeader } from '@/components/intercompany/orders-header'
import { IntercompanyOrdersList } from '@/components/intercompany/orders-list'
import { IntercompanyOrdersKanban } from '@/components/intercompany/orders-kanban'

export default function IntercompanyPage() {
  const [view, setView] = useState<'list' | 'kanban'>('list')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [selectedCompany, setSelectedCompany] = useState<string>('')

  // Get tenant from hostname (in real app, this would be from middleware)
  const tenant = getTenantById('instituto-areluna')

  if (!tenant) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-muted-foreground">Tenant not found</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Intercompany Orders</h1>
        <p className="text-muted-foreground">
          Manage orders between companies in the {tenant.displayName || tenant.name} group
        </p>
      </div>

      <IntercompanyOrdersHeader
        currentView={view}
        onViewChange={setView}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
      />

      {view === 'list' ? (
        <IntercompanyOrdersList
          tenantId={tenant.id}
          selectedStatus={selectedStatus}
          selectedCompany={selectedCompany}
        />
      ) : (
        <IntercompanyOrdersKanban
          tenantId={tenant.id}
          selectedStatus={selectedStatus}
          selectedCompany={selectedCompany}
        />
      )}
    </div>
  )
}