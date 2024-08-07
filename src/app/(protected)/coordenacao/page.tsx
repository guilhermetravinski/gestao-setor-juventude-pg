import { File, Pencil } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { CoordenadorDiocesano } from '@/lib/definitions'
import { getInitials } from '@/lib/utils'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

async function getCoordenadores() {
  const res = await fetch(`${API_BASE_URL}/api/coordenadores`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar coordenadores')
  }
  return res.json()
}

export default async function CoordenacaoPage() {
  const coordenacao = (await getCoordenadores()) as CoordenadorDiocesano[]
  console.log(coordenacao)
  return (
    <main className="flex flex-1 flex-col gap-8 bg-muted/40 p-10">
      <div className="mx-auto flex w-full max-w-6xl gap-2">
        <h1 className="mr-auto text-3xl font-semibold">
          Coordenação diocesana
        </h1>
        <Link href="/coordenacao/editar" passHref>
          <Button size="sm" variant="outline">
            <Pencil className="mr-2 h-4 w-4" />
            Editar
          </Button>
        </Link>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {coordenacao.length === 0 && (
          <div className="flex- col-span-1 md:col-span-3">
            <div className="flex flex-col items-center justify-center">
              <File className="h-16 w-16 text-muted-foreground" />
              <span className="mt-4 text-muted-foreground">
                Ainda não há coordenadores diocesanos
              </span>
            </div>
          </div>
        )}
        {coordenacao.map((coordenador, index) => (
          <CardCoordenador
            key={index}
            representacao={coordenador.representacao}
            nome={coordenador.nome}
            paroquia={coordenador.paroquia}
            telefone={coordenador.telefone}
          />
        ))}
      </div>
    </main>
  )
}

interface CardCoordenadorProps {
  nome: string
  telefone: string
  representacao: string
  paroquia: string
}
async function CardCoordenador({
  nome,
  telefone,
  representacao,
  paroquia,
}: CardCoordenadorProps) {
  return (
    <div className="flex rounded-full bg-background p-6 shadow sm:p-0">
      <Avatar className="hidden h-32 w-32 sm:flex">
        <AvatarImage
          src="https://github.com/guilhermetravinski.pnga"
          alt="Avatar"
        />
        <AvatarFallback className="text-4xl">
          {getInitials(nome)}
        </AvatarFallback>
      </Avatar>
      <div className="ml-3 flex flex-col justify-center p-4">
        <span className="mb-2 text-lg font-bold"> {representacao}</span>
        <p className="mb-1 leading-none text-foreground">{nome}</p>
        <p className="text-sm text-muted-foreground">{telefone}</p>
        <p className="text-sm text-muted-foreground">{paroquia}</p>
      </div>
    </div>
  )
}
