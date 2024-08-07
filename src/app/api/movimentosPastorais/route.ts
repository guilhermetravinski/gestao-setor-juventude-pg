// app/api/grupos/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

import { formSchema } from './form-schema'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Valide os dados usando o schema Zod
    const parsedData = formSchema.parse(body)
    // Crie o grupo no banco de dados
    const grupo = await prisma.movimentoPastoral.create({
      data: {
        nome: parsedData.nome,
        tipo: parsedData.tipo,
        carisma: parsedData.carisma,
        localAtuacao: parsedData.localAtuacao,
        anoFundacao: parsedData.anoFundacao,
        biografia: parsedData.biografia,
        jovensAtivos: parsedData.jovensAtivos,
        atividades: parsedData.atividades,
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
      console.log(error)
      return NextResponse.json(
        { error: 'Dados inválidos', details: error.errors },
        { status: 400 },
      )
    }
    if (error instanceof Error) {
      console.log(error)
      return NextResponse.json(
        { error: 'Erro ao criar grupo', details: error.message },
        { status: 500 },
      )
    }
    return NextResponse.json({ error: 'Erro desconhecido' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const grupos = await prisma.movimentoPastoral.findMany()
    return NextResponse.json(grupos)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao obter grupos' }, { status: 500 })
  }
}
