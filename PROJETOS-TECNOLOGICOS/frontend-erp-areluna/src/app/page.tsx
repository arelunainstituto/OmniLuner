'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  Users, 
  Package, 
  Truck, 
  Calendar, 
  FileText, 
  BarChart3, 
  ArrowUpRight,
  TrendingUp,
  DollarSign,
  FileSearch
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const stats = [
  {
    title: 'Receita Total',
    value: formatCurrency(2450000),
    change: '+12.5%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Pedidos Intercompany',
    value: '1,234',
    change: '+8.2%',
    icon: ArrowUpRight,
    trend: 'up'
  },
  {
    title: 'Empresas Ativas',
    value: '6',
    change: '0%',
    icon: Building2,
    trend: 'neutral'
  },
  {
    title: 'Entregas Pendentes',
    value: '45',
    change: '-5.1%',
    icon: Truck,
    trend: 'down'
  }
]

const quickActions = [
  { title: 'Novo Pedido Intercompany', icon: ArrowUpRight, href: '/intercompany/new' },
  { title: 'Relatório Financeiro', icon: FileText, href: '/reports/financial' },
  { title: 'Gestão de Inventário', icon: Package, href: '/catalog' },
  { title: 'Agendar Consulta', icon: Calendar, href: '/clinic/schedule' },
  { title: '2 Logs - Acesso Direto', icon: FileSearch, href: '/logs' },
]

const recentActivities = [
  { action: 'Pedido #IC-2024-001 aprovado', time: '2 min atrás', company: 'Instituto AreLuna' },
  { action: 'Entrega programada para amanhã', time: '15 min atrás', company: 'Pinklegion' },
  { action: 'Relatório mensal gerado', time: '1 hora atrás', company: 'ProStoral' },
  { action: 'Nova consulta agendada', time: '2 horas atrás', company: 'Instituto AreLuna' },
]

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral do Grupo AreLuna</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 
                'text-gray-600'
              }`}>
                {stat.change} desde o mês passado
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="w-full justify-start"
                asChild
              >
                <a href={action.href}>
                  <action.icon className="mr-2 h-4 w-4" />
                  {action.title}
                </a>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas movimentações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.company} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
