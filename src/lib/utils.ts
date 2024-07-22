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
