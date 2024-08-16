import { File, Pencil } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { ExportDropdown } from '@/components/ExportDropdown'
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
import { getMovimentoPastoralById } from '@/lib/api/movimentosPastorais'
import { getInitials } from '@/lib/utils'

import facebookLogo from '../../../../../../public/facebook.svg'
import instagramLogo from '../../../../../../public/instagram.svg'
import { MovimentoPastoral } from '../../../../../lib/definitions'
import { CardAta } from './atas/CardAta'
import { DialogNovaAta } from './atas/DialogNovaAta'

interface GrupoPageProps {
  params: { movimentoPastoralId: string }
}

export default async function GrupoPage({ params }: GrupoPageProps) {
  const { movimentoPastoralId } = params
  const movimentoPastoral = (await getMovimentoPastoralById(
    movimentoPastoralId,
  )) as MovimentoPastoral
  return (
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-6 bg-muted/40 p-6 md:gap-8 md:p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <div className="mr-auto">
          <h1 className="text-3xl font-semibold">{movimentoPastoral.nome}</h1>
          <h2 className="text-lg text-muted-foreground">
            {movimentoPastoral.tipo}
          </h2>
        </div>

        <Link
          href={`/admin/movimentos-e-pastorais/${movimentoPastoralId}/editar`}
          passHref
        >
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
                <CardDescription>
                  {movimentoPastoral.jovensAtivos}
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Atividades</CardTitle>

                <CardDescription>
                  {movimentoPastoral.atividades &&
                  movimentoPastoral.atividades !== ''
                    ? movimentoPastoral.atividades
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
                {movimentoPastoral.redesSociais.length > 0 ? (
                  movimentoPastoral.redesSociais.map((redeSocial, index) => (
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
                {movimentoPastoral.coordenadores.length > 0 ? (
                  movimentoPastoral.coordenadores.map((coordenador, index) => (
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
                <ExportDropdown
                  data={movimentoPastoral.atas}
                  type="atas"
                  disabled={movimentoPastoral.atas.length === 0}
                />
              </CardHeader>
              <CardContent>
                {movimentoPastoral.atas.length === 0 ? (
                  <div className="flex flex-col items-center justify-center">
                    <File className="h-16 w-16 text-muted-foreground" />
                    <span className="mt-4 text-muted-foreground">
                      Ainda não há atas
                    </span>
                  </div>
                ) : (
                  <ScrollArea className="h-[300px] rounded-md border p-4">
                    {movimentoPastoral.atas.map((ata, index) => (
                      <CardAta
                        key={index}
                        ata={ata}
                        lastItem={index >= movimentoPastoral.atas.length - 1}
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
                <span className="font-semibold">Carisma</span>
                <span className="text-muted-foreground">
                  {movimentoPastoral.carisma && movimentoPastoral.carisma !== ''
                    ? movimentoPastoral.carisma
                    : 'Não informado'}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Local de atuação</span>
                <span className="text-muted-foreground">
                  {movimentoPastoral.localAtuacao}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Ano de fundação</span>
                <span className="text-muted-foreground">
                  {movimentoPastoral.anoFundacao &&
                  movimentoPastoral.anoFundacao !== ''
                    ? movimentoPastoral.anoFundacao
                    : 'Não informado'}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Biografia</span>
                <span className="text-muted-foreground">
                  {movimentoPastoral.biografia &&
                  movimentoPastoral.biografia !== ''
                    ? movimentoPastoral.biografia
                    : 'Não informado'}
                </span>
                <Separator className="my-3" />
                <span className="font-semibold">Observações</span>
                <span className="text-muted-foreground">
                  {movimentoPastoral.observacoes &&
                  movimentoPastoral.observacoes !== ''
                    ? movimentoPastoral.observacoes
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
