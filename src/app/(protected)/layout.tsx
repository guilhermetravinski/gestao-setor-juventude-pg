import { Menu, Package2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { EventosProximosDropdown } from '@/components/EventosProximosDropdown'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { UserDropdown } from '@/components/UserDropdown'
import { getEventosProximos } from '@/lib/api/eventos'

import logo from '../../../public/logo.png'
import NavLink from './nav-link'

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const eventosProximos = await getEventosProximos()

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <Image
                src={logo}
                alt="Logo do Setor Juventude de Ponta Grossa"
                height={36}
                className="rounded-lg"
                placeholder="blur"
              />
              <span className="sr-only">
                Logo do Setor Juventude de Ponta Grossa
              </span>
            </Link>
            <NavLink slug="/admin/coordenacao">Coordenação</NavLink>
            <NavLink slug="/admin/grupos">Grupos</NavLink>
            <NavLink slug="/admin/movimentos-e-pastorais">
              Movimentos e pastorais
            </NavLink>
            <NavLink slug="/admin/agenda">Agenda</NavLink>
          </nav>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">Acme Inc</span>
                </Link>

                <Link
                  href="/coordenacao"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Coordenação
                </Link>
                <Link
                  href="/grupos"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Grupos
                </Link>
                <Link href="/agenda" className="hover:text-foreground">
                  Agenda
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-4 md:gap-2 lg:gap-4">
            <EventosProximosDropdown eventos={eventosProximos} />
            <ModeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>
      {children}
    </div>
  )
}
