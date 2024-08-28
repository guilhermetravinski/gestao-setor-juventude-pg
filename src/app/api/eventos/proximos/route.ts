import { addDays, startOfDay } from 'date-fns'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  // Verifica o token de autenticação
  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Define o intervalo de datas (hoje até 7 dias a partir de hoje)
    const today = startOfDay(new Date())
    const sevenDaysFromNow = addDays(today, 7)

    // Consulta os eventos no banco de dados
    const eventosProximos = await prisma.evento.findMany({
      where: {
        dataInicio: {
          gte: today, // Maior ou igual a hoje
          lte: sevenDaysFromNow, // Menor ou igual a 7 dias a partir de hoje
        },
      },
      orderBy: {
        dataInicio: 'asc', // Ordena por data de início em ordem crescente
      },
    })

    return NextResponse.json(eventosProximos)
  } catch (error) {
    console.error('Erro ao buscar eventos próximos:', error)
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
