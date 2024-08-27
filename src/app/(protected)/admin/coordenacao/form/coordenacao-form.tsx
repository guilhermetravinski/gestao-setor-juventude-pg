'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { Plus, Trash } from 'lucide-react'
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
import { useToast } from '@/components/ui/use-toast'
import { paroquias as totalParoquias, setores } from '@/data/setores'
import { CoordenadorDiocesano, Organizador } from '@/lib/definitions'
import { storage } from '@/lib/firebase'
import { processImage } from '@/lib/processImage'
import { sendEmailsWithLog } from '@/lib/sendTermsEmailsWithLog'

import { formSchema, FormSchemaType } from './form-schema'

interface CoordenacaoFormProps {
  coordenadores: CoordenadorDiocesano[]
  representacoes: Organizador[]
}

export function CoordenacaoForm({
  coordenadores,
  representacoes,
}: CoordenacaoFormProps) {
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
  const [avatarUrl, setAvatarUrl] = useState<string[]>(
    parsedData.coordenadores.map((coordenador) => coordenador.avatarUrl ?? ''),
  )
  const [uploading, setUploading] = useState(false)

  function updateAvatarUrl(index: number, newUrl: string) {
    setAvatarUrl((prevUrls) => {
      const updatedUrls = [...prevUrls]
      updatedUrls[index] = newUrl
      return updatedUrls
    })
  }

  const handleImageUpload = async (file: File | null, index: number) => {
    if (!file) return
    setUploading(true)
    try {
      const processedFile = await processImage(file)
      const imageRef = ref(storage, `avatars/${file.name}-${Date.now()}`)
      const snapshot = await uploadBytes(imageRef, processedFile)
      const url = await getDownloadURL(snapshot.ref)
      updateAvatarUrl(index, url)
      form.setValue(`coordenadores.${index}.avatarUrl`, url)
    } catch (error) {
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleAddCoordenador = () => {
    append({
      nome: '',
      representacao: '',
      telefone: '',
      email: '',
      paroquia: '',
    })
    // Atualiza paroquiasPorCoordenador adicionando as paróquias padrão
    setParoquiasPorCoordenador((prevState) => [...prevState, totalParoquias])
  }

  const [paroquiasPorCoordenador, setParoquiasPorCoordenador] = useState<
    string[][]
  >(fields.map(() => totalParoquias))

  const handleRepresentationChange = (value: string, index: number) => {
    let novasParoquias: string[] = []

    if (value.includes('Setor')) {
      const setorData = setores.find((setor) => setor.label === value)
      novasParoquias = setorData ? setorData.paroquias : []
    } else {
      novasParoquias = totalParoquias
    }

    setParoquiasPorCoordenador((prevState) => {
      const updatedParoquias = [...prevState]
      updatedParoquias[index] = novasParoquias
      return updatedParoquias
    })
  }

  const router = useRouter()

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const url = `${API_BASE_URL}/api/coordenadoresDiocesanos`
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (response.ok) {
        if (values.coordenadores) {
          const emailsCoordenadores = values.coordenadores.map(
            (coordenador) => coordenador.email,
          )
          await sendEmailsWithLog(emailsCoordenadores)
        }
        toast({
          variant: 'success',
          title: `Coordenadores editados com sucesso`,
          duration: 3000,
        })
        router.push('/admin/coordenacao')
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
                <div className="mb-6">
                  <FormLabel>Avatar</FormLabel>
                  <Input
                    className="mt-2"
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      handleImageUpload(
                        e.target.files ? e.target.files[0] : null,
                        index,
                      )
                    }
                    disabled={uploading}
                  />
                  {avatarUrl[index] && (
                    <div className="mt-4 flex justify-center">
                      <Image
                        src={avatarUrl[index]}
                        alt="Avatar"
                        width={128}
                        height={128}
                        className="rounded-full object-cover"
                      />
                      <Button
                        type="button"
                        size="icon"
                        onClick={() => {
                          updateAvatarUrl(index, '')
                          form.setValue(`coordenadores.${index}.avatarUrl`, '')
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
                        <Select
                          value={field.value}
                          onValueChange={(value) => {
                            field.onChange(value)
                            handleRepresentationChange(value, index)
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma representação" />
                          </SelectTrigger>
                          <SelectContent>
                            {representacoes.map((representacao, i) => (
                              <SelectItem key={i} value={representacao.nome}>
                                {representacao.nome}
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
                  name={`coordenadores.${index}.paroquia`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Paróquia{' '}
                        <span className="text-xs text-rose-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma paróquia" />
                          </SelectTrigger>
                          <SelectContent>
                            {paroquiasPorCoordenador[index].map(
                              (paroquia, i) => (
                                <SelectItem key={i} value={paroquia}>
                                  {paroquia}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
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
                onClick={handleAddCoordenador}
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
          <Button type="submit" disabled={form.formState.isLoading}>
            Salvar coordenadores
          </Button>
        </div>
      </form>
    </Form>
  )
}
