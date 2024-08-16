import { DataTable } from '@/components/DataTable/data-table'
import { Card, CardContent } from '@/components/ui/card'
import { getGrupos } from '@/lib/api/grupos'

import { columns } from './columns'

export default async function GruposPage() {
  const grupos = await getGrupos()
  return (
    <main className="flex flex-1 flex-col gap-8 bg-muted/40 p-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Grupos de jovens</h1>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <Card>
          <CardContent>
            <DataTable
              columns={columns}
              data={grupos}
              type="grupos"
              novoRegistroPath="/admin/grupos/novo"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
