import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z } from 'zod'

// Importa o schema do Zod para validação
const eventoUpdateSchema = z.object({
  titulo: z.string().optional(),
  local: z.string().optional(),
  publicoAlvo: z.string().optional(),
  organizador: z.string().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  descricao: z.string().optional(),
})

const prisma = new PrismaClient()

export async function PUT(
  request: NextRequest,
  { params }: { params: { eventoId: string } },
) {
  const token = await getToken({ req: request })
  if (!token) {
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { eventoId } = params

  try {
    const body = await request.json()

    // Valida o corpo da requisição usando o schema do Zod
    const eventoData = eventoUpdateSchema.parse(body)

    // Verifica se o evento existe
    const existingEvento = await prisma.evento.findUnique({
      where: { id: eventoId },
    })

    if (!existingEvento) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 },
      )
    }

    // Atualiza o evento no banco de dados
    const updatedEvento = await prisma.evento.update({
      where: { id: eventoId },
      data: eventoData,
    })

    return NextResponse.json(updatedEvento)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error)
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    return NextResponse.json(
      { error: 'Erro ao atualizar evento' },
      { status: 500 },
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { eventoId: string } },
) {
  const { eventoId } = params
  const token = await getToken({ req: request })
  if (!token) {
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verifica se o evento existe
    const existingEvento = await prisma.evento.findUnique({
      where: { id: eventoId },
    })

    if (!existingEvento) {
      return NextResponse.json(
        { error: 'Evento não encontrado' },
        { status: 404 },
      )
    }

    // Deleta o evento
    await prisma.evento.delete({
      where: { id: eventoId },
    })

    return NextResponse.json({ message: 'Evento excluído com sucesso' })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
