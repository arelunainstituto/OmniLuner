import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { JWT } from 'next-auth/jwt'

export interface AuthUser {
  id: string
  email: string
  name: string
  image?: string
  tenantId: string
  role: string
  permissions: string[]
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: 'openid profile email User.Read'
        }
      }
    })
  ],
  
  callbacks: {
    async jwt({ token, account, profile }) {
      // Initial sign in
      if (account && profile) {
        // Extract tenant information from the user's domain or custom logic
        const tenantId = await resolveTenantFromUser(profile.email as string)
        
        token.tenantId = tenantId
        token.role = 'user' // Default role, should be fetched from database
        token.permissions = [] // Should be fetched from database based on role
        token.userId = profile.sub
      }
      
      return token
    },
    
    async session({ session, token }) {
      if (token && session.user) {
        const authUser: AuthUser = {
          id: token.userId as string,
          email: session.user.email!,
          name: session.user.name!,
          image: session.user.image,
          tenantId: token.tenantId as string,
          role: token.role as string,
          permissions: token.permissions as string[]
        }
        
        session.user = authUser
      }
      
      return session
    }
  },
  
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  },
  
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 // 24 hours
  },
  
  jwt: {
    maxAge: 24 * 60 * 60 // 24 hours
  }
}

/**
 * Resolve tenant ID from user email domain
 */
async function resolveTenantFromUser(email: string): Promise<string> {
  const domain = email.split('@')[1]
  
  // Map domains to tenant IDs
  const domainTenantMap: Record<string, string> = {
    'instituto-areluna.com': 'instituto-areluna',
    'pinklegion.com': 'pinklegion',
    'papagaiofotogenico.com': 'papagaio-fotografico',
    'nuvensautoctones.com': 'nuvens-autoctones',
    'prostoral.com': 'prostoral',
    'vespasianventures.com': 'vespasian-ventures'
  }
  
  // Default to instituto-areluna for development
  return domainTenantMap[domain] || 'instituto-areluna'
}

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: AuthUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string
    tenantId?: string
    role?: string
    permissions?: string[]
  }
}