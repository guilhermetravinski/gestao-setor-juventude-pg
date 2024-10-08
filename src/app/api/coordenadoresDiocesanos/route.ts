import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateSchema = z.object({
  coordenadores: z.array(
    z.object({
      paroquia: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O campo deve ter pelo menos 3 caracteres.',
      }),
      avatarUrl: z.string().nullable().optional(),
      representacao: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O campo deve ter pelo menos 3 caracteres.',
      }),
      nome: z.string({ message: 'Campo obrigatório' }).min(3, {
        message: 'O nome deve ter pelo menos 3 caracteres.',
      }),
      telefone: z
        .string({ message: 'Campo obrigatório' })
        .regex(/^\(\d{2}\) \d{1} \d{4}-\d{4}$/, {
          message: 'O telefone deve estar no formato (99) 9 9999-9999.',
        }),
      email: z
        .string({ message: 'Campo obrigatório' })
        .email({ message: 'E-mail inválido' }),
    }),
  ),
})

export async function GET(request: NextRequest) {
  const token = await getToken({
    req: request,
  })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const coordenadores = await prisma.coordenadorDiocesano.findMany()
    return NextResponse.json(coordenadores)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao obter coordenadores', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const token = await getToken({
    req: request,
  })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()
    const parsedData = updateSchema.parse(body)

    // Deleta todos os registros da tabela CoordenadorDiocesano
    await prisma.coordenadorDiocesano.deleteMany({})

    // Insere os novos registros
    await prisma.coordenadorDiocesano.createMany({
      data: parsedData.coordenadores,
    })

    return NextResponse.json({ status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao atualizar coordenadores', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
