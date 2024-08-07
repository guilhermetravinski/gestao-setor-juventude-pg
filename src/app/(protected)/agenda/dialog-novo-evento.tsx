import { Plus } from 'lucide-react'
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

import { FormEvento } from './form-evento'

interface DialogNovoEventoProps {
  onClose: (evento: Evento) => void
  organizadoresApi: Organizador[]
}

export function DialogNovoEvento({
  onClose,
  organizadoresApi,
}: DialogNovoEventoProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto">
          <Plus className="mr-2 h-4 w-4" />
          Novo evento
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full overflow-auto sm:max-w-[425px] md:max-h-[600px]">
        <DialogHeader>
          <DialogTitle>Novo evento</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar um novo evento.
          </DialogDescription>
        </DialogHeader>
        <FormEvento
          onClose={onClose}
          setOpen={setOpen}
          organizadoresApi={organizadoresApi}
        />
      </DialogContent>
    </Dialog>
  )
}
