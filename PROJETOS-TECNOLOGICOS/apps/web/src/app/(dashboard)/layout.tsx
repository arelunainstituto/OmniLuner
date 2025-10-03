import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { headers } from 'next/headers'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getTenantFromHeaders } from '@/lib/tenant-server'
import { DashboardNav } from '@/components/dashboard/nav'
import { DashboardHeader } from '@/components/dashboard/header'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const tenant = await getTenantFromHeaders(headers())
  
  if (!tenant) {
    redirect('/auth/signin')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 overflow-y-auto bg-white border-r">
          <div className="flex items-center flex-shrink-0 px-4">
            <div 
              className="h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold text-sm mr-3"
              style={{ backgroundColor: tenant.primaryColor || '#3b82f6' }}
            >
              {tenant.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {tenant.displayName || tenant.name}
            </h1>
          </div>
          <DashboardNav tenant={tenant} />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader tenant={tenant} />
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}