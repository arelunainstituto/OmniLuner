class InterCompanyPlatform {
    constructor() {
        this.currentPage = 'dashboard';
        this.sidebarCollapsed = false;
        this.mockData = this.generateMockData();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadPage('dashboard');
        this.updatePageTitle('Dashboard', 'Visão geral da automação intercompany');
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.getElementById('sidebarToggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', () => this.toggleSidebar());
        }

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const page = link.getAttribute('data-page');
                this.navigateToPage(page);
            });
        });

        // New request button
        const newRequestBtn = document.querySelector('.btn-primary');
        if (newRequestBtn) {
            newRequestBtn.addEventListener('click', () => this.openNewRequestModal());
        }

        // Modal close events
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-overlay')) {
                this.closeModal(e.target.id);
            }
        });
    }

    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('collapsed');
        this.sidebarCollapsed = !this.sidebarCollapsed;
    }

    navigateToPage(page) {
        // Update active nav item
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeNavItem = document.querySelector(`[data-page="${page}"]`).closest('.nav-item');
        activeNavItem.classList.add('active');

        // Hide all pages
        document.querySelectorAll('.page-content').forEach(pageContent => {
            pageContent.classList.add('hidden');
        });

        // Show current page
        const currentPageElement = document.getElementById(`${page}-page`);
        if (currentPageElement) {
            currentPageElement.classList.remove('hidden');
        }

        this.currentPage = page;
        this.loadPage(page);
    }

    updatePageTitle(title, subtitle) {
        document.getElementById('pageTitle').textContent = title;
        document.getElementById('pageSubtitle').textContent = subtitle;
    }

    loadPage(page) {
        const pageElement = document.getElementById(`${page}-page`);
        if (!pageElement) return;

        switch (page) {
            case 'dashboard':
                this.loadDashboard(pageElement);
                this.updatePageTitle('Dashboard', 'Visão geral da automação intercompany');
                break;
            case 'catalog':
                this.loadCatalog(pageElement);
                this.updatePageTitle('Catálogo IC', 'Gestão do catálogo de produtos e serviços');
                break;
            case 'requests':
                this.loadRequests(pageElement);
                this.updatePageTitle('Pedidos', 'Gestão de pedidos intercompany');
                break;
            case 'workflows':
                this.loadWorkflows(pageElement);
                this.updatePageTitle('Fluxos n8n', 'Configuração e monitoramento de workflows');
                break;
            case 'monitoring':
                this.loadMonitoring(pageElement);
                this.updatePageTitle('Monitoramento', 'Logs e estatísticas de execução');
                break;
            case 'integrations':
                this.loadIntegrations(pageElement);
                this.updatePageTitle('Integrações', 'Configuração de APIs e serviços');
                break;
            case 'audit':
                this.loadAudit(pageElement);
                this.updatePageTitle('Auditoria', 'Trilha de auditoria e conformidade');
                break;
        }
    }

    loadDashboard(container) {
        container.innerHTML = `
            <div class="grid grid-cols-4 mb-4">
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <h3 style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">${this.mockData.stats.totalRequests}</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Total de Pedidos</p>
                            </div>
                            <div style="background: rgba(37, 99, 235, 0.1); padding: 1rem; border-radius: 50%; color: var(--primary-color);">
                                <i class="fas fa-file-invoice" style="font-size: 1.5rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <h3 style="font-size: 2rem; font-weight: 700; color: var(--success-color); margin-bottom: 0.5rem;">${this.mockData.stats.activeWorkflows}</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Fluxos Ativos</p>
                            </div>
                            <div style="background: rgba(34, 197, 94, 0.1); padding: 1rem; border-radius: 50%; color: var(--success-color);">
                                <i class="fas fa-project-diagram" style="font-size: 1.5rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <h3 style="font-size: 2rem; font-weight: 700; color: var(--warning-color); margin-bottom: 0.5rem;">${this.mockData.stats.pendingApprovals}</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Pendentes</p>
                            </div>
                            <div style="background: rgba(245, 158, 11, 0.1); padding: 1rem; border-radius: 50%; color: var(--warning-color);">
                                <i class="fas fa-clock" style="font-size: 1.5rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card">
                    <div class="card-body">
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <div>
                                <h3 style="font-size: 2rem; font-weight: 700; color: var(--accent-color); margin-bottom: 0.5rem;">€${this.mockData.stats.monthlyVolume}</h3>
                                <p style="color: var(--text-secondary); font-size: 0.875rem;">Volume Mensal</p>
                            </div>
                            <div style="background: rgba(16, 185, 129, 0.1); padding: 1rem; border-radius: 50%; color: var(--accent-color);">
                                <i class="fas fa-euro-sign" style="font-size: 1.5rem;"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Pedidos Recentes</h3>
                        <p class="card-subtitle">Últimos pedidos processados</p>
                    </div>
                    <div class="card-body">
                        <div class="table-container">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Empresa</th>
                                        <th>Status</th>
                                        <th>Valor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.mockData.recentRequests.map(request => `
                                        <tr>
                                            <td><strong>${request.id}</strong></td>
                                            <td>${request.company}</td>
                                            <td><span class="badge badge-${this.getStatusColor(request.status)}">${request.status}</span></td>
                                            <td>€${request.value}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Status dos Fluxos</h3>
                        <p class="card-subtitle">Monitoramento em tempo real</p>
                    </div>
                    <div class="card-body">
                        ${this.mockData.workflowStatus.map(workflow => `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                                <div>
                                    <h4 style="font-weight: 600; margin-bottom: 0.25rem;">${workflow.name}</h4>
                                    <p style="color: var(--text-secondary); font-size: 0.875rem;">Última execução: ${workflow.lastRun}</p>
                                </div>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span class="status-dot ${workflow.status === 'active' ? 'active' : ''}"></span>
                                    <span class="badge badge-${workflow.status === 'active' ? 'success' : 'secondary'}">${workflow.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    loadCatalog(container) {
        container.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 class="card-title">Catálogo IC_Catalog</h3>
                            <p class="card-subtitle">Gestão de produtos e serviços intercompany</p>
                        </div>
                        <button class="btn btn-primary" onclick="app.openAddCatalogModal()">
                            <i class="fas fa-plus"></i>
                            Adicionar Item
                        </button>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fornecedor</th>
                                    <th>Produto/Serviço</th>
                                    <th>Unidade</th>
                                    <th>Preço Transfer.</th>
                                    <th>SLA (dias)</th>
                                    <th>Conta Contábil</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.mockData.catalog.map(item => `
                                    <tr>
                                        <td><strong>${item.id}</strong></td>
                                        <td>${item.fornecedor}</td>
                                        <td>${item.produtoServico}</td>
                                        <td>${item.unidade}</td>
                                        <td>€${item.precoTransferencia}</td>
                                        <td>${item.slaDias}</td>
                                        <td><code>${item.contaContabil}</code></td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary">
                                                <i class="fas fa-edit"></i>
                                            </button>
                                            <button class="btn btn-sm btn-danger">
                                                <i class="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    loadRequests(container) {
        container.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 class="card-title">Pedidos IC_Requests</h3>
                            <p class="card-subtitle">Gestão completa de pedidos intercompany</p>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <select class="form-select" style="width: auto;">
                                <option>Todos os Status</option>
                                <option>Novo</option>
                                <option>Enviado</option>
                                <option>Confirmado</option>
                                <option>Em Entrega</option>
                                <option>Entregue</option>
                                <option>Faturado</option>
                            </select>
                            <button class="btn btn-primary" onclick="app.openNewRequestModal()">
                                <i class="fas fa-plus"></i>
                                Novo Pedido
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Empresa Solicitante</th>
                                    <th>Fornecedor</th>
                                    <th>Centro Custo</th>
                                    <th>Status</th>
                                    <th>Data Criação</th>
                                    <th>Valor Total</th>
                                    <th>Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.mockData.requests.map(request => `
                                    <tr>
                                        <td><strong>${request.requestId}</strong></td>
                                        <td>${request.empresaSolicitante}</td>
                                        <td>${request.fornecedor}</td>
                                        <td><code>${request.centroCusto}</code></td>
                                        <td><span class="badge badge-${this.getStatusColor(request.estado)}">${request.estado}</span></td>
                                        <td>${request.dataCriacao}</td>
                                        <td>€${request.valorTotal}</td>
                                        <td>
                                            <button class="btn btn-sm btn-secondary" title="Ver Detalhes">
                                                <i class="fas fa-eye"></i>
                                            </button>
                                            <button class="btn btn-sm btn-primary" title="Processar">
                                                <i class="fas fa-play"></i>
                                            </button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    loadWorkflows(container) {
        container.innerHTML = `
            <div class="grid grid-cols-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Fluxos Configurados</h3>
                        <p class="card-subtitle">Workflows n8n ativos</p>
                    </div>
                    <div class="card-body">
                        ${this.mockData.workflows.map(workflow => `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid var(--border-color); border-radius: var(--radius-md); margin-bottom: 1rem;">
                                <div>
                                    <h4 style="font-weight: 600; margin-bottom: 0.5rem;">${workflow.name}</h4>
                                    <p style="color: var(--text-secondary); font-size: 0.875rem; margin-bottom: 0.5rem;">${workflow.description}</p>
                                    <div style="display: flex; gap: 0.5rem; align-items: center;">
                                        <span class="badge badge-${workflow.status === 'active' ? 'success' : 'secondary'}">${workflow.status === 'active' ? 'Ativo' : 'Inativo'}</span>
                                        <span style="font-size: 0.75rem; color: var(--text-muted);">Trigger: ${workflow.trigger}</span>
                                    </div>
                                </div>
                                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                    <button class="btn btn-sm btn-primary">
                                        <i class="fas fa-play"></i>
                                        Executar
                                    </button>
                                    <button class="btn btn-sm btn-secondary">
                                        <i class="fas fa-cog"></i>
                                        Configurar
                                    </button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Execuções Recentes</h3>
                        <p class="card-subtitle">Histórico de execuções</p>
                    </div>
                    <div class="card-body">
                        ${this.mockData.executions.map(execution => `
                            <div style="display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid var(--border-color);">
                                <div>
                                    <h4 style="font-weight: 600; margin-bottom: 0.25rem;">${execution.workflow}</h4>
                                    <p style="color: var(--text-secondary); font-size: 0.875rem;">ID: ${execution.executionId}</p>
                                    <p style="color: var(--text-muted); font-size: 0.75rem;">${execution.timestamp}</p>
                                </div>
                                <div style="text-align: right;">
                                    <span class="badge badge-${execution.status === 'success' ? 'success' : execution.status === 'error' ? 'danger' : 'warning'}">${execution.status}</span>
                                    <p style="color: var(--text-muted); font-size: 0.75rem; margin-top: 0.25rem;">${execution.duration}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    loadMonitoring(container) {
        container.innerHTML = `
            <div class="grid grid-cols-3 mb-4">
                <div class="card">
                    <div class="card-body">
                        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--success-color); margin-bottom: 0.5rem;">98.5%</h3>
                        <p style="color: var(--text-secondary);">Taxa de Sucesso</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">2.3s</h3>
                        <p style="color: var(--text-secondary);">Tempo Médio</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-body">
                        <h3 style="font-size: 1.5rem; font-weight: 700; color: var(--warning-color); margin-bottom: 0.5rem;">3</h3>
                        <p style="color: var(--text-secondary);">Erros Hoje</p>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-header">
                    <h3 class="card-title">Logs de Execução</h3>
                    <p class="card-subtitle">Monitoramento em tempo real</p>
                </div>
                <div class="card-body">
                    <div style="background: #1e293b; color: #e2e8f0; padding: 1rem; border-radius: var(--radius-md); font-family: 'Courier New', monospace; font-size: 0.875rem; max-height: 400px; overflow-y: auto;">
                        ${this.mockData.logs.map(log => `
                            <div style="margin-bottom: 0.5rem; display: flex; gap: 1rem;">
                                <span style="color: #64748b;">[${log.timestamp}]</span>
                                <span style="color: ${this.getLogColor(log.level)};">[${log.level.toUpperCase()}]</span>
                                <span>${log.message}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    loadIntegrations(container) {
        container.innerHTML = `
            <div class="grid grid-cols-2">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Microsoft 365</h3>
                        <p class="card-subtitle">Configuração do Microsoft Graph</p>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Tenant ID</label>
                            <input type="text" class="form-input" value="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Client ID</label>
                            <input type="text" class="form-input" value="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status da Conexão</label>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span class="status-dot active"></span>
                                <span class="badge badge-success">Conectado</span>
                            </div>
                        </div>
                        <button class="btn btn-primary">
                            <i class="fas fa-sync"></i>
                            Testar Conexão
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">OpenAI / ChatGPT</h3>
                        <p class="card-subtitle">Configuração da API OpenAI</p>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">API Key</label>
                            <input type="password" class="form-input" value="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Modelo</label>
                            <select class="form-select">
                                <option>gpt-4</option>
                                <option>gpt-3.5-turbo</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status da API</label>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span class="status-dot active"></span>
                                <span class="badge badge-success">Operacional</span>
                            </div>
                        </div>
                        <button class="btn btn-primary">
                            <i class="fas fa-sync"></i>
                            Testar API
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">SharePoint</h3>
                        <p class="card-subtitle">Configuração de listas e bibliotecas</p>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">Site URL</label>
                            <input type="text" class="form-input" value="https://company.sharepoint.com/sites/intercompany" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Listas Configuradas</label>
                            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                                <span class="badge badge-success">IC_Catalog ✓</span>
                                <span class="badge badge-success">IC_Requests ✓</span>
                            </div>
                        </div>
                        <button class="btn btn-primary">
                            <i class="fas fa-sync"></i>
                            Sincronizar
                        </button>
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">n8n Workflows</h3>
                        <p class="card-subtitle">Configuração do servidor n8n</p>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label class="form-label">n8n URL</label>
                            <input type="text" class="form-input" value="https://n8n.company.com" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">API Key</label>
                            <input type="password" class="form-input" value="n8n_api_xxxxxxxxxxxxxxxx" readonly>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Status do Servidor</label>
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <span class="status-dot active"></span>
                                <span class="badge badge-success">Online</span>
                            </div>
                        </div>
                        <button class="btn btn-primary">
                            <i class="fas fa-external-link-alt"></i>
                            Abrir n8n
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    loadAudit(container) {
        container.innerHTML = `
            <div class="card">
                <div class="card-header">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <h3 class="card-title">Trilha de Auditoria</h3>
                            <p class="card-subtitle">Registro completo de atividades do sistema</p>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <select class="form-select" style="width: auto;">
                                <option>Todas as Ações</option>
                                <option>Criação de Pedido</option>
                                <option>Envio de Email</option>
                                <option>Geração de PDF</option>
                                <option>Atualização de Status</option>
                            </select>
                            <button class="btn btn-secondary">
                                <i class="fas fa-download"></i>
                                Exportar
                            </button>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="table-container">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Timestamp</th>
                                    <th>Usuário/Sistema</th>
                                    <th>Ação</th>
                                    <th>Recurso</th>
                                    <th>Detalhes</th>
                                    <th>IP/Origem</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${this.mockData.auditLog.map(entry => `
                                    <tr>
                                        <td>${entry.timestamp}</td>
                                        <td>${entry.user}</td>
                                        <td><code>${entry.action}</code></td>
                                        <td>${entry.resource}</td>
                                        <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${entry.details}</td>
                                        <td><code>${entry.ip}</code></td>
                                        <td><span class="badge badge-${entry.status === 'success' ? 'success' : 'danger'}">${entry.status}</span></td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    openNewRequestModal() {
        const modal = document.getElementById('newRequestModal');
        modal.classList.add('active');
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.classList.remove('active');
    }

    getStatusColor(status) {
        const statusColors = {
            'Novo': 'primary',
            'Enviado': 'warning',
            'Confirmado': 'success',
            'Em Entrega': 'warning',
            'Entregue': 'success',
            'Faturado': 'success',
            'Pendente': 'warning',
            'Processando': 'primary',
            'Concluído': 'success'
        };
        return statusColors[status] || 'secondary';
    }

    getLogColor(level) {
        const colors = {
            'info': '#3b82f6',
            'success': '#22c55e',
            'warning': '#f59e0b',
            'error': '#ef4444'
        };
        return colors[level] || '#64748b';
    }

    generateMockData() {
        return {
            stats: {
                totalRequests: 247,
                activeWorkflows: 8,
                pendingApprovals: 12,
                monthlyVolume: '45,230'
            },
            recentRequests: [
                { id: 'IC-202412-0045', company: 'Empresa A', status: 'Confirmado', value: '2,450.00' },
                { id: 'IC-202412-0044', company: 'Empresa B', status: 'Enviado', value: '1,200.00' },
                { id: 'IC-202412-0043', company: 'Empresa C', status: 'Faturado', value: '3,750.00' },
                { id: 'IC-202412-0042', company: 'Empresa A', status: 'Em Entrega', value: '890.00' },
                { id: 'IC-202412-0041', company: 'Empresa B', status: 'Novo', value: '5,200.00' }
            ],
            workflowStatus: [
                { name: 'Processamento de Pedidos', status: 'active', lastRun: '2 min atrás' },
                { name: 'Geração de PO', status: 'active', lastRun: '15 min atrás' },
                { name: 'Envio de Emails', status: 'active', lastRun: '1 hora atrás' },
                { name: 'Sincronização SharePoint', status: 'inactive', lastRun: '1 dia atrás' }
            ],
            catalog: [
                { id: 1, fornecedor: 'Empresa A', produtoServico: 'Consultoria IT', unidade: 'Hora', precoTransferencia: '85.00', slaDias: 5, contaContabil: '6200001' },
                { id: 2, fornecedor: 'Empresa B', produtoServico: 'Licenças Software', unidade: 'Unidade', precoTransferencia: '150.00', slaDias: 1, contaContabil: '6200002' },
                { id: 3, fornecedor: 'Empresa C', produtoServico: 'Suporte Técnico', unidade: 'Mês', precoTransferencia: '500.00', slaDias: 3, contaContabil: '6200003' },
                { id: 4, fornecedor: 'Empresa A', produtoServico: 'Desenvolvimento', unidade: 'Hora', precoTransferencia: '95.00', slaDias: 10, contaContabil: '6200004' }
            ],
            requests: [
                { requestId: 'IC-202412-0045', empresaSolicitante: 'Empresa A', fornecedor: 'Empresa B', centroCusto: 'CC-001', estado: 'Confirmado', dataCriacao: '15/12/2024', valorTotal: '2,450.00' },
                { requestId: 'IC-202412-0044', empresaSolicitante: 'Empresa B', fornecedor: 'Empresa C', centroCusto: 'CC-002', estado: 'Enviado', dataCriacao: '14/12/2024', valorTotal: '1,200.00' },
                { requestId: 'IC-202412-0043', empresaSolicitante: 'Empresa C', fornecedor: 'Empresa A', centroCusto: 'CC-003', estado: 'Faturado', dataCriacao: '13/12/2024', valorTotal: '3,750.00' },
                { requestId: 'IC-202412-0042', empresaSolicitante: 'Empresa A', fornecedor: 'Empresa C', centroCusto: 'CC-001', estado: 'Em Entrega', dataCriacao: '12/12/2024', valorTotal: '890.00' }
            ],
            workflows: [
                { name: 'Processamento Automático de Pedidos', description: 'Fluxo principal para processar pedidos IC', status: 'active', trigger: 'Webhook' },
                { name: 'Geração de Purchase Orders', description: 'Gera POs em HTML e converte para PDF', status: 'active', trigger: 'Manual' },
                { name: 'Envio de Emails M365', description: 'Envia emails via Microsoft Graph', status: 'active', trigger: 'Scheduled' },
                { name: 'Sincronização SharePoint', description: 'Sincroniza dados com listas SharePoint', status: 'inactive', trigger: 'Scheduled' }
            ],
            executions: [
                { workflow: 'Processamento de Pedidos', executionId: 'exec_001', status: 'success', timestamp: '15/12/2024 14:30', duration: '2.3s' },
                { workflow: 'Geração de PO', executionId: 'exec_002', status: 'success', timestamp: '15/12/2024 14:15', duration: '1.8s' },
                { workflow: 'Envio de Emails', executionId: 'exec_003', status: 'error', timestamp: '15/12/2024 13:45', duration: '0.5s' },
                { workflow: 'Sincronização SharePoint', executionId: 'exec_004', status: 'running', timestamp: '15/12/2024 13:30', duration: '45s' }
            ],
            logs: [
                { timestamp: '2024-12-15 14:30:15', level: 'info', message: 'Novo pedido IC-202412-0045 criado com sucesso' },
                { timestamp: '2024-12-15 14:29:42', level: 'success', message: 'Email enviado para empresa-b@company.com' },
                { timestamp: '2024-12-15 14:28:33', level: 'info', message: 'PDF gerado: PO_IC-202412-0045.pdf' },
                { timestamp: '2024-12-15 14:27:18', level: 'warning', message: 'Tentativa de reenvio de email (tentativa 2/3)' },
                { timestamp: '2024-12-15 14:26:05', level: 'error', message: 'Falha na conexão com SharePoint - timeout' },
                { timestamp: '2024-12-15 14:25:12', level: 'info', message: 'Workflow "Processamento de Pedidos" iniciado' },
                { timestamp: '2024-12-15 14:24:58', level: 'success', message: 'Autenticação Microsoft Graph bem-sucedida' }
            ],
            auditLog: [
                { timestamp: '15/12/2024 14:30:15', user: 'Sistema', action: 'CREATE_REQUEST', resource: 'IC-202412-0045', details: 'Pedido criado automaticamente via webhook', ip: '192.168.1.100', status: 'success' },
                { timestamp: '15/12/2024 14:29:42', user: 'n8n-workflow', action: 'SEND_EMAIL', resource: 'empresa-b@company.com', details: 'Email de notificação de pedido enviado', ip: '10.0.0.50', status: 'success' },
                { timestamp: '15/12/2024 14:28:33', user: 'Sistema', action: 'GENERATE_PDF', resource: 'PO_IC-202412-0045.pdf', details: 'Purchase Order gerado em PDF', ip: '10.0.0.50', status: 'success' },
                { timestamp: '15/12/2024 14:27:18', user: 'admin@company.com', action: 'UPDATE_STATUS', resource: 'IC-202412-0044', details: 'Status alterado para "Confirmado"', ip: '192.168.1.105', status: 'success' },
                { timestamp: '15/12/2024 14:26:05', user: 'Sistema', action: 'SYNC_SHAREPOINT', resource: 'IC_Requests', details: 'Falha na sincronização - timeout de conexão', ip: '10.0.0.50', status: 'error' }
            ]
        };
    }
}

// Funções globais para modais
function closeModal(modalId) {
    app.closeModal(modalId);
}

function addItem() {
    const itemsList = document.getElementById('itemsList');
    const newItem = document.createElement('div');
    newItem.className = 'item-row';
    newItem.innerHTML = `
        <input type="text" class="form-input" placeholder="Produto/Serviço" name="produto[]">
        <input type="number" class="form-input" placeholder="Qtd" name="quantidade[]">
        <input type="text" class="form-input" placeholder="Unidade" name="unidade[]">
        <input type="number" class="form-input" placeholder="Preço Unit." name="preco[]" step="0.01">
        <button type="button" class="btn btn-danger btn-sm" onclick="removeItem(this)">
            <i class="fas fa-trash"></i>
        </button>
    `;
    itemsList.appendChild(newItem);
}

function removeItem(button) {
    button.closest('.item-row').remove();
}

function submitNewRequest() {
    // Aqui seria implementada a lógica para enviar o pedido
    alert('Pedido criado com sucesso! (Funcionalidade simulada)');
    closeModal('newRequestModal');
}

// Inicializar aplicação
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new InterCompanyPlatform();
});