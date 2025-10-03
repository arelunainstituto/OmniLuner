import { withAuth } from 'next-auth/middleware'

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (
        req.nextUrl.pathname.startsWith('/admin') ||
        req.nextUrl.pathname.startsWith('/dashboard')
      ) {
        return token?.role === 'ADMIN'
      }
      return !!token
    },
  },
})

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/projetos/:path*',
    '/eventos/:path*',
    '/noticias/:path*',
  ],
}