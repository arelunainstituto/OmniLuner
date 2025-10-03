'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { Tenant } from '@/lib/tenant'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface IntercompanyOrdersHeaderProps {
  currentView: 'list' | 'kanban'
  onViewChange: (view: 'list' | 'kanban') => void
  selectedStatus: string
  onStatusChange: (status: string) => void
  selectedCompany: string
  onCompanyChange: (company: string) => void
}

const ORDER_STATUSES = [
  { value: 'DRAFT', label: 'Draft' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'APPROVED', label: 'Approved' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
]

// Mock companies for now - in real app, fetch from API
const COMPANIES = [
  { id: '1', name: 'Instituto AreLuna' },
  { id: '2', name: 'Pinklegion' },
  { id: '3', name: 'Papagaio Fotogénico' },
  { id: '4', name: 'Nuvens Autóctones' },
  { id: '5', name: 'ProStoral' },
]

export function IntercompanyOrdersHeader({
  currentView,
  onViewChange,
  selectedStatus,
  onStatusChange,
  selectedCompany,
  onCompanyChange,
}: IntercompanyOrdersHeaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleViewChange = (view: 'list' | 'kanban') => {
    onViewChange(view)
  }

  const handleStatusChange = (status: string) => {
    onStatusChange(status)
  }

  const handleCompanyChange = (company: string) => {
    onCompanyChange(company)
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Intercompany Orders</h1>
        <p className="text-muted-foreground">
          Manage orders between {tenant.displayName || tenant.name} companies
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        {/* View Toggle */}
        <div className="flex rounded-lg border p-1">
          <Button
            variant={currentView === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewChange('list')}
            className="h-8"
          >
            <Icons.list className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">List</span>
          </Button>
          <Button
            variant={currentView === 'kanban' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleViewChange('kanban')}
            className="h-8"
          >
            <Icons.kanban className="h-4 w-4" />
            <span className="ml-2 hidden sm:inline">Kanban</span>
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          <Select value={selectedStatus || 'all'} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              {ORDER_STATUSES.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCompany || 'all'} onValueChange={handleCompanyChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              {COMPANIES.map((company) => (
                <SelectItem key={company.id} value={company.id}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* New Order Button */}
        <Button>
          <Icons.plus className="h-4 w-4" />
          <span className="ml-2 hidden sm:inline">New Order</span>
        </Button>
      </div>
    </div>
  )
}