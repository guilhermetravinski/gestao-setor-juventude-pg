'use server'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function getMovimentosPastorais() {
  const res = await fetch(`${API_BASE_URL}/api/movimentosPastorais`, {
    cache: 'no-store',
  })
  if (!res.ok) {
    throw new Error('Erro ao buscar movimentos e pastorais')
  }
  return res.json()
}

export async function getMovimentoPastoralById(id: string) {
  const res = await fetch(`${API_BASE_URL}/api/movimentosPastorais/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Erro ao buscar movimento ou pastoral')
  }

  return res.json()
}
