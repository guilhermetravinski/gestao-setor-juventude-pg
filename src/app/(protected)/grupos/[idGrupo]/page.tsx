import { File, Pencil, Plus } from 'lucide-react'
import Image from 'next/image'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import instagramLogo from '../../../../../public/instagram.svg'

interface GrupoPageProps {
  params: { idGrupo: string }
}

async function getGrupoById(id: string) {
  const res = await fetch(`http://localhost:3000/api/grupos/${id}`, {
    cache: 'no-store'
  })

  if (!res.ok) {
    console.log(res)
    throw new Error('Erro ao buscar grupo')
  }

  return res.json()
}

export default async function GrupoPage({ params }: GrupoPageProps) {
  const { idGrupo } = params
  const grupo = await getGrupoById(idGrupo)
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">{grupo.nome}</h1>
        <Button size="sm" variant="outline">
          <Pencil className="mr-2 h-4 w-4" />
          Editar
        </Button>
      </div>
      <div className="mx-auto w-full max-w-6xl items-start gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1 grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Jovens ativos</CardTitle>
                <CardDescription>Cerca de 20</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reuniões</CardTitle>

                <CardDescription> 3º sábado às 14h</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Image src={instagramLogo} alt={''} />
                  <div className="flex flex-col">
                    <span className="font-semibold">Instagram</span>
                    <span className="text-muted-foreground">juventude.bj</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Coordenação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/guilhermetravinski.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">
                      Guilherme Travinski Ferreira
                    </span>
                    <span className="text-muted-foreground">
                      (42) 99921-8862
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="flex flex-row space-y-0">
                <CardTitle>Atas</CardTitle>

                <Button size="sm" className="ml-auto">
                  <Plus className="mr-2 h-4 w-4" />
                  Nova ata
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center">
                  <File className="h-16 w-16 text-muted-foreground" />
                  <span className="mt-4 text-muted-foreground">
                    Ainda não há atas
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card className="col-span-1 md:col-span-2">
              <CardHeader className="flex flex-row space-y-0">
                <CardTitle>História</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col">
                <span className="font-semibold">Setor</span>
                <span className="text-muted-foreground">3</span>
                <Separator className="my-3" />
                <span className="font-semibold">Paróquia</span>
                <span className="text-muted-foreground">Bom Jesus</span>
                <Separator className="my-3" />
                <span className="font-semibold">Comunidade</span>
                <span className="text-muted-foreground">Matriz</span>
                <Separator className="my-3" />
                <span className="font-semibold">Data de fundação</span>
                <span className="text-muted-foreground">Maio de 2000</span>
                <Separator className="my-3" />
                <span className="font-semibold">Biografia</span>
                <span className="text-muted-foreground">
                  Fundado em 2010, o Grupo de Jovens Nova Esperança surgiu da
                  necessidade de criar um espaço onde os jovens da Paróquia São
                  Pedro pudessem se encontrar, compartilhar suas experiências de
                  fé e desenvolver um senso de comunidade. Desde a sua criação,
                  o grupo tem crescido constantemente, acolhendo jovens de
                  diferentes bairros e realidades sociais.anciscano
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Observações</span>
                <span className="text-muted-foreground">
                  O Grupo de Jovens Nova Esperança tem sido uma bênção para
                  nossa paróquia e para a comunidade como um todo. Fundado há
                  mais de uma década, ele continua a crescer em número e em
                  espírito, proporcionando um espaço acolhedor e formativo para
                  nossos jovens.
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
