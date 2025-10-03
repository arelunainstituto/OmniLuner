import type { NextAuthConfig } from 'next-auth'
import AzureAD from 'next-auth/providers/azure-ad'
import { UserService } from '@/lib/services/user.service'

export const authConfig: NextAuthConfig = {
  providers: [
    AzureAD({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) {
        console.error('No email provided by Azure AD')
        return false
      }

      // Find user in our database
      const dbUser = await UserService.findByEmail(user.email)
      
      if (!dbUser) {
        console.error(`User ${user.email} not found in database`)
        return false
      }

      if (!UserService.isActive(dbUser)) {
        console.error(`User ${user.email} is not active`)
        return false
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (account && user?.email) {
        // Fetch user data from database
        const dbUser = await UserService.findByEmail(user.email)
        
        if (dbUser) {
          token.userId = dbUser.id
          token.role = dbUser.role
          token.companyId = dbUser.companyId
          token.companyName = dbUser.company.name
          token.companyNif = dbUser.company.nif
          token.permissions = UserService.getPermissions(dbUser)
        }
      }
      
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string
        session.user.role = token.role as string
        session.user.companyId = token.companyId as string
        session.user.companyName = token.companyName as string
        session.user.companyNif = token.companyNif as string
        session.user.permissions = token.permissions as string[]
      }
      
      return session
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  debug: process.env.NODE_ENV === 'development',
}