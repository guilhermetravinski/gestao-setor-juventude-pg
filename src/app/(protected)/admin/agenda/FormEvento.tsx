'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Cookies from 'js-cookie'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
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
import { useToast } from '@/components/ui/use-toast'
import { Evento, Organizador } from '@/lib/definitions'
import { cn } from '@/lib/utils'

import { TimePickerDemo } from './time-picker-demo'

const eventoSchema = z
  .object({
    titulo: z
      .string({ message: 'Campo obrigatório' })
      .min(3, 'Campo obrigatório'),
    local: z
      .string({ message: 'Campo obrigatório' })
      .min(3, 'Campo obrigatório'),
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
  .refine(
    (data) => {
      const now = new Date()
      return data.dataInicio >= now
    },
    {
      path: ['dataInicio'], // onde o erro será mostrado
      message: 'A data de início não pode ser no passado.',
    },
  )
  .refine(
    (data) => {
      return data.dataFim >= data.dataInicio
    },
    {
      path: ['dataFim'], // onde o erro será mostrado
      message: 'A data de fim não pode ser antes da data de início.',
    },
  )
  .refine(
    (data) => {
      const maxDifference = 15 * 24 * 60 * 60 * 1000 // 15 dias em milissegundos
      return data.dataFim.getTime() - data.dataInicio.getTime() <= maxDifference
    },
    {
      path: ['dataFim'], // onde o erro será mostrado
      message:
        'A diferença entre a data de início e a data de fim não pode ser maior que 15 dias.',
    },
  )
type EventFormData = z.infer<typeof eventoSchema>

interface FormEventoProps {
  setOpen: Dispatch<SetStateAction<boolean>>
  organizadoresApi: Organizador[]
  mode: 'new' | 'update'
  defaultValues?: Evento
}

export function FormEvento({
  organizadoresApi,
  mode,
  defaultValues,
  setOpen,
}: FormEventoProps) {
  const [organizadores, setOrganizadores] = useState<string[]>([])
  // const [organizadorSelecionado, setOrganizadorSelecionado] = useState<string>()

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    const newOrganizadores = organizadoresApi.map(
      (organizador) => organizador.nome,
    )

    setOrganizadores(newOrganizadores)
  }, [setOrganizadores, organizadoresApi])

  const form = useForm<EventFormData>({
    resolver: zodResolver(eventoSchema),
    mode: 'all',
    defaultValues: {
      titulo: '',
      local: '',
      organizador: '',
      publicoAlvo: '',
      descricao: '',
    },
  })
  useEffect(() => {
    form.setValue('titulo', defaultValues?.titulo ?? '')
    form.setValue('local', defaultValues?.local ?? '')
    form.setValue('publicoAlvo', defaultValues?.publicoAlvo ?? '')
    form.setValue('organizador', defaultValues?.organizador ?? '')
    if (defaultValues?.dataInicio) {
      form.setValue('dataInicio', new Date(defaultValues?.dataInicio))
    }
    if (defaultValues?.dataFim) {
      form.setValue('dataFim', new Date(defaultValues?.dataFim))
    }
    form.setValue('descricao', defaultValues?.descricao ?? '')
  }, [form, defaultValues, organizadores])

  async function onSubmit(values: EventFormData) {
    try {
      const token = Cookies.get('next-auth.session-token')
      const url =
        mode === 'new'
          ? `${API_BASE_URL}/api/eventos`
          : `${API_BASE_URL}/api/eventos/${defaultValues?.id}`

      const response = await fetch(url, {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: `Evento ${mode === 'new' ? 'cadastrado' : 'atualizado'} com sucesso`,
          duration: 3000,
        })
        setOpen(false)
        // Extraia o mês e ano da data de início do evento
        const eventDate = new Date(values.dataInicio)
        const month = eventDate.getMonth() + 1 // Jan = 0, por isso adicionamos 1
        const year = eventDate.getFullYear()

        // Construa a URL com os query params
        const redirectUrl = `/admin/agenda?mes=${month}&ano=${year}`

        // Redirecione para a lista de eventos com os parâmetros de query
        router.push(redirectUrl)
        router.refresh()
      } else {
        const errorData = await response.json()
        toast({
          variant: 'destructive',
          title: `Erro ao ${mode === 'new' ? 'cadastrar' : 'atualizar'} evento`,
          description: errorData.error,
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Erro ao ${mode === 'new' ? 'cadastrar' : 'atualizar'} evento`,
        duration: 3000,
      })
    }
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
              <FormDescription>
                Grupos, movimentos e pastorais cadastrados aparecerão aqui
              </FormDescription>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value)
                    // setOrganizadorSelecionado(value)
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
              <FormMessage />
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
                <Textarea
                  maxLength={500}
                  placeholder="Descrição do evento"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting || !form.formState.isDirty}
          >
            Salvar evento
          </Button>
        </div>
      </form>
    </Form>
  )
}
