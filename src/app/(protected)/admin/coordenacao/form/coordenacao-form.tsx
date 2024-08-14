'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import InputMask from 'react-input-mask'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { CoordenadorDiocesano } from '@/lib/definitions'

import { formSchema, FormSchemaType } from './form-schema'

interface CoordenacaoFormProps {
  coordenadores: CoordenadorDiocesano[]
}

export function CoordenacaoForm({ coordenadores }: CoordenacaoFormProps) {
  const parsedData = formSchema.parse({ coordenadores })
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: parsedData,
  })
  const { toast } = useToast()

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'coordenadores',
  })

  // useEffect(() => {
  //   append(defaultValues.coordenadores)
  // }, [defaultValues, append])

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = `${API_BASE_URL}/api/coordenadores`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: `Coordenadores editados com sucesso`,
          duration: 3000,
        })
        router.push('/coordenacao')
        router.refresh()
      } else {
        const errorData = await response.json()
        toast({
          variant: 'destructive',
          title: `Erro ao editar coordenadores`,
          description: errorData.error,
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Erro ao editar coordenadores`,
        duration: 3000,
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <FormLabel>Coordenadores</FormLabel>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="mt-2 flex items-center rounded bg-background p-6 shadow"
            >
              <div className="mr-6 flex flex-1 flex-col gap-4">
                <FormField
                  control={form.control}
                  name={`coordenadores.${index}.nome`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nome <span className="text-xs text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do coordenador" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`coordenadores.${index}.telefone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Telefone{' '}
                        <span className="text-xs text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <Input placeholder="Telefone do coordenador" />
                        </InputMask>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`coordenadores.${index}.representacao`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Representação{' '}
                        <span className="text-xs text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Informe a representação"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`coordenadores.${index}.paroquia`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Paróquia{' '}
                        <span className="text-xs text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Informe a paróquia de origem"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                onClick={() => remove(index)}
                variant="ghost"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {fields.length < 8 && (
            <div className="mt-2 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  append({
                    nome: '',
                    representacao: '',
                    telefone: '',
                    paroquia: '',
                  })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar coordenador
              </Button>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="mb-3 text-xs text-rose-500">
            * Campos obrigatórios
          </span>
          <Button
            type="submit"
            disabled={!form.formState.isDirty || form.formState.isLoading}
          >
            Salvar coordenadores
          </Button>
        </div>
      </form>
    </Form>
  )
}
