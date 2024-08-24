import nodemailer from 'nodemailer'

export async function sendEmail(
  to: string,
  subject: string,
  html: string,
  text?: string,
) {
  // Configura o transporte do nodemailer usando o SMTP do Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // Porta segura para SMTP
    secure: true, // Usa SSL/TLS
    auth: {
      user: process.env.GMAIL_USER, // O e-mail fixo
      pass: process.env.GMAIL_PASS, // A senha ou senha de aplicativo
    },
  })

  // Configura as opções do e-mail
  const mailOptions = {
    from: `Seu Nome <${process.env.GMAIL_USER}>`,
    to,
    subject,
    text, // Texto puro (opcional)
    html, // HTML formatado
  }

  // Envia o e-mail
  const result = await transporter.sendMail(mailOptions)
  return result
}
