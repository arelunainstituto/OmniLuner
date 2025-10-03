# Grupo AreLuna - Monorepo Unificado

> **Monorepo centralizado** para todos os projetos tecnológicos do Grupo AreLuna, incluindo ERP, Sistema de Inventário e Plataforma de Empréstimos.

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

### 2. **Sistema de Inventário**
- **Stack:** Next.js 14 + TypeScript + Supabase + QR Codes
- **Status:** Funcional, pronto para integração
- **Funcionalidades:** Gestão de patrimônio, QR codes, impressão de etiquetas

### 3. **Plataforma de Empréstimos**
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