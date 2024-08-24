'use server'

import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/sendEmail' // Função de envio de e-mail já criada

export async function sendEmailsWithLog(emails: string[]) {
  const subject = 'Termos de Uso do Sistema'
  const htmlContent = `
    <h1>Bem-vindo ao Sistema</h1>
    <p>Estamos felizes em tê-lo conosco. Por favor, leia os termos de uso abaixo:</p>
    <p>...</p>
    <p>Atenciosamente,<br>Sua Equipe</p>
  `

  for (const email of emails) {
    // Verifique se o e-mail já foi enviado anteriormente
    const existingLog = await prisma.emailLog.findFirst({
      where: { email, subject },
    })

    if (existingLog) {
      console.log(`E-mail já enviado para ${email}, pulando...`)
      continue
    }

    try {
      // Envie o e-mail usando a função de envio
      const result = await sendEmail(email, subject, htmlContent)

      // Registre o log de envio no banco de dados
      await prisma.emailLog.create({
        data: {
          email,
          subject,
          status: 'success',
          response: result.response,
          sentAt: new Date(),
        },
      })

      console.log(`E-mail enviado com sucesso para ${email}`)
    } catch (error) {
      console.error(`Erro ao enviar e-mail para ${email}:`, error)

      // Registre o erro no log de envio
      await prisma.emailLog.create({
        data: {
          email,
          subject,
          status: 'failed',
          response: String(error),
          sentAt: null,
        },
      })
    }
  }
}
