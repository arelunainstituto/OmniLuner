import { Metadata } from 'next'
import { Nav } from '@/components/nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export const metadata: Metadata = {
  title: 'Contato - Instituto AreLuna',
  description: 'Entre em contato com o Instituto AreLuna',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto py-6">
        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h1 className="text-3xl font-bold">Entre em Contato</h1>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Estamos à disposição para atender suas dúvidas e solicitações.
                </p>

                <div className="mt-8 space-y-4">
                  <div>
                    <h2 className="text-xl font-semibold">Endereço</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      Av. Principal, 1000
                      <br />
                      Centro, São Paulo - SP
                      <br />
                      CEP: 01000-000
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">Telefone</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      +55 (11) 3000-0000
                    </p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold">E-mail</h2>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                      contato@institutoareluna.com.br
                    </p>
                  </div>
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Envie sua mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        id="name"
                        placeholder="Nome completo"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="email"
                        type="email"
                        placeholder="E-mail"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Input
                        id="subject"
                        placeholder="Assunto"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Textarea
                        id="message"
                        placeholder="Mensagem"
                        required
                      />
                    </div>
                    <Button className="w-full">Enviar mensagem</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}