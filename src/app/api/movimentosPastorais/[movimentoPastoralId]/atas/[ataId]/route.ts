import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z } from 'zod'

import { ataUpdateSchema } from '../form-schema'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = params
  try {
    const ata = await prisma.ata.findUnique({
      where: { id },
    })

    if (!ata) {
      return NextResponse.json({ error: 'Ata não encontrada' }, { status: 404 })
    }

    return NextResponse.json(ata)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao obter ata', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { ataId: string } },
) {
  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { ataId } = params

  try {
    const body = await request.json()
    const parsedData = ataUpdateSchema.parse(body)

    const ata = await prisma.ata.update({
      where: { id: ataId },
      data: parsedData,
    })

    return NextResponse.json(ata)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao atualizar ata', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { ataId: string } },
) {
  const token = await getToken({ req: request })
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { ataId } = params

  try {
    await prisma.ata.delete({
      where: { id: ataId },
    })

    return NextResponse.json({ message: 'Ata excluída com sucesso' })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao excluir ata', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
