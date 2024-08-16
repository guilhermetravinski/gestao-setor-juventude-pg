// app/api/grupos/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { z } from 'zod'

import { formSchema } from './form-schema'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request })
  if (!token) {
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const body = await request.json()

    // Valide os dados usando o schema Zod
    const parsedData = formSchema.parse(body)
    // Crie o grupo no banco de dados
    const grupo = await prisma.grupo.create({
      data: {
        nome: parsedData.nome,
        setor: parsedData.setor,
        paroquia: parsedData.paroquia,
        comunidade: parsedData.comunidade,
        anoFundacao: parsedData.anoFundacao,
        biografia: parsedData.biografia,
        jovensAtivos: parsedData.jovensAtivos,
        reunioes: parsedData.reunioes,
        observacoes: parsedData.observacoes,
        coordenadores: parsedData.coordenadores
          ? {
              create: parsedData.coordenadores.map((coordenador) => ({
                nome: coordenador.nome,
                telefone: coordenador.telefone,
              })),
            }
          : undefined,
        redesSociais: parsedData.redesSociais
          ? {
              create: parsedData.redesSociais.map((rede) => ({
                rede: rede.rede,
                nomeUsuario: rede.nomeUsuario,
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
        { error: 'Erro ao criar grupo', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request })
  if (!token) {
    // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  try {
    const grupos = await prisma.grupo.findMany()
    return NextResponse.json(grupos)
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao obter grupos' }, { status: 500 })
  }
}
