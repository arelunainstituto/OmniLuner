import { format, parseISO, isValid, addDays, subDays, startOfDay, endOfDay } from 'date-fns'
import { ptBR } from 'date-fns/locale'

/**
 * Format date to Brazilian format (DD/MM/YYYY)
 */
export function formatDateBR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  return format(dateObj, 'dd/MM/yyyy', { locale: ptBR })
}

/**
 * Format date and time to Brazilian format (DD/MM/YYYY HH:mm)
 */
export function formatDateTimeBR(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  return format(dateObj, 'dd/MM/yyyy HH:mm', { locale: ptBR })
}

/**
 * Format date to ISO string for API usage
 */
export function formatDateISO(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  return dateObj.toISOString()
}

/**
 * Get relative time description in Portuguese
 */
export function getRelativeTime(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return ''
  
  const now = new Date()
  const diffInMs = now.getTime() - dateObj.getTime()
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  
  if (diffInMinutes < 1) return 'agora'
  if (diffInMinutes < 60) return `${diffInMinutes} min atrás`
  if (diffInHours < 24) return `${diffInHours}h atrás`
  if (diffInDays < 7) return `${diffInDays} dias atrás`
  
  return formatDateBR(dateObj)
}

/**
 * Check if date is today
 */
export function isToday(date: Date | string): boolean {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  if (!isValid(dateObj)) return false
  
  const today = new Date()
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  )
}

/**
 * Get date range for common periods
 */
export function getDateRange(period: 'today' | 'yesterday' | 'last7days' | 'last30days' | 'thisMonth' | 'lastMonth'): {
  start: Date
  end: Date
} {
  const now = new Date()
  const today = startOfDay(now)
  
  switch (period) {
    case 'today':
      return {
        start: today,
        end: endOfDay(now)
      }
    case 'yesterday':
      const yesterday = subDays(today, 1)
      return {
        start: yesterday,
        end: endOfDay(yesterday)
      }
    case 'last7days':
      return {
        start: subDays(today, 6),
        end: endOfDay(now)
      }
    case 'last30days':
      return {
        start: subDays(today, 29),
        end: endOfDay(now)
      }
    case 'thisMonth':
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      return {
        start: startOfMonth,
        end: endOfDay(now)
      }
    case 'lastMonth':
      const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0)
      return {
        start: startOfLastMonth,
        end: endOfDay(endOfLastMonth)
      }
    default:
      return {
        start: today,
        end: endOfDay(now)
      }
  }
}