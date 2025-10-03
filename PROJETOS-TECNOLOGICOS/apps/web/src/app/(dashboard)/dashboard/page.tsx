import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getTenantFromHeaders } from '@/lib/tenant-server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  const tenant = await getTenantFromHeaders(headers())

  if (!session || !tenant) {
    return null
  }

  // Mock data - in a real app, this would come from your database
  const stats = {
    totalOrders: 142,
    pendingApprovals: 8,
    activeVehicles: 12,
    upcomingAppointments: 24,
  }

  const recentActivities = [
    {
      id: 1,
      type: 'order',
      title: 'New intercompany order created',
      description: 'Order #IC-2024-001 from Pinklegion',
      timestamp: '2 hours ago',
      icon: Icons.building,
    },
    {
      id: 2,
      type: 'approval',
      title: 'Purchase order approved',
      description: 'PO #PO-2024-045 for medical supplies',
      timestamp: '4 hours ago',
      icon: Icons.check,
    },
    {
      id: 3,
      type: 'appointment',
      title: 'Appointment scheduled',
      description: 'Patient consultation for tomorrow',
      timestamp: '6 hours ago',
      icon: Icons.calendar,
    },
    {
      id: 4,
      type: 'vehicle',
      title: 'Vehicle maintenance completed',
      description: 'Fleet vehicle #NV-001 service done',
      timestamp: '1 day ago',
      icon: Icons.truck,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome back, {session.user?.name}
        </h1>
        <p className="text-gray-600">
          Here's what's happening at {tenant.displayName || tenant.name} today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Icons.building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <Icons.alertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Requires attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vehicles</CardTitle>
            <Icons.truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeVehicles}</div>
            <p className="text-xs text-muted-foreground">
              Fleet operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Appointments</CardTitle>
            <Icons.calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
            <p className="text-xs text-muted-foreground">
              Next 7 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates from your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const Icon = activity.icon
                return (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.timestamp}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for your role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              <button className="flex items-center justify-start space-x-3 rounded-lg border p-3 text-left hover:bg-gray-50 transition-colors">
                <Icons.plus className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Create Intercompany Order</p>
                  <p className="text-xs text-gray-500">Start a new order between companies</p>
                </div>
              </button>
              
              <button className="flex items-center justify-start space-x-3 rounded-lg border p-3 text-left hover:bg-gray-50 transition-colors">
                <Icons.calendar className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium">Schedule Appointment</p>
                  <p className="text-xs text-gray-500">Book a new patient consultation</p>
                </div>
              </button>
              
              <button className="flex items-center justify-start space-x-3 rounded-lg border p-3 text-left hover:bg-gray-50 transition-colors">
                <Icons.truck className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">Request Logistics</p>
                  <p className="text-xs text-gray-500">Schedule pickup or delivery</p>
                </div>
              </button>
              
              <button className="flex items-center justify-start space-x-3 rounded-lg border p-3 text-left hover:bg-gray-50 transition-colors">
                <Icons.dollarSign className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium">View Finance Reports</p>
                  <p className="text-xs text-gray-500">Check financial summaries</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}