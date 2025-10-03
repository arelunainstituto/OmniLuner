'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface Tenant {
  id: string
  name: string
  subdomain: string
  domain?: string
}

interface TenantContextType {
  tenant: Tenant | null
  isLoading: boolean
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
})

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [tenant, setTenant] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get tenant from cookie or header
    const getTenant = () => {
      // Check cookie first
      const tenantId = document.cookie
        .split('; ')
        .find(row => row.startsWith('tenant-id='))
        ?.split('=')[1]

      if (tenantId) {
        // Mock tenant data - in real app, fetch from API
        const mockTenant: Tenant = {
          id: tenantId,
          name: 'Instituto AreLuna',
          subdomain: 'instituto-areluna',
        }
        setTenant(mockTenant)
      }
      setIsLoading(false)
    }

    getTenant()
  }, [])

  return (
    <TenantContext.Provider value={{ tenant, isLoading }}>
      {children}
    </TenantContext.Provider>
  )
}

export const useTenant = () => {
  const context = useContext(TenantContext)
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider')
  }
  return context
}