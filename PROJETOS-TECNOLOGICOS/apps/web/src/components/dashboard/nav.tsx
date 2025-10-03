'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Icons } from '@/components/ui/icons'
import { Tenant } from '@/lib/tenant'

interface DashboardNavProps {
  tenant: Tenant
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Icons.home,
  },
  {
    name: 'Intercompany',
    href: '/intercompany',
    icon: Icons.building,
  },
  {
    name: 'Finance',
    href: '/finance',
    icon: Icons.dollarSign,
  },
  {
    name: 'Logistics',
    href: '/logistics',
    icon: Icons.truck,
  },
  {
    name: 'Clinic',
    href: '/clinic',
    icon: Icons.calendar,
  },
  {
    name: 'Users',
    href: '/users',
    icon: Icons.users,
  },
]

export function DashboardNav({ tenant }: DashboardNavProps) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 space-y-1 px-3 py-4">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            )}
          >
            <Icon
              className={cn(
                'mr-3 h-5 w-5 flex-shrink-0',
                isActive
                  ? 'text-blue-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              )}
            />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}