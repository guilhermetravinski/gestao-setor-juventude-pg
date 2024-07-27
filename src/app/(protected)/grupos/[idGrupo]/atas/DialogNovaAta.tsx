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

import { FormEvento } from './FormAta'

interface DialogNovoEventoProps {
  // onClose: (evento: Evento) => void
}

export function DialogNovaAta({  }: DialogNovoEventoProps) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      <Button size="sm" className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova ata
                </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Novo evento</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar um novo evento.
          </DialogDescription>
        </DialogHeader>
        <FormEvento setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  )
}
