import { Metadata } from 'next'
import Image from 'next/image'

import { ModeToggle } from '@/components/mode-toggle'

import fotoInicial from '../../../../public/foto-inicial.jpg'
// import Link from 'next/link'
// import { buttonVariants } from '@/components/ui/button'
// import { cn } from '@/lib/utils'
import logo from '../../../../public/logo.png'
import { UserAuthForm } from './UserAuthForm'

export const metadata: Metadata = {
  title: 'Acesse sua conta',
  description: 'Entre na sua conta para acessar o sistema.',
}

export default function AuthenticationPage() {
  return (
    <>
      <div className="container relative flex min-h-screen flex-col items-center justify-center pt-8 lg:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:pt-0">
        {/* <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'absolute right-4 top-4 md:right-8 md:top-8',
          )}
        >
          Login
        </Link> */}

        <div className="absolute right-4 top-4 md:right-8 md:top-8">
          <ModeToggle />
        </div>

        <div className="relative hidden h-full flex-col bg-muted text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />

          <div className="relative z-20 block">
            <Image
              src={fotoInicial}
              width={1920}
              height={1080}
              alt="Foto dos integrantes da Coordenação Diocesana do Setor Juventude de Ponta Grossa"
              placeholder="blur"
              className="min-h-screen object-cover"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col items-center text-center">
              <Image
                src={logo}
                priority
                alt="Logo do Setor Juventude de Ponta Grossa"
                height={44}
                className="mb-6 rounded-lg"
                placeholder="blur"
              />
              <h1 className="text-2xl font-semibold tracking-tight">
                Entre na sua conta
              </h1>
              <p className="text-sm text-muted-foreground">
                Acesse usa conta no Google para continuar
              </p>
            </div>
            <UserAuthForm />
            {/* <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{' '}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p> */}
          </div>
        </div>
      </div>
    </>
  )
}
