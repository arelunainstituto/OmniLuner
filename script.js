// Sistema ProthesisLab - JavaScript Principal
class ProthesisLabApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupTabFunctionality();
        this.setupSearchFunctionality();
        this.setupModalFunctionality();
        this.loadPage('dashboard');
        this.initializeData();
    }

    setupEventListeners() {
        // Toggle sidebar
        const sidebarToggle = document.getElementById('sidebarToggle');
        sidebarToggle.addEventListener('click', () => this.toggleSidebar());

        // Navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.loadPage(page);
            });
        });

        // Responsive sidebar
        this.handleResponsiveSidebar();
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    handleResponsiveSidebar() {
        const sidebar = document.getElementById('sidebar');
        const sidebarToggle = document.getElementById('sidebarToggle');
        
        if (window.innerWidth <= 1024) {
            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('mobile-open');
            });
        }
    }

    loadPage(pageName) {
        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-page="${pageName}"]`).parentElement.classList.add('active');

        // Hide all pages
        document.querySelectorAll('.page-content').forEach(page => {
            page.classList.add('hidden');
        });

        // Show selected page
        const targetPage = document.getElementById(`${pageName}-page`);
        targetPage.classList.remove('hidden');

        // Update header
        this.updateHeader(pageName);

        // Load page content
        this.loadPageContent(pageName);
        this.currentPage = pageName;
    }

    updateHeader(pageName) {
        const pageTitle = document.getElementById('pageTitle');
        const pageSubtitle = document.getElementById('pageSubtitle');

        const pageInfo = {
            dashboard: {
                title: 'Dashboard',
                subtitle: 'Visão geral do laboratório'
            },
            casos: {
                title: 'Gestão de Casos',
                subtitle: 'Controle de próteses em produção'
            },
            tecnicos: {
                title: 'Equipe Técnica',
                subtitle: 'Gestão de técnicos e especialidades'
            },
            workflow: {
                title: 'Workflow',
                subtitle: 'Etapas e processos de produção'
            },
            relatorios: {
                title: 'Relatórios',
                subtitle: 'Análises e métricas do laboratório'
            }
        };

        pageTitle.textContent = pageInfo[pageName].title;
        pageSubtitle.textContent = pageInfo[pageName].subtitle;
    }

    loadPageContent(pageName) {
        const contentArea = document.getElementById(`${pageName}-page`);
        
        switch(pageName) {
            case 'dashboard':
                contentArea.innerHTML = this.getDashboardContent();
                break;
            case 'casos':
                contentArea.innerHTML = this.getCasosContent();
                break;
            case 'tecnicos':
                contentArea.innerHTML = this.getTecnicosContent();
                break;
            case 'workflow':
                contentArea.innerHTML = this.getWorkflowContent();
                break;
            case 'relatorios':
                contentArea.innerHTML = this.getRelatoriosContent();
                break;
            case 'pacientes':
                contentArea.innerHTML = this.getPacientesContent();
                break;
            case 'estoque':
                contentArea.innerHTML = this.getEstoqueContent();
                break;
            case 'financeiro':
                contentArea.innerHTML = this.getFinanceiroContent();
                break;
            case 'agenda':
                contentArea.innerHTML = this.getAgendaContent();
                break;
            case 'documentos':
                contentArea.innerHTML = this.getDocumentosContent();
                break;
            case 'configuracoes':
                contentArea.innerHTML = this.getConfiguracoesContent();
                break;
        }
    }

    getDashboardContent() {
        return `
            <!-- Hero Section -->
            <div class="card mb-8" style="background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%); color: white;">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h2 class="text-3xl font-bold mb-4">Bem-vindo ao ProthesisLab</h2>
                            <p class="text-lg mb-6" style="color: rgba(255,255,255,0.9);">
                                Sistema profissional de gestão para laboratório de próteses dentárias. 
                                Controle completo dos seus casos, equipe e processos.
                            </p>
                            <div class="flex gap-4">
                                <button class="btn" style="background: rgba(255,255,255,0.2); color: white; border: 1px solid rgba(255,255,255,0.3);">
                                    <i class="fas fa-plus"></i>
                                    Novo Caso
                                </button>
                                <button class="btn" style="background: rgba(255,255,255,0.1); color: white; border: 1px solid rgba(255,255,255,0.2);">
                                    <i class="fas fa-chart-line"></i>
                                    Ver Relatórios
                                </button>
                            </div>
                        </div>
                        <div class="text-center">
                            <div style="font-size: 120px; opacity: 0.3;">
                                <i class="fas fa-tooth"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Estatísticas Principais -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Casos Ativos</p>
                                <p class="text-3xl font-bold text-primary-blue">24</p>
                                <p class="text-sm text-success-green">
                                    <i class="fas fa-arrow-up"></i> +12% este mês
                                </p>
                            </div>
                            <div class="text-4xl text-primary-blue" style="opacity: 0.3;">
                                <i class="fas fa-clipboard-list"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Concluídos Hoje</p>
                                <p class="text-3xl font-bold text-success-green">8</p>
                                <p class="text-sm text-success-green">
                                    <i class="fas fa-check"></i> Meta: 6/dia
                                </p>
                            </div>
                            <div class="text-4xl text-success-green" style="opacity: 0.3;">
                                <i class="fas fa-check-circle"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Técnicos Ativos</p>
                                <p class="text-3xl font-bold text-info-cyan">12</p>
                                <p class="text-sm text-gray-500">
                                    <i class="fas fa-users"></i> 3 especialidades
                                </p>
                            </div>
                            <div class="text-4xl text-info-cyan" style="opacity: 0.3;">
                                <i class="fas fa-user-friends"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-600 mb-1">Prazo Crítico</p>
                                <p class="text-3xl font-bold text-warning-yellow">3</p>
                                <p class="text-sm text-warning-yellow">
                                    <i class="fas fa-exclamation-triangle"></i> Atenção
                                </p>
                            </div>
                            <div class="text-4xl text-warning-yellow" style="opacity: 0.3;">
                                <i class="fas fa-clock"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Casos Recentes e Alertas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Casos Recentes -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Casos Recentes</h3>
                        <p class="card-subtitle">Últimos casos adicionados ao sistema</p>
                    </div>
                    <div class="card-body">
                        <div class="space-y-4">
                            ${this.getRecentCases()}
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-secondary">
                            <i class="fas fa-eye"></i>
                            Ver Todos os Casos
                        </button>
                    </div>
                </div>

                <!-- Alertas e Notificações -->
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Alertas e Prazos</h3>
                        <p class="card-subtitle">Casos que precisam de atenção</p>
                    </div>
                    <div class="card-body">
                        <div class="space-y-4">
                            ${this.getAlerts()}
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-warning">
                            <i class="fas fa-bell"></i>
                            Ver Todas as Notificações
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    getCasosContent() {
        return `
            <!-- Filtros e Ações -->
            <div class="card mb-6">
                <div class="card-body">
                    <div class="flex flex-wrap items-center justify-between gap-4">
                        <div class="flex flex-wrap items-center gap-4">
                            <div class="form-group mb-0">
                                <select class="form-select" style="min-width: 150px;">
                                    <option>Todos os Status</option>
                                    <option>Em Andamento</option>
                                    <option>Aguardando</option>
                                    <option>Concluído</option>
                                    <option>Atrasado</option>
                                </select>
                            </div>
                            <div class="form-group mb-0">
                                <select class="form-select" style="min-width: 150px;">
                                    <option>Todos os Técnicos</option>
                                    <option>João Silva</option>
                                    <option>Maria Santos</option>
                                    <option>Pedro Costa</option>
                                </select>
                            </div>
                            <div class="form-group mb-0">
                                <input type="text" class="form-input" placeholder="Buscar casos..." style="min-width: 200px;">
                            </div>
                        </div>
                        <div class="flex gap-2">
                            <button class="btn btn-secondary">
                                <i class="fas fa-filter"></i>
                                Filtros Avançados
                            </button>
                            <button class="btn btn-primary">
                                <i class="fas fa-plus"></i>
                                Novo Caso
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Lista de Casos -->
            <div class="table-container">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Paciente</th>
                            <th>Tipo de Prótese</th>
                            <th>Técnico</th>
                            <th>Status</th>
                            <th>Prazo</th>
                            <th>Progresso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.getCasesTableRows()}
                    </tbody>
                </table>
            </div>

            <!-- Paginação -->
            <div class="flex items-center justify-between mt-6">
                <p class="text-sm text-gray-600">
                    Mostrando 1-10 de 24 casos
                </p>
                <div class="flex gap-2">
                    <button class="btn btn-secondary">Anterior</button>
                    <button class="btn btn-primary">1</button>
                    <button class="btn btn-secondary">2</button>
                    <button class="btn btn-secondary">3</button>
                    <button class="btn btn-secondary">Próximo</button>
                </div>
            </div>
        `;
    }

    getTecnicosContent() {
        return `
            <!-- Estatísticas da Equipe -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-4xl text-primary-blue mb-4">
                            <i class="fas fa-users"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">12</h3>
                        <p class="text-gray-600">Técnicos Ativos</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-4xl text-success-green mb-4">
                            <i class="fas fa-award"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">3</h3>
                        <p class="text-gray-600">Especialidades</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-4xl text-info-cyan mb-4">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="text-2xl font-bold mb-2">94%</h3>
                        <p class="text-gray-600">Eficiência Média</p>
                    </div>
                </div>
            </div>

            <!-- Lista de Técnicos -->
            <div class="card">
                <div class="card-header">
                    <div class="flex items-center justify-between">
                        <div>
                            <h3 class="card-title">Equipe Técnica</h3>
                            <p class="card-subtitle">Gestão de técnicos e suas especialidades</p>
                        </div>
                        <button class="btn btn-primary">
                            <i class="fas fa-user-plus"></i>
                            Adicionar Técnico
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        ${this.getTechniciansCards()}
                    </div>
                </div>
            </div>
        `;
    }

    getWorkflowContent() {
        return `
            <!-- Visão Geral do Workflow -->
            <div class="card mb-8">
                <div class="card-header">
                    <h3 class="card-title">Etapas do Processo</h3>
                    <p class="card-subtitle">Fluxo padrão de produção de próteses</p>
                </div>
                <div class="card-body">
                    <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
                        ${this.getWorkflowSteps()}
                    </div>
                </div>
            </div>

            <!-- Casos por Etapa -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Distribuição por Etapa</h3>
                        <p class="card-subtitle">Casos atualmente em cada fase</p>
                    </div>
                    <div class="card-body">
                        ${this.getWorkflowDistribution()}
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Tempo Médio por Etapa</h3>
                        <p class="card-subtitle">Performance histórica do processo</p>
                    </div>
                    <div class="card-body">
                        ${this.getWorkflowTiming()}
                    </div>
                </div>
            </div>
        `;
    }

    getRelatoriosContent() {
        return `
            <!-- Filtros de Relatório -->
            <div class="card mb-6">
                <div class="card-body">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div class="form-group mb-0">
                            <label class="form-label">Período</label>
                            <select class="form-select">
                                <option>Últimos 30 dias</option>
                                <option>Últimos 3 meses</option>
                                <option>Último ano</option>
                                <option>Personalizado</option>
                            </select>
                        </div>
                        <div class="form-group mb-0">
                            <label class="form-label">Tipo de Relatório</label>
                            <select class="form-select">
                                <option>Produtividade</option>
                                <option>Qualidade</option>
                                <option>Financeiro</option>
                                <option>Técnicos</option>
                            </select>
                        </div>
                        <div class="form-group mb-0">
                            <label class="form-label">Técnico</label>
                            <select class="form-select">
                                <option>Todos</option>
                                <option>João Silva</option>
                                <option>Maria Santos</option>
                                <option>Pedro Costa</option>
                            </select>
                        </div>
                        <div class="form-group mb-0">
                            <label class="form-label">&nbsp;</label>
                            <button class="btn btn-primary w-full">
                                <i class="fas fa-chart-bar"></i>
                                Gerar Relatório
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Métricas Principais -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-3xl text-primary-blue mb-3">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-1">156</h3>
                        <p class="text-gray-600">Casos Concluídos</p>
                        <p class="text-sm text-success-green mt-2">
                            <i class="fas fa-arrow-up"></i> +18% vs mês anterior
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-3xl text-success-green mb-3">
                            <i class="fas fa-clock"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-1">4.2 dias</h3>
                        <p class="text-gray-600">Tempo Médio</p>
                        <p class="text-sm text-success-green mt-2">
                            <i class="fas fa-arrow-down"></i> -0.5 dias vs meta
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-3xl text-warning-yellow mb-3">
                            <i class="fas fa-percentage"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-1">96.5%</h3>
                        <p class="text-gray-600">Taxa de Qualidade</p>
                        <p class="text-sm text-success-green mt-2">
                            <i class="fas fa-arrow-up"></i> +2.1% vs mês anterior
                        </p>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body text-center">
                        <div class="text-3xl text-info-cyan mb-3">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-1">€ 45,2k</h3>
                        <p class="text-gray-600">Faturamento</p>
                        <p class="text-sm text-success-green mt-2">
                            <i class="fas fa-arrow-up"></i> +12% vs mês anterior
                        </p>
                    </div>
                </div>
            </div>

            <!-- Gráficos e Análises -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Produção Mensal</h3>
                        <p class="card-subtitle">Casos concluídos por mês</p>
                    </div>
                    <div class="card-body">
                        <div class="text-center py-12 text-gray-500">
                            <i class="fas fa-chart-area text-6xl mb-4"></i>
                            <p>Gráfico de produção mensal</p>
                            <p class="text-sm">Integração com biblioteca de gráficos</p>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Performance por Técnico</h3>
                        <p class="card-subtitle">Produtividade da equipe</p>
                    </div>
                    <div class="card-body">
                        <div class="space-y-4">
                            ${this.getTechnicianPerformance()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPacientesContent() {
        return `
            <div class="patients-management">
                <div class="page-header">
                    <div class="header-left">
                        <h1>Gestão de Pacientes</h1>
                        <p class="page-description">Cadastro e gerenciamento completo de pacientes</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary" onclick="app.openPatientModal()">
                            <i class="fas fa-plus"></i>
                            Novo Paciente
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-download"></i>
                            Exportar
                        </button>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1,247</h3>
                            <p>Total de Pacientes</p>
                            <span class="stat-change positive">+12 este mês</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-user-plus"></i>
                        </div>
                        <div class="stat-content">
                            <h3>23</h3>
                            <p>Novos Pacientes</p>
                            <span class="stat-change positive">+5 esta semana</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="stat-content">
                            <h3>89</h3>
                            <p>Consultas Agendadas</p>
                            <span class="stat-change neutral">próximos 7 dias</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-star"></i>
                        </div>
                        <div class="stat-content">
                            <h3>4.8</h3>
                            <p>Satisfação Média</p>
                            <span class="stat-change positive">+0.2 este mês</span>
                        </div>
                    </div>
                </div>

                <div class="filters-section">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Buscar pacientes por nome, CPF ou telefone...">
                    </div>
                    <div class="filter-buttons">
                        <select class="filter-select">
                            <option value="">Todos os Status</option>
                            <option value="ativo">Ativo</option>
                            <option value="inativo">Inativo</option>
                            <option value="pendente">Pendente</option>
                        </select>
                        <select class="filter-select">
                            <option value="">Todas as Especialidades</option>
                            <option value="protese">Prótese</option>
                            <option value="ortodontia">Ortodontia</option>
                            <option value="implante">Implante</option>
                        </select>
                        <button class="btn btn-outline">
                            <i class="fas fa-filter"></i>
                            Filtros Avançados
                        </button>
                    </div>
                </div>

                <div class="table-container">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" class="select-all">
                                </th>
                                <th>Paciente</th>
                                <th>Contato</th>
                                <th>Última Consulta</th>
                                <th>Próxima Consulta</th>
                                <th>Status</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.getPatientsTableRows()}
                        </tbody>
                    </table>
                </div>

                <div class="pagination">
                    <button class="btn btn-outline">
                        <i class="fas fa-chevron-left"></i>
                        Anterior
                    </button>
                    <span class="pagination-info">Página 1 de 25 (1,247 registros)</span>
                    <button class="btn btn-outline">
                        Próximo
                        <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    getEstoqueContent() {
        return `
            <div class="inventory-management">
                <div class="page-header">
                    <div class="header-left">
                        <h1>Gestão de Estoque</h1>
                        <p class="page-description">Controle de materiais, produtos e fornecedores</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Novo Item
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-truck"></i>
                            Nova Entrada
                        </button>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-boxes"></i>
                        </div>
                        <div class="stat-content">
                            <h3>342</h3>
                            <p>Itens em Estoque</p>
                            <span class="stat-change positive">+15 este mês</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-exclamation-triangle"></i>
                        </div>
                        <div class="stat-content">
                            <h3>23</h3>
                            <p>Estoque Baixo</p>
                            <span class="stat-change negative">Requer atenção</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€ 45.230</h3>
                            <p>Valor Total</p>
                            <span class="stat-change positive">+8% este mês</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-truck"></i>
                        </div>
                        <div class="stat-content">
                            <h3>12</h3>
                            <p>Fornecedores Ativos</p>
                            <span class="stat-change neutral">cadastrados</span>
                        </div>
                    </div>
                </div>

                <div class="inventory-tabs">
                    <button class="tab-btn active" data-tab="items">Itens</button>
                    <button class="tab-btn" data-tab="movements">Movimentações</button>
                    <button class="tab-btn" data-tab="suppliers">Fornecedores</button>
                    <button class="tab-btn" data-tab="reports">Relatórios</button>
                </div>

                <div class="tab-content active" id="items-tab">
                    <div class="filters-section">
                        <div class="search-box">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Buscar itens por nome ou código...">
                        </div>
                        <div class="filter-buttons">
                            <select class="filter-select">
                                <option value="">Todas as Categorias</option>
                                <option value="materiais">Materiais</option>
                                <option value="equipamentos">Equipamentos</option>
                                <option value="consumiveis">Consumíveis</option>
                            </select>
                            <button class="btn btn-outline">
                                <i class="fas fa-download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>

                    <div class="table-container">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Categoria</th>
                                    <th>Estoque Atual</th>
                                    <th>Estoque Mínimo</th>
                                    <th>Valor Unitário</th>
                                    <th>Status</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.getInventoryTableRows()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    getFinanceiroContent() {
        return `
            <div class="financial-management">
                <div class="page-header">
                    <div class="header-left">
                        <h1>Gestão Financeira</h1>
                        <p class="page-description">Controle de faturamento, recebimentos e despesas</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Nova Transação
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-file-invoice"></i>
                            Gerar Fatura
                        </button>
                    </div>
                </div>

                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-icon success">
                            <i class="fas fa-arrow-up"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€ 28.450</h3>
                            <p>Receitas do Mês</p>
                            <span class="stat-change positive">+15% vs mês anterior</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon danger">
                            <i class="fas fa-arrow-down"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€ 12.340</h3>
                            <p>Despesas do Mês</p>
                            <span class="stat-change negative">+8% vs mês anterior</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€ 16.110</h3>
                            <p>Lucro Líquido</p>
                            <span class="stat-change positive">+22% vs mês anterior</span>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>€ 5.680</h3>
                            <p>Contas a Receber</p>
                            <span class="stat-change neutral">vencimento em 15 dias</span>
                        </div>
                    </div>
                </div>

                <div class="financial-tabs">
                    <button class="tab-btn active" data-tab="overview">Visão Geral</button>
                    <button class="tab-btn" data-tab="invoices">Faturas</button>
                    <button class="tab-btn" data-tab="payments">Pagamentos</button>
                    <button class="tab-btn" data-tab="expenses">Despesas</button>
                    <button class="tab-btn" data-tab="vat">IVA</button>
                    <button class="tab-btn" data-tab="reports">Relatórios</button>
                </div>

                <div class="tab-content active" id="overview-tab">
                    <div class="financial-overview">
                        <div class="chart-container">
                            <h3>Fluxo de Caixa - Últimos 6 Meses</h3>
                            <div class="chart-placeholder">
                                <i class="fas fa-chart-line"></i>
                                <p>Gráfico de fluxo de caixa será implementado aqui</p>
                            </div>
                        </div>
                        
                        <div class="recent-transactions">
                            <h3>Transações Recentes</h3>
                            <div class="transaction-list">
                                ${this.getRecentTransactions()}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="vat-tab">
                    <div class="vat-management">
                        <div class="vat-rates">
                            <h3>Taxas de IVA em Portugal</h3>
                            <div class="vat-grid">
                                <div class="vat-card">
                                    <h4>Taxa Normal</h4>
                                    <div class="vat-rate">23%</div>
                                    <p>Aplicável à maioria dos serviços médicos</p>
                                </div>
                                <div class="vat-card">
                                    <h4>Taxa Intermédia</h4>
                                    <div class="vat-rate">13%</div>
                                    <p>Alguns produtos médicos específicos</p>
                                </div>
                                <div class="vat-card">
                                    <h4>Taxa Reduzida</h4>
                                    <div class="vat-rate">6%</div>
                                    <p>Medicamentos e dispositivos médicos</p>
                                </div>
                                <div class="vat-card">
                                    <h4>Isento</h4>
                                    <div class="vat-rate">0%</div>
                                    <p>Certos tratamentos médicos</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="vat-summary">
                            <h3>Resumo IVA - Janeiro 2024</h3>
                            <div class="vat-stats">
                                <div class="vat-stat">
                                    <span class="label">IVA a Liquidar</span>
                                    <span class="value">€ 2.340,50</span>
                                </div>
                                <div class="vat-stat">
                                    <span class="label">IVA Dedutível</span>
                                    <span class="value">€ 890,20</span>
                                </div>
                                <div class="vat-stat">
                                    <span class="label">IVA a Entregar</span>
                                    <span class="value">€ 1.450,30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getAgendaContent() {
        return `
            <div class="calendar-management">
                <div class="page-header">
                    <div class="header-left">
                        <h1>Agenda e Calendário</h1>
                        <p class="page-description">Agendamentos, tarefas e lembretes</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-plus"></i>
                            Novo Agendamento
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-tasks"></i>
                            Nova Tarefa
                        </button>
                    </div>
                </div>

                <div class="calendar-container">
                    <div class="calendar-header">
                        <div class="calendar-nav">
                            <button class="btn btn-outline">
                                <i class="fas fa-chevron-left"></i>
                            </button>
                            <h2>Janeiro 2024</h2>
                            <button class="btn btn-outline">
                                <i class="fas fa-chevron-right"></i>
                            </button>
                        </div>
                        <div class="calendar-views">
                            <button class="view-btn active">Mês</button>
                            <button class="view-btn">Semana</button>
                            <button class="view-btn">Dia</button>
                        </div>
                    </div>

                    <div class="calendar-grid">
                        <div class="calendar-placeholder">
                            <i class="fas fa-calendar-alt"></i>
                            <p>Calendário interativo será implementado aqui</p>
                        </div>
                    </div>
                </div>

                <div class="agenda-sidebar">
                    <div class="upcoming-appointments">
                        <h3>Próximos Agendamentos</h3>
                        ${this.getUpcomingAppointments()}
                    </div>
                    
                    <div class="pending-tasks">
                        <h3>Tarefas Pendentes</h3>
                        ${this.getPendingTasks()}
                    </div>
                </div>
            </div>
        `;
    }

    getDocumentosContent() {
        return `
            <div class="document-management">
                <div class="page-header">
                    <div class="header-left">
                        <h1>Gestão de Documentos</h1>
                        <p class="page-description">Upload, organização e aprovação de documentos</p>
                    </div>
                    <div class="header-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-upload"></i>
                            Upload Documento
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-folder-plus"></i>
                            Nova Pasta
                        </button>
                    </div>
                </div>

                <div class="document-stats">
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-file"></i>
                        </div>
                        <div class="stat-content">
                            <h3>1,234</h3>
                            <p>Total de Documentos</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon warning">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-content">
                            <h3>15</h3>
                            <p>Pendentes Aprovação</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon">
                            <i class="fas fa-hdd"></i>
                        </div>
                        <div class="stat-content">
                            <h3>2.4 GB</h3>
                            <p>Espaço Utilizado</p>
                        </div>
                    </div>
                </div>

                <div class="document-browser">
                    <div class="browser-toolbar">
                        <div class="breadcrumb">
                            <span>Documentos</span>
                            <i class="fas fa-chevron-right"></i>
                            <span>Casos</span>
                        </div>
                        <div class="view-options">
                            <button class="view-btn active">
                                <i class="fas fa-th"></i>
                            </button>
                            <button class="view-btn">
                                <i class="fas fa-list"></i>
                            </button>
                        </div>
                    </div>

                    <div class="document-grid">
                        ${this.getDocumentItems()}
                    </div>
                </div>
            </div>
        `;
    }

    getConfiguracoesContent() {
        return `
            <div class="settings-management">
                <div class="page-header">
                    <div class="header-left">
                        <h1>Configurações</h1>
                        <p class="page-description">Configurações do sistema e administração</p>
                    </div>
                </div>

                <div class="settings-nav">
                    <button class="settings-tab active" data-tab="general">Geral</button>
                    <button class="settings-tab" data-tab="users">Usuários</button>
                    <button class="settings-tab" data-tab="specialties">Especialidades</button>
                    <button class="settings-tab" data-tab="permissions">Permissões</button>
                    <button class="settings-tab" data-tab="integrations">Integrações</button>
                    <button class="settings-tab" data-tab="backup">Backup</button>
                </div>

                <div class="settings-content">
                    <div class="settings-section active" id="general-settings">
                        <h3>Configurações Gerais</h3>
                        <div class="settings-form">
                            <div class="form-group">
                                <label>Nome da Clínica</label>
                                <input type="text" value="ProthesisLab" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Endereço</label>
                                <textarea class="form-control" rows="3">Rua das Flores, 123 - Centro</textarea>
                            </div>
                            <div class="form-group">
                                <label>Telefone</label>
                                <input type="tel" value="(11) 99999-9999" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" value="contato@prothesislab.com" class="form-control">
                            </div>
                        </div>
                    </div>

                    <div class="settings-section" id="users-settings">
                        <h3>Gerenciamento de Usuários</h3>
                        <div class="users-list">
                            ${this.getUsersList()}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getPatientsTableRows() {
        const patients = [
            {
                name: "Maria Silva Santos",
                age: 45,
                phone: "(11) 99999-1234",
                email: "maria.silva@email.com",
                lastVisit: "15/01/2024",
                nextVisit: "22/01/2024",
                status: "ativo"
            },
            {
                name: "João Carlos Oliveira",
                age: 38,
                phone: "(11) 99999-5678",
                email: "joao.carlos@email.com",
                lastVisit: "12/01/2024",
                nextVisit: "25/01/2024",
                status: "ativo"
            },
            {
                name: "Ana Paula Costa",
                age: 52,
                phone: "(11) 99999-9012",
                email: "ana.paula@email.com",
                lastVisit: "08/01/2024",
                nextVisit: "30/01/2024",
                status: "pendente"
            }
        ];

        return patients.map(patient => `
            <tr>
                <td><input type="checkbox"></td>
                <td>
                    <div class="patient-info">
                        <div class="patient-avatar">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="patient-details">
                            <strong>${patient.name}</strong>
                            <span>${patient.age} anos</span>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="contact-info">
                        <div>${patient.phone}</div>
                        <div class="text-muted">${patient.email}</div>
                    </div>
                </td>
                <td>${patient.lastVisit}</td>
                <td>${patient.nextVisit}</td>
                <td>
                    <span class="status-badge ${patient.status}">
                        ${patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="Ver detalhes">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-icon" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="Histórico">
                            <i class="fas fa-history"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getInventoryTableRows() {
        const items = [
            {
                name: "Resina Acrílica Premium",
                code: "RA001",
                category: "Materiais",
                currentStock: 25,
                minStock: 10,
                unitPrice: "€ 45,00",
                status: "normal"
            },
            {
                name: "Broca Diamantada 1.2mm",
                code: "BD012",
                category: "Equipamentos",
                currentStock: 5,
                minStock: 15,
                unitPrice: "€ 120,00",
                status: "baixo"
            }
        ];

        return items.map(item => `
            <tr>
                <td>
                    <div class="item-info">
                        <strong>${item.name}</strong>
                        <span class="item-code">${item.code}</span>
                    </div>
                </td>
                <td>${item.category}</td>
                <td>${item.currentStock}</td>
                <td>${item.minStock}</td>
                <td>${item.unitPrice}</td>
                <td>
                    <span class="status-badge ${item.status}">
                        ${item.status === 'baixo' ? 'Estoque Baixo' : 'Normal'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn-icon" title="Editar">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-icon" title="Movimentar">
                            <i class="fas fa-exchange-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    getRecentTransactions() {
        const transactions = [
            {
                type: "receita",
                description: "Pagamento - Prótese Total",
                amount: "€ 1.200,00",
                date: "15/01/2024",
                patient: "Maria Silva"
            },
            {
                type: "despesa",
                description: "Compra de Materiais",
                amount: "€ 450,00",
                date: "14/01/2024",
                supplier: "Dental Supply"
            }
        ];

        return transactions.map(transaction => `
            <div class="transaction-item">
                <div class="transaction-icon ${transaction.type}">
                    <i class="fas fa-${transaction.type === 'receita' ? 'arrow-up' : 'arrow-down'}"></i>
                </div>
                <div class="transaction-details">
                    <strong>${transaction.description}</strong>
                    <span>${transaction.patient || transaction.supplier} - ${transaction.date}</span>
                </div>
                <div class="transaction-amount ${transaction.type}">
                    ${transaction.amount}
                </div>
            </div>
        `).join('');
    }

    getUpcomingAppointments() {
        const appointments = [
            {
                time: "09:00",
                patient: "Maria Silva",
                type: "Consulta",
                date: "Hoje"
            },
            {
                time: "14:30",
                patient: "João Carlos",
                type: "Prova",
                date: "Amanhã"
            }
        ];

        return appointments.map(appointment => `
            <div class="appointment-item">
                <div class="appointment-time">${appointment.time}</div>
                <div class="appointment-details">
                    <strong>${appointment.patient}</strong>
                    <span>${appointment.type} - ${appointment.date}</span>
                </div>
            </div>
        `).join('');
    }

    getPendingTasks() {
        const tasks = [
            {
                title: "Finalizar prótese - Caso #1234",
                priority: "alta",
                dueDate: "Hoje"
            },
            {
                title: "Contatar fornecedor",
                priority: "media",
                dueDate: "Amanhã"
            }
        ];

        return tasks.map(task => `
            <div class="task-item">
                <div class="task-priority ${task.priority}"></div>
                <div class="task-details">
                    <strong>${task.title}</strong>
                    <span>Vencimento: ${task.dueDate}</span>
                </div>
            </div>
        `).join('');
    }

    getDocumentItems() {
        const documents = [
            {
                name: "Exame Radiográfico",
                type: "image",
                size: "2.4 MB",
                date: "15/01/2024"
            },
            {
                name: "Receita Médica",
                type: "pdf",
                size: "156 KB",
                date: "14/01/2024"
            }
        ];

        return documents.map(doc => `
            <div class="document-item">
                <div class="document-icon">
                    <i class="fas fa-${doc.type === 'image' ? 'image' : 'file-pdf'}"></i>
                </div>
                <div class="document-info">
                    <strong>${doc.name}</strong>
                    <span>${doc.size} - ${doc.date}</span>
                </div>
            </div>
        `).join('');
    }

    getUsersList() {
        const users = [
            {
                name: "Dr. João Silva",
                role: "Administrador",
                email: "joao@prothesislab.com",
                status: "ativo"
            },
            {
                name: "Maria Santos",
                role: "Técnico",
                email: "maria@prothesislab.com",
                status: "ativo"
            }
        ];

        return users.map(user => `
            <div class="user-item">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-info">
                    <strong>${user.name}</strong>
                    <span>${user.role} - ${user.email}</span>
                </div>
                <div class="user-status">
                    <span class="status-badge ${user.status}">${user.status}</span>
                </div>
            </div>
        `).join('');
    }

    openPatientModal() {
        // Implementar modal de cadastro de paciente
        alert('Modal de cadastro de paciente será implementado');
    }

    // Métodos auxiliares para gerar conteúdo dinâmico
    getRecentCases() {
        const cases = [
            { id: 'PR-2024-001', patient: 'Ana Silva', type: 'Coroa Cerâmica', status: 'progress', technician: 'João Silva' },
            { id: 'PR-2024-002', patient: 'Carlos Santos', type: 'Ponte Fixa', status: 'waiting', technician: 'Maria Santos' },
            { id: 'PR-2024-003', patient: 'Lucia Costa', type: 'Prótese Total', status: 'progress', technician: 'Pedro Costa' }
        ];

        return cases.map(case_ => `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 bg-primary-blue rounded-full flex items-center justify-center text-white font-semibold">
                        ${case_.id.split('-')[2]}
                    </div>
                    <div>
                        <p class="font-semibold">${case_.patient}</p>
                        <p class="text-sm text-gray-600">${case_.type}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="badge badge-${case_.status === 'progress' ? 'primary' : 'warning'}">
                        ${case_.status === 'progress' ? 'Em Andamento' : 'Aguardando'}
                    </span>
                    <p class="text-sm text-gray-600 mt-1">${case_.technician}</p>
                </div>
            </div>
        `).join('');
    }

    getAlerts() {
        const alerts = [
            { type: 'warning', message: 'Caso PR-2024-001 próximo do prazo', time: '2 horas' },
            { type: 'danger', message: 'Caso PR-2023-156 atrasado', time: '1 dia' },
            { type: 'info', message: 'Material para Caso PR-2024-003 chegou', time: '30 min' }
        ];

        return alerts.map(alert => `
            <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <div class="text-2xl text-${alert.type === 'warning' ? 'warning-yellow' : alert.type === 'danger' ? 'danger-red' : 'info-cyan'}">
                    <i class="fas fa-${alert.type === 'warning' ? 'exclamation-triangle' : alert.type === 'danger' ? 'exclamation-circle' : 'info-circle'}"></i>
                </div>
                <div class="flex-1">
                    <p class="font-medium">${alert.message}</p>
                    <p class="text-sm text-gray-600">há ${alert.time}</p>
                </div>
            </div>
        `).join('');
    }

    getCasesTableRows() {
        const cases = [
            { id: 'PR-2024-001', patient: 'Ana Silva', type: 'Coroa Cerâmica', technician: 'João Silva', status: 'progress', deadline: '2024-01-25', progress: 75 },
            { id: 'PR-2024-002', patient: 'Carlos Santos', type: 'Ponte Fixa', technician: 'Maria Santos', status: 'waiting', deadline: '2024-01-28', progress: 25 },
            { id: 'PR-2024-003', patient: 'Lucia Costa', type: 'Prótese Total', technician: 'Pedro Costa', status: 'progress', deadline: '2024-01-30', progress: 60 },
            { id: 'PR-2024-004', patient: 'Roberto Lima', type: 'Implante', technician: 'João Silva', status: 'completed', deadline: '2024-01-20', progress: 100 },
            { id: 'PR-2024-005', patient: 'Fernanda Rocha', type: 'Coroa Zircônia', technician: 'Maria Santos', status: 'delayed', deadline: '2024-01-22', progress: 40 }
        ];

        return cases.map(case_ => {
            const statusMap = {
                progress: { class: 'primary', text: 'Em Andamento' },
                waiting: { class: 'warning', text: 'Aguardando' },
                completed: { class: 'success', text: 'Concluído' },
                delayed: { class: 'danger', text: 'Atrasado' }
            };

            return `
                <tr>
                    <td class="font-semibold">${case_.id}</td>
                    <td>${case_.patient}</td>
                    <td>${case_.type}</td>
                    <td>${case_.technician}</td>
                    <td>
                        <span class="badge badge-${statusMap[case_.status].class}">
                            ${statusMap[case_.status].text}
                        </span>
                    </td>
                    <td>${new Date(case_.deadline).toLocaleDateString('pt-BR')}</td>
                    <td>
                        <div class="flex items-center gap-2">
                            <div class="flex-1 bg-gray-200 rounded-full h-2">
                                <div class="bg-primary-blue h-2 rounded-full" style="width: ${case_.progress}%"></div>
                            </div>
                            <span class="text-sm font-medium">${case_.progress}%</span>
                        </div>
                    </td>
                    <td>
                        <div class="flex gap-2">
                            <button class="btn btn-secondary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                <i class="fas fa-eye"></i>
                            </button>
                            <button class="btn btn-primary" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
                                <i class="fas fa-edit"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getTechniciansCards() {
        const technicians = [
            { name: 'João Silva', specialty: 'Prótese Fixa', cases: 8, efficiency: 96, avatar: 'JS' },
            { name: 'Maria Santos', specialty: 'Prótese Removível', cases: 6, efficiency: 94, avatar: 'MS' },
            { name: 'Pedro Costa', specialty: 'Implantodontia', cases: 5, efficiency: 98, avatar: 'PC' },
            { name: 'Ana Oliveira', specialty: 'Ortodontia', cases: 7, efficiency: 92, avatar: 'AO' },
            { name: 'Carlos Lima', specialty: 'Prótese Fixa', cases: 4, efficiency: 89, avatar: 'CL' },
            { name: 'Lucia Rocha', specialty: 'Estética', cases: 9, efficiency: 97, avatar: 'LR' }
        ];

        return technicians.map(tech => `
            <div class="card">
                <div class="card-body text-center">
                    <div class="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                        ${tech.avatar}
                    </div>
                    <h4 class="font-semibold text-lg mb-2">${tech.name}</h4>
                    <p class="text-gray-600 mb-4">${tech.specialty}</p>
                    
                    <div class="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p class="text-2xl font-bold text-primary-blue">${tech.cases}</p>
                            <p class="text-sm text-gray-600">Casos Ativos</p>
                        </div>
                        <div>
                            <p class="text-2xl font-bold text-success-green">${tech.efficiency}%</p>
                            <p class="text-sm text-gray-600">Eficiência</p>
                        </div>
                    </div>
                    
                    <div class="flex gap-2">
                        <button class="btn btn-secondary flex-1" style="padding: 0.5rem; font-size: 0.875rem;">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-primary flex-1" style="padding: 0.5rem; font-size: 0.875rem;">
                            <i class="fas fa-edit"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    getWorkflowSteps() {
        const steps = [
            { name: 'Recebimento', icon: 'inbox', color: 'primary-blue' },
            { name: 'Moldagem', icon: 'hand-paper', color: 'info-cyan' },
            { name: 'Produção', icon: 'cogs', color: 'warning-yellow' },
            { name: 'Acabamento', icon: 'paint-brush', color: 'success-green' },
            { name: 'Controle', icon: 'check-circle', color: 'primary-blue' },
            { name: 'Entrega', icon: 'shipping-fast', color: 'success-green' }
        ];

        return steps.map((step, index) => `
            <div class="flex flex-col items-center">
                <div class="w-16 h-16 bg-${step.color} rounded-full flex items-center justify-center text-white text-2xl mb-3">
                    <i class="fas fa-${step.icon}"></i>
                </div>
                <p class="font-semibold text-center">${step.name}</p>
                ${index < steps.length - 1 ? '<div class="hidden md:block w-8 h-0.5 bg-gray-300 mt-8 absolute" style="left: calc(100% + 1rem);"></div>' : ''}
            </div>
        `).join('');
    }

    getWorkflowDistribution() {
        const distribution = [
            { step: 'Recebimento', count: 3, color: 'primary-blue' },
            { step: 'Moldagem', count: 5, color: 'info-cyan' },
            { step: 'Produção', count: 8, color: 'warning-yellow' },
            { step: 'Acabamento', count: 4, color: 'success-green' },
            { step: 'Controle', count: 2, color: 'primary-blue' },
            { step: 'Entrega', count: 2, color: 'success-green' }
        ];

        return distribution.map(item => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                <div class="flex items-center gap-3">
                    <div class="w-4 h-4 bg-${item.color} rounded-full"></div>
                    <span class="font-medium">${item.step}</span>
                </div>
                <span class="font-bold text-lg">${item.count}</span>
            </div>
        `).join('');
    }

    getWorkflowTiming() {
        const timing = [
            { step: 'Recebimento', time: '0.5 dias', target: '0.5 dias' },
            { step: 'Moldagem', time: '1.2 dias', target: '1.0 dias' },
            { step: 'Produção', time: '2.8 dias', target: '3.0 dias' },
            { step: 'Acabamento', time: '1.5 dias', target: '1.5 dias' },
            { step: 'Controle', time: '0.3 dias', target: '0.5 dias' },
            { step: 'Entrega', time: '0.2 dias', target: '0.2 dias' }
        ];

        return timing.map(item => `
            <div class="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-3">
                <span class="font-medium">${item.step}</span>
                <div class="text-right">
                    <p class="font-bold">${item.time}</p>
                    <p class="text-sm text-gray-600">Meta: ${item.target}</p>
                </div>
            </div>
        `).join('');
    }

    getTechnicianPerformance() {
        const performance = [
            { name: 'João Silva', cases: 24, efficiency: 96 },
            { name: 'Maria Santos', cases: 18, efficiency: 94 },
            { name: 'Pedro Costa', cases: 21, efficiency: 98 },
            { name: 'Ana Oliveira', cases: 16, efficiency: 92 }
        ];

        return performance.map(tech => `
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                    <p class="font-semibold">${tech.name}</p>
                    <p class="text-sm text-gray-600">${tech.cases} casos concluídos</p>
                </div>
                <div class="text-right">
                    <p class="text-2xl font-bold text-success-green">${tech.efficiency}%</p>
                    <p class="text-sm text-gray-600">Eficiência</p>
                </div>
            </div>
        `).join('');
    }

    initializeData() {
        // Simular dados iniciais do sistema
        console.log('ProthesisLab System initialized successfully!');
    }

    // Adicionar funcionalidade para tabs
    setupTabFunctionality() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('tab-btn')) {
                const tabContainer = e.target.closest('.inventory-tabs, .financial-tabs');
                if (tabContainer) {
                    tabContainer.querySelectorAll('.tab-btn').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    const targetContent = e.target.dataset.tab;
                    const contentContainer = tabContainer.nextElementSibling;
                    
                    contentContainer.querySelectorAll('.tab-content').forEach(content => {
                        content.classList.remove('active');
                    });
                    
                    const activeContent = contentContainer.querySelector(`[data-content="${targetContent}"]`);
                    if (activeContent) {
                        activeContent.classList.add('active');
                    }
                }
            }
            
            if (e.target.classList.contains('settings-tab')) {
                const tabContainer = e.target.closest('.settings-nav');
                if (tabContainer) {
                    tabContainer.querySelectorAll('.settings-tab').forEach(tab => {
                        tab.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    
                    const targetContent = e.target.dataset.tab;
                    const contentContainer = document.querySelector('.settings-content');
                    
                    contentContainer.querySelectorAll('.settings-section').forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    const activeSection = contentContainer.querySelector(`[data-section="${targetContent}"]`);
                    if (activeSection) {
                        activeSection.classList.add('active');
                    }
                }
            }
            
            if (e.target.classList.contains('view-btn')) {
                const viewContainer = e.target.closest('.calendar-views');
                if (viewContainer) {
                    viewContainer.querySelectorAll('.view-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    console.log('Switching to view:', e.target.textContent);
                }
            }
        });
    }

    // Adicionar funcionalidade de busca
    setupSearchFunctionality() {
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('search-input')) {
                const searchTerm = e.target.value.toLowerCase();
                const tableContainer = e.target.closest('.page-container');
                
                if (tableContainer) {
                    const rows = tableContainer.querySelectorAll('tbody tr');
                    rows.forEach(row => {
                        const text = row.textContent.toLowerCase();
                        if (text.includes(searchTerm)) {
                            row.style.display = '';
                        } else {
                            row.style.display = 'none';
                        }
                    });
                }
            }
        });
    }

    // Adicionar funcionalidade para modais
    setupModalFunctionality() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btn-primary') && e.target.textContent.includes('Novo')) {
                const modalType = this.getModalType(e.target);
                this.openModal(modalType);
            }
            
            if (e.target.classList.contains('modal-close') || e.target.classList.contains('modal-backdrop')) {
                this.closeModal();
            }
        });
    }

    getModalType(button) {
        const pageContainer = button.closest('.page-container');
        const pageId = pageContainer ? pageContainer.id : '';
        
        switch (pageId) {
            case 'pacientes-page':
                return 'patient';
            case 'estoque-page':
                return 'inventory';
            case 'financeiro-page':
                return 'financial';
            case 'agenda-page':
                return 'appointment';
            case 'documentos-page':
                return 'document';
            default:
                return 'generic';
        }
    }

    openModal(type) {
        const modalHTML = this.getModalHTML(type);
        const modalContainer = document.createElement('div');
        modalContainer.className = 'modal-backdrop';
        modalContainer.innerHTML = modalHTML;
        document.body.appendChild(modalContainer);
        
        setTimeout(() => {
            modalContainer.classList.add('active');
        }, 10);
    }

    closeModal() {
        const modal = document.querySelector('.modal-backdrop');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }

    getModalHTML(type) {
        const modals = {
            patient: `
                <div class="modal">
                    <div class="modal-header">
                        <h3>Novo Paciente</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form">
                            <div class="form-group">
                                <label>Nome Completo</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>NIF (Número de Identificação Fiscal)</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Telefone</label>
                                <input type="tel" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" class="form-control">
                            </div>
                            <div class="form-group">
                                <label>Data de Nascimento</label>
                                <input type="date" class="form-control">
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-close">Cancelar</button>
                        <button class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            `,
            inventory: `
                <div class="modal">
                    <div class="modal-header">
                        <h3>Novo Item</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form">
                            <div class="form-group">
                                <label>Nome do Item</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Código</label>
                                <input type="text" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Categoria</label>
                                <select class="form-control">
                                    <option>Resinas</option>
                                    <option>Metais</option>
                                    <option>Cerâmicas</option>
                                    <option>Instrumentos</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Quantidade Inicial</label>
                                <input type="number" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Estoque Mínimo</label>
                                <input type="number" class="form-control" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-close">Cancelar</button>
                        <button class="btn btn-primary">Salvar</button>
                    </div>
                </div>
            `,
            appointment: `
                <div class="modal">
                    <div class="modal-header">
                        <h3>Novo Agendamento</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="modal-form">
                            <div class="form-group">
                                <label>Paciente</label>
                                <select class="form-control" required>
                                    <option>Selecione um paciente</option>
                                    <option>Maria Silva</option>
                                    <option>João Santos</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Data</label>
                                <input type="date" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Horário</label>
                                <input type="time" class="form-control" required>
                            </div>
                            <div class="form-group">
                                <label>Técnico Responsável</label>
                                <select class="form-control" required>
                                    <option>Carlos Silva</option>
                                    <option>Ana Costa</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Observações</label>
                                <textarea class="form-control" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary modal-close">Cancelar</button>
                        <button class="btn btn-primary">Agendar</button>
                    </div>
                </div>
            `
        };
        
        return modals[type] || modals.patient;
    }
}

// Inicializar aplicação quando DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new ProthesisLabApp();
});