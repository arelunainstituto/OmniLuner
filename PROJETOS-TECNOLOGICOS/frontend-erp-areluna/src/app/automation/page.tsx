'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Zap, 
  Play, 
  Pause, 
  Settings, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Bot,
  Workflow,
  Timer,
  Target,
  BarChart3,
  Users,
  ShoppingCart,
  DollarSign,
  Calendar,
  Mail,
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  RefreshCw
} from 'lucide-react'

export default function AutomationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock data para automações
  const automations = [
    {
      id: 1,
      name: 'Reabastecimento Automático',
      description: 'Gera pedidos de compra automaticamente quando estoque atinge nível mínimo',
      category: 'procurement',
      status: 'active',
      trigger: 'Estoque < 20%',
      action: 'Criar pedido de compra',
      frequency: 'Tempo real',
      lastRun: '2024-01-15 14:30',
      nextRun: 'Contínuo',
      success: 98.5,
      savings: 'R$ 45.000/mês',
      executions: 247
    },
    {
      id: 2,
      name: 'Onboarding Colaboradores',
      description: 'Automatiza processo de integração de novos funcionários',
      category: 'hr',
      status: 'active',
      trigger: 'Novo colaborador cadastrado',
      action: 'Enviar kit de boas-vindas + tarefas',
      frequency: 'Por evento',
      lastRun: '2024-01-14 09:15',
      nextRun: 'Por demanda',
      success: 95.2,
      savings: '15h/semana',
      executions: 23
    },
    {
      id: 3,
      name: 'Conciliação Bancária',
      description: 'Concilia automaticamente extratos bancários com lançamentos',
      category: 'finance',
      status: 'active',
      trigger: 'Novo extrato bancário',
      action: 'Conciliar lançamentos',
      frequency: 'Diário às 08:00',
      lastRun: '2024-01-15 08:00',
      nextRun: '2024-01-16 08:00',
      success: 92.8,
      savings: 'R$ 12.000/mês',
      executions: 156
    },
    {
      id: 4,
      name: 'Aprovação Inteligente',
      description: 'Aprova automaticamente pedidos de baixo valor com base no histórico',
      category: 'procurement',
      status: 'paused',
      trigger: 'Pedido < R$ 5.000',
      action: 'Aprovar automaticamente',
      frequency: 'Tempo real',
      lastRun: '2024-01-10 16:45',
      nextRun: 'Pausado',
      success: 89.3,
      savings: 'R$ 8.500/mês',
      executions: 89
    },
    {
      id: 5,
      name: 'Feedback Automático',
      description: 'Envia pesquisas de satisfação automaticamente após consultas',
      category: 'hr',
      status: 'active',
      trigger: 'Consulta finalizada',
      action: 'Enviar pesquisa NPS',
      frequency: 'Por evento',
      lastRun: '2024-01-15 17:20',
      nextRun: 'Por demanda',
      success: 87.1,
      savings: '8h/semana',
      executions: 342
    },
    {
      id: 6,
      name: 'Relatórios Financeiros',
      description: 'Gera e envia relatórios financeiros automaticamente',
      category: 'finance',
      status: 'active',
      trigger: 'Final do mês',
      action: 'Gerar e enviar relatórios',
      frequency: 'Mensal',
      lastRun: '2024-01-01 00:00',
      nextRun: '2024-02-01 00:00',
      success: 100,
      savings: 'R$ 6.000/mês',
      executions: 12
    }
  ]

  const automationStats = [
    {
      title: 'Automações Ativas',
      value: '18',
      change: '+3',
      trend: 'up',
      icon: Zap
    },
    {
      title: 'Economia Total',
      value: 'R$ 127K',
      change: '+R$ 23K',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Horas Poupadas',
      value: '342h',
      change: '+67h',
      trend: 'up',
      icon: Clock
    },
    {
      title: 'Taxa de Sucesso',
      value: '94.2%',
      change: '+1.8%',
      trend: 'up',
      icon: Target
    }
  ]

  const categoryConfig = {
    procurement: { label: 'Procurement', color: 'bg-blue-100 text-blue-800', icon: ShoppingCart },
    hr: { label: 'RH', color: 'bg-green-100 text-green-800', icon: Users },
    finance: { label: 'Financeiro', color: 'bg-purple-100 text-purple-800', icon: DollarSign },
    logistics: { label: 'Logística', color: 'bg-orange-100 text-orange-800', icon: Calendar }
  }

  const statusConfig = {
    active: { label: 'Ativo', color: 'bg-green-100 text-green-800', icon: Play },
    paused: { label: 'Pausado', color: 'bg-yellow-100 text-yellow-800', icon: Pause },
    error: { label: 'Erro', color: 'bg-red-100 text-red-800', icon: AlertTriangle }
  }

  const filteredAutomations = automations.filter(automation => {
    const matchesSearch = automation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         automation.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || automation.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || automation.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const templates = [
    {
      id: 1,
      name: 'Aprovação de Despesas',
      description: 'Automatiza aprovação de despesas até R$ 1.000',
      category: 'finance',
      complexity: 'Simples',
      estimatedTime: '15 min'
    },
    {
      id: 2,
      name: 'Agendamento Inteligente',
      description: 'Otimiza agendamentos com base na disponibilidade',
      category: 'clinic',
      complexity: 'Médio',
      estimatedTime: '30 min'
    },
    {
      id: 3,
      name: 'Gestão de Estoque',
      description: 'Monitora e reabastece estoque automaticamente',
      category: 'procurement',
      complexity: 'Avançado',
      estimatedTime: '45 min'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Bot className="h-8 w-8 text-blue-600" />
              Automação de Processos
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie e monitore automações inteligentes em todos os módulos
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relatório
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Automação
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {automationStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-sm font-medium text-green-600">
                          {stat.change}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="automations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="automations">Automações Ativas</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab: Automações Ativas */}
          <TabsContent value="automations" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar automações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                      <SelectItem value="hr">RH</SelectItem>
                      <SelectItem value="finance">Financeiro</SelectItem>
                      <SelectItem value="logistics">Logística</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full lg:w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="paused">Pausado</SelectItem>
                      <SelectItem value="error">Erro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Automações */}
            <div className="grid gap-6">
              {filteredAutomations.map((automation) => {
                const categoryInfo = categoryConfig[automation.category as keyof typeof categoryConfig]
                const statusInfo = statusConfig[automation.status as keyof typeof statusConfig]
                const CategoryIcon = categoryInfo.icon
                const StatusIcon = statusInfo.icon

                return (
                  <Card key={automation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <CategoryIcon className="h-5 w-5" />
                              {automation.name}
                            </CardTitle>
                            <Badge variant="outline" className={categoryInfo.color}>
                              {categoryInfo.label}
                            </Badge>
                            <Badge variant="outline" className={statusInfo.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <CardDescription className="text-base">
                            {automation.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Detalhes da Automação */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Gatilho</p>
                            <p className="text-sm text-gray-900">{automation.trigger}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Ação</p>
                            <p className="text-sm text-gray-900">{automation.action}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-600 mb-1">Frequência</p>
                            <p className="text-sm text-gray-900">{automation.frequency}</p>
                          </div>
                        </div>

                        {/* Métricas */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-green-900">Taxa de Sucesso</p>
                            <p className="text-lg font-bold text-green-700">{automation.success}%</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Economia</p>
                            <p className="text-lg font-bold text-blue-700">{automation.savings}</p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-purple-900">Execuções</p>
                            <p className="text-lg font-bold text-purple-700">{automation.executions}</p>
                          </div>
                          <div className="bg-orange-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-orange-900">Próxima Execução</p>
                            <p className="text-sm font-bold text-orange-700">{automation.nextRun}</p>
                          </div>
                        </div>

                        {/* Barra de Progresso */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Performance</span>
                            <span>{automation.success}%</span>
                          </div>
                          <Progress value={automation.success} className="h-2" />
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex gap-3">
                          {automation.status === 'active' ? (
                            <Button variant="outline" size="sm">
                              <Pause className="h-4 w-4 mr-2" />
                              Pausar
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Ativar
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Logs
                          </Button>
                          <Button variant="outline" size="sm">
                            <Timer className="h-4 w-4 mr-2" />
                            Executar Agora
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tab: Templates */}
          <TabsContent value="templates" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Workflow className="h-5 w-5" />
                  Templates de Automação
                </CardTitle>
                <CardDescription>
                  Modelos pré-configurados para criar automações rapidamente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Categoria:</span>
                            <Badge variant="outline">{template.category}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Complexidade:</span>
                            <Badge variant="secondary">{template.complexity}</Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Tempo estimado:</span>
                            <span className="text-sm font-medium">{template.estimatedTime}</span>
                          </div>
                          <Button className="w-full mt-4">
                            Usar Template
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Procurement</span>
                      <span className="text-blue-600 font-bold">93.9%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">RH</span>
                      <span className="text-green-600 font-bold">91.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Financeiro</span>
                      <span className="text-purple-600 font-bold">96.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Economia Mensal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-900">Economia Financeira</p>
                        <p className="text-sm text-green-700">R$ 71.500/mês</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-blue-900">Tempo Poupado</p>
                        <p className="text-sm text-blue-700">342 horas/mês</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium text-purple-900">Processos Automatizados</p>
                        <p className="text-sm text-purple-700">1.247 este mês</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}