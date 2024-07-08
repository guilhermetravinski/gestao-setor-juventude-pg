'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import MaskedInput from '@/components/masked-input'
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
import { setores } from '@/data/setores'
import { cn } from '@/lib/utils'

import { formSchema, FormSchemaType } from './form-schema'

export function GrupoForm() {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  })

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
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
              <FormLabel>Nome</FormLabel>
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
              <FormLabel>Setor</FormLabel>
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
              <FormLabel>Paróquia</FormLabel>
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
              <FormLabel>Comunidade</FormLabel>
              <FormControl>
                <Input placeholder="Matriz ou capelas" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dtFundacao"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de fundação</FormLabel>
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
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
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
          name="biografia"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografia</FormLabel>
              <FormControl>
                <Textarea placeholder="Hisória do grupo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>Coordenação</FormLabel>
          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-2">
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
                      <MaskedInput
                        mask="(99) 99999-9999"
                        placeholder="Telefone do coordenador"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="button" onClick={() => remove(index)}>
                Remover
              </Button>
            </div>
          ))}
          <Button
            type="button"
            onClick={() => append({ nome: '', telefone: '' })}
          >
            Adicionar Coordenador
          </Button>
        </div>
        <div>
          <FormLabel>Redes sociais</FormLabel>
          {redesFields.map((item, index) => (
            <div key={item.id} className="flex space-x-2">
              <FormField
                control={form.control}
                name={`redesSociais.${index}.rede`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select onValueChange={(value) => field.onChange(value)}>
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
              <Button type="button" onClick={() => removeRedes(index)}>
                Remover
              </Button>
            </div>
          ))}
          {redesFields.length < 2 && (
            <Button type="button" onClick={handleAddRede}>
              Adicionar Rede Social
            </Button>
          )}
        </div>
        <FormField
          control={form.control}
          name="jovesAtivos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jovens ativos</FormLabel>
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
                <Input placeholder="shadcn" {...field} />
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
                <Textarea placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Salvar grupo</Button>
      </form>
    </Form>
  )
}
