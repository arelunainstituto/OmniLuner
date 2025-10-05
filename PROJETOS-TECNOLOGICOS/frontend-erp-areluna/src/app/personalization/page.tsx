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
  Settings, 
  Layout, 
  Palette, 
  Eye, 
  Monitor, 
  Smartphone, 
  Tablet,
  User,
  Users,
  Crown,
  Shield,
  BarChart3,
  PieChart,
  LineChart,
  TrendingUp,
  Calendar,
  Clock,
  Bell,
  Mail,
  MessageSquare,
  Filter,
  Search,
  Grid,
  List,
  Columns,
  Rows,
  Move,
  Trash2,
  Plus,
  Save,
  RefreshCw,
  Download,
  Upload,
  Copy,
  Edit,
  Check,
  X,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Star,
  Heart,
  Bookmark,
  Tag,
  Folder,
  File,
  FileText,
  Image,
  Video,
  Music,
  Archive,
  Zap,
  Target,
  Award,
  Lightbulb,
  Briefcase,
  Home,
  Building,
  Globe,
  MapPin,
  Phone,
  AtSign,
  Link,
  Share,
  ExternalLink,
  Info,
  HelpCircle,
  AlertCircle,
  CheckCircle,
  XCircle,
  Sun,
  Moon,
  Contrast,
  Type,
  Maximize,
  Minimize,
  RotateCcw,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  FastForward,
  Rewind
} from 'lucide-react'

export default function PersonalizationPage() {
  const [selectedProfile, setSelectedProfile] = useState('gestor')
  const [selectedTheme, setSelectedTheme] = useState('light')
  const [selectedLayout, setSelectedLayout] = useState('grid')
  const [dashboardName, setDashboardName] = useState('Meu Dashboard')
  const [isEditing, setIsEditing] = useState(false)

  // Mock data para perfis de usuário
  const userProfiles = [
    {
      id: 'admin',
      name: 'Administrador',
      description: 'Acesso completo ao sistema',
      icon: Crown,
      color: 'purple',
      permissions: ['all'],
      defaultWidgets: ['overview', 'users', 'security', 'reports', 'settings']
    },
    {
      id: 'gestor',
      name: 'Gestor',
      description: 'Gestão de equipes e projetos',
      icon: Briefcase,
      color: 'blue',
      permissions: ['manage_team', 'view_reports', 'approve_requests'],
      defaultWidgets: ['team_performance', 'projects', 'approvals', 'kpis', 'calendar']
    },
    {
      id: 'colaborador',
      name: 'Colaborador',
      description: 'Usuário padrão do sistema',
      icon: User,
      color: 'green',
      permissions: ['view_own_data', 'create_requests', 'update_profile'],
      defaultWidgets: ['my_tasks', 'notifications', 'calendar', 'profile', 'help']
    },
    {
      id: 'financeiro',
      name: 'Financeiro',
      description: 'Gestão financeira e contábil',
      icon: BarChart3,
      color: 'yellow',
      permissions: ['view_financial', 'manage_budgets', 'approve_payments'],
      defaultWidgets: ['financial_overview', 'budgets', 'payments', 'reports', 'analytics']
    }
  ]

  // Mock data para widgets disponíveis
  const availableWidgets = [
    {
      id: 'overview',
      name: 'Visão Geral',
      description: 'Resumo executivo do sistema',
      category: 'Dashboard',
      icon: BarChart3,
      size: 'large',
      permissions: ['admin', 'gestor']
    },
    {
      id: 'kpis',
      name: 'KPIs Principais',
      description: 'Indicadores chave de performance',
      category: 'Analytics',
      icon: TrendingUp,
      size: 'medium',
      permissions: ['admin', 'gestor', 'financeiro']
    },
    {
      id: 'team_performance',
      name: 'Performance da Equipe',
      description: 'Métricas de desempenho da equipe',
      category: 'RH',
      icon: Users,
      size: 'large',
      permissions: ['admin', 'gestor']
    },
    {
      id: 'financial_overview',
      name: 'Resumo Financeiro',
      description: 'Visão geral das finanças',
      category: 'Financeiro',
      icon: PieChart,
      size: 'large',
      permissions: ['admin', 'financeiro']
    },
    {
      id: 'projects',
      name: 'Projetos Ativos',
      description: 'Lista de projetos em andamento',
      category: 'Projetos',
      icon: Briefcase,
      size: 'medium',
      permissions: ['admin', 'gestor', 'colaborador']
    },
    {
      id: 'my_tasks',
      name: 'Minhas Tarefas',
      description: 'Tarefas pessoais pendentes',
      category: 'Pessoal',
      icon: CheckCircle,
      size: 'medium',
      permissions: ['all']
    },
    {
      id: 'calendar',
      name: 'Calendário',
      description: 'Agenda e compromissos',
      category: 'Pessoal',
      icon: Calendar,
      size: 'medium',
      permissions: ['all']
    },
    {
      id: 'notifications',
      name: 'Notificações',
      description: 'Alertas e mensagens recentes',
      category: 'Comunicação',
      icon: Bell,
      size: 'small',
      permissions: ['all']
    },
    {
      id: 'approvals',
      name: 'Aprovações Pendentes',
      description: 'Solicitações aguardando aprovação',
      category: 'Workflow',
      icon: Clock,
      size: 'medium',
      permissions: ['admin', 'gestor']
    },
    {
      id: 'reports',
      name: 'Relatórios',
      description: 'Relatórios e análises',
      category: 'Analytics',
      icon: FileText,
      size: 'small',
      permissions: ['admin', 'gestor', 'financeiro']
    }
  ]

  // Mock data para temas
  const themes = [
    {
      id: 'light',
      name: 'Claro',
      description: 'Tema claro padrão',
      preview: 'bg-white border-gray-200',
      colors: {
        primary: '#3b82f6',
        secondary: '#64748b',
        background: '#ffffff',
        surface: '#f8fafc'
      }
    },
    {
      id: 'dark',
      name: 'Escuro',
      description: 'Tema escuro para baixa luminosidade',
      preview: 'bg-gray-900 border-gray-700',
      colors: {
        primary: '#60a5fa',
        secondary: '#94a3b8',
        background: '#0f172a',
        surface: '#1e293b'
      }
    },
    {
      id: 'blue',
      name: 'Azul Corporativo',
      description: 'Tema azul profissional',
      preview: 'bg-blue-50 border-blue-200',
      colors: {
        primary: '#1e40af',
        secondary: '#3b82f6',
        background: '#eff6ff',
        surface: '#dbeafe'
      }
    },
    {
      id: 'green',
      name: 'Verde Sustentável',
      description: 'Tema verde eco-friendly',
      preview: 'bg-green-50 border-green-200',
      colors: {
        primary: '#059669',
        secondary: '#10b981',
        background: '#ecfdf5',
        surface: '#d1fae5'
      }
    }
  ]

  // Mock data para layouts
  const layouts = [
    {
      id: 'grid',
      name: 'Grade',
      description: 'Layout em grade flexível',
      icon: Grid,
      preview: 'grid grid-cols-3 gap-2'
    },
    {
      id: 'list',
      name: 'Lista',
      description: 'Layout em lista vertical',
      icon: List,
      preview: 'space-y-2'
    },
    {
      id: 'columns',
      name: 'Colunas',
      description: 'Layout em colunas fixas',
      icon: Columns,
      preview: 'grid grid-cols-2 gap-2'
    },
    {
      id: 'masonry',
      name: 'Mosaico',
      description: 'Layout tipo Pinterest',
      icon: Rows,
      preview: 'columns-3 gap-2'
    }
  ]

  // Mock data para dashboards salvos
  const savedDashboards = [
    {
      id: 1,
      name: 'Dashboard Executivo',
      profile: 'admin',
      widgets: ['overview', 'kpis', 'team_performance', 'financial_overview'],
      theme: 'dark',
      layout: 'grid',
      isDefault: true,
      lastModified: '2024-03-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Gestão de Projetos',
      profile: 'gestor',
      widgets: ['projects', 'team_performance', 'approvals', 'calendar'],
      theme: 'blue',
      layout: 'columns',
      isDefault: false,
      lastModified: '2024-03-14T15:45:00Z'
    },
    {
      id: 3,
      name: 'Visão Financeira',
      profile: 'financeiro',
      widgets: ['financial_overview', 'kpis', 'reports', 'approvals'],
      theme: 'light',
      layout: 'grid',
      isDefault: true,
      lastModified: '2024-03-13T09:20:00Z'
    }
  ]

  const [selectedWidgets, setSelectedWidgets] = useState(
    userProfiles.find(p => p.id === selectedProfile)?.defaultWidgets || []
  )

  const currentProfile = userProfiles.find(p => p.id === selectedProfile)
  const currentTheme = themes.find(t => t.id === selectedTheme)
  const currentLayout = layouts.find(l => l.id === selectedLayout)

  const getWidgetsByCategory = (): Record<string, any[]> => {
    const categories: Record<string, any[]> = {}
    availableWidgets.forEach((widget: any) => {
      if (!categories[widget.category]) {
        categories[widget.category] = []
      }
      categories[widget.category].push(widget)
    })
    return categories
  }

  const canUseWidget = (widget: any) => {
    return widget.permissions.includes('all') || 
           widget.permissions.includes(selectedProfile) ||
           currentProfile?.permissions.includes('all')
  }

  const toggleWidget = (widgetId: string) => {
    setSelectedWidgets(prev => 
      prev.includes(widgetId) 
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    )
  }

  const handleSaveDashboard = () => {
    // Lógica para salvar dashboard
    console.log('Salvando dashboard:', {
      name: dashboardName,
      profile: selectedProfile,
      widgets: selectedWidgets,
      theme: selectedTheme,
      layout: selectedLayout
    })
    setIsEditing(false)
  }

  const handleLoadDashboard = (dashboard: any) => {
    setDashboardName(dashboard.name)
    setSelectedProfile(dashboard.profile)
    setSelectedWidgets(dashboard.widgets)
    setSelectedTheme(dashboard.theme)
    setSelectedLayout(dashboard.layout)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Settings className="h-8 w-8 text-blue-600" />
              Personalização de Interface
            </h1>
            <p className="text-gray-600 mt-1">
              Customize dashboards e interfaces por perfil de usuário
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Resetar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            <Button size="sm" onClick={handleSaveDashboard}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Dashboard
            </Button>
          </div>
        </div>

        <Tabs defaultValue="builder" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="builder">Construtor</TabsTrigger>
            <TabsTrigger value="themes">Temas</TabsTrigger>
            <TabsTrigger value="layouts">Layouts</TabsTrigger>
            <TabsTrigger value="saved">Salvos</TabsTrigger>
          </TabsList>

          {/* Tab: Construtor de Dashboard */}
          <TabsContent value="builder" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Configurações */}
              <div className="lg:col-span-1 space-y-6">
                {/* Perfil de Usuário */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Perfil de Usuário
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedProfile} onValueChange={setSelectedProfile}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {userProfiles.map((profile) => {
                          const Icon = profile.icon
                          return (
                            <SelectItem key={profile.id} value={profile.id}>
                              <div className="flex items-center gap-2">
                                <Icon className="h-4 w-4" />
                                {profile.name}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                    
                    {currentProfile && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <currentProfile.icon className={`h-5 w-5 text-${currentProfile.color}-600`} />
                          <span className="font-medium">{currentProfile.name}</span>
                        </div>
                        <p className="text-sm text-gray-600">{currentProfile.description}</p>
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700 mb-1">Permissões:</p>
                          <div className="flex flex-wrap gap-1">
                            {currentProfile.permissions.map((permission, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {permission}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Nome do Dashboard */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Edit className="h-5 w-5" />
                      Nome do Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Input
                      value={dashboardName}
                      onChange={(e) => setDashboardName(e.target.value)}
                      placeholder="Nome do dashboard..."
                    />
                  </CardContent>
                </Card>

                {/* Configurações Rápidas */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Configurações Rápidas
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Tema</label>
                      <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {themes.map((theme) => (
                            <SelectItem key={theme.id} value={theme.id}>
                              {theme.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium">Layout</label>
                      <Select value={selectedLayout} onValueChange={setSelectedLayout}>
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {layouts.map((layout) => {
                            const Icon = layout.icon
                            return (
                              <SelectItem key={layout.id} value={layout.id}>
                                <div className="flex items-center gap-2">
                                  <Icon className="h-4 w-4" />
                                  {layout.name}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Widgets Disponíveis */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Layout className="h-5 w-5" />
                      Widgets Disponíveis
                    </CardTitle>
                    <CardDescription>
                      Selecione os widgets para seu dashboard personalizado
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Object.entries(getWidgetsByCategory()).map(([category, widgets]) => (
                            <div key={category}>
                              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                                <Folder className="h-4 w-4" />
                                {category}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {(widgets as any[]).map((widget: any) => {
                              const Icon = widget.icon
                              const isSelected = selectedWidgets.includes(widget.id)
                              const canUse = canUseWidget(widget)
                              
                              return (
                                <div
                                  key={widget.id}
                                  className={`
                                    border rounded-lg p-4 cursor-pointer transition-all
                                    ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}
                                    ${!canUse ? 'opacity-50 cursor-not-allowed' : ''}
                                  `}
                                  onClick={() => canUse && toggleWidget(widget.id)}
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex items-start gap-3">
                                      <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <Icon className={`h-5 w-5 ${isSelected ? 'text-blue-600' : 'text-gray-600'}`} />
                                      </div>
                                      <div>
                                        <h5 className="font-medium text-gray-900">{widget.name}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{widget.description}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                          <Badge variant="outline" className="text-xs">
                                            {widget.size}
                                          </Badge>
                                          {!canUse && (
                                            <Badge variant="outline" className="text-xs bg-red-50 text-red-700">
                                              Sem permissão
                                            </Badge>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    {isSelected && canUse && (
                                      <CheckCircle className="h-5 w-5 text-blue-600" />
                                    )}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Preview do Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview do Dashboard
                </CardTitle>
                <CardDescription>
                  Visualização do dashboard com as configurações atuais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={`p-6 rounded-lg border-2 ${currentTheme?.preview || 'bg-white border-gray-200'}`}>
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">{dashboardName}</h3>
                    <p className="text-sm text-gray-600">
                      Perfil: {currentProfile?.name} | Tema: {currentTheme?.name} | Layout: {currentLayout?.name}
                    </p>
                  </div>
                  
                  <div className={currentLayout?.preview || 'grid grid-cols-3 gap-4'}>
                    {selectedWidgets.map((widgetId, index) => {
                      const widget = availableWidgets.find(w => w.id === widgetId)
                      if (!widget) return null
                      
                      const Icon = widget.icon
                      return (
                        <div
                          key={widgetId}
                          className={`
                            p-4 rounded-lg border bg-white/50 backdrop-blur-sm
                            ${widget.size === 'large' ? 'col-span-2' : ''}
                            ${widget.size === 'small' ? 'col-span-1' : ''}
                          `}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="h-4 w-4 text-gray-600" />
                            <span className="text-sm font-medium">{widget.name}</span>
                          </div>
                          <div className="h-16 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">Widget Content</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {selectedWidgets.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Selecione widgets para visualizar o dashboard</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Temas */}
          <TabsContent value="themes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Temas Disponíveis
                </CardTitle>
                <CardDescription>
                  Escolha um tema para personalizar a aparência do sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {themes.map((theme) => (
                    <div
                      key={theme.id}
                      className={`
                        border-2 rounded-lg p-4 cursor-pointer transition-all
                        ${selectedTheme === theme.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
                      `}
                      onClick={() => setSelectedTheme(theme.id)}
                    >
                      <div className={`h-24 rounded-lg mb-4 ${theme.preview}`}>
                        <div className="p-3 h-full flex flex-col justify-between">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                          </div>
                          <div className="space-y-1">
                            <div className="h-1 bg-gray-400 rounded w-3/4"></div>
                            <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <h4 className="font-medium text-gray-900">{theme.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{theme.description}</p>
                        
                        <div className="flex justify-center gap-1 mt-3">
                          {Object.entries(theme.colors).map(([key, color]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: color }}
                              title={key}
                            ></div>
                          ))}
                        </div>
                        
                        {selectedTheme === theme.id && (
                          <Badge className="mt-3">Selecionado</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Layouts */}
          <TabsContent value="layouts" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layout className="h-5 w-5" />
                  Layouts de Dashboard
                </CardTitle>
                <CardDescription>
                  Escolha como os widgets serão organizados no dashboard
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {layouts.map((layout) => {
                    const Icon = layout.icon
                    return (
                      <div
                        key={layout.id}
                        className={`
                          border-2 rounded-lg p-6 cursor-pointer transition-all
                          ${selectedLayout === layout.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-300'}
                        `}
                        onClick={() => setSelectedLayout(layout.id)}
                      >
                        <div className="text-center mb-4">
                          <Icon className={`h-8 w-8 mx-auto ${selectedLayout === layout.id ? 'text-blue-600' : 'text-gray-600'}`} />
                        </div>
                        
                        <div className="h-20 bg-gray-50 rounded-lg mb-4 p-2">
                          <div className={layout.preview}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                              <div key={i} className="bg-gray-200 rounded h-4"></div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="text-center">
                          <h4 className="font-medium text-gray-900">{layout.name}</h4>
                          <p className="text-sm text-gray-600 mt-1">{layout.description}</p>
                          
                          {selectedLayout === layout.id && (
                            <Badge className="mt-3">Selecionado</Badge>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Dashboards Salvos */}
          <TabsContent value="saved" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bookmark className="h-5 w-5" />
                  Dashboards Salvos
                </CardTitle>
                <CardDescription>
                  Gerencie seus dashboards personalizados salvos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {savedDashboards.map((dashboard) => {
                    const profile = userProfiles.find(p => p.id === dashboard.profile)
                    const theme = themes.find(t => t.id === dashboard.theme)
                    const layout = layouts.find(l => l.id === dashboard.layout)
                    
                    return (
                      <div key={dashboard.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-gray-900">{dashboard.name}</h4>
                              {dashboard.isDefault && (
                                <Badge variant="outline" className="bg-blue-50 text-blue-700">
                                  Padrão
                                </Badge>
                              )}
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Perfil:</span> {profile?.name}
                              </div>
                              <div>
                                <span className="font-medium">Tema:</span> {theme?.name}
                              </div>
                              <div>
                                <span className="font-medium">Layout:</span> {layout?.name}
                              </div>
                              <div>
                                <span className="font-medium">Widgets:</span> {dashboard.widgets.length}
                              </div>
                            </div>
                            
                            <p className="text-xs text-gray-500 mt-2">
                              Modificado em: {new Date(dashboard.lastModified).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleLoadDashboard(dashboard)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Carregar
                            </Button>
                            <Button variant="outline" size="sm">
                              <Copy className="h-4 w-4 mr-2" />
                              Duplicar
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
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
        </Tabs>
      </div>
    </div>
  )
}