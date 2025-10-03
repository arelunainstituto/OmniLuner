import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      tenantId: string
      roles: string[]
    }
  }

  interface User {
    tenantId: string
    roles: string[]
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    tenantId: string
    roles: string[]
  }
}