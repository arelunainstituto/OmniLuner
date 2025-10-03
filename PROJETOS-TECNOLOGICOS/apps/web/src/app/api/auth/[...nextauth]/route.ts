import NextAuth, { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'
import { NextRequest } from 'next/server'

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      
      // Add tenant information from profile or headers
      if (profile) {
        token.tenantId = 'instituto-areluna' // This should be determined from the user's domain or other logic
        token.roles = ['user'] // This should come from Azure AD groups or custom claims
      }
      
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string
      session.user.tenantId = token.tenantId as string
      session.user.roles = token.roles as string[]
      
      return session
    },
    async signIn({ user, account, profile }) {
      // You can add custom logic here to validate the user
      // For now, allow all users from the configured tenant
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }