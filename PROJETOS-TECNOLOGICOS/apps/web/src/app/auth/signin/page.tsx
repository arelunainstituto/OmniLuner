import { Metadata } from 'next'
import { SignInForm } from '@/components/auth/signin-form'
import { getTenantFromHeaders } from '@/lib/tenant-server'

export const metadata: Metadata = {
  title: 'Entrar',
  description: 'Entre na sua conta do AreLuna ERP',
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: { error?: string; callbackUrl?: string }
}) {
  const tenant = await getTenantFromHeaders()
  
  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-800" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          {tenant?.name || 'AreLuna ERP'}
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              "Sistema ERP integrado que revolucionou nossa gestão empresarial, 
              proporcionando visibilidade completa e controle total dos processos."
            </p>
            <footer className="text-sm">Grupo AreLuna</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Entrar na conta
            </h1>
            <p className="text-sm text-muted-foreground">
              {tenant?.name ? `Acesse o sistema da ${tenant.name}` : 'Acesse o AreLuna ERP'}
            </p>
          </div>
          <SignInForm 
            error={searchParams.error}
            callbackUrl={searchParams.callbackUrl}
            tenant={tenant}
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Ao continuar, você concorda com nossos{' '}
            <a
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Termos de Serviço
            </a>{' '}
            e{' '}
            <a
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}