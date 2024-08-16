import { Metadata } from 'next'
import Image from 'next/image'

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
        <div className="flex justify-center pb-6 lg:hidden">
          <Image
            src={logo}
            alt="Logo do Setor Juventude de Ponta Grossa"
            height={36}
            className="rounded-lg"
            placeholder="blur"
          />
        </div>
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-zinc-900" />

          <div className="relative z-20">
            <Image
              src={logo}
              alt="Logo do Setor Juventude de Ponta Grossa"
              height={36}
              className="rounded-lg"
              placeholder="blur"
            />
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
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
