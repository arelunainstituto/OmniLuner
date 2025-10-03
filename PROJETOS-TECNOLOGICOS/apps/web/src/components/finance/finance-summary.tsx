'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { formatCurrency } from '@/lib/utils'

interface FinanceSummaryProps {
  period: string
}

// Mock financial data
const getFinancialData = (period: string) => {
  const baseData = {
    totalRevenue: 2450000.00,
    totalExpenses: 1850000.00,
    accountsPayable: 320000.00,
    accountsReceivable: 180000.00,
    cashFlow: 600000.00,
    overduePayables: 45000.00,
    overdueReceivables: 25000.00,
    netProfit: 600000.00
  }

  // Simulate different periods with variations
  const multipliers = {
    current_month: 1,
    last_month: 0.95,
    current_quarter: 3.2,
    last_quarter: 3.0,
    current_year: 12.5,
    last_year: 11.8
  }

  const multiplier = multipliers[period as keyof typeof multipliers] || 1

  return {
    totalRevenue: baseData.totalRevenue * multiplier,
    totalExpenses: baseData.totalExpenses * multiplier,
    accountsPayable: baseData.accountsPayable,
    accountsReceivable: baseData.accountsReceivable,
    cashFlow: baseData.cashFlow * multiplier,
    overduePayables: baseData.overduePayables,
    overdueReceivables: baseData.overdueReceivables,
    netProfit: (baseData.totalRevenue - baseData.totalExpenses) * multiplier
  }
}

export function FinanceSummary({ period }: FinanceSummaryProps) {
  const data = getFinancialData(period)

  const summaryCards = [
    {
      title: 'Total Revenue',
      value: data.totalRevenue,
      icon: Icons.dollarSign,
      trend: '+12.5%',
      trendUp: true,
      description: 'vs previous period'
    },
    {
      title: 'Total Expenses',
      value: data.totalExpenses,
      icon: Icons.arrowRight,
      trend: '+8.2%',
      trendUp: false,
      description: 'vs previous period'
    },
    {
      title: 'Net Profit',
      value: data.netProfit,
      icon: Icons.dollarSign,
      trend: '+18.7%',
      trendUp: true,
      description: 'vs previous period'
    },
    {
      title: 'Cash Flow',
      value: data.cashFlow,
      icon: Icons.dollarSign,
      trend: '+5.4%',
      trendUp: true,
      description: 'vs previous period'
    }
  ]

  const accountsCards = [
    {
      title: 'Accounts Payable',
      value: data.accountsPayable,
      overdue: data.overduePayables,
      icon: Icons.arrowRight,
      color: 'text-red-600'
    },
    {
      title: 'Accounts Receivable',
      value: data.accountsReceivable,
      overdue: data.overdueReceivables,
      icon: Icons.arrowRight,
      color: 'text-green-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Main Financial Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(card.value)}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className={card.trendUp ? 'text-green-600' : 'text-red-600'}>
                  {card.trend}
                </span>{' '}
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Accounts Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        {accountsCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(card.value)}
              </div>
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">Overdue: </span>
                <span className="font-medium text-red-600">
                  {formatCurrency(card.overdue)}
                </span>
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {((card.overdue / card.value) * 100).toFixed(1)}% of total
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <Icons.plus className="h-5 w-5 text-blue-600" />
              <div>
                <div className="font-medium">Create Invoice</div>
                <div className="text-sm text-muted-foreground">Generate new invoice</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <Icons.eye className="h-5 w-5 text-green-600" />
              <div>
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-muted-foreground">Financial reports</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 cursor-pointer">
              <Icons.settings className="h-5 w-5 text-purple-600" />
              <div>
                <div className="font-medium">Settings</div>
                <div className="text-sm text-muted-foreground">Configure finance</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}