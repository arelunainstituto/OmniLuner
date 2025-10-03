import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Entrar - Instituto AreLuna',
  description: 'Faça login no portal do Instituto AreLuna',
}

export default function SignInPage() {
  return (
    <div className="container relative flex h-screen flex-col items-center justify-center">
      <Card className="mx-auto max-w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            Instituto AreLuna
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Button asChild>
            <Link href="/api/auth/signin/azure-ad">
              Entrar com Microsoft
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}