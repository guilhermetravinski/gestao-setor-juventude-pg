import { Pencil } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

function CardCoordenador({ setor }: { setor: string }) {
  return (
    <div className="flex rounded-full bg-background p-6 shadow sm:p-0">
      <Avatar className="hidden h-32 w-32 sm:flex">
        <AvatarImage
          src="https://github.com/guilhermetravinski.png"
          alt="Avatar"
        />
        <AvatarFallback>OM</AvatarFallback>
      </Avatar>
      <div className="ml-3 flex flex-col justify-center p-4">
        <span className="mb-2 text-lg font-bold">Setor {setor}</span>
        <p className="mb-1 leading-none text-foreground">
          Guilherme Travinski Ferreira
        </p>
        <p className="text-sm text-muted-foreground">42 95416-4516</p>
      </div>
    </div>
  )
}

export default function CoordenacaoPage() {
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
        <CardCoordenador setor="1" />
        <CardCoordenador setor="2" />
        <CardCoordenador setor="3" />
        <CardCoordenador setor="4" />
        <CardCoordenador setor="5" />
        <CardCoordenador setor="6" />
        <CardCoordenador setor="7" />
        <CardCoordenador setor="8" />
      </div>
    </main>
  )
}
