'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/components/ui/use-toast'

import { formSchema, FormSchemaType } from './form-schema'

export function CoordenacaoForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      coordenadores: [
        {
          nome: 'Guilherme Travinski',
          representacao: 'setor-3',
          telefone: '42999218862',
        },
      ],
    },
  })
  const { toast } = useToast()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'coordenadores',
  })

  const router = useRouter()

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      variant: 'success',
      title: 'Grupo cadastrado com sucesso',
    })
    router.push('/grupos')
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
                  name={`coordenadores.${index}.representacao`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a representação" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="setor-1">Setor 1</SelectItem>
                            <SelectItem value="setor-2">Setor 2</SelectItem>
                            <SelectItem value="setor-3">Setor 3</SelectItem>
                            <SelectItem value="setor-4">Setor 4</SelectItem>
                            <SelectItem value="setor-5">Setor 5</SelectItem>
                            <SelectItem value="setor-6">Setor 6</SelectItem>
                            <SelectItem value="setor-7">Setor 7</SelectItem>
                            <SelectItem value="setor-8">Setor 8</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`coordenadores.${index}.nome`}
                  render={({ field }) => (
                    <FormItem>
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
                      <FormControl>
                        <Input
                          placeholder="Telefone do coordenador"
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
                  append({ nome: '', representacao: 'setor-1', telefone: '' })
                }
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar coordenador
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <Button type="submit" disabled={!form.formState.isValid}>
            Salvar coordenação
          </Button>
        </div>
      </form>
    </Form>
  )
}
