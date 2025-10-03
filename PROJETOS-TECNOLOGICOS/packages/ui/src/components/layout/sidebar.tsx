'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  Building2, 
  Users, 
  ShoppingCart, 
  Truck, 
  Calendar, 
  FileText, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { cn } from '../../utils/cn'

export interface SidebarItem {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string | number
  children?: SidebarItem[]
}

export interface SidebarProps {
  items: SidebarItem[]
  isCollapsed?: boolean
  onToggleCollapse?: () => void
  className?: string
  user?: {
    name: string
    email: string
    avatar?: string
    role: string
  }
  onLogout?: () => void
}

const defaultItems: SidebarItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard
  },
  {
    id: 'companies',
    label: 'Empresas',
    href: '/companies',
    icon: Building2
  },
  {
    id: 'users',
    label: 'Usuários',
    href: '/users',
    icon: Users
  },
  {
    id: 'intercompany',
    label: 'Intercompany',
    href: '/intercompany',
    icon: ShoppingCart,
    badge: '3'
  },
  {
    id: 'procurement',
    label: 'Compras',
    href: '/procurement',
    icon: ShoppingCart
  },
  {
    id: 'logistics',
    label: 'Logística',
    href: '/logistics',
    icon: Truck
  },
  {
    id: 'clinic',
    label: 'Clínica',
    href: '/clinic',
    icon: Calendar
  },
  {
    id: 'reports',
    label: 'Relatórios',
    href: '/reports',
    icon: FileText
  },
  {
    id: 'settings',
    label: 'Configurações',
    href: '/settings',
    icon: Settings
  }
]

export function Sidebar({
  items = defaultItems,
  isCollapsed = false,
  onToggleCollapse,
  className,
  user,
  onLogout
}: SidebarProps) {
  const pathname = usePathname()

  const sidebarVariants = {
    expanded: { width: 280 },
    collapsed: { width: 80 }
  }

  const contentVariants = {
    expanded: { opacity: 1, x: 0 },
    collapsed: { opacity: 0, x: -10 }
  }

  return (
    <motion.aside
      initial={false}
      animate={isCollapsed ? 'collapsed' : 'expanded'}
      variants={sidebarVariants}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={cn(
        'flex flex-col bg-white border-r border-neutral-200 shadow-sm',
        'dark:bg-neutral-900 dark:border-neutral-700',
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-700">
        <motion.div
          variants={contentVariants}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">AL</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-semibold text-neutral-900 dark:text-neutral-100">
                AreLuna
              </h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                ERP System
              </p>
            </div>
          )}
        </motion.div>
        
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className={cn(
              'p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800',
              'transition-colors duration-200'
            )}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={pathname === item.href || pathname.startsWith(item.href + '/')}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* User Section */}
      {user && (
        <div className="p-4 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
            
            {!isCollapsed && (
              <motion.div
                variants={contentVariants}
                className="flex-1 min-w-0"
              >
                <p className="text-sm font-medium text-neutral-900 dark:text-neutral-100 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {user.role}
                </p>
              </motion.div>
            )}
            
            {onLogout && (
              <button
                onClick={onLogout}
                className={cn(
                  'p-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  'transition-colors duration-200'
                )}
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
              </button>
            )}
          </div>
        </div>
      )}
    </motion.aside>
  )
}

interface SidebarNavItemProps {
  item: SidebarItem
  isActive: boolean
  isCollapsed: boolean
}

function SidebarNavItem({ item, isActive, isCollapsed }: SidebarNavItemProps) {
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all duration-200',
        'hover:bg-neutral-100 dark:hover:bg-neutral-800',
        isActive && [
          'bg-primary-50 text-primary-700 border border-primary-200',
          'dark:bg-primary-900/20 dark:text-primary-300 dark:border-primary-800'
        ],
        !isActive && 'text-neutral-600 dark:text-neutral-400'
      )}
    >
      <Icon className={cn(
        'w-5 h-5 flex-shrink-0',
        isActive ? 'text-primary-600 dark:text-primary-400' : 'text-neutral-500 dark:text-neutral-400'
      )} />
      
      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="flex items-center justify-between flex-1 min-w-0"
        >
          <span className="font-medium truncate">
            {item.label}
          </span>
          
          {item.badge && (
            <span className={cn(
              'px-2 py-0.5 text-xs font-medium rounded-full',
              'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
            )}>
              {item.badge}
            </span>
          )}
        </motion.div>
      )}
    </Link>
  )
}