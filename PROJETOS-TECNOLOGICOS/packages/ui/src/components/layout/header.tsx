'use client'

import React from 'react'

export interface HeaderProps {
  title?: string
  subtitle?: string
  actions?: React.ReactElement[]
  className?: string
  showBreadcrumb?: boolean
  breadcrumbItems?: Array<{
    label: string
    href?: string
  }>
}

export function Header({
  title,
  subtitle,
  actions,
  className = '',
  showBreadcrumb = false,
  breadcrumbItems = []
}: HeaderProps) {
  return (
    <header className={`bg-white border-b border-neutral-200 px-6 py-4 ${className}`}>
      {showBreadcrumb && breadcrumbItems.length > 0 && (
        <nav className="mb-4">
          <ol className="flex items-center space-x-2 text-sm text-neutral-600">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && <span className="mx-2">/</span>}
                {item.href ? (
                  <a href={item.href} className="hover:text-primary-600 transition-colors">
                    {item.label}
                  </a>
                ) : (
                  <span className="text-neutral-900 font-medium">{item.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
      
      <div className="flex items-center justify-between">
        <div>
          {title && (
            <h1 className="text-2xl font-bold text-neutral-900">{title}</h1>
          )}
          {subtitle && (
            <p className="text-neutral-600 mt-1">{subtitle}</p>
          )}
        </div>
        
        {actions && actions.length > 0 && (
          <div className="flex items-center space-x-3">
            {actions.map((action, index) => (
              <div key={index}>{action}</div>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}