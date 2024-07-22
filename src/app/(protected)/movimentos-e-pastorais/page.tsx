import { Card, CardContent } from '@/components/ui/card'

import { columns, GrupoJovens } from '../grupos/DataTable/columns'
import { DataTable } from '../grupos/DataTable/data-table'

async function getGrupos(): Promise<GrupoJovens[]> {
  return [
    {
      id: '728ed52f',
      nome: 'Juventude Bom Jesus',
      setor: '3',
      paroquia: 'Bom Jesus',
    },
    {
      id: '728ed52a',
      nome: 'JOFF',
      setor: '3',
      paroquia: 'Bom Jesus',
    },
  ]
}

export default async function MovimentosEPastoraisPage() {
  const grupos = await getGrupos()
  return (
    <main className="flex flex-1 flex-col gap-8 bg-muted/40 p-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Movimentos e pastorais</h1>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <Card>
          <CardContent>
            <DataTable columns={columns} data={grupos} />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
