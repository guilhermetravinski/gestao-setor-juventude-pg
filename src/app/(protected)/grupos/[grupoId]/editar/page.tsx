import { getGrupoById } from '@/lib/api/grupos'
import { Grupo } from '@/lib/definitions'

import { GrupoForm } from '../../GrupoForm/GrupoForm'

interface GrupoPageProps {
  params: { grupoId: string }
}
export default async function EditarGrupoPage({ params }: GrupoPageProps) {
  const { grupoId } = params
  const grupo = (await getGrupoById(grupoId)) as Grupo
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">Editar grupo</h1>
      </div>
      <div className="mx-auto w-full max-w-lg items-start gap-6">
        <GrupoForm defaultValues={grupo} mode="update" />
      </div>
    </main>
  )
}
