'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { setores } from '@/data/setores'

import { formSchema, FormSchemaType } from './form-schema'

export function GrupoForm() {
  const form = useForm<FormSchemaType>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: '',
      comunidade: '',
    },
  })
  const { toast } = useToast()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'coordenacao',
  })

  const {
    fields: redesFields,
    append: appendRedes,
    remove: removeRedes,
  } = useFieldArray({
    control: form.control,
    name: 'redesSociais',
  })

  const [selectedSetor, setSelectedSetor] = useState('')
  const [paroquias, setParoquias] = useState<string[]>([])
  const currentYear = new Date().getFullYear()
  const years = Array.from(new Array(50), (val, index) => currentYear - index)
  const router = useRouter()
  useEffect(() => {
    if (selectedSetor) {
      const setorData = setores.find(
        (setor) => setor.setor.toString() === selectedSetor,
      )
      setParoquias(setorData ? setorData.paroquias : [])
    } else {
      setParoquias([])
    }
  }, [selectedSetor])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch('/api/grupos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: 'Grupo cadastrado com sucesso',
        })
        router.push('/grupos')
      } else {
        const errorData = await response.json()
        toast({
          variant: 'destructive',
          title: 'Erro ao cadastrar grupo',
          description: errorData.error,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro ao cadastrar grupo',
      })
    }
  }

  function handleAddRede() {
    const existingRedes = redesFields.map((field) => field.rede)
    if (
      existingRedes.includes('Facebook') &&
      existingRedes.includes('Instagram')
    ) {
      return // both redes already added
    }
    const redeToAdd = !existingRedes.includes('Facebook')
      ? 'Facebook'
      : 'Instagram'
    appendRedes({ rede: redeToAdd, nomeUsuario: '' })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Nome do grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="setor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Setor <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value)
                    setSelectedSetor(value)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um setor" />
                  </SelectTrigger>
                  <SelectContent>
                    {setores.map((setor) => (
                      <SelectItem
                        key={setor.setor}
                        value={setor.setor.toString()}
                      >
                        Setor {setor.setor}
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
          name="paroquia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Paróquia <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma paróquia" />
                  </SelectTrigger>
                  <SelectContent>
                    {paroquias.map((paroquia, index) => (
                      <SelectItem key={index} value={paroquia}>
                        {paroquia}
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
          name="comunidade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Comunidade <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Matriz ou capelas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="anoFundacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ano de fundação</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o ano de fundação" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
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
          name="biografia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografia</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Hisória do grupo"
                  {...field}
                  maxLength={250}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Coordenação</FormLabel>
          {fields.map((item, index) => (
            <div
              key={item.id}
              className="mt-2 flex items-center rounded bg-background p-6 shadow"
            >
              <div className="mr-6 flex flex-1 flex-col gap-4">
                <FormField
                  control={form.control}
                  name={`coordenacao.${index}.nome`}
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
                  name={`coordenacao.${index}.telefone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputMask
                          mask="(99) 99999-9999"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <Input
                            placeholder="Telefone do coordenador"
                            // {...field}
                          />
                        </InputMask>
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
          {fields.length < 5 && (
            <div className="mt-2 flex justify-center">
              <Button
                type="button"
                variant="outline"
                onClick={() => append({ nome: '', telefone: '' })}
              >
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Coordenador
              </Button>
            </div>
          )}
        </div>
        <Separator />
        <div>
          <FormLabel>Redes sociais</FormLabel>
          {redesFields.map((item, index) => (
            <div
              key={item.id}
              className="mt-2 flex items-center rounded bg-background p-6 shadow"
            >
              <div className="mr-6 flex flex-1 flex-col gap-4">
                <FormField
                  control={form.control}
                  name={`redesSociais.${index}.rede`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a rede social" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Facebook">Facebook</SelectItem>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`redesSociais.${index}.nomeUsuario`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Nome de usuário" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="button"
                onClick={() => removeRedes(index)}
                variant="ghost"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {redesFields.length < 2 && (
            <div className="mt-2 flex justify-center">
              <Button type="button" variant="outline" onClick={handleAddRede}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Rede Social
              </Button>
            </div>
          )}
        </div>
        <FormField
          control={form.control}
          name="jovesAtivos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jovens ativos <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Até 20 jovens">Até 20 jovens</SelectItem>
                    <SelectItem value="Entre 20 e 50 jovens">
                      Entre 20 e 50 jovens
                    </SelectItem>
                    <SelectItem value="Mais de 50 jovens">
                      Mais de 50 jovens
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reunioes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reuniões</FormLabel>
              <FormControl>
                <Input placeholder="Data e hora das reuniões" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observações sobre o grupo"
                  {...field}
                  maxLength={250}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col">
          <span className="mb-3 text-xs text-rose-500">
            * Campos obrigatórios
          </span>
          <Button
            type="submit"
            disabled={!form.formState.isValid || form.formState.isSubmitting}
          >
            Salvar grupo
          </Button>
        </div>
      </form>
    </Form>
  )
}
