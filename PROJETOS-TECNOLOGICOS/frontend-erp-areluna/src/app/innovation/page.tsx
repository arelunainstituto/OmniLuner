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
  Lightbulb, 
  TrendingUp, 
  Users, 
  Award, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Star,
  Rocket,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Eye,
  Heart,
  Share2,
  Flag,
  Calendar,
  User,
  Building,
  Zap,
  Trophy,
  Coins,
  BarChart3
} from 'lucide-react'

export default function InnovationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedSort, setSelectedSort] = useState('recent')

  // Mock data para ideias/sugestões
  const ideas = [
    {
      id: 1,
      title: 'Sistema de Agendamento Inteligente',
      description: 'Implementar IA para otimizar agendamentos baseado no histórico de pacientes e disponibilidade médica',
      author: 'Ana Silva',
      department: 'Instituto AreLuna',
      category: 'tecnologia',
      status: 'em_votacao',
      votes: { up: 47, down: 3 },
      comments: 12,
      views: 156,
      createdAt: '2024-01-10',
      tags: ['IA', 'Agendamento', 'Otimização'],
      impact: 'alto',
      effort: 'medio',
      roi: 85
    },
    {
      id: 2,
      title: 'Programa de Sustentabilidade Corporativa',
      description: 'Criar programa de redução de papel e energia com metas mensais por unidade',
      author: 'Carlos Santos',
      department: 'Vespasian Ventures',
      category: 'sustentabilidade',
      status: 'aprovada',
      votes: { up: 89, down: 5 },
      comments: 23,
      views: 234,
      createdAt: '2024-01-08',
      tags: ['ESG', 'Sustentabilidade', 'Economia'],
      impact: 'alto',
      effort: 'baixo',
      roi: 92
    },
    {
      id: 3,
      title: 'App Mobile para Colaboradores',
      description: 'Desenvolver aplicativo mobile para acesso rápido a informações e processos internos',
      author: 'Maria Oliveira',
      department: 'Pinklegion',
      category: 'tecnologia',
      status: 'em_desenvolvimento',
      votes: { up: 67, down: 8 },
      comments: 18,
      views: 189,
      createdAt: '2024-01-05',
      tags: ['Mobile', 'UX', 'Produtividade'],
      impact: 'medio',
      effort: 'alto',
      roi: 73
    },
    {
      id: 4,
      title: 'Sistema de Reconhecimento por Pontos',
      description: 'Gamificar o reconhecimento de colaboradores com sistema de pontos e recompensas',
      author: 'João Costa',
      department: 'ProStoral',
      category: 'rh',
      status: 'em_analise',
      votes: { up: 34, down: 12 },
      comments: 8,
      views: 98,
      createdAt: '2024-01-12',
      tags: ['Gamificação', 'RH', 'Motivação'],
      impact: 'medio',
      effort: 'medio',
      roi: 68
    },
    {
      id: 5,
      title: 'Central de Feedback Contínuo',
      description: 'Plataforma para feedback 360° contínuo entre colaboradores e gestores',
      author: 'Lucia Ferreira',
      department: 'Nuvens Autóctones',
      category: 'rh',
      status: 'rejeitada',
      votes: { up: 23, down: 31 },
      comments: 15,
      views: 87,
      createdAt: '2024-01-03',
      tags: ['Feedback', 'Gestão', 'Comunicação'],
      impact: 'baixo',
      effort: 'alto',
      roi: 34
    },
    {
      id: 6,
      title: 'Otimização de Rotas de Entrega',
      description: 'Algoritmo para otimizar rotas de entrega e reduzir custos de combustível',
      author: 'Pedro Almeida',
      department: 'Papagaio Fotogénico',
      category: 'logistica',
      status: 'em_votacao',
      votes: { up: 52, down: 7 },
      comments: 9,
      views: 143,
      createdAt: '2024-01-14',
      tags: ['Logística', 'Otimização', 'Economia'],
      impact: 'alto',
      effort: 'medio',
      roi: 81
    }
  ]

  const innovationStats = [
    {
      title: 'Ideias Submetidas',
      value: '127',
      change: '+23',
      trend: 'up',
      icon: Lightbulb
    },
    {
      title: 'Em Desenvolvimento',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: Rocket
    },
    {
      title: 'Taxa de Aprovação',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: CheckCircle
    },
    {
      title: 'ROI Médio',
      value: '74%',
      change: '+12%',
      trend: 'up',
      icon: TrendingUp
    }
  ]

  const categoryConfig = {
    tecnologia: { label: 'Tecnologia', color: 'bg-blue-100 text-blue-800', icon: Zap },
    rh: { label: 'RH', color: 'bg-green-100 text-green-800', icon: Users },
    sustentabilidade: { label: 'Sustentabilidade', color: 'bg-emerald-100 text-emerald-800', icon: Target },
    logistica: { label: 'Logística', color: 'bg-orange-100 text-orange-800', icon: Calendar },
    financeiro: { label: 'Financeiro', color: 'bg-purple-100 text-purple-800', icon: Coins },
    processo: { label: 'Processo', color: 'bg-gray-100 text-gray-800', icon: BarChart3 }
  }

  const statusConfig = {
    em_votacao: { label: 'Em Votação', color: 'bg-yellow-100 text-yellow-800', icon: ThumbsUp },
    em_analise: { label: 'Em Análise', color: 'bg-blue-100 text-blue-800', icon: Eye },
    aprovada: { label: 'Aprovada', color: 'bg-green-100 text-green-800', icon: CheckCircle },
    em_desenvolvimento: { label: 'Em Desenvolvimento', color: 'bg-purple-100 text-purple-800', icon: Rocket },
    rejeitada: { label: 'Rejeitada', color: 'bg-red-100 text-red-800', icon: AlertCircle }
  }

  const impactConfig = {
    alto: { label: 'Alto', color: 'text-red-600' },
    medio: { label: 'Médio', color: 'text-yellow-600' },
    baixo: { label: 'Baixo', color: 'text-green-600' }
  }

  const filteredIdeas = ideas.filter(idea => {
    const matchesSearch = idea.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         idea.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || idea.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || idea.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const sortedIdeas = [...filteredIdeas].sort((a, b) => {
    switch (selectedSort) {
      case 'votes':
        return (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down)
      case 'comments':
        return b.comments - a.comments
      case 'roi':
        return b.roi - a.roi
      case 'recent':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    }
  })

  const topContributors = [
    { name: 'Ana Silva', ideas: 12, votes: 234, department: 'Instituto AreLuna' },
    { name: 'Carlos Santos', ideas: 8, votes: 189, department: 'Vespasian Ventures' },
    { name: 'Maria Oliveira', ideas: 6, votes: 156, department: 'Pinklegion' },
    { name: 'João Costa', ideas: 5, votes: 123, department: 'ProStoral' }
  ]

  const challenges = [
    {
      id: 1,
      title: 'Desafio de Inovação Q1 2024',
      description: 'Soluções para reduzir tempo de atendimento em 30%',
      prize: 'R$ 5.000 + 3 dias de folga',
      deadline: '2024-02-15',
      participants: 23,
      status: 'ativo'
    },
    {
      id: 2,
      title: 'Hackathon Sustentabilidade',
      description: 'Ideias para reduzir pegada de carbono do grupo',
      prize: 'R$ 10.000 + implementação garantida',
      deadline: '2024-03-01',
      participants: 45,
      status: 'ativo'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-purple-600" />
              Central de Inovação
            </h1>
            <p className="text-gray-600 mt-1">
              Colabore, vote e transforme ideias em realidade no Grupo AreLuna
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
              Nova Ideia
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {innovationStats.map((stat, index) => {
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
                    <div className="p-3 bg-purple-50 rounded-full">
                      <Icon className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="ideas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ideas">Ideias</TabsTrigger>
            <TabsTrigger value="challenges">Desafios</TabsTrigger>
            <TabsTrigger value="leaderboard">Ranking</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab: Ideias */}
          <TabsContent value="ideas" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar ideias, tags ou autores..."
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
                      <SelectItem value="tecnologia">Tecnologia</SelectItem>
                      <SelectItem value="rh">RH</SelectItem>
                      <SelectItem value="sustentabilidade">Sustentabilidade</SelectItem>
                      <SelectItem value="logistica">Logística</SelectItem>
                      <SelectItem value="financeiro">Financeiro</SelectItem>
                      <SelectItem value="processo">Processo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="em_votacao">Em Votação</SelectItem>
                      <SelectItem value="em_analise">Em Análise</SelectItem>
                      <SelectItem value="aprovada">Aprovada</SelectItem>
                      <SelectItem value="em_desenvolvimento">Em Desenvolvimento</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-full lg:w-36">
                      <SelectValue placeholder="Ordenar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recent">Mais Recentes</SelectItem>
                      <SelectItem value="votes">Mais Votadas</SelectItem>
                      <SelectItem value="comments">Mais Comentadas</SelectItem>
                      <SelectItem value="roi">Maior ROI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Ideias */}
            <div className="grid gap-6">
              {sortedIdeas.map((idea) => {
                const categoryInfo = categoryConfig[idea.category as keyof typeof categoryConfig]
                const statusInfo = statusConfig[idea.status as keyof typeof statusConfig]
                const impactInfo = impactConfig[idea.impact as keyof typeof impactConfig]
                const CategoryIcon = categoryInfo.icon
                const StatusIcon = statusInfo.icon

                return (
                  <Card key={idea.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <CategoryIcon className="h-5 w-5" />
                              {idea.title}
                            </CardTitle>
                            <Badge variant="outline" className={categoryInfo.color}>
                              {categoryInfo.label}
                            </Badge>
                            <Badge variant="outline" className={statusInfo.color}>
                              <StatusIcon className="h-3 w-3 mr-1" />
                              {statusInfo.label}
                            </Badge>
                          </div>
                          <CardDescription className="text-base mb-3">
                            {idea.description}
                          </CardDescription>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4" />
                              {idea.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              {idea.department}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(idea.createdAt).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Share2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {idea.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        {/* Métricas de Impacto */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-red-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-red-900">Impacto</p>
                            <p className={`text-lg font-bold ${impactInfo.color}`}>{impactInfo.label}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Esforço</p>
                            <p className="text-lg font-bold text-blue-700">{idea.effort}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-green-900">ROI Estimado</p>
                            <p className="text-lg font-bold text-green-700">{idea.roi}%</p>
                          </div>
                        </div>

                        {/* Votação e Engajamento */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-6">
                            <div className="flex items-center gap-2">
                              <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                                <ThumbsUp className="h-4 w-4 mr-1" />
                                {idea.votes.up}
                              </Button>
                              <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                                <ThumbsDown className="h-4 w-4 mr-1" />
                                {idea.votes.down}
                              </Button>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                {idea.comments}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                {idea.views}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Comentar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4 mr-2" />
                              Favoritar
                            </Button>
                          </div>
                        </div>

                        {/* Barra de Progresso do ROI */}
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium">Potencial de ROI</span>
                            <span>{idea.roi}%</span>
                          </div>
                          <Progress value={idea.roi} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tab: Desafios */}
          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Desafios de Inovação
                </CardTitle>
                <CardDescription>
                  Participe de desafios temáticos e ganhe prêmios
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="border-l-4 border-l-purple-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{challenge.title}</CardTitle>
                            <CardDescription className="mt-2">{challenge.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {challenge.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-yellow-900">Prêmio</p>
                            <p className="text-lg font-bold text-yellow-700">{challenge.prize}</p>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-blue-900">Prazo</p>
                            <p className="text-lg font-bold text-blue-700">
                              {new Date(challenge.deadline).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-purple-900">Participantes</p>
                            <p className="text-lg font-bold text-purple-700">{challenge.participants}</p>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                          <Button>
                            <Rocket className="h-4 w-4 mr-2" />
                            Participar
                          </Button>
                          <Button variant="outline">
                            <Eye className="h-4 w-4 mr-2" />
                            Ver Detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Ranking */}
          <TabsContent value="leaderboard" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Top Inovadores
                </CardTitle>
                <CardDescription>
                  Colaboradores que mais contribuem com ideias e engajamento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-full">
                          <span className="text-lg font-bold text-purple-600">#{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{contributor.name}</p>
                          <p className="text-sm text-gray-600">{contributor.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-blue-600">{contributor.ideas}</p>
                          <p className="text-gray-600">Ideias</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-green-600">{contributor.votes}</p>
                          <p className="text-gray-600">Votos</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Star className="h-4 w-4 mr-1" />
                          Seguir
                        </Button>
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
                    Ideias por Categoria
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Tecnologia</span>
                      <span className="text-blue-600 font-bold">34</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">RH</span>
                      <span className="text-green-600 font-bold">28</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Sustentabilidade</span>
                      <span className="text-purple-600 font-bold">23</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Logística</span>
                      <span className="text-orange-600 font-bold">19</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Impacto das Ideias
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-900">Ideias Implementadas</p>
                        <p className="text-sm text-green-700">23 ideias geraram R$ 340K em economia</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Rocket className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-blue-900">Em Desenvolvimento</p>
                        <p className="text-sm text-blue-700">8 ideias com potencial de R$ 180K</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Users className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium text-purple-900">Engajamento</p>
                        <p className="text-sm text-purple-700">89% dos colaboradores participam ativamente</p>
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