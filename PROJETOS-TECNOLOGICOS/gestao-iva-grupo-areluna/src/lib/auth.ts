import NextAuth, { NextAuthOptions } from "next-auth"
import { JWT } from "next-auth/jwt"
import { Session } from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || 'development-client-id',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || 'development-client-secret',
      tenantId: process.env.AZURE_AD_TENANT_ID || 'development-tenant-id',
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: any; account?: any }) {
      if (user) {
        // Add custom properties to JWT
        token.tenantId = 'default' // Will be resolved from subdomain in middleware
        token.roles = ['user']
        token.scopes = ['read']
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // Add custom properties to session
        session.user.tenantId = (token.tenantId as string) || 'default'
        session.user.roles = (token.roles as string[]) || ['user']
        session.user.scopes = (token.scopes as string[]) || ['read']
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-change-in-production',
}

export default NextAuth(authOptions)