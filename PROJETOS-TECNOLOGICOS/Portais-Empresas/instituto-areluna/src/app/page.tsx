import { Nav } from '@/components/nav'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto py-6">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Instituto AreLuna
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Pesquisa e desenvolvimento em saúde para um futuro melhor.
              </p>
              <Button size="lg" className="mt-6">
                Conheça nossos projetos
              </Button>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <h2 className="mb-8 text-2xl font-bold">Áreas de Atuação</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Pesquisa Clínica</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Desenvolvimento de estudos clínicos com foco em inovação e
                    qualidade de vida.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tecnologia em Saúde</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Soluções tecnológicas para melhorar a eficiência e qualidade
                    dos serviços de saúde.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Educação Continuada</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Programas de capacitação e atualização para profissionais da
                    área da saúde.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}