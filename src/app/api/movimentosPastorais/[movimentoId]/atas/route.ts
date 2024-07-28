import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { ataSchema } from './form-schema'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { grupoId: string } },
) {
  const { grupoId } = params

  if (!grupoId) {
    return NextResponse.json(
      { error: 'grupoId é obrigatório' },
      { status: 400 },
    )
  }

  try {
    const atas = await prisma.ata.findMany({
      where: { grupoId },
      orderBy: { data: 'desc' },
    })

    return NextResponse.json(atas)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao obter atas', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { grupoId: string } },
) {
  try {
    const { grupoId } = params
    const body = await request.json()
    const parsedData = ataSchema.parse(body)

    const ata = await prisma.ata.create({
      data: {
        grupoId,
        data: new Date(parsedData.data),
        descricao: parsedData.descricao,
      },
    })

    return NextResponse.json(ata, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao criar ata', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
