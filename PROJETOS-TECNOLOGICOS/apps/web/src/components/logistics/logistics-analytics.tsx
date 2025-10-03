"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Truck,
  Clock,
  MapPin,
  Fuel,
  Users,
  Package,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign
} from "lucide-react";

// Mock data for analytics
const deliveryPerformanceData = [
  { month: "Jan", entregas: 145, pontualidade: 92, custoMedio: 85 },
  { month: "Fev", entregas: 158, pontualidade: 89, custoMedio: 88 },
  { month: "Mar", entregas: 167, pontualidade: 94, custoMedio: 82 },
  { month: "Abr", entregas: 142, pontualidade: 87, custoMedio: 90 },
  { month: "Mai", entregas: 189, pontualidade: 96, custoMedio: 78 },
  { month: "Jun", entregas: 201, pontualidade: 93, custoMedio: 81 }
];

const fleetUtilizationData = [
  { vehicle: "VAN-001", utilizacao: 85, km: 2450, combustivel: 320 },
  { vehicle: "VAN-002", utilizacao: 78, km: 2180, combustivel: 285 },
  { vehicle: "TRUCK-001", utilizacao: 92, km: 3200, combustivel: 480 },
  { vehicle: "TRUCK-002", utilizacao: 67, km: 1890, combustivel: 275 },
  { vehicle: "TRUCK-003", utilizacao: 88, km: 2980, combustivel: 445 },
  { vehicle: "MOTO-001", utilizacao: 95, km: 1250, combustivel: 85 }
];

const deliveryStatusData = [
  { name: "Concluídas", value: 847, color: "#10b981" },
  { name: "Em Andamento", value: 23, color: "#8b5cf6" },
  { name: "Atrasadas", value: 12, color: "#f59e0b" },
  { name: "Canceladas", value: 8, color: "#ef4444" }
];

const routeEfficiencyData = [
  { day: "Seg", distanciaReal: 245, distanciaOtima: 220, economia: 25 },
  { day: "Ter", distanciaReal: 198, distanciaOtima: 185, economia: 13 },
  { day: "Qua", distanciaReal: 267, distanciaOtima: 240, economia: 27 },
  { day: "Qui", distanciaReal: 189, distanciaOtima: 175, economia: 14 },
  { day: "Sex", distanciaReal: 234, distanciaOtima: 210, economia: 24 },
  { day: "Sáb", distanciaReal: 156, distanciaOtima: 145, economia: 11 }
];

const driverPerformanceData = [
  { driver: "João Santos", entregas: 45, pontualidade: 96, avaliacaoCliente: 4.8, kmRodados: 1250 },
  { driver: "Pedro Lima", entregas: 38, pontualidade: 89, avaliacaoCliente: 4.6, kmRodados: 1180 },
  { driver: "Lucas Ferreira", entregas: 42, pontualidade: 94, avaliacaoCliente: 4.9, kmRodados: 1320 },
  { driver: "Carlos Silva", entregas: 35, pontualidade: 87, avaliacaoCliente: 4.5, kmRodados: 980 },
  { driver: "Roberto Costa", entregas: 40, pontualidade: 92, avaliacaoCliente: 4.7, kmRodados: 1150 }
];

const maintenanceCostData = [
  { month: "Jan", preventiva: 2400, corretiva: 1200, combustivel: 8500 },
  { month: "Fev", preventiva: 1800, corretiva: 2100, combustivel: 9200 },
  { month: "Mar", preventiva: 2200, corretiva: 800, combustivel: 8800 },
  { month: "Abr", preventiva: 2600, corretiva: 1500, combustivel: 7900 },
  { month: "Mai", preventiva: 1900, corretiva: 900, combustivel: 9800 },
  { month: "Jun", preventiva: 2300, corretiva: 1100, combustivel: 9400 }
];

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
}

const MetricCard = ({ title, value, change, icon: Icon, color }: MetricCardProps) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change !== undefined && (
            <div className="flex items-center mt-1">
              {change >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
              )}
              <span className={`text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(change)}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function LogisticsAnalytics() {
  const [timeRange, setTimeRange] = useState("6months");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics de Logística</h2>
          <p className="text-gray-600">Métricas de performance e insights operacionais</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Último mês</SelectItem>
            <SelectItem value="3months">Últimos 3 meses</SelectItem>
            <SelectItem value="6months">Últimos 6 meses</SelectItem>
            <SelectItem value="1year">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Entregas Totais"
          value="1,102"
          change={12}
          icon={Package}
          color="bg-blue-600"
        />
        <MetricCard
          title="Taxa de Pontualidade"
          value="92.5%"
          change={3}
          icon={Clock}
          color="bg-green-600"
        />
        <MetricCard
          title="Frota Ativa"
          value="24"
          change={0}
          icon={Truck}
          color="bg-purple-600"
        />
        <MetricCard
          title="Custo por Entrega"
          value="R$ 82"
          change={-5}
          icon={DollarSign}
          color="bg-orange-600"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delivery Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance de Entregas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={deliveryPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="entregas"
                  stackId="1"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fleet Utilization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Utilização da Frota</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={fleetUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="vehicle" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="utilizacao" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Delivery Status Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Status das Entregas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={deliveryStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {deliveryStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Route Efficiency */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Eficiência de Rotas</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={routeEfficiencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="distanciaReal"
                  stroke="#ef4444"
                  strokeWidth={2}
                  name="Distância Real"
                />
                <Line
                  type="monotone"
                  dataKey="distanciaOtima"
                  stroke="#10b981"
                  strokeWidth={2}
                  name="Distância Ótima"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Driver Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Performance dos Motoristas</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Motorista</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Entregas</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Pontualidade</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Avaliação</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Km Rodados</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {driverPerformanceData.map((driver, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{driver.driver}</td>
                    <td className="py-3 px-4">{driver.entregas}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span>{driver.pontualidade}%</span>
                        {driver.pontualidade >= 90 ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-orange-600" />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-1">
                        <span>{driver.avaliacaoCliente}</span>
                        <span className="text-yellow-500">★</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">{driver.kmRodados.toLocaleString()} km</td>
                    <td className="py-3 px-4">
                      <Badge className={
                        driver.pontualidade >= 90 
                          ? "bg-green-100 text-green-800 border-green-200" 
                          : "bg-orange-100 text-orange-800 border-orange-200"
                      }>
                        {driver.pontualidade >= 90 ? "Excelente" : "Atenção"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Maintenance Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Fuel className="h-5 w-5" />
            <span>Custos Operacionais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={maintenanceCostData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`R$ ${value}`, ""]} />
              <Bar dataKey="preventiva" stackId="a" fill="#10b981" name="Manutenção Preventiva" />
              <Bar dataKey="corretiva" stackId="a" fill="#f59e0b" name="Manutenção Corretiva" />
              <Bar dataKey="combustivel" stackId="a" fill="#3b82f6" name="Combustível" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}