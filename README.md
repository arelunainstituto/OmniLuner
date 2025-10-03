# Grupo AreLuna - Monorepo Unificado & ProthesisLab

> **Monorepo centralizado** para todos os projetos tecnológicos do Grupo AreLuna, incluindo ERP, Sistema de Inventário, Plataforma de Empréstimos e ProthesisLab.

## 📋 Descrição

Sistema completo de gestão empresarial multi-tenant para o Grupo AreLuna, incluindo um sistema especializado para laboratórios de próteses dentárias (ProthesisLab), desenvolvido especificamente para o mercado português.

## 🏗️ Arquitetura

Este monorepo utiliza **Turbo** para gerenciamento eficiente de múltiplos projetos e **npm workspaces** para dependências compartilhadas.

### 📁 Estrutura Organizacional

```
Grupo AreLuna/
├── HOLDING/                    # Vespasian Ventures (Holding)
├── EMPRESAS/                   # Empresas do grupo
│   ├── Instituto-AreLuna/      # Clínica dental e estética
│   ├── Pinklegion/            # Comércio e manutenção de veículos
│   ├── Papagaio-Fotogenico/   # Audiovisual, publicidade e TI
│   ├── Nuvens-Autoctones/     # Transporte rodoviário e logística
│   └── ProStoral/             # Dispositivos médicos e próteses
├── PROJETOS-TECNOLOGICOS/      # Projetos de software
│   ├── ERP-Grupo-AreLuna/     # Sistema ERP principal
│   ├── Sistema-Inventario/     # Gestão de inventário
│   └── Plataforma-Emprestimos/ # Sistema de empréstimos
├── DOCUMENTACAO/              # Arquitetura, manuais e processos
├── FERRAMENTAS/              # Scripts, automação e configurações
├── DADOS/                    # Backups, exports e templates
└── ARQUIVO/                  # Projetos antigos e documentos históricos
```

## 🚀 Projetos Tecnológicos

### 1. **ERP Grupo AreLuna** (Principal)
- **Stack:** Next.js 14 + TypeScript + Prisma + Supabase
- **Status:** Em desenvolvimento ativo
- **Funcionalidades:** Multi-tenant, RBAC, Intercompany Orders, Procurement, Logistics

### 2. **ProthesisLab** (Sistema de Gestão para Laboratório de Próteses)
- **Stack:** HTML5, CSS3, JavaScript (ES6+)
- **Status:** Funcional, adaptado para Portugal
- **Funcionalidades:** 
  - Dashboard com métricas e indicadores
  - Gestão de Casos e workflow de produção
  - Gestão de Técnicos e performance
  - Relatórios e análises detalhadas
  - Gestão de Pacientes e histórico
  - Controle de Estoque e inventário
  - Módulo Financeiro com fiscalidade portuguesa
  - Agenda e controle de prazos
  - Gestão de Documentos

### 3. **Sistema de Inventário**
- **Stack:** Next.js 14 + TypeScript + Supabase + QR Codes
- **Status:** Funcional, pronto para integração
- **Funcionalidades:** Gestão de patrimônio, QR codes, impressão de etiquetas

### 4. **Plataforma de Empréstimos**
- **Stack:** HTML + JavaScript + Chart.js
- **Status:** Legacy, planejada modernização
- **Funcionalidades:** Gestão de empréstimos e análise financeira

## 🛠️ Comandos Principais

```bash
# Instalar dependências
npm install

# Desenvolvimento (todos os projetos)
npm run dev

# Build de produção
npm run build

# Linting
npm run lint

# Testes
npm run test

# Formatação de código
npm run format
```

## 🏢 Empresas do Grupo

| Empresa | Atividade | CAE |
|---------|-----------|-----|
| **Vespasian Ventures** | Holding e gestão | 64200, 70100 |
| **Instituto AreLuna** | Clínica dental/estética | 86230 |
| **Pinklegion** | Comércio/manutenção veículos | 45110, 45200 |
| **Papagaio Fotogénico** | Audiovisual/publicidade/TI | 59110, 73110, 62010 |
| **Nuvens Autóctones** | Transporte/logística | 49410 |
| **ProStoral** | Dispositivos médicos | 32500 |

## 🎯 Objetivos Estratégicos

### Curto Prazo (3 meses)
- ✅ Reorganização da estrutura de pastas
- ✅ Criação do monorepo unificado
- 🔄 Finalização do ERP core
- 🔄 Integração do Sistema de Inventário

### Médio Prazo (6 meses)
- 📋 Modernização da Plataforma de Empréstimos
- 📋 Implementação completa do módulo Clínico
- 📋 Integrações com Microsoft Graph e Zoho CRM

### Longo Prazo (12 meses)
- 📋 Expansão para outras empresas do grupo
- 📋 Implementação de BI e analytics avançados
- 📋 Certificações de segurança e compliance

## 🔧 Stack Tecnológico Padronizado

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + Prisma + Supabase
- **Database:** PostgreSQL (Supabase/Vercel Postgres)
- **Auth:** NextAuth.js + Azure AD
- **Deploy:** Vercel
- **Monorepo:** Turbo + npm workspaces

## 📚 Documentação

- [Arquitetura do Sistema](./DOCUMENTACAO/arquitetura/)
- [Guias de Desenvolvimento](./DOCUMENTACAO/manuais/)
- [Processos e Workflows](./DOCUMENTACAO/processos/)

## 🤝 Contribuição

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
4. Faça suas alterações e commit: `git commit -m "feat: nova funcionalidade"`
5. Push para a branch: `git push origin feature/nova-funcionalidade`
6. Abra um Pull Request

## 📄 Licença

MIT © Grupo AreLuna

---

**Desenvolvido com ❤️ pela equipe do Grupo AreLuna**
=======
# ProthesisLab - Sistema de Gestão para Laboratório de Próteses

## 🛠️ Comandos Principais

```bash
# Instalar dependências
npm install

# Desenvolvimento (todos os projetos)
npm run dev

# Build de produção
npm run build

# Linting
npm run lint

# Testes
npm run test

# Formatação de código
npm run format
```

## 🇵🇹 Adaptações para Portugal (ProthesisLab)
- **Moeda**: Euro (€) em todo o sistema
- **Fiscalidade**: 
  - NIF (Número de Identificação Fiscal)
  - Taxas de IVA portuguesas (23%, 13%, 6%, 0%)
  - Resumo fiscal automático
- **Conformidade**: Padrões portugueses de saúde e negócios

## 🏢 Empresas do Grupo

| Empresa | Atividade | CAE |
|---------|-----------|-----|
| **Vespasian Ventures** | Holding e gestão | 64200, 70100 |
| **Instituto AreLuna** | Clínica dental/estética | 86230 |
| **Pinklegion** | Comércio/manutenção veículos | 45110, 45200 |
| **Papagaio Fotogénico** | Audiovisual/publicidade/TI | 59110, 73110, 62010 |
| **Nuvens Autóctones** | Transporte/logística | 49410 |
| **ProStoral** | Dispositivos médicos | 32500 |

## 🎯 Objetivos Estratégicos

### Curto Prazo (3 meses)
- ✅ Reorganização da estrutura de pastas
- ✅ Criação do monorepo unificado
- 🔄 Finalização do ERP core
- 🔄 Integração do Sistema de Inventário

### Médio Prazo (6 meses)
- 📋 Modernização da Plataforma de Empréstimos
- 📋 Implementação completa do módulo Clínico
- 📋 Integrações com Microsoft Graph e Zoho CRM

### Longo Prazo (12 meses)
- 📋 Expansão para outras empresas do grupo
- 📋 Implementação de BI e analytics avançados
- 📋 Certificações de segurança e compliance

## 🔧 Stack Tecnológico Padronizado

- **Frontend:** Next.js 14 + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Next.js API Routes + Prisma + Supabase
- **Database:** PostgreSQL (Supabase/Vercel Postgres)
- **Auth:** NextAuth.js + Azure AD
- **Deploy:** Vercel
- **Monorepo:** Turbo + npm workspaces

## 📚 Documentação

- [Arquitetura do Sistema](./DOCUMENTACAO/arquitetura/)
- [Guias de Desenvolvimento](./DOCUMENTACAO/manuais/)
- [Processos e Workflows](./DOCUMENTACAO/processos/)

## 🤝 Contribuição

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
4. Faça suas alterações e commit: `git commit -m "feat: nova funcionalidade"`
5. Push para a branch: `git push origin feature/nova-funcionalidade`
6. Abra um Pull Request

## 📄 Licença

MIT © Grupo AreLuna

---

**Desenvolvido com ❤️ pela equipe do Grupo AreLuna**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Equipe

**Grupo AreLuna** - Instituto de desenvolvimento de soluções tecnológicas

## 📞 Suporte

Para suporte técnico ou dúvidas:
- Email: suporte@areluna.pt
- Website: https://areluna.pt

---

**OmniLuner** - Agente de Engenharia do Grupo AreLuna
>>>>>>> 8e2bcfa9403011ba7c36490532ab356591b99acf