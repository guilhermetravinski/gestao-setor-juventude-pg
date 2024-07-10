'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

import { Evento } from './page'

const eventoSchema = z.object({
  titulo: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  local: z.string({ message: 'Campo obrigatório' }).min(3, 'Campo obrigatório'),
  data: z.date({
    message: 'Campo obrigatório',
  }),
  horario: z.string({ message: 'Campo obrigatório' }),
  descricao: z
    .string({ message: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
})

type EventFormData = z.infer<typeof eventoSchema>

interface FormEventoProps {
  onClose: (evento: Evento) => void
  setOpen: Dispatch<SetStateAction<boolean>>
}

export function FormEvento({ onClose, setOpen }: FormEventoProps) {
  const form = useForm<EventFormData>({
    resolver: zodResolver(eventoSchema),
  })

  async function onSubmit(values: EventFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    await new Promise((resolve) => setTimeout(resolve, 1000))
    const novoEvento: Evento = {
      titulo: values.titulo,
      local: values.local,
      horario: values.horario,
      data: values.data,
      descricao: values.descricao,
    }
    onClose(novoEvento)
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Nome do evento" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="local"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local</FormLabel>
              <FormControl>
                <Input placeholder="Local do evento" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de início</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP', { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date <= new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="horario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Horário de início</FormLabel>
              <FormControl>
                <Input placeholder="Horário do evento" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição do evento" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button
            type="submit"
            className="ml-auto"
            disabled={form.formState.isSubmitting || !form.formState.isValid}
          >
            Salvar evento
          </Button>
        </div>
      </form>
    </Form>
  )
}
