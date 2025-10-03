'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '@/components/theme-toggle'
import { UserNav } from '@/components/user-nav'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/sobre' },
  { name: 'Projects', href: '/projetos' },
  { name: 'Events', href: '/eventos' },
  { name: 'News', href: '/noticias' },
  { name: 'Contact', href: '/contato' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Instituto AreLuna</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
            >
              {item.name}
            </Link>
          ))}
          <ThemeToggle />
          <UserNav />
        </div>
      </div>
    </nav>
  )
}