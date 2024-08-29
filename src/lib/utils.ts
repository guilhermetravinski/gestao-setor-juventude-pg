import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string): string {
  // Divide o nome por espaços
  const nameParts = name.trim().split(' ')

  // Pega a primeira letra do primeiro nome e a primeira letra do último nome
  const initials =
    nameParts.length > 1
      ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
      : `${nameParts[0][0]}${nameParts[0][1]}`

  // Retorna as iniciais em maiúsculas
  return initials.toUpperCase()
}

export function sanitizeAndFormatPhone(input: string): string {
  let sanitizedInput = input.replace(/\D/g, '')
  if (sanitizedInput.length > 11) {
    sanitizedInput = sanitizedInput.slice(0, 11)
  }
  if (sanitizedInput.length > 6) {
    sanitizedInput = sanitizedInput.replace(
      /(\d{2})(\d{1})(\d{4})(\d{4})/,
      '($1) $2 $3-$4',
    )
  } else if (sanitizedInput.length > 2) {
    sanitizedInput = sanitizedInput.replace(/(\d{2})(\d{1})/, '($1) $2')
  } else if (sanitizedInput.length > 0) {
    sanitizedInput = sanitizedInput.replace(/(\d{2})/, '($1)')
  }
  return sanitizedInput
}
