'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Plus, Trash, XCircle } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
import { MovimentoPastoral } from '@/lib/definitions'
import { storage } from '@/lib/firebase'
import { processImage } from '@/lib/processImage'

import { formSchema, FormSchemaType } from './form-schema'

interface MovimentoPastoralFormProps {
  defaultValues?: MovimentoPastoral
  mode: 'new' | 'update'
}

export function MovimentoPastoralForm({
  defaultValues,
  mode = 'new',
}: MovimentoPastoralFormProps) {
  const form = useForm<FormSchemaType>({
    mode: 'all',
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: defaultValues?.nome ?? '',
      tipo: defaultValues?.tipo,
      avatarUrl: defaultValues?.avatarUrl ?? '',
      localAtuacao: defaultValues?.localAtuacao ?? '',
      anoFundacao: defaultValues?.anoFundacao ?? '',
      carisma: defaultValues?.carisma ?? '',
      biografia: defaultValues?.biografia ?? '',
      coordenadores: defaultValues?.coordenadores ?? [],
      jovensAtivos: defaultValues?.jovensAtivos,
      redesSociais: defaultValues?.redesSociais ?? [],
      observacoes: defaultValues?.observacoes ?? '',
      atividades: defaultValues?.atividades ?? '',
    },
  })
  const { toast } = useToast()

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'coordenadores',
  })

  const {
    fields: redesFields,
    append: appendRedes,
    remove: removeRedes,
  } = useFieldArray({
    control: form.control,
    name: 'redesSociais',
  })

  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    defaultValues?.avatarUrl ?? null,
  )
  const [uploading, setUploading] = useState(false)

  const handleImageUpload = async (file: File | null) => {
    if (!file) return
    setUploading(true)
    try {
      const processedFile = await processImage(file)
      const imageRef = ref(storage, `avatars/${file.name}-${Date.now()}`)
      const snapshot = await uploadBytes(imageRef, processedFile)
      const url = await getDownloadURL(snapshot.ref)
      setAvatarUrl(url)
      form.setValue('avatarUrl', url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const currentYear = new Date().getFullYear()
  const years = Array.from(new Array(50), (val, index) => currentYear - index)
  const router = useRouter()

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url =
        mode === 'new'
          ? `${API_BASE_URL}/api/movimentosPastorais`
          : `${API_BASE_URL}/api/movimentosPastorais/${defaultValues?.id}`

      const response = await fetch(url, {
        method: mode === 'new' ? 'POST' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        toast({
          variant: 'success',
          title: `Movimento ou pastoral ${mode === 'new' ? 'cadastrado' : 'atualizado'} com sucesso`,
          duration: 3000,
        })
        const redirectUrl =
          mode === 'new'
            ? '/admin/movimentos-e-pastorais'
            : `/admin/movimentos-e-pastorais/${defaultValues?.id}`
        router.push(redirectUrl)
        router.refresh()
      } else {
        const errorData = await response.json()
        toast({
          variant: 'destructive',
          title: `Erro ao ${mode === 'new' ? 'cadastrar' : 'atualizar'} movimento ou pastoral`,
          description: errorData.error,
          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Erro ao ${mode === 'new' ? 'cadastrar' : 'atualizar'} movimento ou pastoral`,
        duration: 3000,
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
                <Input placeholder="Nome do movimento ou pastoral" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />{' '}
        <div className="mb-6">
          <FormLabel>Avatar</FormLabel>
          <Input
            className="mt-2"
            type="file"
            accept="image/*"
            onChange={(e) =>
              handleImageUpload(e.target.files ? e.target.files[0] : null)
            }
            disabled={uploading}
          />
          {avatarUrl && (
            <div className="mt-4 flex justify-center">
              <Image
                src={avatarUrl}
                alt="Avatar"
                width={128}
                height={128}
                className="rounded-full object-cover"
              />
              <Button
                type="button"
                size="icon"
                onClick={() => {
                  setAvatarUrl(null)
                  form.setValue('avatarUrl', '')
                }}
                variant="ghost"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
        <FormField
          control={form.control}
          name="tipo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tipo <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione movimento ou pastoral" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Movimento">Movimento</SelectItem>
                    <SelectItem value="Pastoral">Pastoral</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="localAtuacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Local de atuação{' '}
                <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Paróquias ou comunidades" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="carisma"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Carisma</FormLabel>
              <FormControl>
                <Input placeholder="Informe o carisma" {...field} />
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
                <Select value={field.value} onValueChange={field.onChange}>
                  <div className="flex flex-row">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o ano de fundação" />
                    </SelectTrigger>{' '}
                    <Button
                      type="button"
                      variant="ghost"
                      className="ml-2"
                      size="icon"
                      onClick={(e) => {
                        form.setValue('anoFundacao', '')
                        e.stopPropagation()
                      }}
                    >
                      <XCircle className="text-foreground" />
                    </Button>
                  </div>
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
                  maxLength={500}
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
                <FormField
                  control={form.control}
                  name={`coordenadores.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        E-mail <span className="text-xs text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="E-mail do coordenador" {...field} />
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
                onClick={() => append({ nome: '', telefone: '', email: '' })}
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
                          value={field.value}
                          onValueChange={(value) => field.onChange(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a rede social" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Instagram">Instagram</SelectItem>
                            <SelectItem value="Facebook">Facebook</SelectItem>
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
          name="jovensAtivos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Jovens ativos <span className="text-xs text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
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
          name="atividades"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Atividades</FormLabel>
              <FormControl>
                <Textarea
                  maxLength={500}
                  placeholder="Atividades realizadas"
                  {...field}
                />
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
                  placeholder="Observações sobre o movimento ou pastoral"
                  {...field}
                  maxLength={500}
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
          <Button type="submit" disabled={form.formState.isLoading}>
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
