// app/api/grupos/[id]/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { formSchema } from '../form-schema'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: { movimentoPastoralId: string } },
) {
  const { movimentoPastoralId } = params

  try {
    const movimentoPastoral = await prisma.movimentoPastoral.findUnique({
      where: {
        id: movimentoPastoralId,
      },
      include: {
        coordenadores: true,
        redesSociais: true,
        atas: true,
      },
    })

    if (!movimentoPastoral) {
      return NextResponse.json(
        { error: 'Movimento ou pastoral não encontrado' },
        { status: 404 },
      )
    }

    return NextResponse.json(movimentoPastoral)
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Erro ao obter movimento ou pastoral',
          details: error.message,
        },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { movimentoPastoralId: string } },
) {
  const { movimentoPastoralId } = params

  try {
    const body = await request.json()

    // Valide os dados usando o schema Zod
    const parsedData = formSchema.parse(body)

    // Remova todos os coordenadores e redes sociais associados ao grupo
    await prisma.coordenador.deleteMany({
      where: { movimentoPastoralId },
    })

    await prisma.redeSocial.deleteMany({
      where: { movimentoPastoralId },
    })

    // Atualize o grupo no banco de dados
    const grupo = await prisma.movimentoPastoral.update({
      where: {
        id: movimentoPastoralId,
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
                  grupo: undefined,
                  movimentoPastoralId: '',
                },
                create: {
                  data: new Date(ata.data),
                  descricao: ata.descricao,
                  grupo: undefined,
                  movimentoPastoralId: '',
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { movimentoPastoralId: string } },
) {
  const { movimentoPastoralId } = params

  try {
    // Verifica se o grupo existe
    const grupo = await prisma.movimentoPastoral.findUnique({
      where: {
        id: movimentoPastoralId,
      },
    })

    if (!grupo) {
      return NextResponse.json(
        { error: 'Movimento ou pastoral não encontrado' },
        { status: 404 },
      )
    }

    // Remove os coordenadores associados
    await prisma.coordenador.deleteMany({
      where: { movimentoPastoralId },
    })

    // Remove as redes sociais associadas
    await prisma.redeSocial.deleteMany({
      where: { movimentoPastoralId },
    })

    // Remove as atas associadas
    await prisma.ata.deleteMany({
      where: { movimentoPastoralId },
    })

    // Remove o grupo
    await prisma.movimentoPastoral.delete({
      where: {
        id: movimentoPastoralId,
      },
    })

    return NextResponse.json({
      message: 'Movimento ou pastoral excluído com sucesso',
    })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'Erro ao excluir movimento ou pastoral',
          details: error.message,
        },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}
