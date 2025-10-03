'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatCurrency } from '@/lib/utils'

interface FinanceChartsProps {
  period: string
}

// Mock chart data
const getChartData = (period: string) => {
  const monthlyData = [
    { month: 'Jan', revenue: 180000, expenses: 140000, profit: 40000 },
    { month: 'Feb', revenue: 195000, expenses: 145000, profit: 50000 },
    { month: 'Mar', revenue: 210000, expenses: 155000, profit: 55000 },
    { month: 'Apr', revenue: 225000, expenses: 160000, profit: 65000 },
    { month: 'May', revenue: 240000, expenses: 165000, profit: 75000 },
    { month: 'Jun', revenue: 255000, expenses: 170000, profit: 85000 }
  ]

  const cashFlowData = [
    { week: 'Week 1', inflow: 45000, outflow: 32000, net: 13000 },
    { week: 'Week 2', inflow: 52000, outflow: 38000, net: 14000 },
    { week: 'Week 3', inflow: 48000, outflow: 35000, net: 13000 },
    { week: 'Week 4', inflow: 55000, outflow: 42000, net: 13000 }
  ]

  return { monthlyData, cashFlowData }
}

export function FinanceCharts({ period }: FinanceChartsProps) {
  const { monthlyData, cashFlowData } = getChartData(period)

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Revenue vs Expenses Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {monthlyData.map((data, index) => (
              <div key={data.month} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{data.month}</span>
                  <span className="text-muted-foreground">
                    Profit: {formatCurrency(data.profit)}
                  </span>
                </div>
                <div className="space-y-1">
                  {/* Revenue Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16">Revenue</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(data.revenue / 300000) * 100}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                    <span className="text-xs w-20 text-right">
                      {formatCurrency(data.revenue)}
                    </span>
                  </div>
                  {/* Expenses Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16">Expenses</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(data.expenses / 300000) * 100}%`,
                          animationDelay: `${index * 100 + 50}ms`
                        }}
                      />
                    </div>
                    <span className="text-xs w-20 text-right">
                      {formatCurrency(data.expenses)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Cash Flow (Weekly)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cashFlowData.map((data, index) => (
              <div key={data.week} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{data.week}</span>
                  <span className={`font-medium ${
                    data.net >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    Net: {formatCurrency(data.net)}
                  </span>
                </div>
                <div className="space-y-1">
                  {/* Inflow Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16">Inflow</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(data.inflow / 70000) * 100}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                    <span className="text-xs w-20 text-right">
                      {formatCurrency(data.inflow)}
                    </span>
                  </div>
                  {/* Outflow Bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs w-16">Outflow</span>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${(data.outflow / 70000) * 100}%`,
                          animationDelay: `${index * 100 + 50}ms`
                        }}
                      />
                    </div>
                    <span className="text-xs w-20 text-right">
                      {formatCurrency(data.outflow)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Financial Ratios */}
      <Card>
        <CardHeader>
          <CardTitle>Key Financial Ratios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Profit Margin</span>
              <span className="text-lg font-bold text-green-600">24.5%</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Current Ratio</span>
              <span className="text-lg font-bold text-blue-600">2.8</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Quick Ratio</span>
              <span className="text-lg font-bold text-purple-600">1.9</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50">
              <span className="font-medium">Debt-to-Equity</span>
              <span className="text-lg font-bold text-orange-600">0.3</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Expenses Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Top Expense Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { category: 'Salaries & Benefits', amount: 85000, percentage: 45 },
              { category: 'Equipment & Technology', amount: 32000, percentage: 17 },
              { category: 'Office & Facilities', amount: 28000, percentage: 15 },
              { category: 'Marketing & Sales', amount: 22000, percentage: 12 },
              { category: 'Professional Services', amount: 18000, percentage: 9 },
              { category: 'Other', amount: 5000, percentage: 2 }
            ].map((expense, index) => (
              <div key={expense.category} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{expense.category}</span>
                  <span className="text-muted-foreground">
                    {formatCurrency(expense.amount)} ({expense.percentage}%)
                  </span>
                </div>
                <div className="bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${expense.percentage}%`,
                      animationDelay: `${index * 100}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}