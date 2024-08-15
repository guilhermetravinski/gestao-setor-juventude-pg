import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function exportToPDF<T>(data: T[]) {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()

  // Adicionando o cabeçalho
  const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)
  const { height } = page.getSize()
  page.drawText('SETOR JUVENTUDE Comunhão, Participação e Missão', {
    x: 50,
    y: height - 50,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })
  page.drawText('Diocese de Ponta Grossa', {
    x: 50,
    y: height - 70,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  // Adicionando dados da tabela (isso é mais manual do que autoTable)
  let yPosition = height - 100
  data.forEach((row, index) => {
    page.drawText(`${index + 1}. ${row}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: timesRomanFont,
      color: rgb(0, 0, 0),
    })
    yPosition -= 20
  })

  // Adicionando o rodapé
  page.drawText('DIA NACIONAL DA JUVENTUDE 2024 - PROGRAMAÇÃO', {
    x: 50,
    y: 30,
    size: 12,
    font: timesRomanFont,
    color: rgb(0, 0, 0),
  })

  const pdfBytes = await pdfDoc.save()
  return pdfBytes
}
