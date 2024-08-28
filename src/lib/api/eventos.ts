'use server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getEventos(token: string) {
  if (!token) {
    throw new Error('Unauthorized')
  }
  const res = await fetch(`${API_BASE_URL}/api/eventos`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
    },
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar eventos')
  }
  return res.json()
}

export async function getEventosProximos(token: string) {
  if (!token) {
    throw new Error('Unauthorized')
  }
  const res = await fetch(`${API_BASE_URL}/api/eventos/proximos`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
    },
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar eventos próximos')
  }
  return res.json()
}
