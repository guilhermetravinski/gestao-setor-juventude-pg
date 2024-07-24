import { File, Pencil, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
import { getInitials } from '@/lib/utils'

import facebookLogo from '../../../../../public/facebook.svg'
import instagramLogo from '../../../../../public/instagram.svg'
import { Grupo } from '../../../../lib/definitions'

interface GrupoPageProps {
  params: { idGrupo: string }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function getGrupoById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/grupos/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.log(res)
    throw new Error('Erro ao buscar grupo')
  }

  return res.json()
}

export default async function GrupoPage({ params }: GrupoPageProps) {
  const { idGrupo } = params
  const grupo = (await getGrupoById(idGrupo)) as Grupo
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">{grupo.nome}</h1>

        <Link href={`/grupos/${idGrupo}/editar`} passHref>
          <Button size="sm" variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </Link>
      </div>
      <div className="mx-auto w-full max-w-6xl items-start gap-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="col-span-1 grid grid-cols-1 gap-6 md:col-span-2 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Jovens ativos</CardTitle>
                <CardDescription>{grupo.jovesAtivos}</CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reuniões</CardTitle>

                <CardDescription>
                  {grupo.reunioes && grupo.reunioes !== ''
                    ? grupo.reunioes
                    : 'Não informado'}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Redes Sociais</CardTitle>
              </CardHeader>
              <CardContent>
                {grupo.redesSociais.length > 0 ? (
                  grupo.redesSociais.map((redeSocial, index) => (
                    <div className="flex gap-3" key={index}>
                      <Image
                        src={
                          redeSocial.rede === 'Facebook'
                            ? facebookLogo
                            : instagramLogo
                        }
                        alt={''}
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold">{redeSocial.rede}</span>
                        <span className="text-muted-foreground">
                          {redeSocial.nomeUsuario}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span>Não informado</span>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Coordenação</CardTitle>
              </CardHeader>
              <CardContent>
                {grupo.coordenadores.length > 0 ? (
                  grupo.coordenadores.map((coordenador, index) => (
                    <div className="flex gap-3" key={index}>
                      <Avatar>
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>
                          {getInitials(coordenador.nome)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {coordenador.nome}
                        </span>
                        <span className="text-muted-foreground">
                          {coordenador.telefone}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <span> Não informado</span>
                )}
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
                <span className="text-muted-foreground">{grupo.setor}</span>
                <Separator className="my-3" />
                <span className="font-semibold">Paróquia</span>
                <span className="text-muted-foreground">{grupo.paroquia}</span>
                <Separator className="my-3" />
                <span className="font-semibold">Comunidade</span>
                <span className="text-muted-foreground">
                  {grupo.comunidade}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Ano de fundação</span>
                <span className="text-muted-foreground">
                  {grupo.anoFundacao && grupo.anoFundacao !== ''
                    ? grupo.anoFundacao
                    : 'Não informado'}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Biografia</span>
                <span className="text-muted-foreground">
                  {grupo.biografia && grupo.biografia !== ''
                    ? grupo.biografia
                    : 'Não informado'}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Observações</span>
                <span className="text-muted-foreground">
                  {grupo.observacoes && grupo.observacoes !== ''
                    ? grupo.observacoes
                    : 'Não informado'}
                </span>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
