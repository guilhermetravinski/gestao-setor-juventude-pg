'use server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getEventos() {
  const res = await fetch(`${API_BASE_URL}/api/eventos`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar eventos')
  }
  return res.json()
}
