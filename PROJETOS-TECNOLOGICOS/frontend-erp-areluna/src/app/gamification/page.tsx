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
  Trophy, 
  Medal, 
  Star, 
  Target, 
  TrendingUp, 
  Users, 
  Award, 
  Crown,
  Zap,
  Gift,
  Calendar,
  BarChart3,
  Clock,
  CheckCircle,
  Flame,
  Coins,
  Gem,
  Shield,
  Rocket,
  Heart,
  ThumbsUp,
  Search,
  Filter,
  Plus,
  Download,
  RefreshCw,
  User,
  Building,
  ArrowUp,
  ArrowDown,
  Minus,
  ChevronRight,
  Sparkles
} from 'lucide-react'

export default function GamificationPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDepartment, setSelectedDepartment] = useState('all')

  // Mock data para rankings
  const leaderboard = [
    {
      id: 1,
      name: 'Ana Silva',
      department: 'Instituto AreLuna',
      position: 1,
      lastPosition: 2,
      points: 2847,
      level: 'Diamante',
      badges: ['Inovador', 'Colaborativo', 'Eficiente'],
      achievements: 23,
      streak: 15,
      kpis: {
        productivity: 98,
        quality: 95,
        collaboration: 92,
        innovation: 89
      },
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      name: 'Carlos Santos',
      department: 'Vespasian Ventures',
      position: 2,
      lastPosition: 1,
      points: 2756,
      level: 'Diamante',
      badges: ['Líder', 'Estratégico', 'Mentor'],
      achievements: 21,
      streak: 12,
      kpis: {
        productivity: 94,
        quality: 97,
        collaboration: 88,
        innovation: 91
      },
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Maria Oliveira',
      department: 'Pinklegion',
      position: 3,
      lastPosition: 4,
      points: 2634,
      level: 'Ouro',
      badges: ['Criativa', 'Dedicada', 'Pontual'],
      achievements: 19,
      streak: 8,
      kpis: {
        productivity: 91,
        quality: 93,
        collaboration: 95,
        innovation: 87
      },
      avatar: '👩‍🎨'
    },
    {
      id: 4,
      name: 'João Costa',
      department: 'ProStoral',
      position: 4,
      lastPosition: 3,
      points: 2512,
      level: 'Ouro',
      badges: ['Técnico', 'Preciso', 'Confiável'],
      achievements: 17,
      streak: 6,
      kpis: {
        productivity: 89,
        quality: 96,
        collaboration: 84,
        innovation: 82
      },
      avatar: '👨‍🔧'
    },
    {
      id: 5,
      name: 'Lucia Ferreira',
      department: 'Nuvens Autóctones',
      position: 5,
      lastPosition: 6,
      points: 2398,
      level: 'Ouro',
      badges: ['Organizada', 'Comunicativa', 'Proativa'],
      achievements: 16,
      streak: 4,
      kpis: {
        productivity: 87,
        quality: 90,
        collaboration: 93,
        innovation: 85
      },
      avatar: '👩‍💻'
    },
    {
      id: 6,
      name: 'Pedro Almeida',
      department: 'Papagaio Fotogénico',
      position: 6,
      lastPosition: 5,
      points: 2287,
      level: 'Prata',
      badges: ['Versátil', 'Rápido', 'Adaptável'],
      achievements: 14,
      streak: 3,
      kpis: {
        productivity: 85,
        quality: 88,
        collaboration: 90,
        innovation: 83
      },
      avatar: '👨‍📸'
    }
  ]

  const gamificationStats = [
    {
      title: 'Participantes Ativos',
      value: '247',
      change: '+18',
      trend: 'up',
      icon: Users
    },
    {
      title: 'Pontos Distribuídos',
      value: '156K',
      change: '+23K',
      trend: 'up',
      icon: Coins
    },
    {
      title: 'Conquistas Desbloqueadas',
      value: '1.2K',
      change: '+89',
      trend: 'up',
      icon: Trophy
    },
    {
      title: 'Engajamento Médio',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: TrendingUp
    }
  ]

  const levelConfig = {
    'Bronze': { color: 'bg-amber-100 text-amber-800', icon: Medal },
    'Prata': { color: 'bg-gray-100 text-gray-800', icon: Medal },
    'Ouro': { color: 'bg-yellow-100 text-yellow-800', icon: Trophy },
    'Diamante': { color: 'bg-blue-100 text-blue-800', icon: Crown },
    'Lenda': { color: 'bg-purple-100 text-purple-800', icon: Sparkles }
  }

  const achievements = [
    {
      id: 1,
      name: 'Primeira Conquista',
      description: 'Complete sua primeira tarefa',
      icon: '🎯',
      rarity: 'Comum',
      points: 50,
      unlocked: true
    },
    {
      id: 2,
      name: 'Colaborador do Mês',
      description: 'Seja o colaborador mais produtivo do mês',
      icon: '🏆',
      rarity: 'Raro',
      points: 500,
      unlocked: true
    },
    {
      id: 3,
      name: 'Inovador',
      description: 'Tenha 5 ideias aprovadas na Central de Inovação',
      icon: '💡',
      rarity: 'Épico',
      points: 1000,
      unlocked: false
    },
    {
      id: 4,
      name: 'Mentor',
      description: 'Ajude 10 colegas a completar suas metas',
      icon: '🎓',
      rarity: 'Lendário',
      points: 2000,
      unlocked: false
    }
  ]

  const challenges = [
    {
      id: 1,
      name: 'Desafio de Produtividade',
      description: 'Complete 20 tarefas esta semana',
      progress: 15,
      target: 20,
      reward: '250 pontos + Badge Eficiente',
      deadline: '2024-01-21',
      participants: 89,
      status: 'ativo'
    },
    {
      id: 2,
      name: 'Maratona de Inovação',
      description: 'Submeta 3 ideias na Central de Inovação',
      progress: 1,
      target: 3,
      reward: '500 pontos + Badge Criativo',
      deadline: '2024-01-28',
      participants: 45,
      status: 'ativo'
    },
    {
      id: 3,
      name: 'Colaboração Extrema',
      description: 'Ajude 5 colegas em suas tarefas',
      progress: 3,
      target: 5,
      reward: '300 pontos + Badge Colaborativo',
      deadline: '2024-01-25',
      participants: 67,
      status: 'ativo'
    }
  ]

  const rewards = [
    {
      id: 1,
      name: 'Dia de Folga Extra',
      description: 'Um dia de folga adicional',
      cost: 5000,
      category: 'tempo',
      available: true,
      icon: '🏖️'
    },
    {
      id: 2,
      name: 'Vale Refeição R$ 100',
      description: 'Crédito para restaurantes parceiros',
      cost: 2500,
      category: 'beneficio',
      available: true,
      icon: '🍽️'
    },
    {
      id: 3,
      name: 'Curso Online Premium',
      description: 'Acesso a curso de desenvolvimento profissional',
      cost: 3000,
      category: 'educacao',
      available: true,
      icon: '📚'
    },
    {
      id: 4,
      name: 'Vaga VIP no Estacionamento',
      description: 'Vaga reservada por 1 mês',
      cost: 1500,
      category: 'comodidade',
      available: false,
      icon: '🚗'
    }
  ]

  const departmentRanking = [
    { name: 'Instituto AreLuna', points: 12847, members: 45, avgScore: 285 },
    { name: 'Vespasian Ventures', points: 11923, members: 32, avgScore: 373 },
    { name: 'Pinklegion', points: 10567, members: 28, avgScore: 377 },
    { name: 'ProStoral', points: 9834, members: 38, avgScore: 259 },
    { name: 'Nuvens Autóctones', points: 8756, members: 24, avgScore: 365 },
    { name: 'Papagaio Fotogénico', points: 7892, members: 19, avgScore: 415 }
  ]

  const getPositionChange = (current: number, last: number) => {
    if (current < last) return { icon: ArrowUp, color: 'text-green-500', text: `+${last - current}` }
    if (current > last) return { icon: ArrowDown, color: 'text-red-500', text: `-${current - last}` }
    return { icon: Minus, color: 'text-gray-500', text: '=' }
  }

  const filteredLeaderboard = leaderboard.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || user.department === selectedDepartment
    return matchesSearch && matchesDepartment
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              Gamificação & Rankings
            </h1>
            <p className="text-gray-600 mt-1">
              Acompanhe performance, conquiste badges e ganhe recompensas
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
              Novo Desafio
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {gamificationStats.map((stat, index) => {
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
                    <div className="p-3 bg-yellow-50 rounded-full">
                      <Icon className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Tabs principais */}
        <Tabs defaultValue="leaderboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="leaderboard">Rankings</TabsTrigger>
            <TabsTrigger value="achievements">Conquistas</TabsTrigger>
            <TabsTrigger value="challenges">Desafios</TabsTrigger>
            <TabsTrigger value="rewards">Recompensas</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab: Rankings */}
          <TabsContent value="leaderboard" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Buscar colaboradores..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-full lg:w-40">
                      <SelectValue placeholder="Período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Esta Semana</SelectItem>
                      <SelectItem value="month">Este Mês</SelectItem>
                      <SelectItem value="quarter">Trimestre</SelectItem>
                      <SelectItem value="year">Ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Departamento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Departamentos</SelectItem>
                      <SelectItem value="Instituto AreLuna">Instituto AreLuna</SelectItem>
                      <SelectItem value="Vespasian Ventures">Vespasian Ventures</SelectItem>
                      <SelectItem value="Pinklegion">Pinklegion</SelectItem>
                      <SelectItem value="ProStoral">ProStoral</SelectItem>
                      <SelectItem value="Nuvens Autóctones">Nuvens Autóctones</SelectItem>
                      <SelectItem value="Papagaio Fotogénico">Papagaio Fotogénico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ranking Individual */}
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5" />
                    Ranking Individual
                  </CardTitle>
                  <CardDescription>
                    Top performers do {selectedPeriod === 'month' ? 'mês' : 'período selecionado'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredLeaderboard.map((user) => {
                      const levelInfo = levelConfig[user.level as keyof typeof levelConfig]
                      const LevelIcon = levelInfo.icon
                      const positionChange = getPositionChange(user.position, user.lastPosition)
                      const ChangeIcon = positionChange.icon

                      return (
                        <div key={user.id} className="flex items-center gap-4 p-4 bg-white rounded-lg border hover:shadow-md transition-shadow">
                          {/* Posição */}
                          <div className="flex items-center gap-2 min-w-[80px]">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                              user.position === 1 ? 'bg-yellow-500' :
                              user.position === 2 ? 'bg-gray-400' :
                              user.position === 3 ? 'bg-amber-600' : 'bg-gray-300'
                            }`}>
                              {user.position}
                            </div>
                            <ChangeIcon className={`h-4 w-4 ${positionChange.color}`} />
                          </div>

                          {/* Avatar e Info */}
                          <div className="flex items-center gap-3 flex-1">
                            <div className="text-2xl">{user.avatar}</div>
                            <div>
                              <p className="font-semibold text-gray-900">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.department}</p>
                            </div>
                          </div>

                          {/* Level e Badges */}
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className={levelInfo.color}>
                              <LevelIcon className="h-3 w-3 mr-1" />
                              {user.level}
                            </Badge>
                            <div className="flex gap-1">
                              {user.badges.slice(0, 2).map((badge, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {badge}
                                </Badge>
                              ))}
                              {user.badges.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{user.badges.length - 2}
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Métricas */}
                          <div className="flex items-center gap-6 text-sm">
                            <div className="text-center">
                              <p className="font-bold text-yellow-600">{user.points.toLocaleString()}</p>
                              <p className="text-gray-600">Pontos</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-blue-600">{user.achievements}</p>
                              <p className="text-gray-600">Conquistas</p>
                            </div>
                            <div className="text-center">
                              <p className="font-bold text-orange-600">{user.streak}</p>
                              <p className="text-gray-600">Sequência</p>
                            </div>
                          </div>

                          {/* KPIs */}
                          <div className="grid grid-cols-2 gap-2 min-w-[120px]">
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Produtividade</p>
                              <p className="font-bold text-green-600">{user.kpis.productivity}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Qualidade</p>
                              <p className="font-bold text-blue-600">{user.kpis.quality}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Colaboração</p>
                              <p className="font-bold text-purple-600">{user.kpis.collaboration}%</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-gray-600">Inovação</p>
                              <p className="font-bold text-orange-600">{user.kpis.innovation}%</p>
                            </div>
                          </div>

                          <Button variant="outline" size="sm">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Ranking por Departamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Ranking por Departamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {departmentRanking.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-white ${
                            index === 0 ? 'bg-yellow-500' :
                            index === 1 ? 'bg-gray-400' :
                            index === 2 ? 'bg-amber-600' : 'bg-gray-300'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{dept.name}</p>
                            <p className="text-sm text-gray-600">{dept.members} colaboradores</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="font-bold text-yellow-600">{dept.points.toLocaleString()}</p>
                            <p className="text-gray-600">Pontos Totais</p>
                          </div>
                          <div className="text-center">
                            <p className="font-bold text-blue-600">{dept.avgScore}</p>
                            <p className="text-gray-600">Média por Pessoa</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Tab: Conquistas */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Sistema de Conquistas
                </CardTitle>
                <CardDescription>
                  Desbloqueie badges e conquistas especiais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {achievements.map((achievement) => (
                    <Card key={achievement.id} className={`${achievement.unlocked ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'} hover:shadow-lg transition-shadow`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl">{achievement.icon}</div>
                          <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                            {achievement.unlocked ? 'Desbloqueada' : 'Bloqueada'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className={
                            achievement.rarity === 'Lendário' ? 'bg-purple-100 text-purple-800' :
                            achievement.rarity === 'Épico' ? 'bg-orange-100 text-orange-800' :
                            achievement.rarity === 'Raro' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {achievement.rarity}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Coins className="h-4 w-4 text-yellow-600" />
                            <span className="font-bold text-yellow-600">{achievement.points}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Desafios */}
          <TabsContent value="challenges" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Desafios Ativos
                </CardTitle>
                <CardDescription>
                  Participe de desafios e ganhe pontos extras
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {challenges.map((challenge) => (
                    <Card key={challenge.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-lg">{challenge.name}</CardTitle>
                            <CardDescription className="mt-2">{challenge.description}</CardDescription>
                          </div>
                          <Badge variant="outline" className="bg-green-100 text-green-800">
                            {challenge.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Progresso */}
                          <div>
                            <div className="flex justify-between text-sm mb-2">
                              <span className="font-medium">Progresso</span>
                              <span>{challenge.progress}/{challenge.target}</span>
                            </div>
                            <Progress value={(challenge.progress / challenge.target) * 100} className="h-3" />
                          </div>

                          {/* Detalhes */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-yellow-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-yellow-900">Recompensa</p>
                              <p className="text-sm text-yellow-700">{challenge.reward}</p>
                            </div>
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-blue-900">Prazo</p>
                              <p className="text-sm text-blue-700">
                                {new Date(challenge.deadline).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                            <div className="bg-purple-50 p-3 rounded-lg">
                              <p className="text-sm font-medium text-purple-900">Participantes</p>
                              <p className="text-sm text-purple-700">{challenge.participants} pessoas</p>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <Button>
                              <Rocket className="h-4 w-4 mr-2" />
                              Participar
                            </Button>
                            <Button variant="outline">
                              <Users className="h-4 w-4 mr-2" />
                              Ver Participantes
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Recompensas */}
          <TabsContent value="rewards" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5" />
                  Loja de Recompensas
                </CardTitle>
                <CardDescription>
                  Troque seus pontos por benefícios exclusivos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {rewards.map((reward) => (
                    <Card key={reward.id} className={`${reward.available ? 'hover:shadow-lg' : 'opacity-60'} transition-shadow`}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="text-3xl">{reward.icon}</div>
                          <Badge variant={reward.available ? "default" : "secondary"}>
                            {reward.available ? 'Disponível' : 'Esgotado'}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{reward.name}</CardTitle>
                        <CardDescription>{reward.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-1">
                            <Coins className="h-5 w-5 text-yellow-600" />
                            <span className="font-bold text-yellow-600 text-lg">{reward.cost.toLocaleString()}</span>
                          </div>
                          <Button disabled={!reward.available} size="sm">
                            {reward.available ? 'Resgatar' : 'Indisponível'}
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
                    Engajamento por Departamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Instituto AreLuna</span>
                      <span className="text-blue-600 font-bold">94%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Vespasian Ventures</span>
                      <span className="text-green-600 font-bold">91%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Pinklegion</span>
                      <span className="text-purple-600 font-bold">89%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">ProStoral</span>
                      <span className="text-orange-600 font-bold">87%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Impacto da Gamificação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium text-green-900">Produtividade</p>
                        <p className="text-sm text-green-700">+23% desde implementação</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Users className="h-5 w-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-blue-900">Colaboração</p>
                        <p className="text-sm text-blue-700">+31% em projetos em equipe</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                      <Heart className="h-5 w-5 text-purple-500" />
                      <div>
                        <p className="font-medium text-purple-900">Satisfação</p>
                        <p className="text-sm text-purple-700">+18% no NPS interno</p>
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