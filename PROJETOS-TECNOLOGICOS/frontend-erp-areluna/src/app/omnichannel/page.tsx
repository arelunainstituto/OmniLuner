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
  Globe, 
  Smartphone, 
  MessageSquare, 
  Video, 
  Mail, 
  Phone,
  Users,
  Activity,
  BarChart3,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Download,
  Upload,
  Send,
  Reply,
  Forward,
  Archive,
  Star,
  Flag,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Share,
  Link,
  Copy,
  Save,
  FileText,
  Image,
  Paperclip,
  Smile,
  ThumbsUp,
  ThumbsDown,
  Heart,
  Zap,
  Bell,
  BellOff,
  Wifi,
  WifiOff,
  Signal,
  Battery,
  Monitor,
  Tablet,
  Watch,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Calendar,
  MapPin,
  Navigation,
  Compass,
  Route,
  Target,
  Award,
  Briefcase,
  Building,
  Home,
  Store,
  Factory,
  Warehouse,
  School,
  Hospital
} from 'lucide-react'

export default function OmnichannelPage() {
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [activeConversations, setActiveConversations] = useState(12)

  // Mock data para canais de comunicação
  const channels = [
    {
      id: 'web',
      name: 'Web Chat',
      description: 'Chat integrado no site e portal do cliente',
      icon: Globe,
      color: 'blue',
      status: 'active',
      conversations: 45,
      responseTime: '2.3min',
      satisfaction: 4.6,
      volume: 1250,
      agents: 8,
      features: ['Chat em tempo real', 'Histórico de conversas', 'Transferência de arquivos', 'Chatbot integrado']
    },
    {
      id: 'mobile',
      name: 'Mobile App',
      description: 'Aplicativo móvel para iOS e Android',
      icon: Smartphone,
      color: 'green',
      status: 'active',
      conversations: 32,
      responseTime: '1.8min',
      satisfaction: 4.8,
      volume: 890,
      agents: 6,
      features: ['Push notifications', 'Chat offline', 'Localização GPS', 'Câmera integrada']
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp Business',
      description: 'Atendimento via WhatsApp Business API',
      icon: MessageSquare,
      color: 'green',
      status: 'active',
      conversations: 78,
      responseTime: '3.1min',
      satisfaction: 4.4,
      volume: 2100,
      agents: 12,
      features: ['Mensagens automáticas', 'Catálogo de produtos', 'Pagamentos', 'Status de entrega']
    },
    {
      id: 'teams',
      name: 'Microsoft Teams',
      description: 'Comunicação interna e com clientes B2B',
      icon: Video,
      color: 'purple',
      status: 'active',
      conversations: 23,
      responseTime: '1.5min',
      satisfaction: 4.7,
      volume: 450,
      agents: 15,
      features: ['Videochamadas', 'Compartilhamento de tela', 'Colaboração em documentos', 'Integração Office']
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Suporte tradicional por email',
      icon: Mail,
      color: 'orange',
      status: 'active',
      conversations: 156,
      responseTime: '4.2h',
      satisfaction: 4.2,
      volume: 3200,
      agents: 10,
      features: ['Templates automáticos', 'Assinatura digital', 'Anexos seguros', 'Rastreamento de leitura']
    },
    {
      id: 'phone',
      name: 'Telefone',
      description: 'Central de atendimento telefônico',
      icon: Phone,
      color: 'red',
      status: 'active',
      conversations: 89,
      responseTime: '45s',
      satisfaction: 4.1,
      volume: 1800,
      agents: 20,
      features: ['Gravação de chamadas', 'URA inteligente', 'Callback automático', 'Análise de sentimento']
    },
    {
      id: 'social',
      name: 'Redes Sociais',
      description: 'Facebook, Instagram, Twitter, LinkedIn',
      icon: Share,
      color: 'pink',
      status: 'beta',
      conversations: 34,
      responseTime: '5.2min',
      satisfaction: 4.3,
      volume: 680,
      agents: 4,
      features: ['Monitoramento de menções', 'Resposta automática', 'Análise de sentimento', 'Influencer tracking']
    }
  ]

  // Mock data para conversas ativas
  const conversations = [
    {
      id: 1,
      customer: 'Ana Silva',
      channel: 'whatsapp',
      subject: 'Dúvida sobre pedido #12345',
      status: 'active',
      priority: 'high',
      agent: 'Carlos Santos',
      lastMessage: 'Preciso verificar o status do meu pedido',
      timestamp: '2024-03-15T10:30:00Z',
      responseTime: '2min',
      satisfaction: null,
      tags: ['pedido', 'urgente']
    },
    {
      id: 2,
      customer: 'João Oliveira',
      channel: 'web',
      subject: 'Problema com login',
      status: 'waiting',
      priority: 'medium',
      agent: 'Maria Costa',
      lastMessage: 'Não consigo acessar minha conta',
      timestamp: '2024-03-15T10:25:00Z',
      responseTime: '5min',
      satisfaction: null,
      tags: ['login', 'técnico']
    },
    {
      id: 3,
      customer: 'Empresa ABC Ltda',
      channel: 'teams',
      subject: 'Reunião sobre contrato',
      status: 'scheduled',
      priority: 'high',
      agent: 'Pedro Lima',
      lastMessage: 'Vamos agendar para amanhã às 14h',
      timestamp: '2024-03-15T10:20:00Z',
      responseTime: '1min',
      satisfaction: 5,
      tags: ['b2b', 'contrato', 'reunião']
    },
    {
      id: 4,
      customer: 'Lucia Ferreira',
      channel: 'mobile',
      subject: 'Feedback sobre produto',
      status: 'resolved',
      priority: 'low',
      agent: 'Ana Rodrigues',
      lastMessage: 'Muito obrigada pelo atendimento!',
      timestamp: '2024-03-15T10:15:00Z',
      responseTime: '3min',
      satisfaction: 5,
      tags: ['feedback', 'produto']
    },
    {
      id: 5,
      customer: 'Roberto Santos',
      channel: 'phone',
      subject: 'Cancelamento de serviço',
      status: 'escalated',
      priority: 'high',
      agent: 'Supervisor',
      lastMessage: 'Transferindo para supervisor',
      timestamp: '2024-03-15T10:10:00Z',
      responseTime: '8min',
      satisfaction: 2,
      tags: ['cancelamento', 'escalado']
    }
  ]

  // Mock data para métricas de performance
  const metrics = [
    {
      id: 'response_time',
      name: 'Tempo de Resposta Médio',
      value: '2.4min',
      change: -12.5,
      trend: 'down',
      target: '2.0min',
      icon: Clock
    },
    {
      id: 'satisfaction',
      name: 'Satisfação do Cliente',
      value: '4.5',
      change: 8.2,
      trend: 'up',
      target: '4.6',
      icon: ThumbsUp
    },
    {
      id: 'resolution_rate',
      name: 'Taxa de Resolução',
      value: '87.3%',
      change: 5.1,
      trend: 'up',
      target: '90%',
      icon: CheckCircle
    },
    {
      id: 'active_conversations',
      name: 'Conversas Ativas',
      value: '423',
      change: 15.7,
      trend: 'up',
      target: '400',
      icon: MessageSquare
    }
  ]

  // Mock data para agentes
  const agents = [
    {
      id: 1,
      name: 'Carlos Santos',
      avatar: 'CS',
      status: 'online',
      channels: ['whatsapp', 'web', 'email'],
      activeChats: 3,
      todayChats: 28,
      avgResponseTime: '1.8min',
      satisfaction: 4.7,
      languages: ['PT', 'EN']
    },
    {
      id: 2,
      name: 'Maria Costa',
      avatar: 'MC',
      status: 'online',
      channels: ['web', 'mobile', 'teams'],
      activeChats: 2,
      todayChats: 22,
      avgResponseTime: '2.1min',
      satisfaction: 4.8,
      languages: ['PT', 'ES']
    },
    {
      id: 3,
      name: 'Pedro Lima',
      avatar: 'PL',
      status: 'busy',
      channels: ['teams', 'phone', 'email'],
      activeChats: 4,
      todayChats: 35,
      avgResponseTime: '1.5min',
      satisfaction: 4.6,
      languages: ['PT', 'EN', 'ES']
    },
    {
      id: 4,
      name: 'Ana Rodrigues',
      avatar: 'AR',
      status: 'away',
      channels: ['mobile', 'social', 'whatsapp'],
      activeChats: 1,
      todayChats: 18,
      avgResponseTime: '2.8min',
      satisfaction: 4.4,
      languages: ['PT']
    }
  ]

  // Mock data para automações
  const automations = [
    {
      id: 1,
      name: 'Resposta Automática WhatsApp',
      description: 'Resposta inicial automática para novos contatos',
      channel: 'whatsapp',
      status: 'active',
      triggers: 1250,
      successRate: 94.2,
      lastTriggered: '2024-03-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Escalação por Prioridade',
      description: 'Escalação automática para supervisor em casos urgentes',
      channel: 'all',
      status: 'active',
      triggers: 45,
      successRate: 100,
      lastTriggered: '2024-03-15T09:45:00Z'
    },
    {
      id: 3,
      name: 'Distribuição Inteligente',
      description: 'Distribuição de conversas baseada em expertise do agente',
      channel: 'all',
      status: 'active',
      triggers: 890,
      successRate: 87.5,
      lastTriggered: '2024-03-15T10:28:00Z'
    },
    {
      id: 4,
      name: 'Follow-up Automático',
      description: 'Mensagem de follow-up após resolução do ticket',
      channel: 'all',
      status: 'paused',
      triggers: 234,
      successRate: 76.8,
      lastTriggered: '2024-03-14T16:20:00Z'
    }
  ]

  const getChannelIcon = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId)
    return channel ? channel.icon : MessageSquare
  }

  const getChannelColor = (channelId: string) => {
    const channel = channels.find(c => c.id === channelId)
    return channel ? channel.color : 'gray'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'waiting': return 'bg-yellow-100 text-yellow-800'
      case 'resolved': return 'bg-blue-100 text-blue-800'
      case 'escalated': return 'bg-red-100 text-red-800'
      case 'scheduled': return 'bg-purple-100 text-purple-800'
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

  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500'
      case 'busy': return 'bg-yellow-500'
      case 'away': return 'bg-gray-500'
      case 'offline': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const totalConversations = channels.reduce((sum, channel) => sum + channel.conversations, 0)
  const avgSatisfaction = channels.reduce((sum, channel) => sum + channel.satisfaction, 0) / channels.length
  const totalVolume = channels.reduce((sum, channel) => sum + channel.volume, 0)
  const totalAgents = channels.reduce((sum, channel) => sum + channel.agents, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Globe className="h-8 w-8 text-blue-600" />
              Experiência Omnichannel
            </h1>
            <p className="text-gray-600 mt-1">
              Gestão unificada de todos os canais de comunicação
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hoje</SelectItem>
                <SelectItem value="week">Esta Semana</SelectItem>
                <SelectItem value="month">Este Mês</SelectItem>
                <SelectItem value="quarter">Trimestre</SelectItem>
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
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          </div>
        </div>

        {/* Métricas Principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            const isPositive = metric.trend === 'up'
            
            return (
              <Card key={metric.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{metric.name}</p>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                        {Math.abs(metric.change)}%
                      </div>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Tabs defaultValue="channels" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="channels">Canais</TabsTrigger>
            <TabsTrigger value="conversations">Conversas</TabsTrigger>
            <TabsTrigger value="agents">Agentes</TabsTrigger>
            <TabsTrigger value="automations">Automações</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Tab: Canais */}
          <TabsContent value="channels" className="space-y-6">
            <div className="grid gap-6">
              {channels.map((channel) => {
                const Icon = channel.icon
                
                return (
                  <Card key={channel.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-${channel.color}-100`}>
                            <Icon className={`h-6 w-6 text-${channel.color}-600`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{channel.name}</h3>
                              <Badge className={channel.status === 'active' ? 'bg-green-100 text-green-800' : channel.status === 'beta' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>
                                {channel.status}
                              </Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{channel.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-xs font-medium text-gray-500">Conversas Ativas</p>
                                <p className="text-lg font-bold text-gray-900">{channel.conversations}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Tempo de Resposta</p>
                                <p className="text-lg font-bold text-gray-900">{channel.responseTime}</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Satisfação</p>
                                <p className="text-lg font-bold text-gray-900">{channel.satisfaction}/5</p>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-500">Volume (24h)</p>
                                <p className="text-lg font-bold text-gray-900">{channel.volume}</p>
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Recursos:</p>
                              <div className="flex flex-wrap gap-2">
                                {channel.features.map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tab: Conversas */}
          <TabsContent value="conversations" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Conversas Ativas
                    </CardTitle>
                    <CardDescription>
                      {conversations.length} conversas em andamento
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select value={selectedChannel} onValueChange={setSelectedChannel}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Todos os canais" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os canais</SelectItem>
                        {channels.map(channel => (
                          <SelectItem key={channel.id} value={channel.id}>
                            {channel.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filtros
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversations.map((conversation) => {
                    const ChannelIcon = getChannelIcon(conversation.channel)
                    
                    return (
                      <div key={conversation.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-${getChannelColor(conversation.channel)}-100`}>
                              <ChannelIcon className={`h-4 w-4 text-${getChannelColor(conversation.channel)}-600`} />
                            </div>
                            
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900">{conversation.customer}</h4>
                                <Badge className={getStatusColor(conversation.status)}>
                                  {conversation.status}
                                </Badge>
                                <Badge className={getPriorityColor(conversation.priority)}>
                                  {conversation.priority}
                                </Badge>
                              </div>
                              
                              <p className="text-sm text-gray-600 mb-2">{conversation.subject}</p>
                              <p className="text-sm text-gray-700 mb-2">"{conversation.lastMessage}"</p>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Agente: {conversation.agent}</span>
                                <span>Tempo: {conversation.responseTime}</span>
                                <span>{formatTime(conversation.timestamp)}</span>
                                {conversation.satisfaction && (
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span>{conversation.satisfaction}/5</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="flex gap-1 mt-2">
                                {conversation.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Reply className="h-4 w-4 mr-2" />
                              Responder
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              Ver
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

          {/* Tab: Agentes */}
          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Agentes Online
                </CardTitle>
                <CardDescription>
                  {agents.filter(a => a.status === 'online').length} de {agents.length} agentes online
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {agents.map((agent) => (
                    <div key={agent.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-semibold text-blue-600">{agent.avatar}</span>
                            </div>
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getAgentStatusColor(agent.status)} rounded-full border-2 border-white`}></div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{agent.name}</h4>
                              <Badge variant="outline" className="text-xs capitalize">
                                {agent.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Chats Ativos</p>
                                <p className="font-medium">{agent.activeChats}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Chats Hoje</p>
                                <p className="font-medium">{agent.todayChats}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Tempo Médio</p>
                                <p className="font-medium">{agent.avgResponseTime}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Satisfação</p>
                                <p className="font-medium">{agent.satisfaction}/5</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex gap-1">
                                {agent.channels.map((channelId, index) => {
                                  const ChannelIcon = getChannelIcon(channelId)
                                  return (
                                    <div key={index} className={`p-1 rounded bg-${getChannelColor(channelId)}-100`}>
                                      <ChannelIcon className={`h-3 w-3 text-${getChannelColor(channelId)}-600`} />
                                    </div>
                                  )
                                })}
                              </div>
                              
                              <div className="flex gap-1">
                                {agent.languages.map((lang, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {lang}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Conversar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Automações */}
          <TabsContent value="automations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Automações Ativas
                </CardTitle>
                <CardDescription>
                  Fluxos automatizados para otimizar o atendimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {automations.map((automation) => (
                    <div key={automation.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-semibold text-gray-900">{automation.name}</h4>
                            <Badge className={automation.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                              {automation.status}
                            </Badge>
                            <Badge variant="outline">
                              {automation.channel === 'all' ? 'Todos os canais' : channels.find(c => c.id === automation.channel)?.name}
                            </Badge>
                          </div>
                          
                          <p className="text-gray-600 mb-3">{automation.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Execuções</p>
                              <p className="font-medium">{automation.triggers}</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Taxa de Sucesso</p>
                              <p className="font-medium">{automation.successRate}%</p>
                            </div>
                            <div>
                              <p className="text-gray-500">Última Execução</p>
                              <p className="font-medium">
                                {new Date(automation.lastTriggered).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Button>
                          {automation.status === 'active' ? (
                            <Button variant="outline" size="sm" className="text-yellow-600 hover:text-yellow-700">
                              <Pause className="h-4 w-4 mr-2" />
                              Pausar
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Ativar
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

          {/* Tab: Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Volume por Canal
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channels.map((channel) => {
                      const percentage = (channel.volume / totalVolume) * 100
                      const Icon = channel.icon
                      
                      return (
                        <div key={channel.id} className="flex items-center gap-3">
                          <div className={`p-2 rounded bg-${channel.color}-100`}>
                            <Icon className={`h-4 w-4 text-${channel.color}-600`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm font-medium text-gray-900">{channel.name}</span>
                              <span className="text-sm text-gray-600">{channel.volume}</span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                          <span className="text-sm text-gray-500 w-12 text-right">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Performance Geral
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-gray-900">{totalConversations}</p>
                      <p className="text-sm text-gray-600">Conversas Ativas</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-xl font-bold text-green-600">{avgSatisfaction.toFixed(1)}/5</p>
                        <p className="text-xs text-gray-600">Satisfação Média</p>
                      </div>
                      <div>
                        <p className="text-xl font-bold text-blue-600">{totalAgents}</p>
                        <p className="text-xs text-gray-600">Agentes Ativos</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Resolução no Primeiro Contato</span>
                        <span className="font-medium">78.5%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Tempo Médio de Resolução</span>
                        <span className="font-medium">4.2h</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Taxa de Escalação</span>
                        <span className="font-medium">12.3%</span>
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