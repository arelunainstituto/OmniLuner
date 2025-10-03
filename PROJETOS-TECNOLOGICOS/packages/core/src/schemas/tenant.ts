import { z } from 'zod'

export const TenantSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Nome é obrigatório'),
  slug: z.string().min(1, 'Slug é obrigatório').regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  domain: z.string().optional(),
  subdomain: z.string().optional(),
  logo: z.string().url().optional(),
  settings: z.record(z.any()).default({}),
  isActive: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateTenantSchema = TenantSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
})

export const UpdateTenantSchema = CreateTenantSchema.partial()

export type Tenant = z.infer<typeof TenantSchema>
export type CreateTenant = z.infer<typeof CreateTenantSchema>
export type UpdateTenant = z.infer<typeof UpdateTenantSchema>

// Predefined tenants for AreLuna Group
export const ARELUNA_TENANTS = {
  VESPASIAN_VENTURES: {
    name: 'Vespasian Ventures',
    slug: 'vespasian-ventures',
    subdomain: 'vespasian',
  },
  INSTITUTO_ARELUNA: {
    name: 'Instituto AreLuna',
    slug: 'instituto-areluna',
    subdomain: 'instituto',
  },
  PINKLEGION: {
    name: 'Pinklegion',
    slug: 'pinklegion',
    subdomain: 'pinklegion',
  },
  PAPAGAIO_FOTOGRAFICO: {
    name: 'Papagaio Fotogénico',
    slug: 'papagaio-fotografico',
    subdomain: 'papagaio',
  },
  NUVENS_AUTOCTONES: {
    name: 'Nuvens Autóctones',
    slug: 'nuvens-autoctones',
    subdomain: 'nuvens',
  },
  PROSTORAL: {
    name: 'ProStoral',
    slug: 'prostoral',
    subdomain: 'prostoral',
  },
} as const