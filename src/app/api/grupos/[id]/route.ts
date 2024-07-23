// app/api/grupos/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { formSchema } from '../form-schema'

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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const { id } = params

  try {
    const body = await request.json()

    // Valide os dados usando o schema Zod
    const parsedData = formSchema.parse(body)

    // Atualize o grupo no banco de dados
    const grupo = await prisma.grupo.update({
      where: {
        id,
      },
      data: {
        ...parsedData,
        coordenadores: parsedData.coordenadores
          ? {
              upsert: parsedData.coordenadores.map((coordenador) => ({
                where: { id: coordenador.id ?? '' },
                update: {
                  nome: coordenador.nome,
                  telefone: coordenador.telefone,
                },
                create: {
                  nome: coordenador.nome,
                  telefone: coordenador.telefone,
                },
              })),
            }
          : undefined,
        redesSociais: parsedData.redesSociais
          ? {
              upsert: parsedData.redesSociais.map((rede) => ({
                where: { id: rede.id ?? '' },
                update: {
                  rede: rede.rede,
                  nomeUsuario: rede.nomeUsuario,
                },
                create: {
                  rede: rede.rede,
                  nomeUsuario: rede.nomeUsuario,
                },
              })),
            }
          : undefined,
        atas: parsedData.atas
          ? {
              upsert: parsedData.atas.map((ata) => ({
                where: { id: ata.id ?? '' },
                update: {
                  data: new Date(ata.data),
                  descricao: ata.descricao,
                },
                create: {
                  data: new Date(ata.data),
                  descricao: ata.descricao,
                },
              })),
            }
          : undefined,
      },
    })

    return NextResponse.json(grupo)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    if (error instanceof Error) {
      return NextResponse.json(
        { error: 'Erro ao atualizar grupo', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
