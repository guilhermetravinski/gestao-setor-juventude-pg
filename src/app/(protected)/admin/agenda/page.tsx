import { getEventos } from '@/lib/api/eventos'
import { getGrupos } from '@/lib/api/grupos'
import { getMovimentosPastorais } from '@/lib/api/movimentosPastorais'
import {
  Evento,
  Grupo,
  MovimentoPastoral,
  Organizador,
} from '@/lib/definitions'

import { EventosList } from './EventosList'

export default async function AgendaPage() {
  const eventos = (await getEventos()) as Evento[]
  const grupos = (await getGrupos()) as Grupo[]
  const movimentosPastorais =
    (await getMovimentosPastorais()) as MovimentoPastoral[]

  const organizadoresApi = [
    { nome: 'Setor Juventude', tipo: 'diocesano' },
    { nome: 'Setor 1', tipo: 'setorial' },
    { nome: 'Setor 2', tipo: 'setorial' },
    { nome: 'Setor 3', tipo: 'setorial' },
    { nome: 'Setor 4', tipo: 'setorial' },
    { nome: 'Setor 5', tipo: 'setorial' },
    { nome: 'Setor 6', tipo: 'setorial' },
    { nome: 'Setor 7', tipo: 'setorial' },
    { nome: 'Setor 8', tipo: 'setorial' },
  ] as Organizador[]

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
      <EventosList organizadoresApi={organizadoresApi} eventos={eventos} />
    </main>
  )
}
