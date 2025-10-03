import { prisma } from '@/lib/prisma'
import type { User, Company } from '@prisma/client'

export interface UserWithCompany extends User {
  company: Company
}

export class UserService {
  /**
   * Find user by email with company information
   */
  static async findByEmail(email: string): Promise<UserWithCompany | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        include: {
          company: true
        }
      })
      
      return user as UserWithCompany | null
    } catch (error) {
      console.error('Error finding user by email:', error)
      return null
    }
  }

  /**
   * Find user by ID with company information
   */
  static async findById(id: string): Promise<UserWithCompany | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { id },
        include: {
          company: true
        }
      })
      
      return user as UserWithCompany | null
    } catch (error) {
      console.error('Error finding user by ID:', error)
      return null
    }
  }

  /**
   * Get all users for a specific company
   */
  static async findByCompany(companyId: string): Promise<UserWithCompany[]> {
    try {
      const users = await prisma.user.findMany({
        where: { companyId },
        include: {
          company: true
        },
        orderBy: {
          name: 'asc'
        }
      })
      
      return users as UserWithCompany[]
    } catch (error) {
      console.error('Error finding users by company:', error)
      return []
    }
  }

  /**
   * Update user status
   */
  static async updateStatus(userId: string, status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { status }
      })
      
      return user
    } catch (error) {
      console.error('Error updating user status:', error)
      return null
    }
  }

  /**
   * Update user role
   */
  static async updateRole(userId: string, role: 'ADMIN' | 'MANAGER' | 'USER'): Promise<User | null> {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { role }
      })
      
      return user
    } catch (error) {
      console.error('Error updating user role:', error)
      return null
    }
  }

  /**
   * Create a new user
   */
  static async create(userData: {
    email: string
    name: string
    role: 'ADMIN' | 'MANAGER' | 'USER'
    status?: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
    companyId: string
  }): Promise<User | null> {
    try {
      const user = await prisma.user.create({
        data: {
          email: userData.email,
          name: userData.name,
          role: userData.role,
          status: userData.status || 'ACTIVE',
          companyId: userData.companyId
        }
      })
      
      return user
    } catch (error) {
      console.error('Error creating user:', error)
      return null
    }
  }

  /**
   * Check if user has admin privileges
   */
  static isAdmin(user: User): boolean {
    return user.role === 'ADMIN'
  }

  /**
   * Check if user has manager or admin privileges
   */
  static isManagerOrAdmin(user: User): boolean {
    return user.role === 'ADMIN' || user.role === 'MANAGER'
  }

  /**
   * Check if user is active
   */
  static isActive(user: User): boolean {
    return user.status === 'ACTIVE'
  }

  /**
   * Get user permissions based on role
   */
  static getPermissions(user: User): string[] {
    const basePermissions = ['read:own_profile', 'update:own_profile']
    
    switch (user.role) {
      case 'ADMIN':
        return [
          ...basePermissions,
          'read:all_users',
          'create:users',
          'update:users',
          'delete:users',
          'read:company_data',
          'update:company_data',
          'read:invoices',
          'create:invoices',
          'update:invoices',
          'delete:invoices',
          'read:vat_returns',
          'create:vat_returns',
          'update:vat_returns',
          'submit:vat_returns'
        ]
      case 'MANAGER':
        return [
          ...basePermissions,
          'read:team_users',
          'read:company_data',
          'read:invoices',
          'create:invoices',
          'update:invoices',
          'read:vat_returns',
          'create:vat_returns',
          'update:vat_returns'
        ]
      case 'USER':
      default:
        return [
          ...basePermissions,
          'read:invoices',
          'create:invoices',
          'read:vat_returns'
        ]
    }
  }
}