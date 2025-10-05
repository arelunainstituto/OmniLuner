'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const orders = [
  {
    id: 'IC-2024-001',
    fromCompany: 'Instituto AreLuna',
    toCompany: 'Pinklegion',
    amount: 125000,
    status: 'approved',
    date: '2024-01-15',
    items: 3,
    priority: 'high'
  },
  {
    id: 'IC-2024-002',
    fromCompany: 'ProStoral',
    toCompany: 'Nuvens Autóctones',
    amount: 75000,
    status: 'pending',
    date: '2024-01-14',
    items: 2,
    priority: 'medium'
  },
  {
    id: 'IC-2024-003',
    fromCompany: 'Papagaio Fotogénico',
    toCompany: 'Instituto AreLuna',
    amount: 200000,
    status: 'in_progress',
    date: '2024-01-13',
    items: 5,
    priority: 'high'
  },
  {
    id: 'IC-2024-004',
    fromCompany: 'Vespasian Ventures',
    toCompany: 'ProStoral',
    amount: 50000,
    status: 'rejected',
    date: '2024-01-12',
    items: 1,
    priority: 'low'
  }
]

const statusConfig = {
  pending: { label: 'Pendente', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  approved: { label: 'Aprovado', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  in_progress: { label: 'Em Progresso', color: 'bg-blue-100 text-blue-800', icon: AlertCircle },
  rejected: { label: 'Rejeitado', color: 'bg-red-100 text-red-800', icon: XCircle }
}

const priorityConfig = {
  low: { label: 'Baixa', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Média', color: 'bg-orange-100 text-orange-800' },
  high: { label: 'Alta', color: 'bg-red-100 text-red-800' }
}

export default function IntercompanyPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.fromCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.toCompany.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pedidos Intercompany</h1>
          <p className="text-gray-600">Gestão de pedidos entre empresas do grupo</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Novo Pedido
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por ID, empresa origem ou destino..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Todos os Status</option>
                <option value="pending">Pendente</option>
                <option value="approved">Aprovado</option>
                <option value="in_progress">Em Progresso</option>
                <option value="rejected">Rejeitado</option>
              </select>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders List */}
      <div className="grid gap-4">
        {filteredOrders.map((order) => {
          const StatusIcon = statusConfig[order.status as keyof typeof statusConfig].icon
          return (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        {order.fromCompany} → {order.toCompany}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-semibold text-lg">{formatCurrency(order.amount)}</p>
                      <p className="text-sm text-gray-600">{order.items} itens</p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig[order.status as keyof typeof statusConfig].color}`}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {statusConfig[order.status as keyof typeof statusConfig].label}
                      </div>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${priorityConfig[order.priority as keyof typeof priorityConfig].color}`}>
                        {priorityConfig[order.priority as keyof typeof priorityConfig].label}
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredOrders.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-gray-500">Nenhum pedido encontrado com os filtros aplicados.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}