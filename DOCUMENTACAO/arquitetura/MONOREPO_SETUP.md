# Configuração do Monorepo - Grupo AreLuna

## 📋 Visão Geral

Este documento descreve a configuração e estrutura do monorepo unificado do Grupo AreLuna, implementado com **Turbo** e **npm workspaces**.

## 🏗️ Arquitetura do Monorepo

### Estrutura de Workspaces

```json
{
  "workspaces": [
    "PROJETOS-TECNOLOGICOS/ERP-Grupo-AreLuna/erp-grupo-areluna/apps/*",
    "PROJETOS-TECNOLOGICOS/ERP-Grupo-AreLuna/erp-grupo-areluna/packages/*",
    "PROJETOS-TECNOLOGICOS/Sistema-Inventario/Inventario Patrimonio",
    "PROJETOS-TECNOLOGICOS/Plataforma-Emprestimos/Lending Platform"
  ]
}
```

### Pipeline do Turbo

O Turbo está configurado para otimizar os seguintes comandos:

- **build**: Compilação de produção com dependências
- **dev**: Desenvolvimento com hot-reload
- **lint**: Verificação de código
- **test**: Execução de testes
- **type-check**: Verificação de tipos TypeScript

## 🚀 Comandos Disponíveis

### Comandos Globais (Raiz)

```bash
# Instalar todas as dependências
npm install

# Desenvolvimento de todos os projetos
npm run dev

# Build de todos os projetos
npm run build

# Lint em todos os projetos
npm run lint

# Testes em todos os projetos
npm run test

# Verificação de tipos
npm run type-check

# Formatação de código
npm run format

# Limpeza de builds
npm run clean
```

### Comandos Específicos por Projeto

```bash
# Executar comando em projeto específico
npx turbo run dev --filter=@areluna/erp
npx turbo run build --filter=inventory-app
npx turbo run test --filter=lending-platform
```

## 📦 Dependências Compartilhadas

### DevDependencies Globais

- **@turbo/gen**: Gerador de código para Turbo
- **@changesets/cli**: Gerenciamento de versões
- **eslint**: Linting de código
- **prettier**: Formatação de código
- **typescript**: Suporte a TypeScript

### Packages Compartilhados

Os packages compartilhados estão localizados em:
- `PROJETOS-TECNOLOGICOS/ERP-Grupo-AreLuna/erp-grupo-areluna/packages/`

## 🔧 Configurações

### Turbo (turbo.json)

```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**", "build/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

### ESLint (.eslintrc.js)

Configuração centralizada com regras específicas para cada tipo de projeto.

### Prettier (.prettierrc)

Formatação consistente em todo o monorepo.

## 🔄 Workflow de Desenvolvimento

### 1. Setup Inicial

```bash
# Clone do repositório
git clone <repo-url>
cd grupo-areluna

# Instalação de dependências
npm install
```

### 2. Desenvolvimento

```bash
# Iniciar todos os projetos em modo dev
npm run dev

# Ou iniciar projeto específico
npx turbo run dev --filter=@areluna/erp
```

### 3. Build e Deploy

```bash
# Build de todos os projetos
npm run build

# Deploy específico (exemplo Vercel)
npx turbo run build --filter=@areluna/erp
```

## 📊 Benefícios do Monorepo

### ✅ Vantagens

1. **Dependências Compartilhadas**: Redução de duplicação
2. **Builds Incrementais**: Turbo otimiza rebuilds
3. **Consistência**: Configurações padronizadas
4. **Refactoring**: Mudanças cross-project facilitadas
5. **CI/CD Simplificado**: Pipeline unificado

### ⚠️ Considerações

1. **Tamanho**: Repositório maior
2. **Complexidade**: Setup inicial mais complexo
3. **Permissões**: Acesso unificado a todos os projetos

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Dependências não encontradas
```bash
# Limpar e reinstalar
npm run clean
rm -rf node_modules
npm install
```

#### 2. Cache do Turbo corrompido
```bash
# Limpar cache do Turbo
npx turbo run clean
rm -rf .turbo
```

#### 3. Conflitos de versão
```bash
# Verificar dependências
npm ls
# Resolver conflitos manualmente no package.json
```

## 📈 Próximos Passos

1. **Integração CI/CD**: GitHub Actions para deploy automático
2. **Shared Packages**: Criar packages compartilhados (@areluna/ui, @areluna/utils)
3. **Testing**: Configurar testes integrados
4. **Documentation**: Automatizar geração de docs

## 📚 Referências

- [Turbo Documentation](https://turbo.build/repo/docs)
- [npm Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces)
- [Changesets](https://github.com/changesets/changesets)

---

**Última atualização:** $(date +%Y-%m-%d)  
**Responsável:** Equipe de Desenvolvimento Grupo AreLuna