export interface Coordenador {
  id: string
  nome: string
  telefone: string
  grupoId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Ata {
  id: string
  data: Date
  descricao: string
  grupoId: string
}

export interface RedeSocial {
  id: string
  rede: 'Facebook' | 'Instagram'
  nomeUsuario: string
  grupoId: string | null
}

export interface Grupo {
  id: string
  nome: string
  setor: string
  paroquia: string
  comunidade: string
  anoFundacao?: string
  biografia?: string
  coordenadores: Coordenador[]
  redesSociais: RedeSocial[]
  atas: Ata[]
  jovesAtivos: string
  reunioes?: string
  observacoes?: string
  createdAt: Date
  updatedAt: Date
}
