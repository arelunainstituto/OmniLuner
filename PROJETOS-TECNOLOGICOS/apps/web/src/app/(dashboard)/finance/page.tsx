'use client'

import { useState } from 'react'
import { getTenantById } from '@/lib/tenant'
import { FinanceHeader } from '@/components/finance/finance-header'
import { FinanceSummary } from '@/components/finance/finance-summary'
import { AccountsPayable } from '@/components/finance/accounts-payable'
import { AccountsReceivable } from '@/components/finance/accounts-receivable'
import { FinanceCharts } from '@/components/finance/finance-charts'
import { Skeleton } from '@/components/ui/skeleton'

type ViewType = 'summary' | 'payable' | 'receivable'
type PeriodFilter = 'monthly' | 'quarterly' | 'yearly'
type StatusFilter = 'all' | 'paid' | 'pending' | 'overdue'

export default function FinancePage() {
  const [currentView, setCurrentView] = useState<ViewType>('summary')
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('monthly')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  // Mock tenant - in real app, get from session/middleware
  const tenant = getTenantById('vespasian-ventures')

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status as StatusFilter)
  }

  const handlePeriodFilterChange = (period: string) => {
    setPeriodFilter(period as PeriodFilter)
  }

  const handleViewChange = (view: string) => {
    setCurrentView(view as ViewType)
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
      case 'summary':
        return (
          <div className="space-y-6">
            <FinanceSummary periodFilter={periodFilter} />
            <FinanceCharts periodFilter={periodFilter} />
          </div>
        )
      case 'payable':
        return (
          <AccountsPayable 
            statusFilter={statusFilter}
            periodFilter={periodFilter}
          />
        )
      case 'receivable':
        return (
          <AccountsReceivable 
            statusFilter={statusFilter}
            periodFilter={periodFilter}
          />
        )
      default:
        return (
          <div className="space-y-6">
            <FinanceSummary periodFilter={periodFilter} />
            <FinanceCharts periodFilter={periodFilter} />
          </div>
        )
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Finance</h1>
          <p className="text-muted-foreground">
            Manage accounts payable, receivable, and financial reporting
          </p>
        </div>
      </div>

      <FinanceHeader
        currentView={currentView}
        onViewChange={handleViewChange}
        periodFilter={periodFilter}
        onPeriodChange={handlePeriodFilterChange}
        statusFilter={statusFilter}
        onStatusChange={handleStatusFilterChange}
      />

      {renderContent()}
    </div>
  )
}