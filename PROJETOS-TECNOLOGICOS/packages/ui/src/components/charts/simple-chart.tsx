'use client'

import React from 'react'

export interface ChartData {
  name: string
  value: number
  color?: string
}

export interface SimpleChartProps {
  data: ChartData[]
  title?: string
  type?: 'bar' | 'line' | 'pie'
  height?: number
  className?: string
  loading?: boolean
}

export function SimpleChart({
  data,
  title,
  type = 'bar',
  height = 300,
  className = '',
  loading = false
}: SimpleChartProps) {
  if (loading) {
    return (
      <div className={`bg-white rounded-2xl p-6 shadow-soft border border-neutral-200 ${className}`}>
        {title && <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>}
        <div className="animate-pulse">
          <div className="space-y-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="h-4 bg-neutral-200 rounded w-16"></div>
                <div className="flex-1 h-4 bg-neutral-200 rounded"></div>
                <div className="h-4 bg-neutral-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...data.map(item => item.value))

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-soft border border-neutral-200 ${className}`}>
      {title && <h3 className="text-lg font-semibold text-neutral-900 mb-4">{title}</h3>}
      
      <div style={{ height }} className="flex flex-col justify-end space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 text-sm text-neutral-600 text-right">
              {item.name}
            </div>
            <div className="flex-1 bg-neutral-100 rounded-full h-6 relative overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${(item.value / maxValue) * 100}%`,
                  backgroundColor: item.color || '#3B82F6'
                }}
              />
            </div>
            <div className="w-12 text-sm font-medium text-neutral-900 text-right">
              {item.value}
            </div>
          </div>
        ))}
      </div>
      
      {data.length === 0 && (
        <div className="flex items-center justify-center h-32 text-neutral-500">
          <p>Nenhum dado disponível</p>
        </div>
      )}
    </div>
  )
}