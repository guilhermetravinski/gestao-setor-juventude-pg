import { DataTable } from '@/components/DataTable/data-table'
import { Card, CardContent } from '@/components/ui/card'
import { getMovimentosPastorais } from '@/lib/api/movimentosPastorais'

import { columns } from './columns'

export default async function MovimentosEPastoraisPage() {
  const movimentosPastorais = await getMovimentosPastorais()
  return (
    <main className="flex flex-1 flex-col gap-8 bg-muted/40 p-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Movimentos e pastorais</h1>
      </div>
      <div className="mx-auto w-full max-w-3xl">
        <Card>
          <CardContent>
            <DataTable
              columns={columns}
              data={movimentosPastorais}
              novoRegistroPath="/movimentos-e-pastorais/novo"
            />
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
