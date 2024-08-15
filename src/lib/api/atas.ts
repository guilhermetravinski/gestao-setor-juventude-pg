'use server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getAtasById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/grupos/${id}/atas`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Erro ao buscar atas')
  }

  return res.json()
}
