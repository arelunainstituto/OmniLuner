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
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  BarChart3, 
  PieChart, 
  LineChart,
  DollarSign,
  Users,
  Package,
  ShoppingCart,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  RefreshCw,
  Download,
  Upload,
  Save,
  Edit,
  Plus,
  Minus,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Filter,
  Search,
  Settings,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  MoreHorizontal,
  Calendar as CalendarIcon,
  FileText,
  Briefcase,
  Building,
  Globe,
  Zap,
  Star,
  Award,
  Flag,
  MapPin,
  Navigation,
  Compass,
  Route,
  Truck,
  Warehouse,
  Factory,
  Store,
  Home,
  School,
  Hospital
} from 'lucide-react'

export default function RollingForecastPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('Q1-2024')
  const [selectedMetric, setSelectedMetric] = useState('revenue')
  const [viewMode, setViewMode] = useState('monthly')
  const [forecastHorizon, setForecastHorizon] = useState('12')

  // Mock data para KPIs preditivos
  const kpis = [
    {
      id: 'revenue',
      name: 'Receita',
      current: 2850000,
      forecast: 3200000,
      target: 3000000,
      variance: 6.7,
      trend: 'up',
      confidence: 87,
      unit: 'R$',
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'customers',
      name: 'Novos Clientes',
      current: 145,
      forecast: 180,
      target: 160,
      variance: 12.5,
      trend: 'up',
      confidence: 92,
      unit: '',
      icon: Users,
      color: 'blue'
    },
    {
      id: 'orders',
      name: 'Pedidos',
      current: 1250,
      forecast: 1400,
      target: 1350,
      variance: 3.7,
      trend: 'up',
      confidence: 85,
      unit: '',
      icon: ShoppingCart,
      color: 'purple'
    },
    {
      id: 'inventory',
      name: 'Estoque',
      current: 850000,
      forecast: 780000,
      target: 800000,
      variance: -2.5,
      trend: 'down',
      confidence: 78,
      unit: 'R$',
      icon: Package,
      color: 'orange'
    },
    {
      id: 'costs',
      name: 'Custos Operacionais',
      current: 1200000,
      forecast: 1150000,
      target: 1100000,
      variance: 4.5,
      trend: 'down',
      confidence: 81,
      unit: 'R$',
      icon: Activity,
      color: 'red'
    },
    {
      id: 'margin',
      name: 'Margem Bruta',
      current: 42.5,
      forecast: 45.2,
      target: 44.0,
      variance: 2.7,
      trend: 'up',
      confidence: 89,
      unit: '%',
      icon: TrendingUp,
      color: 'green'
    }
  ]

  // Mock data para cenários de forecast
  const scenarios = [
    {
      id: 'optimistic',
      name: 'Otimista',
      description: 'Crescimento acelerado com expansão de mercado',
      probability: 25,
      revenue: 3500000,
      growth: 22.8,
      color: 'green'
    },
    {
      id: 'realistic',
      name: 'Realista',
      description: 'Crescimento sustentável baseado em tendências atuais',
      probability: 50,
      revenue: 3200000,
      growth: 12.3,
      color: 'blue'
    },
    {
      id: 'conservative',
      name: 'Conservador',
      description: 'Crescimento moderado com foco em eficiência',
      probability: 25,
      revenue: 2950000,
      growth: 3.5,
      color: 'orange'
    }
  ]

  // Mock data para drivers de negócio
  const businessDrivers = [
    {
      id: 'market-expansion',
      name: 'Expansão de Mercado',
      impact: 'high',
      influence: 85,
      trend: 'up',
      description: 'Entrada em novos segmentos e regiões',
      metrics: ['revenue', 'customers', 'orders']
    },
    {
      id: 'digital-transformation',
      name: 'Transformação Digital',
      impact: 'medium',
      influence: 72,
      trend: 'up',
      description: 'Automação de processos e digitalização',
      metrics: ['costs', 'margin', 'efficiency']
    },
    {
      id: 'supply-chain',
      name: 'Cadeia de Suprimentos',
      impact: 'medium',
      influence: 68,
      trend: 'stable',
      description: 'Otimização logística e fornecedores',
      metrics: ['inventory', 'costs', 'delivery']
    },
    {
      id: 'competition',
      name: 'Pressão Competitiva',
      impact: 'high',
      influence: -45,
      trend: 'down',
      description: 'Aumento da concorrência no mercado',
      metrics: ['revenue', 'margin', 'market-share']
    },
    {
      id: 'economic-factors',
      name: 'Fatores Econômicos',
      impact: 'high',
      influence: -32,
      trend: 'down',
      description: 'Inflação e mudanças macroeconômicas',
      metrics: ['costs', 'demand', 'pricing']
    }
  ]

  // Mock data para revisões de forecast
  const forecastRevisions = [
    {
      id: 1,
      date: '2024-03-15',
      version: 'v2.3',
      author: 'Ana Silva',
      changes: [
        { metric: 'Receita', oldValue: 3100000, newValue: 3200000, reason: 'Novos contratos fechados' },
        { metric: 'Custos', oldValue: 1180000, newValue: 1150000, reason: 'Otimização de processos' }
      ],
      impact: 'positive',
      confidence: 89
    },
    {
      id: 2,
      date: '2024-03-01',
      version: 'v2.2',
      author: 'Carlos Santos',
      changes: [
        { metric: 'Novos Clientes', oldValue: 160, newValue: 180, reason: 'Campanha de marketing efetiva' },
        { metric: 'Margem', oldValue: 43.5, newValue: 45.2, reason: 'Melhoria na precificação' }
      ],
      impact: 'positive',
      confidence: 85
    },
    {
      id: 3,
      date: '2024-02-15',
      version: 'v2.1',
      author: 'Maria Costa',
      changes: [
        { metric: 'Estoque', oldValue: 820000, newValue: 780000, reason: 'Ajuste sazonal' }
      ],
      impact: 'neutral',
      confidence: 78
    }
  ]

  // Mock data para alertas e riscos
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Desvio na Meta de Receita',
      description: 'Receita atual está 5% abaixo da meta mensal',
      metric: 'revenue',
      severity: 'medium',
      date: '2024-03-15',
      action: 'Revisar estratégia de vendas'
    },
    {
      id: 2,
      type: 'success',
      title: 'Meta de Novos Clientes Superada',
      description: 'Aquisição de clientes 12% acima da meta',
      metric: 'customers',
      severity: 'low',
      date: '2024-03-14',
      action: 'Manter estratégia atual'
    },
    {
      id: 3,
      type: 'error',
      title: 'Risco de Ruptura de Estoque',
      description: 'Níveis críticos em produtos categoria A',
      metric: 'inventory',
      severity: 'high',
      date: '2024-03-13',
      action: 'Acelerar reposição urgente'
    }
  ]

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('pt-BR').format(value)
  }

  const getVarianceColor = (variance: number) => {
    if (variance > 5) return 'text-green-600'
    if (variance > 0) return 'text-green-500'
    if (variance > -5) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getVarianceIcon = (variance: number) => {
    if (variance > 0) return ArrowUp
    if (variance < 0) return ArrowDown
    return ArrowRight
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-green-200 bg-green-50'
      case 'warning': return 'border-yellow-200 bg-yellow-50'
      case 'error': return 'border-red-200 bg-red-50'
      default: return 'border-gray-200 bg-gray-50'
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertTriangle
      case 'error': return AlertTriangle
      default: return AlertTriangle
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-blue-600" />
              Rolling Forecast
            </h1>
            <p className="text-gray-600 mt-1">
              Planejamento contínuo com KPIs preditivos e cenários dinâmicos
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={forecastHorizon} onValueChange={setForecastHorizon}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 meses</SelectItem>
                <SelectItem value="12">12 meses</SelectItem>
                <SelectItem value="18">18 meses</SelectItem>
                <SelectItem value="24">24 meses</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Salvar Versão
            </Button>
          </div>
        </div>

        {/* Alertas */}
        {alerts.length > 0 && (
          <div className="space-y-3">
            {alerts.slice(0, 2).map((alert) => {
              const AlertIcon = getAlertIcon(alert.type)
              return (
                <div key={alert.id} className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}>
                  <div className="flex items-start gap-3">
                    <AlertIcon className="h-5 w-5 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-gray-900">{alert.title}</h4>
                        <Badge variant="outline" className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-2">{alert.description}</p>
                      <p className="text-sm text-gray-600">
                        <strong>Ação recomendada:</strong> {alert.action}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">
                        {new Date(alert.date).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* KPIs Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon
            const VarianceIcon = getVarianceIcon(kpi.variance)
            
            return (
              <Card key={kpi.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${kpi.color}-100`}>
                      <Icon className={`h-6 w-6 text-${kpi.color}-600`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {kpi.confidence}% confiança
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{kpi.name}</h3>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {kpi.unit === 'R$' ? formatCurrency(kpi.current) : 
                           kpi.unit === '%' ? `${kpi.current}%` : 
                           formatNumber(kpi.current)}
                        </span>
                        <span className="text-sm text-gray-500">atual</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Previsão:</span>
                        <span className="font-medium">
                          {kpi.unit === 'R$' ? formatCurrency(kpi.forecast) : 
                           kpi.unit === '%' ? `${kpi.forecast}%` : 
                           formatNumber(kpi.forecast)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Meta:</span>
                        <span className="font-medium">
                          {kpi.unit === 'R$' ? formatCurrency(kpi.target) : 
                           kpi.unit === '%' ? `${kpi.target}%` : 
                           formatNumber(kpi.target)}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Variação:</span>
                        <div className={`flex items-center gap-1 font-medium ${getVarianceColor(kpi.variance)}`}>
                          <VarianceIcon className="h-3 w-3" />
                          {Math.abs(kpi.variance)}%
                        </div>
                      </div>
                    </div>
                    
                    <Progress 
                      value={(kpi.current / kpi.target) * 100} 
                      className="h-2"
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="scenarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scenarios">Cenários</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="revisions">Revisões</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab: Cenários */}
          <TabsContent value="scenarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Cenários de Forecast
                </CardTitle>
                <CardDescription>
                  Análise de diferentes cenários com probabilidades e impactos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {scenarios.map((scenario) => (
                    <div key={scenario.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{scenario.name}</h3>
                            <Badge className={`bg-${scenario.color}-100 text-${scenario.color}-800`}>
                              {scenario.probability}% probabilidade
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{scenario.description}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600 mb-1">Receita Projetada</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {formatCurrency(scenario.revenue)}
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600 mb-1">Crescimento</p>
                          <p className={`text-2xl font-bold ${scenario.growth > 10 ? 'text-green-600' : scenario.growth > 5 ? 'text-yellow-600' : 'text-red-600'}`}>
                            +{scenario.growth}%
                          </p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-gray-600 mb-1">Probabilidade</p>
                          <div className="flex items-center justify-center gap-2">
                            <Progress value={scenario.probability} className="w-20 h-2" />
                            <span className="text-sm font-medium">{scenario.probability}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Drivers */}
          <TabsContent value="drivers" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Drivers de Negócio
                </CardTitle>
                <CardDescription>
                  Fatores que influenciam o desempenho e previsões
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessDrivers.map((driver) => (
                    <div key={driver.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{driver.name}</h4>
                            <Badge className={getImpactColor(driver.impact)}>
                              {driver.impact} impact
                            </Badge>
                            <Badge variant="outline" className={driver.trend === 'up' ? 'text-green-600' : driver.trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                              {driver.trend}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{driver.description}</p>
                          
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">Influência:</span>
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={Math.abs(driver.influence)} 
                                  className={`w-20 h-2 ${driver.influence < 0 ? '[&>div]:bg-red-500' : '[&>div]:bg-green-500'}`} 
                                />
                                <span className={`text-sm font-medium ${driver.influence < 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {driver.influence > 0 ? '+' : ''}{driver.influence}%
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Ajustar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Revisões */}
          <TabsContent value="revisions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Histórico de Revisões
                </CardTitle>
                <CardDescription>
                  Acompanhe as mudanças e ajustes no forecast ao longo do tempo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {forecastRevisions.map((revision) => (
                    <div key={revision.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">Versão {revision.version}</h4>
                            <Badge className={revision.impact === 'positive' ? 'bg-green-100 text-green-800' : revision.impact === 'negative' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}>
                              {revision.impact}
                            </Badge>
                            <Badge variant="outline">
                              {revision.confidence}% confiança
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            Por {revision.author} em {new Date(revision.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <h5 className="font-medium text-gray-900">Alterações:</h5>
                        {revision.changes.map((change, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{change.metric}</p>
                              <p className="text-sm text-gray-600">{change.reason}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">
                                  {typeof change.oldValue === 'number' && change.oldValue > 1000 ? 
                                    formatCurrency(change.oldValue) : 
                                    formatNumber(change.oldValue)}
                                </span>
                                <ArrowRight className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900">
                                  {typeof change.newValue === 'number' && change.newValue > 1000 ? 
                                    formatCurrency(change.newValue) : 
                                    formatNumber(change.newValue)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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
                    Precisão do Forecast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Precisão Geral</span>
                      <span className="text-lg font-bold text-green-600">87.3%</span>
                    </div>
                    <Progress value={87.3} className="h-3" />
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">94.2%</p>
                        <p className="text-sm text-gray-600">Curto Prazo (1-3m)</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900">80.4%</p>
                        <p className="text-sm text-gray-600">Longo Prazo (6-12m)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    Distribuição de Variações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Dentro da Meta</span>
                      </div>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Desvio Moderado</span>
                      </div>
                      <span className="text-sm font-medium">23%</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">Desvio Alto</span>
                      </div>
                      <span className="text-sm font-medium">9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Tendências e Padrões
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="p-4 bg-blue-50 rounded-lg mb-3">
                      <TrendingUp className="h-8 w-8 text-blue-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Sazonalidade</h4>
                    <p className="text-sm text-gray-600">Picos em Q4 identificados consistentemente</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-4 bg-green-50 rounded-lg mb-3">
                      <Target className="h-8 w-8 text-green-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Correlações</h4>
                    <p className="text-sm text-gray-600">Marketing e vendas com correlação de 0.84</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="p-4 bg-purple-50 rounded-lg mb-3">
                      <Activity className="h-8 w-8 text-purple-600 mx-auto" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1">Volatilidade</h4>
                    <p className="text-sm text-gray-600">Redução de 15% na variabilidade</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}