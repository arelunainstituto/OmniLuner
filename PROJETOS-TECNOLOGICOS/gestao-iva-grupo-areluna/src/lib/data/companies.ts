import { VATRegime } from '@/lib/types'

export interface CompanyData {
  name: string
  nif: string
  address: string
  vatRegime: VATRegime
  isActive: boolean
}

export const GRUPO_ARELUNA_COMPANIES: CompanyData[] = [
  {
    name: 'Vespasian Ventures',
    nif: '123456789',
    address: 'Rua Principal, 1, 1000-001 Lisboa',
    vatRegime: VATRegime.NORMAL,
    isActive: true,
  },
  {
    name: 'Instituto AreLuna',
    nif: '234567890',
    address: 'Avenida da Educação, 25, 4000-001 Porto',
    vatRegime: VATRegime.EXEMPT,
    isActive: true,
  },
  {
    name: 'Pinklegion',
    nif: '345678901',
    address: 'Rua da Criatividade, 10, 2000-001 Santarém',
    vatRegime: VATRegime.NORMAL,
    isActive: true,
  },
  {
    name: 'Papagaio Fotogénico',
    nif: '456789012',
    address: 'Praça das Artes, 5, 3000-001 Coimbra',
    vatRegime: VATRegime.REDUCED,
    isActive: true,
  },
  {
    name: 'Nuvens Autóctones',
    nif: '567890123',
    address: 'Rua da Inovação, 15, 8000-001 Faro',
    vatRegime: VATRegime.NORMAL,
    isActive: true,
  },
  {
    name: 'ProStoral',
    nif: '678901234',
    address: 'Avenida do Comércio, 30, 9000-001 Funchal',
    vatRegime: VATRegime.NORMAL,
    isActive: true,
  },
]

export const VAT_EXEMPTION_ARTICLES = [
  {
    article: 'Art. 9º CIVA',
    description: 'Isenções nas operações internas',
  },
  {
    article: 'Art. 12º CIVA',
    description: 'Isenções nas exportações',
  },
  {
    article: 'Art. 13º CIVA',
    description: 'Isenções nas operações intracomunitárias',
  },
  {
    article: 'Art. 14º CIVA',
    description: 'Isenções nos transportes internacionais',
  },
]