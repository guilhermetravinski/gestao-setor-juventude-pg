'use client'

import { File, Trash } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
// import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Evento, Organizador } from '@/lib/definitions'

import { DialogNovoEvento } from './dialog-novo-evento'

interface EventosListProps {
  organizadoresApi: Organizador[]
}

export function EventosList({ organizadoresApi }: EventosListProps) {
  //   const [date, setDate] = useState<DateRange | undefined>()
  const [eventos, setEventos] = useState<Evento[]>([
    {
      titulo: 'Festival de música',
      local: 'Salão da Paróquia',
      dataInicio: new Date(),
      dataFim: new Date(),
      descricao: 'Evento do grupo de jovens',
    },
  ])

  function handleRemoveEvento(removeEvento: Evento) {
    setEventos((prevEventos) =>
      prevEventos.filter((evento) => evento !== removeEvento),
    )
  }

  function handleAddEvento(evento: Evento) {
    setEventos((prevEventos) => [...prevEventos, evento])
  }
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col-reverse items-start gap-6 md:flex-row">
      <div className="mx-auto w-full md:max-w-3xl">
        <Card>
          <CardHeader className="flex flex-row space-y-0">
            <CardTitle>Eventos</CardTitle>
            <DialogNovoEvento
              onClose={handleAddEvento}
              organizadoresApi={organizadoresApi}
            />
          </CardHeader>
          <CardContent className="flex flex-col">
            {eventos.length === 0 ? (
              <div className="flex flex-col items-center justify-center">
                <File className="h-16 w-16 text-muted-foreground" />
                <span className="mt-4 text-muted-foreground">
                  Ainda não há eventos
                </span>
              </div>
            ) : (
              <div className="space-y-6">
                {eventos.map((evento, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0">
                      <CardTitle>{evento.titulo}</CardTitle>

                      <Button
                        variant="ghost"
                        onClick={() => handleRemoveEvento(evento)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                      <span>Local: {evento.local}</span>
                      <span>
                        Data: {evento.dataInicio.toLocaleDateString()}
                      </span>
                      <span>Descrição: {evento.descricao}</span>
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
