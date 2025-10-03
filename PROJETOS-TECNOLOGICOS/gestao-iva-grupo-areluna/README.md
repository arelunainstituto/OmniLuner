# Gestão IVA - Grupo AreLuna

Sistema integrado de gestão de IVA para todas as empresas do Grupo AreLuna, com controle centralizado e relatórios detalhados.

## 🏗️ Arquitetura

- **Framework**: Next.js 14 (App Router) + TypeScript
- **Autenticação**: NextAuth v5 (Auth.js) com Azure AD (OIDC)
- **Base de Dados**: SQLite (desenvolvimento) / PostgreSQL (produção) via Prisma
- **UI**: Tailwind CSS + shadcn/ui + Framer Motion
- **Validação**: Zod
- **Deploy**: Vercel (otimizado)

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone e instale dependências**:
```bash
git clone <repository-url>
cd gestao-iva-grupo-areluna
npm install
```

2. **Configure as variáveis de ambiente**:
```bash
cp .env.example .env.local
```

Edite `.env.local` com suas configurações:
```env
# Database
DATABASE_URL="file:./dev.db"
DIRECT_URL="file:./dev.db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3001"
AUTH_SECRET="your-auth-secret-here"

# Azure AD
AZURE_AD_CLIENT_ID="your-azure-ad-client-id"
AZURE_AD_CLIENT_SECRET="your-azure-ad-client-secret"
AZURE_AD_TENANT_ID="your-azure-ad-tenant-id"
```

3. **Configure a base de dados**:
```bash
# Gerar cliente Prisma
npm run db:generate

# Aplicar migrações
npm run db:push

# Popular com dados de teste
npm run db:seed
```

4. **Inicie o servidor de desenvolvimento**:
```bash
npm run dev
```

Acesse [http://localhost:3001](http://localhost:3001)

## 📊 Estrutura do Projeto

```
├── prisma/
│   ├── schema.prisma          # Schema da base de dados
│   ├── migrations/            # Migrações
│   └── seeds/                 # Dados de teste
├── src/
│   ├── app/                   # App Router (Next.js 14)
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Páginas de autenticação
│   │   ├── dashboard/         # Dashboard principal
│   │   └── page.tsx           # Página inicial
│   ├── components/            # Componentes React
│   │   └── ui/                # shadcn/ui components
│   ├── lib/                   # Utilitários e configurações
│   │   ├── auth/              # Configuração NextAuth
│   │   ├── services/          # Serviços de negócio
│   │   └── prisma.ts          # Cliente Prisma
│   └── types/                 # Definições TypeScript
└── public/                    # Assets estáticos
```

## 🏢 Empresas do Grupo

O sistema suporta as seguintes empresas:

1. **Vespasian Ventures** (Holding)
2. **Instituto AreLuna**
3. **Pinklegion**
4. **Papagaio Fotogénico**
5. **Nuvens Autóctones**
6. **ProStoral**

## 👥 Sistema de Utilizadores

### Roles Disponíveis
- **ADMIN**: Acesso total ao sistema
- **MANAGER**: Gestão da empresa
- **ACCOUNTANT**: Gestão fiscal e contabilística
- **USER**: Acesso básico

### Utilizadores de Teste

Após executar `npm run db:seed`, estarão disponíveis utilizadores de teste para cada empresa:

- **admin@{empresa}.pt** - Role: ADMIN
- **manager@{empresa}.pt** - Role: MANAGER
- **contabilista@{empresa}.pt** - Role: ACCOUNTANT
- **user@{empresa}.pt** - Role: USER

## 🔐 Autenticação

O sistema utiliza NextAuth v5 com Azure AD:

1. **SSO**: Integração com Azure Active Directory
2. **JWT**: Tokens seguros com informações do utilizador
3. **RBAC**: Controle de acesso baseado em roles
4. **Multi-tenant**: Suporte para múltiplas empresas

## 📝 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run build            # Build para produção
npm run start            # Servidor de produção
npm run lint             # Linting

# Base de Dados
npm run db:generate      # Gerar cliente Prisma
npm run db:push          # Aplicar schema à BD
npm run db:migrate       # Criar migração
npm run db:studio        # Interface visual da BD
npm run db:seed          # Popular com dados de teste
```

## 🔧 Configuração Azure AD

Para configurar a autenticação Azure AD:

1. **Registe uma aplicação** no Azure Portal
2. **Configure os URLs de redirecionamento**:
   - `http://localhost:3001/api/auth/callback/azure-ad` (desenvolvimento)
   - `https://your-domain.com/api/auth/callback/azure-ad` (produção)
3. **Obtenha as credenciais**:
   - Client ID
   - Client Secret
   - Tenant ID
4. **Atualize o `.env.local`** com as credenciais

## 🚀 Deploy

### Vercel (Recomendado)

1. **Conecte o repositório** ao Vercel
2. **Configure as variáveis de ambiente** no dashboard
3. **Deploy automático** em cada push

### Variáveis de Ambiente (Produção)

```env
DATABASE_URL="postgresql://..."
AUTH_SECRET="production-secret"
AZURE_AD_CLIENT_ID="..."
AZURE_AD_CLIENT_SECRET="..."
AZURE_AD_TENANT_ID="..."
```

## 📚 Documentação Adicional

- [Prisma Schema](./prisma/schema.prisma)
- [NextAuth Configuration](./src/lib/auth/)
- [API Routes](./src/app/api/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é propriedade do Grupo AreLuna.

---

**Desenvolvido por OmniLuner** - Agente de Engenharia do Grupo AreLuna