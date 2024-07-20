// app/api/grupos/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { formSchema } from './form-schema'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validação dos dados
        const parsedData = formSchema.parse(body)

        let coordenadores

        if (parsedData.coordenacao && parsedData.coordenacao.length > 0) {
            coordenadores = {
                create: parsedData.coordenacao.map((coordenador) => ({
                    nome: coordenador.nome,
                    telefone: coordenador.telefone,
                })),
            }
        }

        // Construção do objeto de dados a serem inseridos
        const dataToCreate = {
            nome: parsedData.nome,
            setor: parsedData.setor,
            paroquia: parsedData.paroquia,
            comunidade: parsedData.comunidade,
            anoFundacao: parsedData.anoFundacao,
            biografia: parsedData.biografia,
            jovesAtivos: parsedData.jovesAtivos,
            reunioes: parsedData.reunioes,
            observacoes: parsedData.observacoes,
            coordenadores
        }



        const grupo = await prisma.grupo.create({
            data: dataToCreate,
        })

        return NextResponse.json({ message: 'Grupo e coordenadores salvos com sucesso', grupo })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: error.errors }, { status: 400 })
        }
        console.log(error)
        // return NextResponse.json({ error: 'Erro ao salvar grupo e coordenadores' }, { status: 500 })
    }
}

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)

    try {
        const skip = (page - 1) * pageSize

        console.log('skip', skip)
        const grupos = await prisma.grupo.findMany({
            skip,
            take: pageSize
        })

        const totalGrupos = await prisma.grupo.count()

        return NextResponse.json({
            data: grupos,
            meta: {
                page,
                pageSize,
                totalPages: Math.ceil(totalGrupos / pageSize),
                totalItems: totalGrupos,
            },
        })
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao obter grupos' }, { status: 500 })
    }
}