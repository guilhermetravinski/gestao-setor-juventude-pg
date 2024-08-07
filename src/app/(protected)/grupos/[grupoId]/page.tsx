import { File, Pencil } from 'lucide-react'
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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { getAtasById } from '@/lib/api/atas'
import { getGrupoById } from '@/lib/api/grupos'
import { getInitials } from '@/lib/utils'

import facebookLogo from '../../../../../public/facebook.svg'
import instagramLogo from '../../../../../public/instagram.svg'
import { Ata, Grupo } from '../../../../lib/definitions'
import { CardAta } from './atas/CardAta'
import { DialogNovaAta } from './atas/DialogNovaAta'

interface GrupoPageProps {
  params: { grupoId: string }
}

export default async function GrupoPage({ params }: GrupoPageProps) {
  const { grupoId } = params
  const grupo = (await getGrupoById(grupoId)) as Grupo
  const atas = (await getAtasById(grupoId)) as Ata[]
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">{grupo.nome}</h1>

        <Link href={`/grupos/${grupoId}/editar`} passHref>
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
                <CardDescription>{grupo.jovensAtivos}</CardDescription>
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
                <DialogNovaAta />
              </CardHeader>
              <CardContent>
                {atas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <File className="h-16 w-16 text-muted-foreground" />
                    <span className="mt-4 text-muted-foreground">
                      Ainda não há atas
                    </span>
                  </div>
                ) : (
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    {atas.map((ata, index) => (
                      <CardAta
                        key={index}
                        ata={ata}
                        lastItem={index >= atas.length - 1}
                      />
                    ))}
                  </ScrollArea>
                )}
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
