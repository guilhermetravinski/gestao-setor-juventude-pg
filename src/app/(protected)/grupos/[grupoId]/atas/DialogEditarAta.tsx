'use client'

import { Pencil } from 'lucide-react'
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
import { Ata } from '@/lib/definitions'

import { FormEvento } from './FormAta'

interface DialogEditarAtaProps {
  ata: Ata
}

export function DialogEditarAta({ ata }: DialogEditarAtaProps) {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="mr-2">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Editar ata</DialogTitle>
          <DialogDescription>
            Preencha os campos para editar a ata.
          </DialogDescription>
        </DialogHeader>
        <FormEvento setOpen={setOpen} mode="edit" defaultValues={ata} />
      </DialogContent>
    </Dialog>
  )
}
