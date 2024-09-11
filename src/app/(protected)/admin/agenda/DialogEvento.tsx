import { Pencil, Plus } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Evento, Organizador } from '@/lib/definitions'

import { FormEvento } from './FormEvento'

interface DialogEventoProps {
  organizadoresApi: Organizador[]
  mode: 'new' | 'update'
  defaultValues?: Evento
}

export function DialogEvento({
  organizadoresApi,
  mode,
  defaultValues,
}: DialogEventoProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {mode === 'new' ? (
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Novo evento
          </Button>
        ) : (
          <Button size="icon" variant="ghost">
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto sm:max-w-[425px] md:max-h-[600px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'new' ? 'Novo evento' : 'Editar evento'}
          </DialogTitle>
          <DialogDescription>
            {`Preencha os campos para ${mode === 'new' ? 'criar um novo' : 'editar o'} evento.`}
          </DialogDescription>
        </DialogHeader>
        <FormEvento
          setOpen={setOpen}
          organizadoresApi={organizadoresApi}
          mode={mode}
          defaultValues={defaultValues}
        />
      </DialogContent>
    </Dialog>
  )
}
