import Image from 'next/image'

// import Link from 'next/link'
// import { signOut } from 'next-auth/react'
// import { Button } from '@/components/ui/button'
import logo from '../../../public/logo.png'

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-4">
      <Image
        src={logo}
        alt="Logo do Setor Juventude de Ponta Grossa"
        height={36}
        className="rounded-lg"
        placeholder="blur"
      />
      <h1 className="text-xl font-semibold">
        Você não possui acesso ao sistema
      </h1>
      {/* <Link href="/" passHref>
        <Button size="sm" variant="outline" onClick={() => signOut()}>
          Voltar ao login
        </Button>
      </Link> */}
    </div>
  )
}
