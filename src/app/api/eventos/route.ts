import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Importa o schema do Zod
const eventoSchema = z.object({
  titulo: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  local: z.string({ message: 'Campo obrigatório' }).min(3, 'Campo obrigatório'),
  publicoAlvo: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  organizador: z
    .string({ message: 'Campo obrigatório' })
    .min(3, 'Campo obrigatório'),
  dataInicio: z.string({
    message: 'Campo obrigatório',
  }),
  dataFim: z.string({
    message: 'Campo obrigatório',
  }),
  descricao: z
    .string({ message: 'Campo obrigatório' })
    .min(1, 'Campo obrigatório'),
})

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Valida o corpo da requisição usando o schema do Zod
    const eventoData = eventoSchema.parse(body)

    // Cria um novo evento no banco de dados
    const evento = await prisma.evento.create({
      data: {
        titulo: eventoData.titulo,
        local: eventoData.local,
        publicoAlvo: eventoData.publicoAlvo,
        organizador: eventoData.organizador,
        dataInicio: eventoData.dataInicio,
        dataFim: eventoData.dataFim,
        descricao: eventoData.descricao,
      },
    })

    return NextResponse.json(evento, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    return NextResponse.json({ error: 'Erro ao criar evento' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const eventos = await prisma.evento.findMany({
      orderBy: {
        dataInicio: 'asc',
      },
    })

    return NextResponse.json(eventos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
