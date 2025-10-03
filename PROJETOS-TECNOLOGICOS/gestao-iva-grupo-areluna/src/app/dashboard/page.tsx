import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Building2, User, Shield, Settings, FileText, Calendar } from 'lucide-react'

export default function DashboardPage() {
  // Mock user data for demonstration
  const user = {
    name: 'Demo User',
    email: 'demo@areluna.com',
    role: 'ADMIN',
    companyName: 'Vespasian Ventures',
    companyNif: '123456789',
    companyId: 'vespasian-ventures',
    permissions: ['READ', 'WRITE', 'DELETE']
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Gestão IVA - Grupo AreLuna</p>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                User Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-lg">{user.name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-700">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <Badge variant={user.role === 'ADMIN' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Company Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Company</p>
                <p className="text-lg">{user.companyName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">NIF</p>
                <p className="text-sm text-gray-700">{user.companyNif || 'N/A'}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Company ID</p>
                <p className="text-xs text-gray-500">{user.companyId}</p>
              </div>
            </CardContent>
          </Card>

          {/* Permissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Permissions
              </CardTitle>
              <CardDescription>
                Your current access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.permissions && user.permissions.length > 0 ? (
                  user.permissions.map((permission: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No permissions assigned</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks and navigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <Building2 className="w-6 h-6 mb-2" />
                Companies
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Shield className="w-6 h-6 mb-2" />
                VAT Returns
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <User className="w-6 h-6 mb-2" />
                Users
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="w-6 h-6 mb-2" />
                Reports
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Debug Information (only in development) */}
        {process.env.NODE_ENV === 'development' && (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardHeader>
              <CardTitle className="text-yellow-800">Debug Information</CardTitle>
              <CardDescription className="text-yellow-700">
                Development mode only
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="text-xs bg-white p-4 rounded border overflow-auto">
                {JSON.stringify(user, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}