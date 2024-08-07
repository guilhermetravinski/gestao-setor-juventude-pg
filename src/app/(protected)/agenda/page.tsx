import { getGrupos } from '@/lib/api/grupos'
import { getMovimentosPastorais } from '@/lib/api/movimentosPastorais'
import { Grupo, MovimentoPastoral, Organizador } from '@/lib/definitions'

import { EventosList } from './eventos-list'

export default async function AgendaPage() {
  const grupos = (await getGrupos()) as Grupo[]
  const movimentosPastorais =
    (await getMovimentosPastorais()) as MovimentoPastoral[]

  const organizadoresApi = [] as Organizador[]

  grupos.map((grupo) =>
    organizadoresApi.push({ id: grupo.id, nome: grupo.nome, tipo: 'grupo' }),
  )
  movimentosPastorais.map((movimentoPastoral) =>
    organizadoresApi.push({
      id: movimentoPastoral.id,
      nome: movimentoPastoral.nome,
      tipo: 'movimentoPastoral',
    }),
  )

  return (
    <main className="flex flex-1 flex-col gap-8 bg-muted/40 p-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Agenda</h1>
      </div>
      <EventosList organizadoresApi={organizadoresApi} />
    </main>
  )
}
