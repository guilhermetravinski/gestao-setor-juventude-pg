import { NextRequest, NextResponse } from 'next/server'

import { sendEmail } from '@/lib/sendEmail' // Importe a função sendEmail do arquivo onde ela foi definida

export async function POST(req: NextRequest) {
  try {
    // Extraia os dados do corpo da requisição
    const { to, subject, text } = await req.json()

    // Chame a função sendEmail para enviar o e-mail
    const result = await sendEmail(to, subject, text)

    // Retorne uma resposta de sucesso
    return NextResponse.json({ message: 'E-mail enviado com sucesso', result })
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)

    // Retorne uma resposta de erro
    return NextResponse.json(
      { message: 'Erro ao enviar e-mail', error },
      { status: 500 },
    )
  }
}
