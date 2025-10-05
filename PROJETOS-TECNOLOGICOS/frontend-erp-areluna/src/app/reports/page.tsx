'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  FileText, 
  BarChart3, 
  TrendingUp,
  Calendar,
  Filter
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const monthlyRevenue = [
  { month: 'Jan', revenue: 850000, expenses: 620000 },
  { month: 'Fev', revenue: 920000, expenses: 680000 },
  { month: 'Mar', revenue: 1100000, expenses: 750000 },
  { month: 'Abr', revenue: 980000, expenses: 720000 },
  { month: 'Mai', revenue: 1250000, expenses: 850000 },
  { month: 'Jun', revenue: 1180000, expenses: 800000 },
]

const companyRevenue = [
  { name: 'Vespasian Ventures', value: 5000000, color: '#3B82F6' },
  { name: 'Instituto AreLuna', value: 2500000, color: '#10B981' },
  { name: 'Pinklegion', value: 1800000, color: '#F59E0B' },
  { name: 'ProStoral', value: 1200000, color: '#EF4444' },
  { name: 'Papagaio Fotogénico', value: 950000, color: '#8B5CF6' },
  { name: 'Nuvens Autóctones', value: 650000, color: '#06B6D4' },
]

const intercompanyOrders = [
  { month: 'Jan', orders: 45, value: 2300000 },
  { month: 'Fev', orders: 52, value: 2800000 },
  { month: 'Mar', orders: 48, value: 2600000 },
  { month: 'Abr', orders: 61, value: 3200000 },
  { month: 'Mai', orders: 55, value: 2900000 },
  { month: 'Jun', orders: 67, value: 3500000 },
]

const reports = [
  {
    title: 'Relatório Financeiro Mensal',
    description: 'Receitas, despesas e lucros por empresa',
    type: 'PDF',
    lastGenerated: '2024-01-15',
    size: '2.3 MB'
  },
  {
    title: 'Análise de Pedidos Intercompany',
    description: 'Movimentações entre empresas do grupo',
    type: 'Excel',
    lastGenerated: '2024-01-14',
    size: '1.8 MB'
  },
  {
    title: 'Relatório de Inventário',
    description: 'Stock e movimentações de produtos',
    type: 'PDF',
    lastGenerated: '2024-01-13',
    size: '3.1 MB'
  },
  {
    title: 'Performance por Departamento',
    description: 'KPIs e métricas departamentais',
    type: 'Excel',
    lastGenerated: '2024-01-12',
    size: '2.7 MB'
  }
]

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Análises e relatórios do Grupo AreLuna</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filtros
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <FileText className="mr-2 h-4 w-4" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Receita Total (6M)
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0))}
            </div>
            <p className="text-xs text-green-600">
              +18.2% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Pedidos Intercompany
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {intercompanyOrders.reduce((sum, item) => sum + item.orders, 0)}
            </div>
            <p className="text-xs text-blue-600">
              Últimos 6 meses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Margem de Lucro
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5%</div>
            <p className="text-xs text-green-600">
              +2.1% vs mês anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Relatórios Gerados
            </CardTitle>
            <FileText className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-600">
              Este mês
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue vs Expenses */}
        <Card>
          <CardHeader>
            <CardTitle>Receitas vs Despesas</CardTitle>
            <CardDescription>Comparação mensal dos últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyRevenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `€${(value / 1000)}K`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Bar dataKey="revenue" fill="#3B82F6" name="Receitas" />
                <Bar dataKey="expenses" fill="#EF4444" name="Despesas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Company Revenue Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Distribuição de Receitas</CardTitle>
            <CardDescription>Por empresa do grupo</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={companyRevenue}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent as number) * 100).toFixed(0)}%`}
                >
                  {companyRevenue.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Intercompany Orders Trend */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Evolução dos Pedidos Intercompany</CardTitle>
            <CardDescription>Número de pedidos e valor total por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={intercompanyOrders}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" tickFormatter={(value) => `${value}`} />
                <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `€${(value / 1000)}K`} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'orders' ? `${value} pedidos` : formatCurrency(Number(value)),
                    name === 'orders' ? 'Pedidos' : 'Valor Total'
                  ]}
                />
                <Bar yAxisId="left" dataKey="orders" fill="#10B981" name="orders" />
                <Line yAxisId="right" type="monotone" dataKey="value" stroke="#F59E0B" strokeWidth={3} name="value" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Relatórios Recentes</CardTitle>
          <CardDescription>Últimos relatórios gerados</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.title}</h4>
                    <p className="text-sm text-gray-600">{report.description}</p>
                    <p className="text-xs text-gray-500">
                      Gerado em {report.lastGenerated} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                    {report.type}
                  </span>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}