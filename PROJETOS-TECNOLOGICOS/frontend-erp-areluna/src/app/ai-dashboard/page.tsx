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
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Target,
  Zap,
  BarChart3,
  PieChart,
  LineChart,
  Activity,
  Lightbulb,
  Shield,
  Rocket,
  Search,
  Filter,
  RefreshCw,
  Download,
  Settings
} from 'lucide-react'

export default function AIDashboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('30d')
  const [selectedModule, setSelectedModule] = useState('all')

  // Mock data para previsões de IA
  const aiPredictions = [
    {
      id: 1,
      type: 'demand',
      title: 'Previsão de Demanda - Produtos Médicos',
      prediction: 'Aumento de 23% na demanda por equipamentos de diagnóstico nos próximos 30 dias',
      confidence: 87,
      impact: 'high',
      action: 'Aumentar estoque em 15% até 15/02',
      module: 'procurement',
      trend: 'up'
    },
    {
      id: 2,
      type: 'risk',
      title: 'Risco de Ruptura - Fornecedor Principal',
      prediction: 'Fornecedor XYZ pode ter atrasos de 5-7 dias devido a greve no setor',
      confidence: 92,
      impact: 'critical',
      action: 'Ativar fornecedor alternativo imediatamente',
      module: 'logistics',
      trend: 'down'
    },
    {
      id: 3,
      type: 'opportunity',
      title: 'Oportunidade de Otimização - Rotas',
      prediction: 'Reorganização de rotas pode reduzir custos em 18%',
      confidence: 78,
      impact: 'medium',
      action: 'Implementar nova matriz de rotas',
      module: 'logistics',
      trend: 'up'
    },
    {
      id: 4,
      type: 'financial',
      title: 'Previsão Financeira - Fluxo de Caixa',
      prediction: 'Entrada de R$ 2.3M esperada nos próximos 15 dias',
      confidence: 85,
      impact: 'high',
      action: 'Planejar investimentos estratégicos',
      module: 'finance',
      trend: 'up'
    },
    {
      id: 5,
      type: 'hr',
      title: 'Análise de Turnover - Departamento TI',
      prediction: 'Risco de saída de 2-3 colaboradores chave no Q1',
      confidence: 73,
      impact: 'medium',
      action: 'Iniciar plano de retenção de talentos',
      module: 'hr',
      trend: 'down'
    }
  ]

  const aiMetrics = [
    {
      title: 'Precisão das Previsões',
      value: '89.2%',
      change: '+2.1%',
      trend: 'up',
      icon: Target
    },
    {
      title: 'Alertas Processados',
      value: '247',
      change: '+18',
      trend: 'up',
      icon: Zap
    },
    {
      title: 'Economia Gerada',
      value: 'R$ 1.2M',
      change: '+R$ 180K',
      trend: 'up',
      icon: TrendingUp
    },
    {
      title: 'Tempo de Resposta',
      value: '2.3s',
      change: '-0.5s',
      trend: 'up',
      icon: Activity
    }
  ]

  const automationSuggestions = [
    {
      id: 1,
      title: 'Reabastecimento Automático',
      description: 'Configurar pedidos automáticos quando estoque atingir 20%',
      module: 'Procurement',
      priority: 'high',
      savings: 'R$ 45K/mês'
    },
    {
      id: 2,
      title: 'Aprovação Inteligente',
      description: 'IA pode aprovar automaticamente pedidos até R$ 5K com base no histórico',
      module: 'Finance',
      priority: 'medium',
      savings: '15h/semana'
    },
    {
      id: 3,
      title: 'Agendamento Otimizado',
      description: 'Otimizar agenda médica com base em padrões de no-show',
      module: 'Clinic',
      priority: 'high',
      savings: '23% ocupação'
    }
  ]

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'critical': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive'
      case 'medium': return 'secondary'
      case 'low': return 'outline'
      default: return 'outline'
    }
  }

  const filteredPredictions = aiPredictions.filter(prediction => {
    const matchesSearch = prediction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prediction.prediction.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModule = selectedModule === 'all' || prediction.module === selectedModule
    return matchesSearch && matchesModule
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Brain className="h-8 w-8 text-blue-600" />
              Dashboard Preditivo IA
            </h1>
            <p className="text-gray-600 mt-1">
              Inteligência artificial para previsões e automações inteligentes
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>

        {/* Métricas de IA */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {aiMetrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${
                          metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
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
        <Tabs defaultValue="predictions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="predictions">Previsões IA</TabsTrigger>
            <TabsTrigger value="automation">Automações</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          {/* Tab: Previsões IA */}
          <TabsContent value="predictions" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar previsões..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedModule} onValueChange={setSelectedModule}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Módulo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Módulos</SelectItem>
                      <SelectItem value="procurement">Procurement</SelectItem>
                      <SelectItem value="logistics">Logística</SelectItem>
                      <SelectItem value="finance">Finanças</SelectItem>
                      <SelectItem value="hr">RH</SelectItem>
                      <SelectItem value="clinic">Clínica</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-full lg:w-32">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 dias</SelectItem>
                      <SelectItem value="30d">30 dias</SelectItem>
                      <SelectItem value="90d">90 dias</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Previsões */}
            <div className="grid gap-6">
              {filteredPredictions.map((prediction) => (
                <Card key={prediction.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-lg">{prediction.title}</CardTitle>
                          <Badge variant="outline" className="capitalize">
                            {prediction.module}
                          </Badge>
                          <Badge 
                            variant={prediction.trend === 'up' ? 'default' : 'destructive'}
                            className="flex items-center gap-1"
                          >
                            {prediction.trend === 'up' ? (
                              <TrendingUp className="h-3 w-3" />
                            ) : (
                              <TrendingDown className="h-3 w-3" />
                            )}
                            {prediction.trend === 'up' ? 'Positivo' : 'Atenção'}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">
                          {prediction.prediction}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getImpactColor(prediction.impact)}`} />
                        <span className="text-sm font-medium capitalize">{prediction.impact}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Confiança */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Confiança da IA</span>
                          <span>{prediction.confidence}%</span>
                        </div>
                        <Progress value={prediction.confidence} className="h-2" />
                      </div>

                      {/* Ação Recomendada */}
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-blue-900 mb-1">Ação Recomendada</p>
                            <p className="text-blue-700">{prediction.action}</p>
                          </div>
                        </div>
                      </div>

                      {/* Botões de Ação */}
                      <div className="flex gap-3">
                        <Button size="sm" className="flex-1">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Implementar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Clock className="h-4 w-4 mr-2" />
                          Agendar
                        </Button>
                        <Button variant="outline" size="sm">
                          Mais Detalhes
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Automações */}
          <TabsContent value="automation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="h-5 w-5" />
                  Sugestões de Automação
                </CardTitle>
                <CardDescription>
                  Processos que podem ser automatizados com base na análise de IA
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automationSuggestions.map((suggestion) => (
                    <div key={suggestion.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{suggestion.title}</h3>
                            <Badge variant="outline">{suggestion.module}</Badge>
                            <Badge variant={getPriorityColor(suggestion.priority)}>
                              {suggestion.priority}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{suggestion.description}</p>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span className="text-sm font-medium text-green-600">
                                Economia: {suggestion.savings}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm">
                            Configurar
                          </Button>
                          <Button variant="outline" size="sm">
                            Simular
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Análise de Tendências
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Eficiência Operacional</span>
                      <span className="text-green-600 font-bold">+12%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Satisfação do Cliente</span>
                      <span className="text-blue-600 font-bold">94.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Tempo de Resposta</span>
                      <span className="text-orange-600 font-bold">-23%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Alertas de Risco
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-red-500" />
                      <div>
                        <p className="font-medium text-red-900">Estoque Crítico</p>
                        <p className="text-sm text-red-700">3 itens abaixo do mínimo</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                      <Clock className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium text-yellow-900">Atraso Previsto</p>
                        <p className="text-sm text-yellow-700">Entrega pode atrasar 2 dias</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-900">Sistema Estável</p>
                        <p className="text-sm text-green-700">Todos os indicadores normais</p>
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