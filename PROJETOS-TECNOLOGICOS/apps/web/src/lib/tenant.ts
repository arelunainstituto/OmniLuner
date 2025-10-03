export interface Tenant {
  id: string
  name: string
  subdomain: string
  domain?: string
  displayName?: string
  primaryColor?: string
  description?: string
}

export const TENANT_CONFIG: Record<string, Tenant> = {
  'vespasian-ventures': {
    id: 'vespasian-ventures',
    name: 'Vespasian Ventures',
    subdomain: 'vespasian-ventures',
    domain: 'vespasianventures.com',
    displayName: 'Vespasian Ventures',
    primaryColor: '#1f2937',
  },
  'instituto-areluna': {
    id: 'instituto-areluna',
    name: 'Instituto AreLuna',
    subdomain: 'instituto-areluna',
    domain: 'instituto-areluna.com',
    displayName: 'Instituto AreLuna',
    primaryColor: '#3b82f6',
  },
  'pinklegion': {
    id: 'pinklegion',
    name: 'Pinklegion',
    subdomain: 'pinklegion',
    domain: 'pinklegion.com',
    displayName: 'Pinklegion',
    primaryColor: '#ec4899',
  },
  'papagaio-fotografico': {
    id: 'papagaio-fotografico',
    name: 'Papagaio Fotogénico',
    subdomain: 'papagaio-fotografico',
    domain: 'papagaiofotogenico.com',
    displayName: 'Papagaio Fotogénico',
    primaryColor: '#f59e0b',
  },
  'nuvens-autoctones': {
    id: 'nuvens-autoctones',
    name: 'Nuvens Autóctones',
    subdomain: 'nuvens-autoctones',
    domain: 'nuvensautoctones.com',
    displayName: 'Nuvens Autóctones',
    primaryColor: '#10b981',
  },
  'prostoral': {
    id: 'prostoral',
    name: 'ProStoral',
    subdomain: 'prostoral',
    domain: 'prostoral.com',
    displayName: 'ProStoral',
    primaryColor: '#8b5cf6',
  },
}

export function getTenantById(tenantId: string): Tenant | null {
  return TENANT_CONFIG[tenantId] || null
}

export function getAllTenants(): Tenant[] {
  return Object.values(TENANT_CONFIG)
}