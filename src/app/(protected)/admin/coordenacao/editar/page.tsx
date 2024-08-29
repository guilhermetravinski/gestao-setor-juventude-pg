import { cookies } from 'next/headers'

import { getCoordenadores } from '@/lib/api/coordenadoresDiocesanos'
import { getGrupos } from '@/lib/api/grupos'
import { getMovimentosPastorais } from '@/lib/api/movimentosPastorais'
import {
  CoordenadorDiocesano,
  Grupo,
  MovimentoPastoral,
  Organizador,
} from '@/lib/definitions'

import { CoordenacaoForm } from '../form/coordenacao-form'

export default async function EditarCoordenacaoPage() {
  const cookieStore = cookies()
  const token =
    cookieStore.get('next-auth.session-token') ??
    cookieStore.get('__Secure-next-auth.session-token')
  const coordenadores = (await getCoordenadores(
    token?.value ?? '',
  )) as CoordenadorDiocesano[]

  const grupos = (await getGrupos(token?.value ?? '')) as Grupo[]
  const movimentosPastorais = (await getMovimentosPastorais(
    token?.value ?? '',
  )) as MovimentoPastoral[]

  const representacoes = [
    { id: '1', nome: 'Setor Juventude', tipo: 'diocesano' },
    { id: '2', nome: 'Setor 1', tipo: 'setorial' },
    { id: '3', nome: 'Setor 2', tipo: 'setorial' },
    { id: '4', nome: 'Setor 3', tipo: 'setorial' },
    { id: '5', nome: 'Setor 4', tipo: 'setorial' },
    { id: '6', nome: 'Setor 5', tipo: 'setorial' },
    { id: '7', nome: 'Setor 6', tipo: 'setorial' },
    { id: '8', nome: 'Setor 7', tipo: 'setorial' },
    { id: '9', nome: 'Setor 8', tipo: 'setorial' },
  ] as Organizador[]

  grupos.map((grupo) =>
    representacoes.push({ id: grupo.id, nome: grupo.nome, tipo: 'grupo' }),
  )
  movimentosPastorais.map((movimentoPastoral) =>
    representacoes.push({
      id: movimentoPastoral.id,
      nome: movimentoPastoral.nome,
      tipo: 'movimentoPastoral',
    }),
  )
  console.log(representacoes)
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">
          Coordenação diocesana
        </h1>
      </div>
      <div className="mx-auto w-full max-w-lg items-start gap-6">
        <CoordenacaoForm
          coordenadores={coordenadores}
          representacoes={representacoes}
        />
      </div>
    </main>
  )
}
