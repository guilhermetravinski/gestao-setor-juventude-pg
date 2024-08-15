import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'

import logo from '../../public/logo.png'

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Image
        src={logo}
        alt="Logo do Setor Juventude de Ponta Grossa"
        height={36}
        className="rounded-lg"
        placeholder="blur"
      />
      <h1 className="text-xl font-semibold">Página não encontrada</h1>
      <Link href="/" passHref>
        <Button size="sm" variant="outline">
          Voltar ao início
        </Button>
      </Link>
    </div>
  )
}
