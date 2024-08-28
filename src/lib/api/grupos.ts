'use server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
export async function getGrupos(token: string) {
  if (!token) {
    throw new Error('Unauthorized')
  }

  const res = await fetch(`${API_BASE_URL}/api/grupos`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
    },
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar grupos')
  }
  return res.json()
}

export async function getGrupoById(id: string, token: string) {
  if (!token) {
    throw new Error('Unauthorized')
  }
  const res = await fetch(`${API_BASE_URL}/api/grupos/${id}`, {
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
    },
  })

  if (!res.ok) {
    throw new Error('Erro ao buscar grupo')
  }

  return res.json()
}
