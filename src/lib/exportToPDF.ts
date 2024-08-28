import saveAs from 'file-saver'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

export async function exportToPDF<T extends Record<string, string>>(
  data: T[],
  title: string,
  filename: string,
  headerImageUrl: string,
) {
  const pdfDoc = await PDFDocument.create()
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pageWidth = 841.89 // A4 width in points (landscape mode)
  const pageHeight = 595.28 // A4 height in points (landscape mode)
  const marginTop = 20
  const marginBottom = 20
  const rowHeight = 20
  // const maxRowsPerPage = 25

  const imageBytes = await fetch(headerImageUrl).then((res) =>
    res.arrayBuffer(),
  )
  const image = await pdfDoc.embedPng(imageBytes)
  const imageWidth = 77
  const imageHeight = 22

  const imageX = (pageWidth - imageWidth) / 2 // Center the image horizontally
  const imageY = pageHeight - marginTop - imageHeight // Position the image at the top

  let page = pdfDoc.addPage([pageWidth, pageHeight])
  let startY = imageY - 40 // Adjusting startY to ensure spacing below the title
  // const rowIndex = 0

  const headers = Object.keys(data[0])
  const totalColumns = headers.length
  const columnWidth = (pageWidth - 2 * marginTop) / totalColumns // Calculate dynamic column width

  const drawHeaderAndFooter = () => {
    // Header with Image
    page.drawImage(image, {
      x: imageX,
      y: imageY,
      width: imageWidth,
      height: imageHeight,
    })

    // Centered Title Below the Image
    page.drawText(title, {
      x: (pageWidth - font.widthOfTextAtSize(title, 16)) / 2, // Center the title
      y: imageY - 20, // Position the title below the image
      size: 16, // Slightly larger size for emphasis
      font,
      color: rgb(0, 0, 0),
    })

    // Footer
    const footerText = `Página ${pdfDoc.getPageCount()}`
    page.drawText(footerText, {
      x: marginTop,
      y: marginBottom,
      size: 12,
      font,
      color: rgb(0, 0, 0),
    })

    // Table Headers with Borders
    headers.forEach((header, index) => {
      const x = marginTop + index * columnWidth
      page.drawText(header, {
        x: x + 5, // Adjust to draw inside the cell
        y: startY,
        size: 12,
        font,
        color: rgb(0, 0, 0),
      })

      // Draw borders for each header cell
      page.drawRectangle({
        x,
        y: startY - rowHeight + 15,
        width: columnWidth,
        height: rowHeight,
        borderWidth: 0.5, // Smaller border width
        borderColor: rgb(0, 0, 0),
      })
    })

    startY -= rowHeight
  }

  const wrapText = (text: string, maxWidth: number): string[] => {
    const words = text.split(' ')
    const lines: string[] = []
    let currentLine = ''

    words.forEach((word) => {
      const testLine = currentLine + word + ' '
      const testLineWidth = font.widthOfTextAtSize(testLine, 12)

      if (testLineWidth > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim())
        currentLine = word + ' '
      } else {
        currentLine = testLine
      }
    })

    lines.push(currentLine.trim())
    return lines
  }

  const drawRow = (row: T) => {
    const linesPerColumn = headers.map((header) => {
      const text = row[header]?.toString() ?? ''
      return wrapText(text, columnWidth - 5).length
    })

    const maxLinesInRow = Math.max(...linesPerColumn)

    headers.forEach((header, colIndex) => {
      const text = row[header]?.toString() ?? ''
      const wrappedText = wrapText(text, columnWidth - 5)
      const x = marginTop + colIndex * columnWidth

      wrappedText.forEach((line, lineIndex) => {
        page.drawText(line, {
          x: x + 5, // Adjust to draw inside the cell
          y: startY - lineIndex * rowHeight,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        })
      })

      // Draw borders for each cell
      page.drawRectangle({
        x,
        y: startY - maxLinesInRow * rowHeight + 15,
        width: columnWidth,
        height: maxLinesInRow * rowHeight,
        borderWidth: 0.5, // Smaller border width
        borderColor: rgb(0, 0, 0),
      })
    })

    startY -= maxLinesInRow * rowHeight

    if (startY < marginBottom + rowHeight) {
      page = pdfDoc.addPage([pageWidth, pageHeight])
      startY = pageHeight - marginTop - 60
      drawHeaderAndFooter()
    }
  }

  drawHeaderAndFooter()

  data.forEach((row) => drawRow(row))

  const pdfBytes = await pdfDoc.save()
  saveAs(new Blob([pdfBytes]), `${filename}.pdf`)
}
