'use client'

import { format } from 'date-fns'
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Evento } from '@/lib/definitions'

import { TooltipTipoEvento } from './TooltipTipoEvento'
import { Button } from './ui/button'

interface EventsDropdownProps {
  eventos: Evento[]
}

export function EventosProximosDropdown({ eventos }: EventsDropdownProps) {
  const router = useRouter()

  function handleRedirect(event: Evento) {
    const url = `/admin/agenda?mes=${new Date(event.dataInicio).getMonth() + 1}&ano=${new Date(event.dataInicio).getFullYear()}`
    router.push(url)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {eventos.length > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {eventos.length}
            </span>
          )}
          <span className="sr-only">Notificações de eventos</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Próximos Eventos</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex max-h-96 w-64 flex-col gap-1 overflow-auto">
          {eventos.length > 0 ? (
            eventos.map((event) => (
              <div key={event.id} className="flex pl-1">
                <TooltipTipoEvento evento={event} />
                <DropdownMenuItem
                  className="ml-2 flex w-full flex-col items-start gap-2"
                  onClick={() => handleRedirect(event)}
                >
                  <span>{event.titulo}</span>

                  <span className="text-xs text-gray-500">
                    {format(new Date(event.dataInicio), 'dd/MM/yyyy - HH:mm')}
                  </span>
                </DropdownMenuItem>
              </div>
            ))
          ) : (
            <DropdownMenuItem>
              <span>Nenhum evento próximo</span>
            </DropdownMenuItem>
          )}{' '}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
