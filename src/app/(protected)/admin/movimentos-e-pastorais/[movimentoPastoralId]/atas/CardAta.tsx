'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { Separator } from '@/components/ui/separator'
import { Ata } from '@/lib/definitions'

import { DeleteAtaDialog } from './DeleteAtaDialog'
import { DialogEditarAta } from './DialogEditarAta'

interface CardAtaProps {
  ata: Ata
  lastItem: boolean
}

export function CardAta({ ata, lastItem }: CardAtaProps) {
  return (
    <div>
      <div className="flex flex-col text-sm">
        <div className="mb-3 flex items-center">
          <span className="mr-auto font-bold">
            {format(ata.data, 'PPP', { locale: ptBR })}
          </span>
          <DialogEditarAta ata={ata} />
          <DeleteAtaDialog ataId={ata.id} />
        </div>
        <span>{ata.descricao}</span>
      </div>
      {!lastItem && <Separator className="my-3" />}
    </div>
  )
}
