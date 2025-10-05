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
  Settings, 
  Link, 
  Globe, 
  Shield, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Clock,
  Play,
  Pause,
  RotateCcw,
  Trash2,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Save,
  Search,
  Filter,
  MoreHorizontal,
  ArrowRight,
  ArrowLeft,
  Users,
  Mail,
  Calendar,
  FileText,
  Database,
  Cloud,
  Smartphone,
  MessageSquare,
  Phone,
  Video,
  Briefcase,
  TrendingUp,
  BarChart3,
  PieChart,
  Target,
  Award,
  Star,
  Heart,
  Bookmark,
  Tag,
  Folder,
  File,
  Image,
  Archive,
  Lock,
  Unlock,
  Key,
  UserCheck,
  UserX,
  Activity,
  Wifi,
  WifiOff,
  Server,
  HardDrive,
  Cpu,
  Monitor,
  Tablet,
  Layers,
  Grid,
  List,
  Map,
  Navigation,
  Compass,
  MapPin,
  Route,
  Truck,
  Package,
  ShoppingCart,
  CreditCard,
  DollarSign,
  Euro,
  PoundSterling,
  Percent,
  Calculator,
  Receipt,
  Banknote,
  Coins,
  Wallet,
  Building,
  Home,
  Store,
  Factory,
  Warehouse,
  School,
  Hospital,
  TreePine,
  Leaf,
  Recycle,
  Lightbulb,
  Flame,
  Droplets,
  Wind,
  Sun,
  Moon,
  CloudRain,
  Snowflake,
  Thermometer,
  Gauge,
  Timer,
  Hourglass,
  AlarmClock,
  Bell,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Camera,
  CameraOff,
  Headphones,
  Speaker,
  Radio,
  Tv,
  Gamepad2,
  Joystick,
  Puzzle,
  Dice1,
  Dice2,
  Dice3,
  Dice4,
  Dice5,
  Dice6,
  Spade,
  Club,
  Diamond,
  Heart as HeartSuit
} from 'lucide-react'

export default function AdvancedIntegrationsPage() {
  const [selectedIntegration, setSelectedIntegration] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // Mock data para integrações disponíveis
  const integrations = [
    {
      id: 'microsoft-graph',
      name: 'Microsoft Graph API',
      description: 'Integração completa com Microsoft 365, Teams, Outlook e SharePoint',
      category: 'Produtividade',
      provider: 'Microsoft',
      status: 'connected',
      icon: Cloud,
      color: 'blue',
      features: ['Email', 'Calendário', 'Teams', 'SharePoint', 'OneDrive', 'Azure AD'],
      automations: [
        'Sincronização de calendários',
        'Notificações via Teams',
        'Backup automático no OneDrive',
        'SSO com Azure AD'
      ],
      lastSync: '2024-03-15T10:30:00Z',
      syncFrequency: '15min',
      dataVolume: '2.3GB',
      apiCalls: 15420,
      errorRate: 0.2
    },
    {
      id: 'zoho-crm',
      name: 'Zoho CRM',
      description: 'Gestão de leads, oportunidades e pipeline de vendas',
      category: 'CRM',
      provider: 'Zoho',
      status: 'connected',
      icon: Users,
      color: 'orange',
      features: ['Leads', 'Deals', 'Contacts', 'Accounts', 'Reports', 'Workflows'],
      automations: [
        'Criação automática de leads',
        'Atualização de oportunidades',
        'Sincronização de contatos',
        'Relatórios de vendas'
      ],
      lastSync: '2024-03-15T09:45:00Z',
      syncFrequency: '30min',
      dataVolume: '1.8GB',
      apiCalls: 8750,
      errorRate: 0.1
    },
    {
      id: 'evolution-api',
      name: 'Evolution API (WhatsApp)',
      description: 'Automação de mensagens WhatsApp Business',
      category: 'Comunicação',
      provider: 'Evolution API',
      status: 'connected',
      icon: MessageSquare,
      color: 'green',
      features: ['Mensagens', 'Grupos', 'Mídia', 'Webhooks', 'Chatbot', 'Analytics'],
      automations: [
        'Notificações automáticas',
        'Confirmações de pedidos',
        'Lembretes de consultas',
        'Suporte automatizado'
      ],
      lastSync: '2024-03-15T11:00:00Z',
      syncFrequency: '5min',
      dataVolume: '450MB',
      apiCalls: 25600,
      errorRate: 0.05
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Comunicação e colaboração em equipe',
      category: 'Comunicação',
      provider: 'Slack',
      status: 'disconnected',
      icon: MessageSquare,
      color: 'purple',
      features: ['Channels', 'DMs', 'Files', 'Apps', 'Workflows', 'Calls'],
      automations: [
        'Notificações de sistema',
        'Alertas de aprovação',
        'Relatórios diários',
        'Integração com tickets'
      ],
      lastSync: null,
      syncFrequency: null,
      dataVolume: '0MB',
      apiCalls: 0,
      errorRate: 0
    },
    {
      id: 'google-workspace',
      name: 'Google Workspace',
      description: 'Gmail, Drive, Calendar e Google Apps',
      category: 'Produtividade',
      provider: 'Google',
      status: 'error',
      icon: Mail,
      color: 'red',
      features: ['Gmail', 'Drive', 'Calendar', 'Docs', 'Sheets', 'Meet'],
      automations: [
        'Backup de documentos',
        'Sincronização de agenda',
        'Compartilhamento automático',
        'Notificações por email'
      ],
      lastSync: '2024-03-14T16:20:00Z',
      syncFrequency: '1h',
      dataVolume: '3.1GB',
      apiCalls: 12300,
      errorRate: 2.5
    },
    {
      id: 'salesforce',
      name: 'Salesforce',
      description: 'CRM empresarial e automação de vendas',
      category: 'CRM',
      provider: 'Salesforce',
      status: 'pending',
      icon: Cloud,
      color: 'blue',
      features: ['Leads', 'Opportunities', 'Accounts', 'Cases', 'Reports', 'Dashboards'],
      automations: [
        'Sincronização de dados',
        'Workflows de vendas',
        'Relatórios automáticos',
        'Alertas de oportunidades'
      ],
      lastSync: null,
      syncFrequency: null,
      dataVolume: '0MB',
      apiCalls: 0,
      errorRate: 0
    },
    {
      id: 'hubspot',
      name: 'HubSpot',
      description: 'Marketing, vendas e atendimento ao cliente',
      category: 'Marketing',
      provider: 'HubSpot',
      status: 'connected',
      icon: TrendingUp,
      color: 'orange',
      features: ['Marketing', 'Sales', 'Service', 'CMS', 'Operations', 'Analytics'],
      automations: [
        'Lead scoring automático',
        'Email marketing',
        'Nurturing de leads',
        'Análise de conversão'
      ],
      lastSync: '2024-03-15T08:15:00Z',
      syncFrequency: '2h',
      dataVolume: '1.2GB',
      apiCalls: 6800,
      errorRate: 0.3
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Processamento de pagamentos online',
      category: 'Financeiro',
      provider: 'Stripe',
      status: 'connected',
      icon: CreditCard,
      color: 'purple',
      features: ['Payments', 'Subscriptions', 'Invoices', 'Disputes', 'Analytics', 'Webhooks'],
      automations: [
        'Processamento automático',
        'Reconciliação bancária',
        'Faturas recorrentes',
        'Alertas de pagamento'
      ],
      lastSync: '2024-03-15T10:45:00Z',
      syncFrequency: '10min',
      dataVolume: '890MB',
      apiCalls: 18900,
      errorRate: 0.1
    }
  ]

  // Mock data para automações
  const automations = [
    {
      id: 1,
      name: 'Lead para Oportunidade',
      description: 'Converte leads qualificados do Zoho CRM em oportunidades internas',
      source: 'zoho-crm',
      target: 'erp-interno',
      trigger: 'Lead Status = Qualified',
      action: 'Criar Oportunidade',
      status: 'active',
      executions: 156,
      successRate: 98.7,
      lastExecution: '2024-03-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Notificação Teams - Aprovações',
      description: 'Envia notificações no Teams para aprovações pendentes',
      source: 'erp-interno',
      target: 'microsoft-graph',
      trigger: 'Nova Aprovação Pendente',
      action: 'Enviar Mensagem Teams',
      status: 'active',
      executions: 89,
      successRate: 100,
      lastExecution: '2024-03-15T09:15:00Z'
    },
    {
      id: 3,
      name: 'WhatsApp - Confirmação Pedidos',
      description: 'Confirma pedidos via WhatsApp automaticamente',
      source: 'erp-interno',
      target: 'evolution-api',
      trigger: 'Pedido Criado',
      action: 'Enviar Confirmação WhatsApp',
      status: 'active',
      executions: 234,
      successRate: 96.2,
      lastExecution: '2024-03-15T11:00:00Z'
    },
    {
      id: 4,
      name: 'Backup OneDrive',
      description: 'Backup automático de relatórios no OneDrive',
      source: 'erp-interno',
      target: 'microsoft-graph',
      trigger: 'Relatório Gerado',
      action: 'Upload OneDrive',
      status: 'paused',
      executions: 45,
      successRate: 91.1,
      lastExecution: '2024-03-14T18:30:00Z'
    },
    {
      id: 5,
      name: 'Sincronização Calendário',
      description: 'Sincroniza eventos do ERP com calendário Outlook',
      source: 'erp-interno',
      target: 'microsoft-graph',
      trigger: 'Evento Criado/Atualizado',
      action: 'Sincronizar Calendário',
      status: 'active',
      executions: 78,
      successRate: 94.9,
      lastExecution: '2024-03-15T08:45:00Z'
    }
  ]

  // Mock data para logs de integração
  const integrationLogs = [
    {
      id: 1,
      integration: 'microsoft-graph',
      type: 'success',
      message: 'Sincronização de calendário concluída com sucesso',
      timestamp: '2024-03-15T10:30:00Z',
      details: '15 eventos sincronizados'
    },
    {
      id: 2,
      integration: 'zoho-crm',
      type: 'success',
      message: 'Leads atualizados com sucesso',
      timestamp: '2024-03-15T10:25:00Z',
      details: '8 leads processados'
    },
    {
      id: 3,
      integration: 'evolution-api',
      type: 'warning',
      message: 'Rate limit atingido, aguardando próxima janela',
      timestamp: '2024-03-15T10:20:00Z',
      details: 'Próxima tentativa em 5 minutos'
    },
    {
      id: 4,
      integration: 'google-workspace',
      type: 'error',
      message: 'Falha na autenticação OAuth',
      timestamp: '2024-03-15T10:15:00Z',
      details: 'Token expirado, reautenticação necessária'
    },
    {
      id: 5,
      integration: 'stripe',
      type: 'success',
      message: 'Webhook processado com sucesso',
      timestamp: '2024-03-15T10:10:00Z',
      details: 'Pagamento de R$ 1.250,00 confirmado'
    }
  ]

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter
    const matchesCategory = categoryFilter === 'all' || integration.category === categoryFilter
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-100 text-green-800'
      case 'disconnected': return 'bg-gray-100 text-gray-800'
      case 'error': return 'bg-red-100 text-red-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle
      case 'disconnected': return XCircle
      case 'error': return AlertCircle
      case 'pending': return Clock
      default: return XCircle
    }
  }

  const getLogTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  const getLogTypeIcon = (type: string) => {
    switch (type) {
      case 'success': return CheckCircle
      case 'warning': return AlertCircle
      case 'error': return XCircle
      default: return AlertCircle
    }
  }

  const categories = [...new Set(integrations.map(i => i.category))]
  const connectedCount = integrations.filter(i => i.status === 'connected').length
  const totalApiCalls = integrations.reduce((sum, i) => sum + i.apiCalls, 0)
  const avgErrorRate = integrations.reduce((sum, i) => sum + i.errorRate, 0) / integrations.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Zap className="h-8 w-8 text-blue-600" />
              Integrações Avançadas
            </h1>
            <p className="text-gray-600 mt-1">
              Gerencie integrações e automações entre sistemas
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Sincronizar Tudo
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar Logs
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nova Integração
            </Button>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Integrações Ativas</p>
                  <p className="text-2xl font-bold text-gray-900">{connectedCount}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Chamadas API (24h)</p>
                  <p className="text-2xl font-bold text-gray-900">{totalApiCalls.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Erro Média</p>
                  <p className="text-2xl font-bold text-gray-900">{avgErrorRate.toFixed(1)}%</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Automações Ativas</p>
                  <p className="text-2xl font-bold text-gray-900">{automations.filter(a => a.status === 'active').length}</p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="integrations">Integrações</TabsTrigger>
            <TabsTrigger value="automations">Automações</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Configurações</TabsTrigger>
          </TabsList>

          {/* Tab: Integrações */}
          <TabsContent value="integrations" className="space-y-6">
            {/* Filtros */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Buscar integrações..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os Status</SelectItem>
                      <SelectItem value="connected">Conectado</SelectItem>
                      <SelectItem value="disconnected">Desconectado</SelectItem>
                      <SelectItem value="error">Erro</SelectItem>
                      <SelectItem value="pending">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-full lg:w-48">
                      <SelectValue placeholder="Categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas as Categorias</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Integrações */}
            <div className="grid gap-6">
              {filteredIntegrations.map((integration) => {
                const Icon = integration.icon
                const StatusIcon = getStatusIcon(integration.status)
                
                return (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4">
                          <div className={`p-3 rounded-lg bg-${integration.color}-100`}>
                            <Icon className={`h-6 w-6 text-${integration.color}-600`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{integration.name}</h3>
                              <Badge className={getStatusColor(integration.status)}>
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {integration.status}
                              </Badge>
                              <Badge variant="outline">{integration.category}</Badge>
                            </div>
                            
                            <p className="text-gray-600 mb-4">{integration.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                              {integration.status === 'connected' && (
                                <>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Última Sincronização</p>
                                    <p className="text-sm text-gray-900">
                                      {integration.lastSync ? new Date(integration.lastSync).toLocaleString('pt-BR') : 'Nunca'}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Frequência</p>
                                    <p className="text-sm text-gray-900">{integration.syncFrequency || 'N/A'}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Volume de Dados</p>
                                    <p className="text-sm text-gray-900">{integration.dataVolume}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs font-medium text-gray-500">Taxa de Erro</p>
                                    <p className="text-sm text-gray-900">{integration.errorRate}%</p>
                                  </div>
                                </>
                              )}
                            </div>
                            
                            <div className="mb-4">
                              <p className="text-sm font-medium text-gray-700 mb-2">Recursos:</p>
                              <div className="flex flex-wrap gap-2">
                                {integration.features.map((feature, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {feature}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium text-gray-700 mb-2">Automações:</p>
                              <div className="space-y-1">
                                {integration.automations.slice(0, 2).map((automation, index) => (
                                  <p key={index} className="text-sm text-gray-600 flex items-center gap-2">
                                    <ArrowRight className="h-3 w-3" />
                                    {automation}
                                  </p>
                                ))}
                                {integration.automations.length > 2 && (
                                  <p className="text-xs text-gray-500">
                                    +{integration.automations.length - 2} automações
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Configurar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Detalhes
                          </Button>
                          {integration.status === 'connected' ? (
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Pause className="h-4 w-4 mr-2" />
                              Pausar
                            </Button>
                          ) : (
                            <Button size="sm">
                              <Play className="h-4 w-4 mr-2" />
                              Conectar
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          {/* Tab: Automações */}
          <TabsContent value="automations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Automações Configuradas
                </CardTitle>
                <CardDescription>
                  Gerencie fluxos automatizados entre sistemas
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
                          </div>
                          
                          <p className="text-gray-600 mb-3">{automation.description}</p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Origem:</span>
                              <Badge variant="outline">{automation.source}</Badge>
                            </div>
                            <ArrowRight className="h-4 w-4" />
                            <div className="flex items-center gap-2">
                              <span className="font-medium">Destino:</span>
                              <Badge variant="outline">{automation.target}</Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-gray-700">Gatilho</p>
                              <p className="text-gray-600">{automation.trigger}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Ação</p>
                              <p className="text-gray-600">{automation.action}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Execuções</p>
                              <p className="text-gray-600">{automation.executions}</p>
                            </div>
                            <div>
                              <p className="font-medium text-gray-700">Taxa de Sucesso</p>
                              <p className="text-gray-600">{automation.successRate}%</p>
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

          {/* Tab: Logs */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Logs de Integração
                </CardTitle>
                <CardDescription>
                  Histórico de atividades e eventos das integrações
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {integrationLogs.map((log) => {
                    const LogIcon = getLogTypeIcon(log.type)
                    const integration = integrations.find(i => i.id === log.integration)
                    
                    return (
                      <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                        <div className={`p-2 rounded-full ${log.type === 'success' ? 'bg-green-100' : log.type === 'warning' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                          <LogIcon className={`h-4 w-4 ${getLogTypeColor(log.type)}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-gray-900">{integration?.name}</span>
                            <Badge variant="outline" className="text-xs">{log.type}</Badge>
                          </div>
                          <p className="text-gray-700 mb-1">{log.message}</p>
                          <p className="text-sm text-gray-500">{log.details}</p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Configurações */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Configurações Globais
                </CardTitle>
                <CardDescription>
                  Configurações gerais para todas as integrações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Configurações de Sincronização</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Intervalo Padrão de Sincronização</label>
                      <Select defaultValue="30min">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5min">5 minutos</SelectItem>
                          <SelectItem value="15min">15 minutos</SelectItem>
                          <SelectItem value="30min">30 minutos</SelectItem>
                          <SelectItem value="1h">1 hora</SelectItem>
                          <SelectItem value="2h">2 horas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Timeout de Requisição (segundos)</label>
                      <Input type="number" defaultValue="30" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Configurações de Segurança</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Criptografia de Dados</p>
                        <p className="text-sm text-gray-600">Criptografar dados em trânsito e em repouso</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">Rotação de Tokens</p>
                        <p className="text-sm text-gray-600">Renovar tokens de acesso automaticamente</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Key className="h-4 w-4 mr-2" />
                        Configurar
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Configurações de Monitoramento</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Retenção de Logs (dias)</label>
                      <Input type="number" defaultValue="30" className="mt-1" />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Limite de Taxa de Erro (%)</label>
                      <Input type="number" defaultValue="5" className="mt-1" />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <Button variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Resetar
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Configurações
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}