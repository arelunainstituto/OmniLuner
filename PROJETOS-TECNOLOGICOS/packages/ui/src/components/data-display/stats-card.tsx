'use client'

import React from 'react'

export interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: 'increase' | 'decrease' | 'neutral'
    period?: string
  }
  icon?: React.JSX.Element
  className?: string
  loading?: boolean
}

export function StatsCard({
  title,
  value,
  change,
  icon,
  className = '',
  loading = false
}: StatsCardProps) {
  if (loading) {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-soft border border-neutral-200 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center justify-between mb-4">
            <div className="h-4 bg-neutral-200 rounded w-24"></div>
            <div className="h-8 w-8 bg-neutral-200 rounded-lg"></div>
          </div>
          <div className="h-8 bg-neutral-200 rounded w-32 mb-2"></div>
          <div className="h-3 bg-neutral-200 rounded w-20"></div>
        </div>
      </div>
    )
  }

  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600'
      case 'decrease':
        return 'text-red-600'
      case 'neutral':
        return 'text-neutral-600'
      default:
        return 'text-neutral-600'
    }
  }

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return '↗'
      case 'decrease':
        return '↘'
      case 'neutral':
        return '→'
      default:
        return ''
    }
  }

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-soft border border-neutral-200 hover:shadow-lg transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-neutral-600">{title}</h3>
        {icon && (
          <div className="p-2 bg-primary-50 rounded-lg">
            {icon}
          </div>
        )}
      </div>
      
      <div className="mb-2">
        <p className="text-3xl font-bold text-neutral-900">{value}</p>
      </div>
      
      {change && (
        <div className="flex items-center space-x-1">
          <span className={`text-sm font-medium ${getChangeColor(change.type)}`}>
            {getChangeIcon(change.type)} {Math.abs(change.value)}%
          </span>
          {change.period && (
            <span className="text-sm text-neutral-500">vs {change.period}</span>
          )}
        </div>
      )}
    </div>
  )
}