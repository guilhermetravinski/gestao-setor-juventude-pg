'use client'

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { File } from 'lucide-react'
import { useSearchParams } from 'next/navigation'

// import { useEffect, useState } from 'react'
// import { DateRange } from 'react-day-picker'
import { DeleteEventoDialog } from '@/components/DeleteEventoDialog'
import { ExportDropdown } from '@/components/ExportDropdown'
import { TooltipTipoEvento } from '@/components/TooltipTipoEvento'
// import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Evento, Organizador } from '@/lib/definitions'

import { DialogEvento } from './DialogEvento'
import { MonthNavigator } from './MonthNavigator'

interface EventosListProps {
  organizadoresApi: Organizador[]
  eventos: Evento[]
}

export function EventosList({ organizadoresApi, eventos }: EventosListProps) {
  const searchParams = useSearchParams()
  const currentMonth = searchParams.get('mes')
  const currentYear = searchParams.get('ano')

  const filteredEventos = eventos.filter((evento) => {
    const eventDate = new Date(evento.dataInicio)
    if (currentMonth && currentYear) {
      return (
        eventDate.getFullYear() === parseInt(currentYear) &&
        eventDate.getMonth() + 1 === parseInt(currentMonth)
      )
    }
    return true // Sem filtro, retorna todos os eventos
  })

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col-reverse items-start gap-6 md:flex-row">
      <div className="mx-auto w-full md:max-w-3xl">
        <MonthNavigator />
        <Card>
          <CardHeader className="flex flex-row space-y-0">
            <CardTitle>Eventos</CardTitle>
            <DialogEvento organizadoresApi={organizadoresApi} mode="new" />
            <ExportDropdown
              data={filteredEventos}
              type="eventos"
              disabled={filteredEventos.length === 0}
            />
          </CardHeader>
          <CardContent className="flex flex-col">
            {filteredEventos.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <File className="h-16 w-16 text-muted-foreground" />
                <span className="mt-4 text-muted-foreground">
                  Ainda não há eventos
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {filteredEventos.map((evento, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <div className="flex items-center gap-2">
                        <TooltipTipoEvento evento={evento} />

                        <CardTitle>{evento.titulo}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <DialogEvento
                          organizadoresApi={organizadoresApi}
                          mode="update"
                          defaultValues={evento}
                        />
                        <DeleteEventoDialog eventoId={evento.id} />
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                      <span>
                        <strong>Local:</strong> {evento.local}
                      </span>
                      <span>
                        <strong>Público alvo:</strong> {evento.publicoAlvo}
                      </span>
                      <span>
                        <strong>Organizador:</strong> {evento.organizador}
                      </span>
                      <span>
                        <strong>Início:</strong>{' '}
                        {format(new Date(evento.dataInicio), 'PPP, HH:mm', {
                          locale: ptBR,
                        })}
                      </span>
                      <span>
                        <strong>Fim:</strong>{' '}
                        {format(new Date(evento.dataFim), 'PPP, HH:mm', {
                          locale: ptBR,
                        })}
                      </span>
                      <span>
                        <strong>Descrição:</strong> {evento.descricao}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {/* <div className="w-full md:max-w-64">
        <div className="flex justify-center">
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            className="rounded-md border bg-white"
          />
        </div>
      </div> */}
    </div>
  )
}
