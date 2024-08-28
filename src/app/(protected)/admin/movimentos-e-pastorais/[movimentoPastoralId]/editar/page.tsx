import { cookies } from 'next/headers'

import { getMovimentoPastoralById } from '@/lib/api/movimentosPastorais'
import { MovimentoPastoral } from '@/lib/definitions'

import { MovimentoPastoralForm } from '../../MovimentoPastoralForm/MovimentoPastoralForm'

interface MovimentoPastoralPageProps {
  params: { movimentoPastoralId: string }
}
export default async function EditarMovimentoPastoralPage({
  params,
}: MovimentoPastoralPageProps) {
  const { movimentoPastoralId } = params
  const cookieStore = cookies()
  const token = cookieStore.get('next-auth.session-token')
  const grupo = (await getMovimentoPastoralById(
    movimentoPastoralId,
    token?.value ?? '',
  )) as MovimentoPastoral
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">Editar grupo</h1>
      </div>
      <div className="mx-auto w-full max-w-lg items-start gap-6">
        <MovimentoPastoralForm defaultValues={grupo} mode="update" />
      </div>
    </main>
  )
}
