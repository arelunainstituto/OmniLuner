import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gestão de IVA - Grupo AreLuna',
  description: 'Sistema centralizado para controlo e gestão do IVA de todas as empresas do Grupo AreLuna',
  keywords: ['IVA', 'VAT', 'Grupo AreLuna', 'Gestão Fiscal', 'Portugal'],
  authors: [{ name: 'OmniLuner', url: 'https://areluna.pt' }],
  openGraph: {
    title: 'Gestão de IVA - Grupo AreLuna',
    description: 'Sistema centralizado para controlo e gestão do IVA',
    type: 'website',
    locale: 'pt_PT',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  )
}