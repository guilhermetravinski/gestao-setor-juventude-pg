'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { DataTableColumnHeader } from '@/components/DataTable/data-table-column-header'
import { DeleteGrupoDialog } from '@/components/DeleteGrupoDialog'
import { Button } from '@/components/ui/button'
import { MovimentoPastoral } from '@/lib/definitions'

export const columns: ColumnDef<MovimentoPastoral>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },

  {
    accessorKey: 'tipo',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tipo" />
    ),
  },
  {
    accessorKey: 'carisma',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Carisma" />
    ),
  },
  {
    accessorKey: 'localAtuacao',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Local de atuação" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Link href={`/movimentos-e-pastorais/${row.original.id}`} passHref>
            <Button variant="ghost" size="icon">
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteGrupoDialog grupoId={row.original.id} />
        </div>
      )
    },
  },
]
