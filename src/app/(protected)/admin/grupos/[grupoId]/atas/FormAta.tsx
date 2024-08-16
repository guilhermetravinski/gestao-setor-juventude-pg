'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Ata } from '@/lib/definitions'
import { cn } from '@/lib/utils'

export const ataSchema = z.object({
  data: z.date({ message: 'Insira a data da ata' }),
  descricao: z
    .string({ message: 'Insira a descrição da ata' })
    .min(5, { message: 'A descrição deve ter, pelo menos, 5 caracteres' }),
  id: z.string().optional(),
})

type AtaFormData = z.infer<typeof ataSchema>

interface FormEventoProps {
  setOpen: (value: boolean) => void
  mode: 'new' | 'edit'
  defaultValues?: Ata
}

export function FormEvento({ setOpen, mode, defaultValues }: FormEventoProps) {
  const { toast } = useToast()
  const router = useRouter()
  const { grupoId } = useParams()
  const form = useForm<AtaFormData>({
    resolver: zodResolver(ataSchema),
    mode: 'all',
    defaultValues: {
      data: defaultValues?.data ? new Date(defaultValues?.data) : new Date(),
      descricao: defaultValues?.descricao,
    },
  })

  const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  async function onSubmit(values: AtaFormData) {
    try {
      const body = {
        data: values.data,
        descricao: values.descricao,
        grupoId,
      }
      const url =
        mode === 'new'
          ? `${NEXT_PUBLIC_API_BASE_URL}/api/grupos/${grupoId}/atas`
          : `${NEXT_PUBLIC_API_BASE_URL}/api/grupos/${grupoId}/atas/${defaultValues?.id}`

      const response = await fetch(url, {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: `Ata ${mode === 'new' ? 'cadastrada' : 'atualizada'} com sucesso`,
          duration: 3000,
        })
        router.push(`/admin/grupos/${grupoId}`)
        router.refresh()
      } else {
        const errorData = await response.json()
        toast({
          variant: 'destructive',
          title: `Erro ao ${mode === 'new' ? 'cadastrar' : 'atualizar'} ata`,
          description: errorData.error,
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Erro ao ${mode === 'new' ? 'cadastrar' : 'atualizar'} grupo`,
        duration: 3000,
      })
    }
    setOpen(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="data"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={form.formState.isSubmitting}
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
                    disabled={(date) => date > new Date()}
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
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={500}
                  disabled={form.formState.isSubmitting}
                  placeholder="Descrição da ata"
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
            className="ml-auto"
            disabled={
              form.formState.isSubmitting ||
              (mode === 'edit' && !form.formState.isDirty)
            }
          >
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
