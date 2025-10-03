import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { headers } from 'next/headers'
import { getTenantFromHeaders } from '@/lib/tenant-server'
import { Providers } from '@/components/providers'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers()
  const tenant = await getTenantFromHeaders(headersList)

  return {
    title: {
      default: tenant?.name || 'Grupo AreLuna',
      template: `%s | ${tenant?.name || 'Grupo AreLuna'}`,
    },
    description: tenant?.description || 'Sistema de gestão empresarial do Grupo AreLuna',
    keywords: ['ERP', 'gestão', 'empresarial', tenant?.name].filter(Boolean) as string[],
    authors: [{ name: 'Grupo AreLuna' }],
    creator: 'Grupo AreLuna',
    publisher: 'Grupo AreLuna',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3001'),
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: '/',
      title: tenant?.name || 'Grupo AreLuna',
      description: tenant?.description || 'Sistema de gestão empresarial do Grupo AreLuna',
      siteName: tenant?.name || 'Grupo AreLuna',
    },
    twitter: {
      card: 'summary_large_image',
      title: tenant?.name || 'Grupo AreLuna',
      description: tenant?.description || 'Sistema de gestão empresarial do Grupo AreLuna',
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}