"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Truck, 
  User, 
  Route,
  MoreHorizontal,
  Plus,
  ChevronLeft,
  ChevronRight,
  Navigation,
  Timer,
  Package
} from "lucide-react";

interface ScheduledDelivery {
  id: string;
  deliveryNumber: string;
  type: "pickup" | "delivery" | "round_trip";
  status: "scheduled" | "in_progress" | "completed" | "delayed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  customer: string;
  origin: string;
  destination: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number; // in minutes
  actualStartTime?: string;
  actualEndTime?: string;
  driver: string;
  vehicle: string;
  route: {
    distance: number; // in km
    estimatedTime: number; // in minutes
    optimized: boolean;
  };
  items: {
    description: string;
    quantity: number;
    weight: number;
  }[];
  specialInstructions?: string;
  contactPerson: string;
  contactPhone: string;
}

// Mock data for scheduled deliveries
const mockDeliveries: ScheduledDelivery[] = [
  {
    id: "1",
    deliveryNumber: "DEL-2024-001",
    type: "delivery",
    status: "scheduled",
    priority: "high",
    customer: "Instituto AreLuna",
    origin: "Depósito Central",
    destination: "Instituto AreLuna - Sede",
    scheduledDate: "2024-01-15",
    scheduledTime: "09:00",
    estimatedDuration: 120,
    driver: "João Santos",
    vehicle: "VAN-001",
    route: {
      distance: 25.5,
      estimatedTime: 45,
      optimized: true
    },
    items: [
      { description: "Equipamentos médicos", quantity: 3, weight: 150 },
      { description: "Suprimentos", quantity: 10, weight: 50 }
    ],
    specialInstructions: "Entregar na recepção principal",
    contactPerson: "Dr. Maria Silva",
    contactPhone: "(11) 99999-1111"
  },
  {
    id: "2",
    deliveryNumber: "DEL-2024-002",
    type: "pickup",
    status: "in_progress",
    priority: "medium",
    customer: "Pinklegion",
    origin: "Pinklegion - Oficina",
    destination: "Fornecedor ABC",
    scheduledDate: "2024-01-15",
    scheduledTime: "14:00",
    estimatedDuration: 180,
    actualStartTime: "14:15",
    driver: "Pedro Lima",
    vehicle: "TRUCK-003",
    route: {
      distance: 42.3,
      estimatedTime: 65,
      optimized: true
    },
    items: [
      { description: "Peças automotivas", quantity: 25, weight: 300 }
    ],
    contactPerson: "Carlos Oliveira",
    contactPhone: "(11) 99999-2222"
  },
  {
    id: "3",
    deliveryNumber: "DEL-2024-003",
    type: "round_trip",
    status: "delayed",
    priority: "urgent",
    customer: "ProStoral",
    origin: "ProStoral - Lab",
    destination: "Hospital São Lucas",
    scheduledDate: "2024-01-15",
    scheduledTime: "16:30",
    estimatedDuration: 90,
    actualStartTime: "17:00",
    driver: "Lucas Ferreira",
    vehicle: "VAN-002",
    route: {
      distance: 18.7,
      estimatedTime: 35,
      optimized: false
    },
    items: [
      { description: "Próteses personalizadas", quantity: 2, weight: 15 }
    ],
    specialInstructions: "Entrega urgente - temperatura controlada",
    contactPerson: "Dra. Ana Costa",
    contactPhone: "(11) 99999-3333"
  },
  {
    id: "4",
    deliveryNumber: "DEL-2024-004",
    type: "delivery",
    status: "completed",
    priority: "low",
    customer: "Nuvens Autóctones",
    origin: "Nuvens Autóctones",
    destination: "Cliente Final",
    scheduledDate: "2024-01-14",
    scheduledTime: "11:00",
    estimatedDuration: 240,
    actualStartTime: "11:00",
    actualEndTime: "15:30",
    driver: "João Santos",
    vehicle: "VAN-001",
    route: {
      distance: 85.2,
      estimatedTime: 120,
      optimized: true
    },
    items: [
      { description: "Produtos acabados", quantity: 50, weight: 400 }
    ],
    contactPerson: "Roberto Mendes",
    contactPhone: "(11) 99999-4444"
  }
];

const getStatusBadge = (status: ScheduledDelivery["status"]) => {
  const variants = {
    scheduled: "bg-blue-100 text-blue-800 border-blue-200",
    in_progress: "bg-purple-100 text-purple-800 border-purple-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    delayed: "bg-orange-100 text-orange-800 border-orange-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    scheduled: "Agendado",
    in_progress: "Em Andamento",
    completed: "Concluído",
    delayed: "Atrasado",
    cancelled: "Cancelado"
  };

  return (
    <Badge className={`${variants[status]} border`}>
      {labels[status]}
    </Badge>
  );
};

const getPriorityBadge = (priority: ScheduledDelivery["priority"]) => {
  const variants = {
    low: "bg-gray-100 text-gray-800 border-gray-200",
    medium: "bg-blue-100 text-blue-800 border-blue-200",
    high: "bg-orange-100 text-orange-800 border-orange-200",
    urgent: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    low: "Baixa",
    medium: "Média",
    high: "Alta",
    urgent: "Urgente"
  };

  return (
    <Badge className={`${variants[priority]} border`}>
      {labels[priority]}
    </Badge>
  );
};

const getTypeIcon = (type: ScheduledDelivery["type"]) => {
  const icons = {
    pickup: Package,
    delivery: Truck,
    round_trip: Route
  };
  
  const Icon = icons[type];
  return <Icon className="h-4 w-4" />;
};

const formatTime = (time: string) => {
  return time.substring(0, 5); // Remove seconds if present
};

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}min` : `${mins}min`;
};

export default function DeliveryScheduling() {
  const [deliveries] = useState<ScheduledDelivery[]>(mockDeliveries);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Get deliveries for current date
  const currentDateString = currentDate.toISOString().split('T')[0];
  const todayDeliveries = deliveries.filter(delivery => 
    delivery.scheduledDate === currentDateString &&
    (statusFilter === "all" || delivery.status === statusFilter)
  );

  // Calendar navigation
  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    setCurrentDate(newDate);
  };

  // Summary statistics for today
  const todayStats = {
    total: todayDeliveries.length,
    scheduled: todayDeliveries.filter(d => d.status === "scheduled").length,
    inProgress: todayDeliveries.filter(d => d.status === "in_progress").length,
    completed: todayDeliveries.filter(d => d.status === "completed").length,
    delayed: todayDeliveries.filter(d => d.status === "delayed").length
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Hoje</p>
                <p className="text-2xl font-bold text-gray-900">{todayStats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Agendados</p>
                <p className="text-2xl font-bold text-blue-600">{todayStats.scheduled}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Navigation className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                <p className="text-2xl font-bold text-purple-600">{todayStats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">{todayStats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Timer className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Atrasados</p>
                <p className="text-2xl font-bold text-orange-600">{todayStats.delayed}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Agendamento de Entregas</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={viewMode} onValueChange={(value: "calendar" | "list") => setViewMode(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="calendar">Calendário</SelectItem>
                  <SelectItem value="list">Lista</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Agendar</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Date Navigation and Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("prev")}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold min-w-[200px] text-center">
                  {currentDate.toLocaleDateString("pt-BR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigateDate("next")}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
              >
                Hoje
              </Button>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos Status</SelectItem>
                <SelectItem value="scheduled">Agendado</SelectItem>
                <SelectItem value="in_progress">Em Andamento</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="delayed">Atrasado</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Deliveries List */}
          <div className="space-y-4">
            {todayDeliveries.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Nenhuma entrega agendada para esta data</p>
              </div>
            ) : (
              todayDeliveries
                .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime))
                .map((delivery) => (
                  <Card key={delivery.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(delivery.type)}
                              <span className="font-semibold">{delivery.deliveryNumber}</span>
                            </div>
                            {getStatusBadge(delivery.status)}
                            {getPriorityBadge(delivery.priority)}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="font-medium">
                                  {formatTime(delivery.scheduledTime)}
                                </span>
                                <span className="text-gray-500">
                                  ({formatDuration(delivery.estimatedDuration)})
                                </span>
                              </div>
                              {delivery.actualStartTime && (
                                <div className="flex items-center space-x-2 text-sm text-purple-600">
                                  <Timer className="h-4 w-4" />
                                  <span>Iniciado: {formatTime(delivery.actualStartTime)}</span>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium">{delivery.origin}</p>
                                  <p className="text-gray-500">→ {delivery.destination}</p>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2 text-sm">
                                <User className="h-4 w-4 text-gray-400" />
                                <div>
                                  <p className="font-medium">{delivery.driver}</p>
                                  <p className="text-gray-500">{delivery.vehicle}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <Route className="h-4 w-4" />
                              <span>{delivery.route.distance} km</span>
                              {delivery.route.optimized && (
                                <Badge variant="outline" className="text-xs">
                                  Otimizada
                                </Badge>
                              )}
                            </div>
                            <div>
                              <span className="font-medium">{delivery.customer}</span>
                            </div>
                            <div>
                              <span>{delivery.contactPerson} - {delivery.contactPhone}</span>
                            </div>
                          </div>

                          {delivery.specialInstructions && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-2">
                              <p className="text-sm text-yellow-800">
                                <strong>Instruções especiais:</strong> {delivery.specialInstructions}
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Rastrear
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                              <DropdownMenuItem>Editar Agendamento</DropdownMenuItem>
                              <DropdownMenuItem>Otimizar Rota</DropdownMenuItem>
                              <DropdownMenuItem>Contatar Cliente</DropdownMenuItem>
                              {delivery.status === "scheduled" && (
                                <>
                                  <DropdownMenuItem>Iniciar Entrega</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">
                                    Cancelar
                                  </DropdownMenuItem>
                                </>
                              )}
                              {delivery.status === "in_progress" && (
                                <DropdownMenuItem className="text-green-600">
                                  Marcar como Concluído
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}