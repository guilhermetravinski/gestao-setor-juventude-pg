'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { DataTableColumnHeader } from './data-table-column-header'
import { DeleteGrupoDialog } from './DeleteGrupoDialog'

export type GrupoJovens = {
  id: string
  nome: string
  setor: string
  paroquia: string
}

export const columns: ColumnDef<GrupoJovens>[] = [
  {
    accessorKey: 'nome',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nome" />
    ),
  },

  {
    accessorKey: 'setor',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Setor" />
    ),
  },
  {
    accessorKey: 'paroquia',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paróquia" />
    ),
  },
  {
    accessorKey: 'comunidade',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Comunidade" />
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      // const payment = row.original

      return (
        <div className="flex gap-2">
          <Link href={`/grupos/${row.original.id}`} passHref>
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
