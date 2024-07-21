// app/api/grupos/route.ts
import { PrismaClient } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    try {
        const grupos = await prisma.grupo.findMany({
        })

        return NextResponse.json(grupos)
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao obter grupos' }, { status: 500 })
    }
}
