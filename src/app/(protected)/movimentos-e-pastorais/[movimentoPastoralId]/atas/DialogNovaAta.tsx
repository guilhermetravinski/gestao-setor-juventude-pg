'use client'

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

export function DialogNovaAta() {
  const [open, setOpen] = useState(false)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="ml-auto">
          <Plus className="mr-2 h-4 w-4" />
          Nova ata
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Nova ata</DialogTitle>
          <DialogDescription>
            Preencha os campos para criar uma nova ata.
          </DialogDescription>
        </DialogHeader>
        <FormEvento setOpen={setOpen} mode="new" />
      </DialogContent>
    </Dialog>
  )
}
