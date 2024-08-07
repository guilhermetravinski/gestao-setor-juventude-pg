'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Evento, Organizador } from '@/lib/definitions'
import { cn } from '@/lib/utils'

import { TimePickerDemo } from './time-picker-demo'

const eventoSchema = z.object({
  titulo: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  local: z.string({ message: 'Campo obrigatório' }).min(3, 'Campo obrigatório'),
  publicoAlvo: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  organizador: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  dataInicio: z.date({
    message: 'Campo obrigatório',
  }),
  dataFim: z.date({
    message: 'Campo obrigatório',
  }),
  descricao: z
    .string({ message: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
})

type EventFormData = z.infer<typeof eventoSchema>

interface FormEventoProps {
  onClose: (evento: Evento) => void
  setOpen: Dispatch<SetStateAction<boolean>>
  organizadoresApi: Organizador[]
}

export function FormEvento({
  onClose,
  setOpen,
  organizadoresApi,
}: FormEventoProps) {
  const [organizadores, setOrganizadores] = useState<string[]>([])
  const [organizadorSelecionado, setOrganizadorSelecionado] = useState<string>()

  useEffect(() => {
    const newOrganizadores = organizadoresApi.map(
      (organizador) => organizador.nome,
    )

    setOrganizadores(newOrganizadores)
  }, [setOrganizadores, organizadoresApi])

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventoSchema),
  })

  async function onSubmit(values: EventFormData) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await new Promise((resolve) => setTimeout(resolve, 1000))
    const novoEvento: Evento = {
      titulo: values.titulo,
      local: values.local,
      dataInicio: values.dataInicio,
      dataFim: values.dataFim,
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
          name="organizador"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organizador</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    setOrganizadorSelecionado(value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um organizador" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizadores.map((organizador, index) => (
                      <SelectItem key={index} value={organizador}>
                        {organizador}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
          name="publicoAlvo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Público alvo</FormLabel>
              <FormControl>
                <Input placeholder="Ex.: Jovens da comunidade" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataInicio"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Início</FormLabel>
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
                        format(field.value, 'PPP HH:mm', { locale: ptBR })
                      ) : (
                        <span>Data e hora de início</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto items-center p-0 pr-3">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <TimePickerDemo setDate={field.onChange} date={field.value} />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dataFim"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-left">Fim</FormLabel>
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
                        format(field.value, 'PPP HH:mm', { locale: ptBR })
                      ) : (
                        <span>Data e hora de fim</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto items-center p-0 pr-3">
                  <Calendar
                    locale={ptBR}
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                  <TimePickerDemo setDate={field.onChange} date={field.value} />
                </PopoverContent>
              </Popover>
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
