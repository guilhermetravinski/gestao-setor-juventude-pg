'use client'

import { addMonths, format, startOfToday, subMonths } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'

export function MonthNavigator() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const today = startOfToday()
  const currentYearValue = today.getFullYear()

  const minYear = currentYearValue - 2
  const maxYear = currentYearValue + 2

  const [date, setDate] = useState(today)

  // useEffect para monitorar mudanças nos query params
  useEffect(() => {
    const month = searchParams.get('mes')
    const year = searchParams.get('ano')

    if (month && year) {
      const newDate = new Date(parseInt(year), parseInt(month) - 1)
      if (
        newDate.getFullYear() >= minYear &&
        newDate.getFullYear() <= maxYear
      ) {
        setDate(newDate)
      }
    }
  }, [searchParams, minYear, maxYear])

  useEffect(() => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1

    const params = new URLSearchParams(window.location.search)
    params.set('mes', month.toString())
    params.set('ano', year.toString())

    router.push(`?${params.toString()}`)
  }, [date, router])

  function handlePreviousMonth() {
    setDate((prevDate) => subMonths(prevDate, 1))
  }

  function handleNextMonth() {
    setDate((prevDate) => addMonths(prevDate, 1))
  }

  const isAtMinDate = date.getFullYear() === minYear && date.getMonth() === 0
  const isAtMaxDate = date.getFullYear() === maxYear && date.getMonth() === 11

  return (
    <div className="mb-4 flex items-center justify-center space-x-4">
      <Button
        size="icon"
        variant="ghost"
        onClick={handlePreviousMonth}
        aria-label="Mês anterior"
        disabled={isAtMinDate}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <h2 className="w-40 text-center text-lg font-semibold">
        {format(date, 'MMMM yyyy', { locale: ptBR })}
      </h2>
      <Button
        size="icon"
        variant="ghost"
        onClick={handleNextMonth}
        disabled={isAtMaxDate}
        aria-label="Próximo mês"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
