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
  Leaf, 
  Recycle, 
  Zap, 
  Droplets, 
  Users, 
  Heart, 
  Shield, 
  Award,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Target,
  CheckCircle,
  AlertTriangle,
  Info,
  Download,
  Upload,
  RefreshCw,
  Plus,
  Search,
  Filter,
  Globe,
  Factory,
  Car,
  Home,
  Building,
  TreePine,
  Sun,
  Wind,
  Waves,
  Thermometer,
  Scale,
  BookOpen,
  FileText,
  Camera,
  MapPin,
  Clock,
  Star,
  Lightbulb,
  Handshake,
  GraduationCap,
  Briefcase,
  DollarSign
} from 'lucide-react'

export default function ESGPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedUnit, setSelectedUnit] = useState('all')

  // Mock data para métricas ESG
  const esgMetrics = [
    {
      title: 'Pegada de Carbono',
      value: '2.847',
      unit: 'tCO2e',
      change: '-12%',
      trend: 'down',
      target: '2.500',
      icon: Leaf,
      color: 'green'
    },
    {
      title: 'Consumo de Energia',
      value: '45.2',
      unit: 'MWh',
      change: '-8%',
      trend: 'down',
      target: '40.0',
      icon: Zap,
      color: 'yellow'
    },
    {
      title: 'Consumo de Água',
      value: '1.234',
      unit: 'm³',
      change: '-15%',
      trend: 'down',
      target: '1.100',
      icon: Droplets,
      color: 'blue'
    },
    {
      title: 'Taxa de Reciclagem',
      value: '78%',
      unit: '',
      change: '+5%',
      trend: 'up',
      target: '85%',
      icon: Recycle,
      color: 'green'
    },
    {
      title: 'Diversidade (Gênero)',
      value: '52%',
      unit: '',
      change: '+3%',
      trend: 'up',
      target: '50%',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Satisfação Funcionários',
      value: '4.2',
      unit: '/5.0',
      change: '+0.3',
      trend: 'up',
      target: '4.5',
      icon: Heart,
      color: 'red'
    },
    {
      title: 'Treinamentos ESG',
      value: '89%',
      unit: '',
      change: '+12%',
      trend: 'up',
      target: '95%',
      icon: GraduationCap,
      color: 'blue'
    },
    {
      title: 'Fornecedores Sustentáveis',
      value: '67%',
      unit: '',
      change: '+8%',
      trend: 'up',
      target: '80%',
      icon: Handshake,
      color: 'green'
    }
  ]

  const esgGoals = [
    {
      id: 1,
      category: 'Ambiental',
      title: 'Neutralidade de Carbono',
      description: 'Atingir neutralidade de carbono até 2030',
      progress: 45,
      target: 100,
      deadline: '2030-12-31',
      status: 'em_progresso',
      initiatives: ['Energia Solar', 'Compensação Florestal', 'Eficiência Energética'],
      responsible: 'Sustentabilidade'
    },
    {
      id: 2,
      category: 'Social',
      title: 'Diversidade e Inclusão',
      description: 'Alcançar 50% de diversidade em cargos de liderança',
      progress: 38,
      target: 50,
      deadline: '2025-12-31',
      status: 'em_progresso',
      initiatives: ['Programa de Mentoria', 'Recrutamento Inclusivo', 'Treinamentos D&I'],
      responsible: 'RH'
    },
    {
      id: 3,
      category: 'Governança',
      title: 'Transparência Corporativa',
      description: 'Implementar relatórios ESG trimestrais',
      progress: 75,
      target: 100,
      deadline: '2024-06-30',
      status: 'em_progresso',
      initiatives: ['Dashboard ESG', 'Auditoria Externa', 'Comunicação Stakeholders'],
      responsible: 'Compliance'
    },
    {
      id: 4,
      category: 'Ambiental',
      title: 'Gestão de Resíduos',
      description: 'Reduzir resíduos em 30% e atingir 90% de reciclagem',
      progress: 62,
      target: 90,
      deadline: '2025-12-31',
      status: 'em_progresso',
      initiatives: ['Programa Zero Waste', 'Compostagem', 'Parceria Reciclagem'],
      responsible: 'Operações'
    }
  ]

  const sustainabilityProjects = [
    {
      id: 1,
      name: 'Energia Solar - Sede Principal',
      category: 'Energia Renovável',
      status: 'ativo',
      investment: 250000,
      savings: 45000,
      co2Reduction: 120,
      startDate: '2024-01-15',
      endDate: '2024-06-30',
      progress: 65,
      location: 'Instituto AreLuna',
      description: 'Instalação de painéis solares para redução do consumo de energia elétrica'
    },
    {
      id: 2,
      name: 'Programa de Compostagem',
      category: 'Gestão de Resíduos',
      status: 'ativo',
      investment: 15000,
      savings: 8000,
      co2Reduction: 25,
      startDate: '2024-02-01',
      endDate: '2024-12-31',
      progress: 40,
      location: 'Todas as Unidades',
      description: 'Implementação de compostagem orgânica em todas as unidades'
    },
    {
      id: 3,
      name: 'Mobilidade Sustentável',
      category: 'Transporte',
      status: 'planejado',
      investment: 180000,
      savings: 32000,
      co2Reduction: 85,
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      progress: 15,
      location: 'Vespasian Ventures',
      description: 'Frota de veículos elétricos e estações de carregamento'
    },
    {
      id: 4,
      name: 'Reflorestamento AreLuna',
      category: 'Compensação Carbono',
      status: 'ativo',
      investment: 75000,
      savings: 0,
      co2Reduction: 200,
      startDate: '2024-03-01',
      endDate: '2025-03-01',
      progress: 30,
      location: 'Área Rural - Parceria',
      description: 'Plantio de 5.000 árvores nativas para compensação de carbono'
    }
  ]

  const complianceItems = [
    {
      id: 1,
      regulation: 'ISO 14001',
      description: 'Sistema de Gestão Ambiental',
      status: 'conforme',
      lastAudit: '2024-01-15',
      nextAudit: '2025-01-15',
      score: 95,
      findings: 2
    },
    {
      id: 2,
      regulation: 'GRI Standards',
      description: 'Relatórios de Sustentabilidade',
      status: 'conforme',
      lastAudit: '2023-12-10',
      nextAudit: '2024-12-10',
      score: 88,
      findings: 5
    },
    {
      id: 3,
      regulation: 'TCFD',
      description: 'Divulgação de Riscos Climáticos',
      status: 'em_implementacao',
      lastAudit: '2024-02-20',
      nextAudit: '2024-08-20',
      score: 72,
      findings: 8
    },
    {
      id: 4,
      regulation: 'UN Global Compact',
      description: 'Pacto Global da ONU',
      status: 'conforme',
      lastAudit: '2024-01-30',
      nextAudit: '2025-01-30',
      score: 91,
      findings: 3
    }
  ]

  const stakeholderEngagement = [
    {
      stakeholder: 'Colaboradores',
      lastSurvey: '2024-01-15',
      satisfaction: 4.2,
      participation: 89,
      keyTopics: ['Bem-estar', 'Desenvolvimento', 'Diversidade'],
      nextAction: 'Programa de Bem-estar'
    },
    {
      stakeholder: 'Comunidade Local',
      lastSurvey: '2023-11-20',
      satisfaction: 3.8,
      participation: 67,
      keyTopics: ['Impacto Ambiental', 'Emprego Local', 'Educação'],
      nextAction: 'Projeto Educacional'
    },
    {
      stakeholder: 'Fornecedores',
      lastSurvey: '2024-02-10',
      satisfaction: 4.0,
      participation: 78,
      keyTopics: ['Sustentabilidade', 'Pagamentos', 'Parcerias'],
      nextAction: 'Certificação Sustentável'
    },
    {
      stakeholder: 'Investidores',
      lastSurvey: '2024-01-05',
      satisfaction: 4.5,
      participation: 95,
      keyTopics: ['Transparência', 'Performance ESG', 'Riscos'],
      nextAction: 'Relatório Trimestral'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'conforme': return 'bg-green-100 text-green-800'
      case 'em_implementacao': return 'bg-yellow-100 text-yellow-800'
      case 'nao_conforme': return 'bg-red-100 text-red-800'
      case 'ativo': return 'bg-blue-100 text-blue-800'
      case 'planejado': return 'bg-gray-100 text-gray-800'
      case 'concluido': return 'bg-green-100 text-green-800'
      case 'em_progresso': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'conforme': return 'Conforme'
      case 'em_implementacao': return 'Em Implementação'
      case 'nao_conforme': return 'Não Conforme'
      case 'ativo': return 'Ativo'
      case 'planejado': return 'Planejado'
      case 'concluido': return 'Concluído'
      case 'em_progresso': return 'Em Progresso'
      default: return status
    }
  }

  const filteredProjects = sustainabilityProjects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Leaf className="h-8 w-8 text-green-600" />
              ESG & Sustentabilidade
            </h1>
            <p className="text-gray-600 mt-1">
              Monitoramento de práticas ambientais, sociais e de governança
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Relatório ESG
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Iniciativa
            </Button>
          </div>
        </div>

        {/* Métricas ESG */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {esgMetrics.map((metric, index) => {
            const Icon = metric.icon
            const isPositiveTrend = metric.trend === 'up'
            const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown
            const trendColor = isPositiveTrend ? 'text-green-500' : 'text-red-500'
            
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full bg-${metric.color}-50`}>
                      <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendIcon className={`h-4 w-4 ${trendColor}`} />
                      <span className={`text-sm font-medium ${trendColor}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {metric.value} <span className="text-sm font-normal text-gray-500">{metric.unit}</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Meta: {metric.target} {metric.unit}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="environmental">Ambiental</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="governance">Governança</TabsTrigger>
            <TabsTrigger value="projects">Projetos</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          {/* Tab: Visão Geral */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metas ESG */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Metas ESG 2024-2030
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {esgGoals.map((goal) => (
                      <div key={goal.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <Badge variant="outline" className={
                              goal.category === 'Ambiental' ? 'bg-green-100 text-green-800' :
                              goal.category === 'Social' ? 'bg-blue-100 text-blue-800' :
                              'bg-purple-100 text-purple-800'
                            }>
                              {goal.category}
                            </Badge>
                            <h4 className="font-semibold text-gray-900 mt-2">{goal.title}</h4>
                            <p className="text-sm text-gray-600">{goal.description}</p>
                          </div>
                          <Badge variant="outline" className={getStatusColor(goal.status)}>
                            {getStatusText(goal.status)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progresso</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}</span>
                            <span>Responsável: {goal.responsible}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Engajamento de Stakeholders */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Engajamento de Stakeholders
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stakeholderEngagement.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold text-gray-900">{item.stakeholder}</h4>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="font-medium">{item.satisfaction}/5.0</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600">Participação</p>
                            <p className="font-medium">{item.participation}%</p>
                          </div>
                          <div>
                            <p className="text-gray-600">Última Pesquisa</p>
                            <p className="font-medium">{new Date(item.lastSurvey).toLocaleDateString('pt-BR')}</p>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-sm text-gray-600 mb-1">Tópicos Principais:</p>
                          <div className="flex flex-wrap gap-1">
                            {item.keyTopics.map((topic, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-3 p-2 bg-blue-50 rounded">
                          <p className="text-sm">
                            <span className="font-medium">Próxima Ação:</span> {item.nextAction}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Ambiental */}
          <TabsContent value="environmental" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-5 w-5" />
                    Pegada de Carbono
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">2.847</p>
                    <p className="text-sm text-gray-600">tCO2e</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Escopo 1</span>
                        <span>1.234 tCO2e</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Escopo 2</span>
                        <span>987 tCO2e</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Escopo 3</span>
                        <span>626 tCO2e</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Energia
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">45.2 MWh</p>
                      <p className="text-sm text-gray-600">Consumo Total</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Renovável</span>
                        <span className="text-sm font-medium text-green-600">35%</span>
                      </div>
                      <Progress value={35} className="h-2" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Não Renovável</span>
                        <span className="text-sm font-medium text-gray-600">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="h-5 w-5" />
                    Água
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">1.234 m³</p>
                      <p className="text-sm text-gray-600">Consumo Total</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Reuso</span>
                        <span className="font-medium">23%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Tratamento</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Economia vs. Meta</span>
                        <span className="font-medium text-green-600">-15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Recycle className="h-5 w-5" />
                  Gestão de Resíduos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Recycle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">78%</p>
                    <p className="text-sm text-gray-600">Taxa de Reciclagem</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Factory className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">2.3t</p>
                    <p className="text-sm text-gray-600">Resíduos Totais</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <TreePine className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">1.8t</p>
                    <p className="text-sm text-gray-600">Reciclados</p>
                  </div>
                  <div className="text-center p-4 bg-red-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-red-600">0.5t</p>
                    <p className="text-sm text-gray-600">Não Reciclados</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Social */}
          <TabsContent value="social" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Diversidade & Inclusão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">52%</p>
                        <p className="text-sm text-gray-600">Diversidade de Gênero</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">38%</p>
                        <p className="text-sm text-gray-600">Liderança Diversa</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Mulheres em Liderança</span>
                        <span className="font-medium">38%</span>
                      </div>
                      <Progress value={38} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Meta 2025</span>
                        <span className="font-medium text-green-600">50%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Bem-estar dos Funcionários
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-red-600">4.2/5.0</p>
                      <p className="text-sm text-gray-600">Satisfação Geral</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Equilíbrio Vida-Trabalho</span>
                        <span className="font-medium">4.1</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ambiente de Trabalho</span>
                        <span className="font-medium">4.3</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Desenvolvimento</span>
                        <span className="font-medium">4.0</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Reconhecimento</span>
                        <span className="font-medium">3.9</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Desenvolvimento & Treinamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">89%</p>
                        <p className="text-sm text-gray-600">Treinamentos ESG</p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">156</p>
                        <p className="text-sm text-gray-600">Horas/Funcionário</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Segurança no Trabalho</span>
                        <span className="font-medium">95%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Diversidade & Inclusão</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Sustentabilidade</span>
                        <span className="font-medium">89%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Ética & Compliance</span>
                        <span className="font-medium">92%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5" />
                    Impacto na Comunidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">R$ 125K</p>
                        <p className="text-sm text-gray-600">Investimento Social</p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">2.3K</p>
                        <p className="text-sm text-gray-600">Pessoas Impactadas</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Projetos Educacionais</span>
                        <span className="font-medium">3 ativos</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Parcerias ONGs</span>
                        <span className="font-medium">5 organizações</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Voluntariado</span>
                        <span className="font-medium">67% participação</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Governança */}
          <TabsContent value="governance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Ética & Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <p className="text-2xl font-bold text-green-600">98%</p>
                        <p className="text-sm text-gray-600">Treinamento Ética</p>
                      </div>
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <p className="text-2xl font-bold text-blue-600">0</p>
                        <p className="text-sm text-gray-600">Violações Graves</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Canal de Denúncias</span>
                        <span className="font-medium">Ativo</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Código de Conduta</span>
                        <span className="font-medium">Atualizado 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Auditoria Interna</span>
                        <span className="font-medium">Trimestral</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Transparência & Relatórios
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-purple-50 rounded-lg">
                        <p className="text-2xl font-bold text-purple-600">100%</p>
                        <p className="text-sm text-gray-600">Relatórios no Prazo</p>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <p className="text-2xl font-bold text-yellow-600">4</p>
                        <p className="text-sm text-gray-600">Relatórios/Ano</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Relatório Anual ESG</span>
                        <span className="font-medium text-green-600">Publicado</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Relatório Trimestral</span>
                        <span className="font-medium text-green-600">Em dia</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Auditoria Externa</span>
                        <span className="font-medium text-blue-600">Aprovada</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scale className="h-5 w-5" />
                    Gestão de Riscos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div>
                          <p className="font-medium text-green-900">Riscos Climáticos</p>
                          <p className="text-sm text-green-700">Baixo impacto</p>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-800">Baixo</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                        <div>
                          <p className="font-medium text-yellow-900">Riscos Regulatórios</p>
                          <p className="text-sm text-yellow-700">Monitoramento ativo</p>
                        </div>
                        <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Médio</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-blue-900">Riscos Reputacionais</p>
                          <p className="text-sm text-blue-700">Controles implementados</p>
                        </div>
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">Baixo</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Certificações & Reconhecimentos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <Award className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="font-medium text-green-900">ISO 14001</p>
                        <p className="text-sm text-green-700">Gestão Ambiental</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 ml-auto">Ativa</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Award className="h-6 w-6 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-900">GRI Standards</p>
                        <p className="text-sm text-blue-700">Relatórios Sustentabilidade</p>
                      </div>
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 ml-auto">Ativa</Badge>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Award className="h-6 w-6 text-purple-600" />
                      <div>
                        <p className="font-medium text-purple-900">UN Global Compact</p>
                        <p className="text-sm text-purple-700">Pacto Global ONU</p>
                      </div>
                      <Badge variant="outline" className="bg-purple-100 text-purple-800 ml-auto">Ativa</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Projetos */}
          <TabsContent value="projects" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar projetos..."
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
                      <SelectItem value="Energia Renovável">Energia Renovável</SelectItem>
                      <SelectItem value="Gestão de Resíduos">Gestão de Resíduos</SelectItem>
                      <SelectItem value="Transporte">Transporte</SelectItem>
                      <SelectItem value="Compensação Carbono">Compensação Carbono</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Projetos */}
            <div className="grid gap-6">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription className="mt-2">{project.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className={getStatusColor(project.status)}>
                        {getStatusText(project.status)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {/* Progresso */}
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium">Progresso</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-3" />
                      </div>

                      {/* Métricas */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="bg-green-50 p-3 rounded-lg text-center">
                          <DollarSign className="h-5 w-5 text-green-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-green-900">Investimento</p>
                          <p className="text-lg font-bold text-green-600">
                            R$ {(project.investment / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-lg text-center">
                          <TrendingUp className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-blue-900">Economia Anual</p>
                          <p className="text-lg font-bold text-blue-600">
                            R$ {(project.savings / 1000).toFixed(0)}K
                          </p>
                        </div>
                        <div className="bg-yellow-50 p-3 rounded-lg text-center">
                          <Leaf className="h-5 w-5 text-yellow-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-yellow-900">Redução CO2</p>
                          <p className="text-lg font-bold text-yellow-600">
                            {project.co2Reduction} tCO2e
                          </p>
                        </div>
                        <div className="bg-purple-50 p-3 rounded-lg text-center">
                          <MapPin className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-purple-900">Local</p>
                          <p className="text-sm font-bold text-purple-600">
                            {project.location}
                          </p>
                        </div>
                      </div>

                      {/* Timeline */}
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Início: {new Date(project.startDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          <span>Fim: {new Date(project.endDate).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          Detalhes
                        </Button>
                        <Button variant="outline" size="sm">
                          <Camera className="h-4 w-4 mr-2" />
                          Fotos
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Relatório
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Tab: Compliance */}
          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Status de Compliance
                </CardTitle>
                <CardDescription>
                  Monitoramento de conformidade com regulamentações ESG
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {complianceItems.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{item.regulation}</h4>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <Badge variant="outline" className={getStatusColor(item.status)}>
                          {getStatusText(item.status)}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Score</p>
                          <p className="font-bold text-2xl text-green-600">{item.score}%</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Achados</p>
                          <p className="font-medium">{item.findings} itens</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Última Auditoria</p>
                          <p className="font-medium">{new Date(item.lastAudit).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Próxima Auditoria</p>
                          <p className="font-medium">{new Date(item.nextAudit).toLocaleDateString('pt-BR')}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conformidade</span>
                          <span>{item.score}%</span>
                        </div>
                        <Progress value={item.score} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}