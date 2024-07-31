import { DataTable } from '@/components/DataTable/data-table'
import { Card, CardContent } from '@/components/ui/card'

import { columns } from './columns'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function getGrupos() {
  const res = await fetch(`${API_BASE_URL}/api/grupos`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar grupos')
  }
  return res.json()
}

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
              novoRegistroPath="/grupos/novo"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
