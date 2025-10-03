"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Package, 
  Truck, 
  Clock, 
  MapPin, 
  User, 
  Calendar,
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  XCircle
} from "lucide-react";

interface LogisticsRequest {
  id: string;
  requestNumber: string;
  type: "pickup" | "delivery" | "transport";
  status: "pending" | "assigned" | "in_transit" | "completed" | "cancelled";
  priority: "low" | "medium" | "high" | "urgent";
  origin: string;
  destination: string;
  requestedBy: string;
  assignedDriver?: string;
  vehicle?: string;
  scheduledDate: string;
  estimatedDuration: string;
  description: string;
  weight?: number;
  dimensions?: string;
  specialRequirements?: string;
  createdAt: string;
}

// Mock data
const mockRequests: LogisticsRequest[] = [
  {
    id: "1",
    requestNumber: "LR-2024-001",
    type: "pickup",
    status: "assigned",
    priority: "high",
    origin: "Instituto AreLuna - Sede",
    destination: "Depósito Central",
    requestedBy: "Dr. Maria Silva",
    assignedDriver: "João Santos",
    vehicle: "VAN-001",
    scheduledDate: "2024-01-15T09:00:00Z",
    estimatedDuration: "2h 30min",
    description: "Coleta de equipamentos médicos para manutenção",
    weight: 150,
    dimensions: "120x80x60 cm",
    specialRequirements: "Manuseio cuidadoso - equipamentos sensíveis",
    createdAt: "2024-01-14T10:30:00Z"
  },
  {
    id: "2",
    requestNumber: "LR-2024-002",
    type: "delivery",
    status: "in_transit",
    priority: "medium",
    origin: "Fornecedor ABC",
    destination: "Pinklegion - Oficina",
    requestedBy: "Carlos Oliveira",
    assignedDriver: "Pedro Lima",
    vehicle: "TRUCK-003",
    scheduledDate: "2024-01-15T14:00:00Z",
    estimatedDuration: "3h 15min",
    description: "Entrega de peças automotivas",
    weight: 500,
    dimensions: "200x150x100 cm",
    createdAt: "2024-01-13T16:45:00Z"
  },
  {
    id: "3",
    requestNumber: "LR-2024-003",
    type: "transport",
    status: "pending",
    priority: "urgent",
    origin: "ProStoral - Laboratório",
    destination: "Hospital São Lucas",
    requestedBy: "Dra. Ana Costa",
    scheduledDate: "2024-01-16T08:00:00Z",
    estimatedDuration: "1h 45min",
    description: "Transporte urgente de próteses personalizadas",
    weight: 25,
    dimensions: "60x40x30 cm",
    specialRequirements: "Temperatura controlada, entrega expressa",
    createdAt: "2024-01-15T07:20:00Z"
  },
  {
    id: "4",
    requestNumber: "LR-2024-004",
    type: "pickup",
    status: "completed",
    priority: "low",
    origin: "Nuvens Autóctones - Depósito",
    destination: "Cliente Final",
    requestedBy: "Roberto Mendes",
    assignedDriver: "Lucas Ferreira",
    vehicle: "VAN-002",
    scheduledDate: "2024-01-14T11:00:00Z",
    estimatedDuration: "4h 00min",
    description: "Coleta e entrega de produtos acabados",
    weight: 300,
    dimensions: "180x120x80 cm",
    createdAt: "2024-01-12T09:15:00Z"
  },
  {
    id: "5",
    requestNumber: "LR-2024-005",
    type: "delivery",
    status: "cancelled",
    priority: "medium",
    origin: "Papagaio Fotogênico - Estúdio",
    destination: "Local do Evento",
    requestedBy: "Marina Santos",
    scheduledDate: "2024-01-17T15:30:00Z",
    estimatedDuration: "2h 00min",
    description: "Transporte de equipamentos audiovisuais",
    weight: 200,
    dimensions: "150x100x70 cm",
    specialRequirements: "Equipamentos frágeis - embalagem especial",
    createdAt: "2024-01-14T14:20:00Z"
  }
];

const getStatusBadge = (status: LogisticsRequest["status"]) => {
  const variants = {
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    assigned: "bg-blue-100 text-blue-800 border-blue-200",
    in_transit: "bg-purple-100 text-purple-800 border-purple-200",
    completed: "bg-green-100 text-green-800 border-green-200",
    cancelled: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    pending: "Pendente",
    assigned: "Atribuído",
    in_transit: "Em Trânsito",
    completed: "Concluído",
    cancelled: "Cancelado"
  };

  return (
    <Badge className={`${variants[status]} border`}>
      {labels[status]}
    </Badge>
  );
};

const getPriorityBadge = (priority: LogisticsRequest["priority"]) => {
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

const getTypeIcon = (type: LogisticsRequest["type"]) => {
  switch (type) {
    case "pickup": return <Package className="h-4 w-4" />;
    case "delivery": return <Truck className="h-4 w-4" />;
    case "transport": return <MapPin className="h-4 w-4" />;
    default: return <Package className="h-4 w-4" />;
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

export default function LogisticsRequests() {
  const [requests] = useState<LogisticsRequest[]>(mockRequests);
  const [filteredRequests, setFilteredRequests] = useState<LogisticsRequest[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");



  // Apply filters with useCallback to prevent unnecessary re-renders
  const applyFilters = useCallback(() => {
    let filtered = requests.filter((request: LogisticsRequest) => {
      const matchesSearch = searchTerm === "" || 
        request.requestNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || request.status === statusFilter;
      const matchesPriority = priorityFilter === "all" || request.priority === priorityFilter;
      const matchesType = typeFilter === "all" || request.type === typeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });

    setFilteredRequests(filtered);
  }, [requests, searchTerm, statusFilter, priorityFilter, typeFilter]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const handlePriorityFilterChange = (value: string) => {
    setPriorityFilter(value);
  };

  const handleTypeFilterChange = (value: string) => {
    setTypeFilter(value);
  };

  // Summary statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter((r: LogisticsRequest) => r.status === "pending").length;
  const inTransitRequests = requests.filter((r: LogisticsRequest) => r.status === "in_transit").length;
  const urgentRequests = requests.filter((r: LogisticsRequest) => r.priority === "urgent").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Solicitações</p>
                <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Em Trânsito</p>
                <p className="text-2xl font-bold text-purple-600">{inTransitRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Urgentes</p>
                <p className="text-2xl font-bold text-red-600">{urgentRequests}</p>
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
              <Package className="h-5 w-5" />
              <span>Solicitações Logísticas</span>
            </CardTitle>
            <Button className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Nova Solicitação</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por número, descrição, origem..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="assigned">Atribuído</SelectItem>
                <SelectItem value="in_transit">Em Trânsito</SelectItem>
                <SelectItem value="completed">Concluído</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={handlePriorityFilterChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Prioridade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={handleTypeFilterChange}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="pickup">Coleta</SelectItem>
                <SelectItem value="delivery">Entrega</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requests Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Solicitação</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Prioridade</TableHead>
                  <TableHead>Origem → Destino</TableHead>
                  <TableHead>Solicitante</TableHead>
                  <TableHead>Data Agendada</TableHead>
                  <TableHead>Motorista/Veículo</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{request.requestNumber}</p>
                        <p className="text-sm text-gray-500 truncate max-w-[200px]">
                          {request.description}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(request.type)}
                        <span className="capitalize">
                          {request.type === "pickup" ? "Coleta" : 
                           request.type === "delivery" ? "Entrega" : "Transporte"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>{getPriorityBadge(request.priority)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <MapPin className="h-3 w-3 text-green-600" />
                          <span className="truncate max-w-[120px]">{request.origin}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <MapPin className="h-3 w-3 text-red-600" />
                          <span className="truncate max-w-[120px]">{request.destination}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{request.requestedBy}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{formatDate(request.scheduledDate)}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {request.assignedDriver ? (
                        <div className="space-y-1">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3 text-gray-400" />
                            <span className="text-sm">{request.assignedDriver}</span>
                          </div>
                          {request.vehicle && (
                            <div className="flex items-center space-x-1">
                              <Truck className="h-3 w-3 text-gray-400" />
                              <span className="text-sm">{request.vehicle}</span>
                            </div>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Não atribuído</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Atribuir motorista</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancelar
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8">
              <Package className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                Nenhuma solicitação encontrada
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Tente ajustar os filtros ou criar uma nova solicitação.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}