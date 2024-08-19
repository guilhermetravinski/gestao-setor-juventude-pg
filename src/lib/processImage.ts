import imageCompression from 'browser-image-compression'

export async function processImage(file: File): Promise<File> {
  // Crie um objeto de imagem para carregar a imagem original
  const img = new Image()
  const imageUrl = URL.createObjectURL(file)
  img.src = imageUrl

  await new Promise((resolve) => {
    img.onload = () => resolve(true)
  })

  // Defina a resolução final
  const finalSize = 200

  // Crie um canvas para redimensionar e cortar a imagem
  const canvas = document.createElement('canvas')
  canvas.width = finalSize
  canvas.height = finalSize
  const ctx = canvas.getContext('2d')

  if (ctx) {
    // Calcule a área de origem para o corte centralizado
    const scale = Math.min(img.width / finalSize, img.height / finalSize)
    const sx = (img.width - finalSize * scale) / 2
    const sy = (img.height - finalSize * scale) / 2
    const sWidth = finalSize * scale
    const sHeight = finalSize * scale

    // Desenhe a imagem redimensionada e cortada no canvas
    ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, finalSize, finalSize)
  }

  // Converte o canvas final para um blob
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob), 'image/jpeg')
  })

  // Verifique se o blob não é nulo
  if (!blob) {
    throw new Error('Falha ao converter o canvas para um blob.')
  }

  // Converte o blob em um arquivo para compressão
  const croppedFile = new File([blob], file.name, { type: 'image/jpeg' })

  // Comprima a imagem cortada e redimensionada
  const compressedFile = await imageCompression(croppedFile, {
    maxSizeMB: 1, // Define o tamanho máximo em MB (ajustável conforme necessário)
    useWebWorker: true, // Usa web workers para melhorar a performance
  })

  return compressedFile
}
