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
  Truck, 
  Car, 
  Wrench, 
  User, 
  Calendar, 
  MapPin,
  MoreHorizontal,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fuel,
  Gauge
} from "lucide-react";

interface Vehicle {
  id: string;
  plateNumber: string;
  type: "van" | "truck" | "car" | "motorcycle";
  brand: string;
  model: string;
  year: number;
  status: "available" | "in_use" | "maintenance" | "out_of_service";
  currentDriver?: string;
  location: string;
  mileage: number;
  fuelLevel: number;
  lastMaintenance: string;
  nextMaintenance: string;
  maintenanceStatus: "ok" | "due_soon" | "overdue";
  documents: {
    insurance: { valid: boolean; expiryDate: string };
    inspection: { valid: boolean; expiryDate: string };
    license: { valid: boolean; expiryDate: string };
  };
  specifications: {
    capacity: string;
    fuelType: string;
    transmission: string;
  };
}

interface Driver {
  id: string;
  name: string;
  licenseNumber: string;
  licenseCategory: string;
  phone: string;
  status: "available" | "assigned" | "off_duty";
  currentVehicle?: string;
  rating: number;
  totalTrips: number;
  joinDate: string;
}

// Mock data for vehicles
const mockVehicles: Vehicle[] = [
  {
    id: "1",
    plateNumber: "ABC-1234",
    type: "van",
    brand: "Ford",
    model: "Transit",
    year: 2022,
    status: "in_use",
    currentDriver: "João Santos",
    location: "Instituto AreLuna - Sede",
    mileage: 45000,
    fuelLevel: 75,
    lastMaintenance: "2024-01-01",
    nextMaintenance: "2024-04-01",
    maintenanceStatus: "ok",
    documents: {
      insurance: { valid: true, expiryDate: "2024-12-31" },
      inspection: { valid: true, expiryDate: "2024-06-30" },
      license: { valid: true, expiryDate: "2024-08-15" }
    },
    specifications: {
      capacity: "1.5 toneladas",
      fuelType: "Diesel",
      transmission: "Manual"
    }
  },
  {
    id: "2",
    plateNumber: "DEF-5678",
    type: "truck",
    brand: "Mercedes",
    model: "Sprinter",
    year: 2021,
    status: "available",
    location: "Depósito Central",
    mileage: 78000,
    fuelLevel: 45,
    lastMaintenance: "2023-12-15",
    nextMaintenance: "2024-02-15",
    maintenanceStatus: "due_soon",
    documents: {
      insurance: { valid: true, expiryDate: "2024-11-20" },
      inspection: { valid: true, expiryDate: "2024-05-10" },
      license: { valid: true, expiryDate: "2024-07-22" }
    },
    specifications: {
      capacity: "3.5 toneladas",
      fuelType: "Diesel",
      transmission: "Automático"
    }
  },
  {
    id: "3",
    plateNumber: "GHI-9012",
    type: "car",
    brand: "Toyota",
    model: "Corolla",
    year: 2023,
    status: "maintenance",
    location: "Oficina Autorizada",
    mileage: 25000,
    fuelLevel: 20,
    lastMaintenance: "2024-01-10",
    nextMaintenance: "2024-07-10",
    maintenanceStatus: "ok",
    documents: {
      insurance: { valid: true, expiryDate: "2024-10-15" },
      inspection: { valid: false, expiryDate: "2024-01-05" },
      license: { valid: true, expiryDate: "2024-09-30" }
    },
    specifications: {
      capacity: "500 kg",
      fuelType: "Flex",
      transmission: "Automático"
    }
  },
  {
    id: "4",
    plateNumber: "JKL-3456",
    type: "van",
    brand: "Volkswagen",
    model: "Crafter",
    year: 2020,
    status: "out_of_service",
    location: "Pátio - Aguardando Reparo",
    mileage: 95000,
    fuelLevel: 10,
    lastMaintenance: "2023-11-20",
    nextMaintenance: "2024-01-20",
    maintenanceStatus: "overdue",
    documents: {
      insurance: { valid: true, expiryDate: "2024-09-12" },
      inspection: { valid: true, expiryDate: "2024-03-18" },
      license: { valid: true, expiryDate: "2024-06-05" }
    },
    specifications: {
      capacity: "2.0 toneladas",
      fuelType: "Diesel",
      transmission: "Manual"
    }
  }
];

// Mock data for drivers
const mockDrivers: Driver[] = [
  {
    id: "1",
    name: "João Santos",
    licenseNumber: "12345678901",
    licenseCategory: "D",
    phone: "(11) 99999-1111",
    status: "assigned",
    currentVehicle: "ABC-1234",
    rating: 4.8,
    totalTrips: 245,
    joinDate: "2022-03-15"
  },
  {
    id: "2",
    name: "Pedro Lima",
    licenseNumber: "23456789012",
    licenseCategory: "C",
    phone: "(11) 99999-2222",
    status: "available",
    rating: 4.6,
    totalTrips: 189,
    joinDate: "2022-07-20"
  },
  {
    id: "3",
    name: "Lucas Ferreira",
    licenseNumber: "34567890123",
    licenseCategory: "B",
    phone: "(11) 99999-3333",
    status: "off_duty",
    rating: 4.9,
    totalTrips: 312,
    joinDate: "2021-11-10"
  }
];

const getStatusBadge = (status: Vehicle["status"]) => {
  const variants = {
    available: "bg-green-100 text-green-800 border-green-200",
    in_use: "bg-blue-100 text-blue-800 border-blue-200",
    maintenance: "bg-yellow-100 text-yellow-800 border-yellow-200",
    out_of_service: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    available: "Disponível",
    in_use: "Em Uso",
    maintenance: "Manutenção",
    out_of_service: "Fora de Serviço"
  };

  return (
    <Badge className={`${variants[status]} border`}>
      {labels[status]}
    </Badge>
  );
};

const getMaintenanceStatusBadge = (status: Vehicle["maintenanceStatus"]) => {
  const variants = {
    ok: "bg-green-100 text-green-800 border-green-200",
    due_soon: "bg-yellow-100 text-yellow-800 border-yellow-200",
    overdue: "bg-red-100 text-red-800 border-red-200"
  };

  const labels = {
    ok: "Em Dia",
    due_soon: "Vence em Breve",
    overdue: "Vencida"
  };

  return (
    <Badge className={`${variants[status]} border`}>
      {labels[status]}
    </Badge>
  );
};

const getDriverStatusBadge = (status: Driver["status"]) => {
  const variants = {
    available: "bg-green-100 text-green-800 border-green-200",
    assigned: "bg-blue-100 text-blue-800 border-blue-200",
    off_duty: "bg-gray-100 text-gray-800 border-gray-200"
  };

  const labels = {
    available: "Disponível",
    assigned: "Atribuído",
    off_duty: "Folga"
  };

  return (
    <Badge className={`${variants[status]} border`}>
      {labels[status]}
    </Badge>
  );
};

const getVehicleIcon = (type: Vehicle["type"]) => {
  const icons = {
    van: Truck,
    truck: Truck,
    car: Car,
    motorcycle: Car // Using Car icon for motorcycle as well
  };
  
  const Icon = icons[type];
  return <Icon className="h-4 w-4" />;
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR");
};

export default function FleetManagement() {
  const [vehicles] = useState<Vehicle[]>(mockVehicles);
  const [drivers] = useState<Driver[]>(mockDrivers);
  const [currentView, setCurrentView] = useState<"vehicles" | "drivers">("vehicles");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
  };

  const filteredVehicles = statusFilter === "all" 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.status === statusFilter);

  const filteredDrivers = statusFilter === "all" 
    ? drivers 
    : drivers.filter(driver => driver.status === statusFilter);

  // Summary statistics
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === "available").length;
  const inUseVehicles = vehicles.filter(v => v.status === "in_use").length;
  const maintenanceVehicles = vehicles.filter(v => v.status === "maintenance" || v.maintenanceStatus === "overdue").length;

  const totalDrivers = drivers.length;
  const availableDrivers = drivers.filter(d => d.status === "available").length;
  const assignedDrivers = drivers.filter(d => d.status === "assigned").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Veículos</p>
                <p className="text-2xl font-bold text-gray-900">{totalVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Disponíveis</p>
                <p className="text-2xl font-bold text-green-600">{availableVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Em Uso</p>
                <p className="text-2xl font-bold text-blue-600">{inUseVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Manutenção</p>
                <p className="text-2xl font-bold text-red-600">{maintenanceVehicles}</p>
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
              <Truck className="h-5 w-5" />
              <span>Gestão de Frota</span>
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Select value={currentView} onValueChange={(value: "vehicles" | "drivers") => setCurrentView(value)}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vehicles">Veículos</SelectItem>
                  <SelectItem value="drivers">Motoristas</SelectItem>
                </SelectContent>
              </Select>
              <Button className="flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>{currentView === "vehicles" ? "Novo Veículo" : "Novo Motorista"}</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                {currentView === "vehicles" ? (
                  <>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="in_use">Em Uso</SelectItem>
                    <SelectItem value="maintenance">Manutenção</SelectItem>
                    <SelectItem value="out_of_service">Fora de Serviço</SelectItem>
                  </>
                ) : (
                  <>
                    <SelectItem value="available">Disponível</SelectItem>
                    <SelectItem value="assigned">Atribuído</SelectItem>
                    <SelectItem value="off_duty">Folga</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Vehicles Table */}
          {currentView === "vehicles" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Veículo</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Motorista Atual</TableHead>
                    <TableHead>Localização</TableHead>
                    <TableHead>Quilometragem</TableHead>
                    <TableHead>Combustível</TableHead>
                    <TableHead>Manutenção</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredVehicles.map((vehicle) => (
                    <TableRow key={vehicle.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getVehicleIcon(vehicle.type)}
                          <div>
                            <p className="font-medium">{vehicle.plateNumber}</p>
                            <p className="text-sm text-gray-500">
                              {vehicle.brand} {vehicle.model} ({vehicle.year})
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(vehicle.status)}</TableCell>
                      <TableCell>
                        {vehicle.currentDriver ? (
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{vehicle.currentDriver}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Não atribuído</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{vehicle.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Gauge className="h-4 w-4 text-gray-400" />
                          <span className="text-sm">{vehicle.mileage.toLocaleString()} km</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Fuel className="h-4 w-4 text-gray-400" />
                          <div className="flex items-center space-x-2">
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${
                                  vehicle.fuelLevel > 50 ? 'bg-green-500' : 
                                  vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                                style={{ width: `${vehicle.fuelLevel}%` }}
                              />
                            </div>
                            <span className="text-sm">{vehicle.fuelLevel}%</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {getMaintenanceStatusBadge(vehicle.maintenanceStatus)}
                          <p className="text-xs text-gray-500">
                            Próxima: {formatDate(vehicle.nextMaintenance)}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Atribuir Motorista</DropdownMenuItem>
                            <DropdownMenuItem>Agendar Manutenção</DropdownMenuItem>
                            <DropdownMenuItem>Histórico</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Drivers Table */}
          {currentView === "drivers" && (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Motorista</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Habilitação</TableHead>
                    <TableHead>Veículo Atual</TableHead>
                    <TableHead>Avaliação</TableHead>
                    <TableHead>Viagens</TableHead>
                    <TableHead>Contato</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDrivers.map((driver) => (
                    <TableRow key={driver.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <User className="h-8 w-8 bg-gray-100 rounded-full p-2" />
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-gray-500">
                              Desde {formatDate(driver.joinDate)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getDriverStatusBadge(driver.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm font-medium">Categoria {driver.licenseCategory}</p>
                          <p className="text-xs text-gray-500">{driver.licenseNumber}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {driver.currentVehicle ? (
                          <div className="flex items-center space-x-2">
                            <Truck className="h-4 w-4 text-gray-400" />
                            <span className="text-sm">{driver.currentVehicle}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">Não atribuído</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <span className="text-sm font-medium">{driver.rating}</span>
                          <span className="text-yellow-400">★</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{driver.totalTrips} viagens</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{driver.phone}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Ver Perfil</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Atribuir Veículo</DropdownMenuItem>
                            <DropdownMenuItem>Histórico de Viagens</DropdownMenuItem>
                            <DropdownMenuItem>Documentos</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {((currentView === "vehicles" && filteredVehicles.length === 0) || 
            (currentView === "drivers" && filteredDrivers.length === 0)) && (
            <div className="text-center py-8">
              {currentView === "vehicles" ? (
                <Truck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              ) : (
                <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              )}
              <p className="text-gray-500">
                Nenhum {currentView === "vehicles" ? "veículo" : "motorista"} encontrado
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}