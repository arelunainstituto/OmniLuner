import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role: string
      companyId: string
      companyName: string
      companyNif: string
      permissions: string[]
    }
  }

  interface User {
    id: string
    email: string
    name?: string | null
    role: string
    companyId: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId: string
    role: string
    companyId: string
    companyName: string
    companyNif: string
    permissions: string[]
  }
}