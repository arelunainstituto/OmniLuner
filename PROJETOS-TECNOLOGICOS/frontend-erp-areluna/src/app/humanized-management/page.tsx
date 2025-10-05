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
  Heart, 
  Users, 
  MessageCircle, 
  TrendingUp, 
  BarChart3,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  ThumbsUp,
  ThumbsDown,
  Smile,
  Frown,
  Meh,
  Target,
  Award,
  Gift,
  Calendar,
  Send,
  Eye,
  EyeOff,
  Filter,
  Search,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  FileText,
  PieChart,
  LineChart,
  Zap,
  Lightbulb,
  Coffee,
  Home,
  Building,
  Briefcase,
  GraduationCap,
  Shield,
  Headphones,
  Wifi,
  Monitor,
  Smartphone,
  Tablet,
  Mic,
  Camera,
  Volume2,
  Bell,
  Flag,
  MapPin,
  Navigation,
  Compass,
  Route,
  Globe,
  Mail,
  Phone,
  Video,
  Share,
  Link,
  Copy,
  Save,
  Archive,
  Bookmark,
  Tag,
  Hash,
  AtSign,
  Percent,
  DollarSign,
  CreditCard,
  Wallet,
  ShoppingCart,
  Package,
  Truck,
  Plane,
  Car,
  MapPin as Location,
  Thermometer,
  Droplets,
  Wind,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  Umbrella,
  TreePine,
  Flower2 as Flower,
  Leaf,
  Sprout,
  Bug,
  Fish,
  Bird,
  Dog,
  Cat
} from 'lucide-react'

export default function HumanizedManagementPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [showAnonymous, setShowAnonymous] = useState(true)

  // Mock data para métricas de clima organizacional
  const climateMetrics = [
    {
      id: 'satisfaction',
      name: 'Satisfação Geral',
      value: 4.2,
      maxValue: 5,
      change: 8.5,
      trend: 'up',
      icon: Smile,
      color: 'green'
    },
    {
      id: 'engagement',
      name: 'Engajamento',
      value: 78,
      maxValue: 100,
      change: 12.3,
      trend: 'up',
      icon: Heart,
      color: 'red'
    },
    {
      id: 'wellbeing',
      name: 'Bem-estar',
      value: 3.8,
      maxValue: 5,
      change: -2.1,
      trend: 'down',
      icon: Coffee,
      color: 'orange'
    },
    {
      id: 'communication',
      name: 'Comunicação',
      value: 3.6,
      maxValue: 5,
      change: 5.7,
      trend: 'up',
      icon: MessageCircle,
      color: 'blue'
    }
  ]

  // Mock data para feedback anônimo
  const anonymousFeedback = [
    {
      id: 1,
      category: 'Liderança',
      sentiment: 'positive',
      rating: 4,
      message: 'A gestão tem sido muito transparente e acessível. Sinto que posso conversar abertamente com meu gestor.',
      department: 'TI',
      timestamp: '2024-03-15T10:30:00Z',
      tags: ['transparência', 'comunicação', 'liderança'],
      responses: 0,
      helpful: 12
    },
    {
      id: 2,
      category: 'Ambiente de Trabalho',
      sentiment: 'neutral',
      rating: 3,
      message: 'O escritório está bem estruturado, mas seria interessante ter mais espaços colaborativos.',
      department: 'Marketing',
      timestamp: '2024-03-15T09:45:00Z',
      tags: ['infraestrutura', 'colaboração', 'espaço'],
      responses: 2,
      helpful: 8
    },
    {
      id: 3,
      category: 'Desenvolvimento',
      sentiment: 'positive',
      rating: 5,
      message: 'As oportunidades de treinamento e crescimento profissional são excelentes. Muito obrigado!',
      department: 'RH',
      timestamp: '2024-03-15T08:20:00Z',
      tags: ['treinamento', 'crescimento', 'desenvolvimento'],
      responses: 1,
      helpful: 15
    },
    {
      id: 4,
      category: 'Processos',
      sentiment: 'negative',
      rating: 2,
      message: 'Alguns processos internos são muito burocráticos e poderiam ser simplificados para ganhar agilidade.',
      department: 'Financeiro',
      timestamp: '2024-03-15T07:15:00Z',
      tags: ['burocracia', 'processos', 'agilidade'],
      responses: 3,
      helpful: 20
    },
    {
      id: 5,
      category: 'Benefícios',
      sentiment: 'positive',
      rating: 4,
      message: 'O pacote de benefícios é competitivo e atende bem às necessidades da equipe.',
      department: 'Vendas',
      timestamp: '2024-03-14T16:30:00Z',
      tags: ['benefícios', 'competitivo', 'necessidades'],
      responses: 0,
      helpful: 7
    }
  ]

  // Mock data para pesquisas de clima
  const climateSurveys = [
    {
      id: 1,
      title: 'Pesquisa de Clima Q1 2024',
      description: 'Avaliação trimestral do ambiente organizacional',
      status: 'active',
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      responses: 156,
      totalEmployees: 200,
      completionRate: 78,
      categories: ['Liderança', 'Comunicação', 'Desenvolvimento', 'Bem-estar', 'Reconhecimento'],
      avgRating: 4.1,
      lastResponse: '2024-03-15T11:00:00Z'
    },
    {
      id: 2,
      title: 'Avaliação de Home Office',
      description: 'Feedback sobre trabalho remoto e híbrido',
      status: 'completed',
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      responses: 189,
      totalEmployees: 195,
      completionRate: 97,
      categories: ['Produtividade', 'Equilíbrio', 'Tecnologia', 'Comunicação'],
      avgRating: 4.3,
      lastResponse: '2024-02-28T17:45:00Z'
    },
    {
      id: 3,
      title: 'Feedback sobre Benefícios',
      description: 'Avaliação dos benefícios oferecidos pela empresa',
      status: 'draft',
      startDate: '2024-04-01',
      endDate: '2024-04-15',
      responses: 0,
      totalEmployees: 200,
      completionRate: 0,
      categories: ['Plano de Saúde', 'Vale Refeição', 'Flexibilidade', 'Desenvolvimento'],
      avgRating: 0,
      lastResponse: null
    }
  ]

  // Mock data para sugestões de melhoria
  const improvements = [
    {
      id: 1,
      title: 'Implementar Horário Flexível',
      description: 'Permitir que colaboradores escolham horários de entrada e saída dentro de uma janela de tempo',
      category: 'Flexibilidade',
      priority: 'high',
      status: 'in_review',
      votes: 45,
      author: 'Anônimo',
      department: 'Geral',
      timestamp: '2024-03-10T14:20:00Z',
      estimatedImpact: 'Alto',
      implementationCost: 'Baixo',
      tags: ['flexibilidade', 'work-life-balance', 'produtividade']
    },
    {
      id: 2,
      title: 'Espaço de Descompressão',
      description: 'Criar uma sala com jogos, sofás e ambiente relaxante para pausas durante o trabalho',
      category: 'Bem-estar',
      priority: 'medium',
      status: 'approved',
      votes: 32,
      author: 'Anônimo',
      department: 'Todos',
      timestamp: '2024-03-08T09:15:00Z',
      estimatedImpact: 'Médio',
      implementationCost: 'Médio',
      tags: ['bem-estar', 'ambiente', 'relaxamento']
    },
    {
      id: 3,
      title: 'Programa de Mentoria Interna',
      description: 'Conectar colaboradores seniores com juniores para desenvolvimento profissional',
      category: 'Desenvolvimento',
      priority: 'high',
      status: 'implemented',
      votes: 67,
      author: 'Anônimo',
      department: 'RH',
      timestamp: '2024-02-25T11:30:00Z',
      estimatedImpact: 'Alto',
      implementationCost: 'Baixo',
      tags: ['mentoria', 'desenvolvimento', 'conhecimento']
    },
    {
      id: 4,
      title: 'App Interno de Comunicação',
      description: 'Desenvolver aplicativo para facilitar comunicação entre equipes e departamentos',
      category: 'Comunicação',
      priority: 'medium',
      status: 'rejected',
      votes: 23,
      author: 'Anônimo',
      department: 'TI',
      timestamp: '2024-02-20T16:45:00Z',
      estimatedImpact: 'Médio',
      implementationCost: 'Alto',
      tags: ['comunicação', 'tecnologia', 'colaboração']
    }
  ]

  // Mock data para reconhecimentos
  const recognitions = [
    {
      id: 1,
      type: 'peer_recognition',
      from: 'Anônimo',
      to: 'Maria Silva',
      department: 'Marketing',
      message: 'Maria sempre vai além nas suas entregas e ajuda toda a equipe. Exemplo de colaboração!',
      category: 'Colaboração',
      timestamp: '2024-03-15T10:00:00Z',
      likes: 18,
      badge: 'Colaborador do Mês'
    },
    {
      id: 2,
      type: 'achievement',
      from: 'Sistema',
      to: 'João Santos',
      department: 'Vendas',
      message: 'Parabéns por atingir 120% da meta mensal!',
      category: 'Performance',
      timestamp: '2024-03-15T09:30:00Z',
      likes: 25,
      badge: 'Top Performer'
    },
    {
      id: 3,
      type: 'innovation',
      from: 'Anônimo',
      to: 'Ana Costa',
      department: 'TI',
      message: 'A solução criada pela Ana otimizou nosso processo em 40%. Inovação pura!',
      category: 'Inovação',
      timestamp: '2024-03-15T08:45:00Z',
      likes: 31,
      badge: 'Inovador'
    }
  ]

  // Mock data para departamentos
  const departments = [
    { id: 'all', name: 'Todos os Departamentos' },
    { id: 'ti', name: 'Tecnologia da Informação' },
    { id: 'rh', name: 'Recursos Humanos' },
    { id: 'marketing', name: 'Marketing' },
    { id: 'vendas', name: 'Vendas' },
    { id: 'financeiro', name: 'Financeiro' },
    { id: 'operacoes', name: 'Operações' }
  ]

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return Smile
      case 'negative': return Frown
      case 'neutral': return Meh
      default: return Meh
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-100'
      case 'negative': return 'text-red-600 bg-red-100'
      case 'neutral': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'in_review': return 'bg-yellow-100 text-yellow-800'
      case 'approved': return 'bg-green-100 text-green-800'
      case 'implemented': return 'bg-blue-100 text-blue-800'
      case 'rejected': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatDateTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Heart className="h-8 w-8 text-purple-600" />
              Gestão Humanizada
            </h1>
            <p className="text-gray-600 mt-1">
              Feedback anônimo, clima organizacional e bem-estar dos colaboradores
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
                <SelectItem value="year">Ano</SelectItem>
              </SelectContent>
            </Select>
            
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
              Nova Pesquisa
            </Button>
          </div>
        </div>

        {/* Métricas de Clima */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {climateMetrics.map((metric) => {
            const Icon = metric.icon
            const isPositive = metric.trend === 'up'
            const percentage = (metric.value / metric.maxValue) * 100
            
            return (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                      <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                      {Math.abs(metric.change)}%
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-600 mb-2">{metric.name}</p>
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      {metric.maxValue === 100 ? `${metric.value}%` : `${metric.value}/${metric.maxValue}`}
                    </p>
                    <Progress value={percentage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="feedback" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="feedback">Feedback Anônimo</TabsTrigger>
            <TabsTrigger value="surveys">Pesquisas de Clima</TabsTrigger>
            <TabsTrigger value="improvements">Sugestões</TabsTrigger>
            <TabsTrigger value="recognition">Reconhecimentos</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab: Feedback Anônimo */}
          <TabsContent value="feedback" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5" />
                      Feedback Anônimo
                    </CardTitle>
                    <CardDescription>
                      {anonymousFeedback.length} feedbacks recebidos este mês
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                    <Button size="sm">
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Feedback
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {anonymousFeedback.map((feedback) => {
                    const SentimentIcon = getSentimentIcon(feedback.sentiment)
                    
                    return (
                      <div key={feedback.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-full ${getSentimentColor(feedback.sentiment)}`}>
                              <SentimentIcon className="h-4 w-4" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{feedback.category}</Badge>
                                <Badge variant="outline">{feedback.department}</Badge>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-3 w-3 ${
                                        i < feedback.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500">
                                {formatDateTime(feedback.timestamp)}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {feedback.helpful}
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-1" />
                              {feedback.responses}
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3">{feedback.message}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex gap-1">
                            {feedback.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver Detalhes
                            </Button>
                            <Button variant="outline" size="sm">
                              <MessageCircle className="h-4 w-4 mr-2" />
                              Responder
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Pesquisas de Clima */}
          <TabsContent value="surveys" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Pesquisas de Clima Organizacional
                </CardTitle>
                <CardDescription>
                  Acompanhe o clima e bem-estar da organização
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {climateSurveys.map((survey) => (
                    <div key={survey.id} className="border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{survey.title}</h3>
                            <Badge className={getStatusColor(survey.status)}>
                              {survey.status}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-3">{survey.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs font-medium text-gray-500">Período</p>
                              <p className="text-sm font-medium">
                                {formatDate(survey.startDate)} - {formatDate(survey.endDate)}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Participação</p>
                              <p className="text-sm font-medium">
                                {survey.responses}/{survey.totalEmployees} ({survey.completionRate}%)
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Avaliação Média</p>
                              <p className="text-sm font-medium">
                                {survey.avgRating > 0 ? `${survey.avgRating}/5` : 'N/A'}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Última Resposta</p>
                              <p className="text-sm font-medium">
                                {survey.lastResponse ? formatDateTime(survey.lastResponse) : 'N/A'}
                              </p>
                            </div>
                          </div>
                          
                          {survey.completionRate > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Taxa de Participação</span>
                                <span className="text-sm text-gray-600">{survey.completionRate}%</span>
                              </div>
                              <Progress value={survey.completionRate} className="h-2" />
                            </div>
                          )}
                          
                          <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Categorias:</p>
                            <div className="flex flex-wrap gap-2">
                              {survey.categories.map((category, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {category}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {survey.status === 'active' && (
                            <Button size="sm">
                              <Send className="h-4 w-4 mr-2" />
                              Participar
                            </Button>
                          )}
                          {survey.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Ver Resultados
                            </Button>
                          )}
                          {survey.status === 'draft' && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-2" />
                              Editar
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Sugestões de Melhoria */}
          <TabsContent value="improvements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5" />
                  Sugestões de Melhoria
                </CardTitle>
                <CardDescription>
                  Ideias dos colaboradores para melhorar o ambiente de trabalho
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvements.map((improvement) => (
                    <div key={improvement.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-gray-900">{improvement.title}</h4>
                            <Badge className={getStatusColor(improvement.status)}>
                              {improvement.status}
                            </Badge>
                            <Badge className={getPriorityColor(improvement.priority)}>
                              {improvement.priority}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{improvement.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-xs font-medium text-gray-500">Categoria</p>
                              <p className="text-sm font-medium">{improvement.category}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Impacto Estimado</p>
                              <p className="text-sm font-medium">{improvement.estimatedImpact}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Custo de Implementação</p>
                              <p className="text-sm font-medium">{improvement.implementationCost}</p>
                            </div>
                            <div>
                              <p className="text-xs font-medium text-gray-500">Data</p>
                              <p className="text-sm font-medium">{formatDate(improvement.timestamp)}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-1 mb-3">
                            {improvement.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {improvement.votes}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Reconhecimentos */}
          <TabsContent value="recognition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Reconhecimentos
                </CardTitle>
                <CardDescription>
                  Celebre conquistas e reconheça bons trabalhos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recognitions.map((recognition) => (
                    <div key={recognition.id} className="border rounded-lg p-4 bg-gradient-to-r from-yellow-50 to-orange-50">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-yellow-100 rounded-full">
                            <Award className="h-5 w-5 text-yellow-600" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className="bg-yellow-100 text-yellow-800">
                                {recognition.badge}
                              </Badge>
                              <Badge variant="outline">{recognition.category}</Badge>
                              <Badge variant="outline">{recognition.department}</Badge>
                            </div>
                            
                            <p className="text-gray-700 mb-2">
                              <span className="font-medium">{recognition.to}</span> foi reconhecido por{' '}
                              <span className="font-medium">{recognition.from}</span>
                            </p>
                            
                            <p className="text-gray-600 mb-3">"{recognition.message}"</p>
                            
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-500">
                                {formatDateTime(recognition.timestamp)}
                              </p>
                              
                              <Button variant="outline" size="sm">
                                <Heart className="h-4 w-4 mr-1" />
                                {recognition.likes}
                              </Button>
                            </div>
                          </div>
                        </div>
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
                    <PieChart className="h-5 w-5" />
                    Distribuição de Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Positivo</span>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Neutro</span>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                    <Progress value={25} className="h-2" />
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Negativo</span>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                    <Progress value={10} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Tendências do Clima
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-green-600">↗ 8.5%</p>
                      <p className="text-sm text-gray-600">Melhoria geral este mês</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-lg font-bold text-blue-600">4.2/5</p>
                        <p className="text-xs text-gray-600">Satisfação Média</p>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-purple-600">78%</p>
                        <p className="text-xs text-gray-600">Engajamento</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Participação em Pesquisas</span>
                        <span className="font-medium">85%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Feedback Anônimo</span>
                        <span className="font-medium">156 este mês</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Sugestões Implementadas</span>
                        <span className="font-medium">23%</span>
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