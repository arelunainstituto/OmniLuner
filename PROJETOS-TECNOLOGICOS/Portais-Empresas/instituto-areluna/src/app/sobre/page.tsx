import { Metadata } from 'next'
import { Nav } from '@/components/nav'

export const metadata: Metadata = {
  title: 'Sobre - Instituto AreLuna',
  description:
    'Conheça a história, missão e valores do Instituto AreLuna',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="container mx-auto py-6">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                Sobre o Instituto AreLuna
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Dedicados à pesquisa e desenvolvimento em saúde desde 2020.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-2xl font-bold">Nossa História</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  O Instituto AreLuna foi fundado com a missão de promover a
                  pesquisa e o desenvolvimento em saúde, buscando soluções
                  inovadoras para os desafios da área médica. Desde então, temos
                  trabalhado em colaboração com profissionais e instituições de
                  renome para alcançar nossos objetivos.
                </p>
              </div>
              <div>
                <h2 className="mb-4 text-2xl font-bold">Missão e Valores</h2>
                <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                  <li>
                    <strong>Missão:</strong> Promover a pesquisa e o
                    desenvolvimento em saúde, contribuindo para a melhoria da
                    qualidade de vida da população.
                  </li>
                  <li>
                    <strong>Visão:</strong> Ser referência nacional em pesquisa e
                    desenvolvimento em saúde, reconhecido pela excelência e
                    inovação.
                  </li>
                  <li>
                    <strong>Valores:</strong>
                    <ul className="ml-4 mt-2">
                      <li>• Ética e transparência</li>
                      <li>• Excelência e inovação</li>
                      <li>• Compromisso social</li>
                      <li>• Valorização das pessoas</li>
                      <li>• Sustentabilidade</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}