'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { AlertTriangle, Clock, CheckCircle, Info, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'

// Mock alerts data
const mockAlerts = [
  {
    id: 1,
    type: 'DEADLINE',
    severity: 'HIGH',
    title: 'Declaração IVA em Atraso',
    message: 'ProStoral tem declaração de IVA de Dezembro 2023 em atraso',
    company: 'ProStoral',
    dueDate: new Date('2024-01-20'),
    isOverdue: true,
    actionRequired: true,
  },
  {
    id: 2,
    type: 'EXEMPTION',
    severity: 'MEDIUM',
    title: 'Oportunidade de Renúncia à Isenção',
    message: 'Instituto AreLuna pode renunciar à isenção para deduzir IVA',
    company: 'Instituto AreLuna',
    dueDate: null,
    isOverdue: false,
    actionRequired: false,
  },
  {
    id: 3,
    type: 'GROUP_VAT',
    severity: 'LOW',
    title: 'Elegibilidade para IVA Grupo',
    message: 'Grupo AreLuna cumpre requisitos para regime de IVA Grupo',
    company: 'Vespasian Ventures',
    dueDate: null,
    isOverdue: false,
    actionRequired: false,
  },
  {
    id: 4,
    type: 'THRESHOLD',
    severity: 'MEDIUM',
    title: 'Aproximação do Limite de Isenção',
    message: 'Nuvens Autóctones aproxima-se do limite de €12.500 para isenção',
    company: 'Nuvens Autóctones',
    dueDate: new Date('2024-12-31'),
    isOverdue: false,
    actionRequired: true,
  },
]

const alertTypeLabels: Record<string, string> = {
  DEADLINE: 'Prazo',
  EXEMPTION: 'Isenção',
  GROUP_VAT: 'IVA Grupo',
  THRESHOLD: 'Limite',
}

const severityConfig = {
  HIGH: {
    label: 'Alta',
    color: 'bg-red-100 text-red-800 border-red-200',
    iconColor: 'text-red-600',
    bgColor: 'bg-red-50',
    icon: AlertTriangle,
  },
  MEDIUM: {
    label: 'Média',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    iconColor: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
    icon: Clock,
  },
  LOW: {
    label: 'Baixa',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-50',
    icon: Info,
  },
}

export function VATAlerts() {
  const handleDismissAlert = (alertId: number) => {
    // TODO: Implement alert dismissal
    console.log('Dismissing alert:', alertId)
  }

  const handleTakeAction = (alertId: number) => {
    // TODO: Implement action handling
    console.log('Taking action on alert:', alertId)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Alertas e Notificações
        </CardTitle>
        <Badge variant="outline" className="text-sm">
          {mockAlerts.length} alertas
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {mockAlerts.map((alert, index) => {
          const config = severityConfig[alert.severity as keyof typeof severityConfig]
          const Icon = config.icon
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border ${config.bgColor} ${
                alert.isOverdue ? 'ring-2 ring-red-200' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className={`p-1 rounded ${config.iconColor}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-gray-900">
                        {alert.title}
                      </h4>
                      <Badge className={`text-xs ${config.color}`}>
                        {alertTypeLabels[alert.type]}
                      </Badge>
                      {alert.isOverdue && (
                        <Badge className="text-xs bg-red-100 text-red-800">
                          Em Atraso
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600">
                      {alert.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{alert.company}</span>
                        {alert.dueDate && (
                          <span>
                            Prazo: {formatDate(alert.dueDate)}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {alert.actionRequired && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleTakeAction(alert.id)}
                            className="text-xs"
                          >
                            Ação Necessária
                          </Button>
                        )}
                        
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDismissAlert(alert.id)}
                          className="text-xs p-1 h-6 w-6"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
        
        {mockAlerts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <p className="text-gray-500">Nenhum alerta ativo</p>
            <p className="text-xs text-gray-400 mt-1">
              Todas as obrigações fiscais estão em dia
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}