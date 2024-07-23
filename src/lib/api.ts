export async function getGrupoById(id: string) {
  const res = await fetch(`http://localhost:3000/api/grupos/${id}`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.log(res)
    throw new Error('Erro ao buscar grupo')
  }

  return res.json()
}
