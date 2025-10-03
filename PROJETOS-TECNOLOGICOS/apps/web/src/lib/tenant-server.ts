import { headers } from 'next/headers'
import { TENANT_CONFIG, type Tenant } from './tenant'

export async function getTenantFromHeaders(requestHeaders?: Headers): Promise<Tenant | null> {
  const headersList = requestHeaders || headers()
  const hostname = headersList.get('host') || ''
  
  // Check for subdomain-based tenant
  if (hostname.includes('.')) {
    const subdomain = hostname.split('.')[0]
    const tenant = Object.values(TENANT_CONFIG).find(t => t.subdomain === subdomain)
    if (tenant) {
      return tenant
    }
  }
  
  // Default tenant for localhost development
  if (hostname.includes('localhost') || hostname.includes('127.0.0.1')) {
    return TENANT_CONFIG['instituto-areluna']
  }
  
  return null
}