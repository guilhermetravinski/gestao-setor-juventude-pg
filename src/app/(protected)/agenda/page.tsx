'use client'

import { File, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AgendaPage() {
  const [date, setDate] = useState<DateRange | undefined>()

  useEffect(() => console.log(date), [date])

  return (
    <main className="flex flex-1 flex-col gap-8 bg-muted/40 p-10">
      <div className="mx-auto w-full max-w-6xl">
        <h1 className="text-3xl font-semibold">Agenda</h1>
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-start gap-6 md:flex-row">
        <div className="w-full md:w-[1000px]">
          <Card>
            <CardHeader className="flex flex-row space-y-0">
              <CardTitle>Evento</CardTitle>
              <Button size="sm" className="ml-auto">
                <Plus className="mr-2 h-4 w-4" />
                Novo evento
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col">
              <div className="flex flex-col items-center justify-center">
                <File className="h-16 w-16 text-muted-foreground" />
                <span className="mt-4 text-muted-foreground">
                  Ainda não há atas
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="w-full md:w-[264px]">
          <div className="flex justify-center">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              className="rounded-md border bg-white"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
