// app/api/grupos/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const grupo = await prisma.grupo.findUnique({
      where: {
        id,
      },
      include: {
        coordenadores: true,
        redesSociais: true,
      },
    })

    if (!grupo) {
      return NextResponse.json(
        { error: 'Grupo não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(grupo)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao obter grupo', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
