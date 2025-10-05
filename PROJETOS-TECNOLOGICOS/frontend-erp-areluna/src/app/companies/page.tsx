'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Users, 
  TrendingUp,
  Edit,
  Eye,
  MoreHorizontal
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const companies = [
  {
    id: 1,
    name: 'Vespasian Ventures',
    type: 'Holding',
    address: 'Lisboa, Portugal',
    phone: '+351 21 123 4567',
    email: 'contact@vespasian.pt',
    employees: 25,
    revenue: 5000000,
    status: 'active',
    description: 'Empresa holding do Grupo AreLuna'
  },
  {
    id: 2,
    name: 'Instituto AreLuna',
    type: 'Clínica',
    address: 'Porto, Portugal',
    phone: '+351 22 987 6543',
    email: 'info@institutoareluna.pt',
    employees: 45,
    revenue: 2500000,
    status: 'active',
    description: 'Instituto de medicina estética e bem-estar'
  },
  {
    id: 3,
    name: 'Pinklegion',
    type: 'Tecnologia',
    address: 'Braga, Portugal',
    phone: '+351 25 345 6789',
    email: 'hello@pinklegion.com',
    employees: 18,
    revenue: 1800000,
    status: 'active',
    description: 'Desenvolvimento de software e soluções digitais'
  },
  {
    id: 4,
    name: 'Papagaio Fotogénico',
    type: 'Marketing',
    address: 'Coimbra, Portugal',
    phone: '+351 23 456 7890',
    email: 'creative@papagaiofotogenico.pt',
    employees: 12,
    revenue: 950000,
    status: 'active',
    description: 'Agência de marketing digital e criativo'
  },
  {
    id: 5,
    name: 'Nuvens Autóctones',
    type: 'Consultoria',
    address: 'Aveiro, Portugal',
    phone: '+351 23 567 8901',
    email: 'contact@nuvensautoctones.pt',
    employees: 8,
    revenue: 650000,
    status: 'active',
    description: 'Consultoria em transformação digital'
  },
  {
    id: 6,
    name: 'ProStoral',
    type: 'Logística',
    address: 'Setúbal, Portugal',
    phone: '+351 26 678 9012',
    email: 'logistics@prostoral.pt',
    employees: 35,
    revenue: 1200000,
    status: 'active',
    description: 'Soluções logísticas e distribuição'
  }
]

const statusConfig = {
  active: { label: 'Ativa', color: 'bg-green-100 text-green-800' },
  inactive: { label: 'Inativa', color: 'bg-red-100 text-red-800' },
  suspended: { label: 'Suspensa', color: 'bg-yellow-100 text-yellow-800' }
}

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Empresas do Grupo</h1>
          <p className="text-gray-600">Gestão das empresas do Grupo AreLuna</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Building2 className="mr-2 h-4 w-4" />
          Nova Empresa
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Empresas
            </CardTitle>
            <Building2 className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{companies.length}</div>
            <p className="text-xs text-green-600">
              Todas ativas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total de Funcionários
            </CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {companies.reduce((sum, company) => sum + company.employees, 0)}
            </div>
            <p className="text-xs text-blue-600">
              Distribuídos por 6 empresas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Receita Total
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(companies.reduce((sum, company) => sum + company.revenue, 0))}
            </div>
            <p className="text-xs text-green-600">
              +15.2% vs ano anterior
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{company.name}</CardTitle>
                  <CardDescription>{company.type}</CardDescription>
                </div>
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[company.status as keyof typeof statusConfig].color}`}>
                  {statusConfig[company.status as keyof typeof statusConfig].label}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{company.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {company.address}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="mr-2 h-4 w-4" />
                  {company.phone}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="mr-2 h-4 w-4" />
                  {company.email}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Funcionários</p>
                  <p className="font-semibold">{company.employees}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Receita Anual</p>
                  <p className="font-semibold">{formatCurrency(company.revenue)}</p>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="mr-2 h-4 w-4" />
                  Ver
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button variant="outline" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}