"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Truck,
  Package,
  Calendar,
  BarChart3,
  MapPin,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  Navigation,
  Fuel,
  Plus
} from "lucide-react";

// Import logistics components
import LogisticsRequests from "@/components/logistics/logistics-requests";
import FleetManagement from "@/components/logistics/fleet-management";
import DeliveryScheduling from "@/components/logistics/delivery-scheduling";
import LogisticsAnalytics from "@/components/logistics/logistics-analytics";

type LogisticsView = "overview" | "requests" | "fleet" | "scheduling" | "analytics";

interface LogisticsHeaderProps {
  currentView: LogisticsView;
  onViewChange: (view: LogisticsView) => void;
}

const LogisticsHeader = ({ currentView, onViewChange }: LogisticsHeaderProps) => {
  const viewOptions = [
    { value: "overview", label: "Visão Geral", icon: BarChart3 },
    { value: "requests", label: "Solicitações", icon: Package },
    { value: "fleet", label: "Frota", icon: Truck },
    { value: "scheduling", label: "Agendamentos", icon: Calendar },
    { value: "analytics", label: "Analytics", icon: BarChart3 }
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Logística & Frota</h1>
        <p className="text-gray-600">Gestão completa de logística e veículos</p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Select value={currentView} onValueChange={(value: LogisticsView) => onViewChange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {viewOptions.map((option) => {
              const Icon = option.icon;
              return (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{option.label}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Nova Solicitação</span>
        </Button>
      </div>
    </div>
  );
};

const LogisticsOverview = () => {
  // Mock data for overview
  const overviewStats = {
    activeRequests: 23,
    scheduledDeliveries: 15,
    activeVehicles: 18,
    totalDrivers: 12,
    onTimeDeliveries: 92.5,
    fuelEfficiency: 8.2,
    maintenanceAlerts: 3,
    routeOptimization: 87
  };

  const recentActivities = [
    {
      id: "1",
      type: "delivery",
      message: "Entrega DEL-2024-001 concluída com sucesso",
      time: "há 15 min",
      status: "success"
    },
    {
      id: "2",
      type: "maintenance",
      message: "Manutenção preventiva agendada para VAN-002",
      time: "há 30 min",
      status: "info"
    },
    {
      id: "3",
      type: "alert",
      message: "Atraso detectado na rota TRUCK-001",
      time: "há 45 min",
      status: "warning"
    },
    {
      id: "4",
      type: "request",
      message: "Nova solicitação de transporte criada",
      time: "há 1h",
      status: "info"
    }
  ];

  const upcomingDeliveries = [
    {
      id: "1",
      deliveryNumber: "DEL-2024-005",
      customer: "Instituto AreLuna",
      scheduledTime: "14:30",
      driver: "João Santos",
      vehicle: "VAN-001",
      status: "scheduled"
    },
    {
      id: "2",
      deliveryNumber: "DEL-2024-006",
      customer: "Pinklegion",
      scheduledTime: "16:00",
      driver: "Pedro Lima",
      vehicle: "TRUCK-003",
      status: "in_progress"
    },
    {
      id: "3",
      deliveryNumber: "DEL-2024-007",
      customer: "ProStoral",
      scheduledTime: "17:15",
      driver: "Lucas Ferreira",
      vehicle: "VAN-002",
      status: "scheduled"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Solicitações Ativas</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.activeRequests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Entregas Agendadas</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.scheduledDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Veículos Ativos</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.activeVehicles}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">Motoristas</p>
                <p className="text-2xl font-bold text-gray-900">{overviewStats.totalDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pontualidade</p>
                <p className="text-2xl font-bold text-green-600">{overviewStats.onTimeDeliveries}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Eficiência Combustível</p>
                <p className="text-2xl font-bold text-blue-600">{overviewStats.fuelEfficiency} km/l</p>
              </div>
              <Fuel className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Alertas Manutenção</p>
                <p className="text-2xl font-bold text-orange-600">{overviewStats.maintenanceAlerts}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Otimização Rotas</p>
                <p className="text-2xl font-bold text-purple-600">{overviewStats.routeOptimization}%</p>
              </div>
              <Navigation className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Atividades Recentes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50">
                  <div className={`p-2 rounded-full ${
                    activity.status === "success" ? "bg-green-100" :
                    activity.status === "warning" ? "bg-orange-100" :
                    "bg-blue-100"
                  }`}>
                    {activity.type === "delivery" && <Package className="h-4 w-4 text-green-600" />}
                    {activity.type === "maintenance" && <Truck className="h-4 w-4 text-blue-600" />}
                    {activity.type === "alert" && <AlertTriangle className="h-4 w-4 text-orange-600" />}
                    {activity.type === "request" && <MapPin className="h-4 w-4 text-blue-600" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Próximas Entregas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeliveries.map((delivery) => (
                <div key={delivery.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm">{delivery.deliveryNumber}</span>
                      <Badge className={
                        delivery.status === "scheduled" 
                          ? "bg-blue-100 text-blue-800 border-blue-200"
                          : "bg-purple-100 text-purple-800 border-purple-200"
                      }>
                        {delivery.status === "scheduled" ? "Agendado" : "Em Andamento"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{delivery.customer}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{delivery.scheduledTime}</span>
                      <span>{delivery.driver}</span>
                      <span>{delivery.vehicle}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Rastrear
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function LogisticsPage() {
  const [currentView, setCurrentView] = useState<LogisticsView>("overview");

  const handleViewChange = (view: LogisticsView) => {
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case "overview":
        return <LogisticsOverview />;
      case "requests":
        return <LogisticsRequests />;
      case "fleet":
        return <FleetManagement />;
      case "scheduling":
        return <DeliveryScheduling />;
      case "analytics":
        return <LogisticsAnalytics />;
      default:
        return <LogisticsOverview />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <LogisticsHeader 
        currentView={currentView}
        onViewChange={handleViewChange}
      />
      {renderContent()}
    </div>
  );
}