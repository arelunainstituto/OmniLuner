'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Icons } from '@/components/ui/icons'

interface FinanceHeaderProps {
  currentView: string
  selectedPeriod: string
  selectedStatus: string
  onViewChange: (view: string) => void
  onPeriodChange: (period: string) => void
  onStatusChange: (status: string) => void
}

export function FinanceHeader({
  currentView,
  selectedPeriod,
  selectedStatus,
  onViewChange,
  onPeriodChange,
  onStatusChange
}: FinanceHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex gap-2">
        <Button
          variant={currentView === 'summary' ? 'default' : 'outline'}
          onClick={() => onViewChange('summary')}
          className="flex items-center gap-2"
        >
          <Icons.dollarSign className="h-4 w-4" />
          Summary
        </Button>
        <Button
          variant={currentView === 'payable' ? 'default' : 'outline'}
          onClick={() => onViewChange('payable')}
          className="flex items-center gap-2"
        >
          <Icons.arrowRight className="h-4 w-4" />
          Accounts Payable
        </Button>
        <Button
          variant={currentView === 'receivable' ? 'default' : 'outline'}
          onClick={() => onViewChange('receivable')}
          className="flex items-center gap-2"
        >
          <Icons.arrowRight className="h-4 w-4 rotate-180" />
          Accounts Receivable
        </Button>
      </div>

      <div className="flex gap-2">
        <Select value={selectedPeriod} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current_month">Current Month</SelectItem>
            <SelectItem value="last_month">Last Month</SelectItem>
            <SelectItem value="current_quarter">Current Quarter</SelectItem>
            <SelectItem value="last_quarter">Last Quarter</SelectItem>
            <SelectItem value="current_year">Current Year</SelectItem>
            <SelectItem value="last_year">Last Year</SelectItem>
          </SelectContent>
        </Select>

        {(currentView === 'payable' || currentView === 'receivable') && (
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        )}

        <Button variant="outline" className="flex items-center gap-2">
          <Icons.arrowRight className="h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}