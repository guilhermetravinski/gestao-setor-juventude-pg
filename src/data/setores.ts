export interface Paroquia {
  id: number
  nome: string
}

interface Setor {
  setor: number
  label: string
  paroquias: Paroquia[]
}

export const setores: Setor[] = [
  {
    setor: 1,
    label: 'Setor 1',
    paroquias: [
      { id: 47, nome: 'Reitoria do Sagrado Coração de Jesus (Ponta Grossa)' },
      { id: 23, nome: 'Paróquia Nossa Senhora do Rosário (Ponta Grossa)' },
      { id: 21, nome: 'Paróquia Nossa Senhora do Pilar (Ponta Grossa)' },
      {
        id: 17,
        nome: 'Paróquia Nossa Senhora do Perpétuo Socorro (Ponta Grossa)',
      },
      {
        id: 35,
        nome: 'Paróquia São José/Santuário Diocesano de Nossa Senhora do Perpétuo Socorro (Ponta Grossa)',
      },
      { id: 20, nome: 'Paróquia Nossa Senhora Medianeira (Ponta Grossa)' },
      { id: 19, nome: 'Paróquia Nossa Senhora Imaculada Conceição (Carambeí)' },
      { id: 28, nome: 'Paróquia Santo Antônio (Ponta Grossa)' },
    ],
  },
  {
    setor: 2,
    label: 'Setor 2',
    paroquias: [
      { id: 2, nome: 'Paróquia Espírito Santo (Ponta Grossa)' },
      { id: 10, nome: 'Paróquia Nossa Senhora da Saúde (Ponta Grossa)' },
      { id: 29, nome: 'Paróquia São Cristóvão (Ponta Grossa)' },
      {
        id: 25,
        nome: 'Paróquia Santa Teresinha do Menino Jesus (Ponta Grossa)',
      },
      { id: 14, nome: 'Paróquia Nossa Senhora do Monte Claro (Ponta Grossa)' },
      { id: 11, nome: 'Paróquia Nossa Senhora de Fátima (Ponta Grossa)' },
    ],
  },
  {
    setor: 3,
    label: 'Setor 3',
    paroquias: [
      { id: 3, nome: 'Paróquia Imaculada Conceição (Ponta Grossa)' },
      { id: 45, nome: 'Paróquia Senhor Bom Jesus (Ponta Grossa)' },
      { id: 37, nome: 'Paróquia São Judas Tadeu (Ponta Grossa)' },
      { id: 6, nome: 'Paróquia Nossa Senhora Auxiliadora (Ponta Grossa)' },
      { id: 26, nome: "Paróquia Sant'Ana - Catedral (Ponta Grossa)" },
    ],
  },
  {
    setor: 4,
    label: 'Setor 4',
    paroquias: [
      { id: 33, nome: 'Paróquia São Jorge (Ponta Grossa)' },
      { id: 13, nome: 'Paróquia Nossa Senhora do Guadalupe (Ponta Grossa)' },
      { id: 39, nome: 'Paróquia São Pedro Apóstolo (Ponta Grossa)' },
      {
        id: 42,
        nome: 'Paróquia São Sebastião - Santuário Diocesano de Nossa Senhora Aparecida (Ponta Grossa)',
      },
      { id: 30, nome: 'Paróquia São Francisco de Assis (Ponta Grossa)' },
      { id: 24, nome: 'Paróquia Santa Rita de Cássia (Ponta Grossa)' },
      { id: 32, nome: 'Paróquia São João Paulo II (Ponta Grossa)' },
    ],
  },
  {
    setor: 5,
    label: 'Setor 5',
    paroquias: [
      { id: 36, nome: 'Paróquia São Judas Tadeu (Castro)' },
      { id: 15, nome: 'Paróquia Nossa Senhora do Perpétuo Socorro (Castro)' },
      { id: 22, nome: 'Paróquia Nossa Senhora do Rosário (Castro)' },
      { id: 41, nome: "Paróquia Senhora Sant'Ana (Castro)" },
      { id: 41, nome: 'Paróquia São Roque (Ventania)' },
      { id: 46, nome: 'Paróquia Senhor Menino Deus (Piraí do Sul)' },
    ],
  },
  {
    setor: 6,
    label: 'Setor 6',
    paroquias: [
      { id: 27, nome: 'Paróquia Santo Antônio (Imbituva)' },
      { id: 7, nome: 'Paróquia Nossa Senhora da Conceição (Ipiranga)' },
      { id: 4, nome: 'Paróquia Menino Jesus (Guamiranga)' },
      { id: 1, nome: 'Paróquia Cristo Rei (Ivaí)' },
    ],
  },
  {
    setor: 7,
    label: 'Setor 7',
    paroquias: [
      { id: 31, nome: 'Paróquia São João Batista (Irati)' },
      { id: 43, nome: 'Paróquia São Sebastião (Fernandes Pinheiro)' },
      { id: 38, nome: 'Paróquia São Miguel (Irati)' },
      { id: 8, nome: 'Paróquia Nossa Senhora da Conceição (Teixeira Soares)' },
      { id: 9, nome: 'Paróquia Nossa Senhora da Luz (Irati)' },
      { id: 16, nome: 'Paróquia Nossa Senhora do Perpétuo Socorro (Irati)' },
    ],
  },
  {
    setor: 8,
    label: 'Setor 8',
    paroquias: [
      { id: 34, nome: 'Paróquia São José (Imbaú)' },
      { id: 5, nome: 'Paróquia Menino Jesus (Reserva)' },
      { id: 44, nome: 'Paróquia São Sebastião (Ortigueira)' },
      { id: 12, nome: 'Paróquia Nossa Senhora de Fátima (Telêmaco Borba)' },
      { id: 40, nome: 'Paróquia São Pedro e São Paulo (Telêmaco Borba)' },
      { id: 18, nome: 'Paróquia Nossa Senhora dos Remédios (Tibagi)' },
    ],
  },
]
export const paroquias: Paroquia[] = [
  { id: 1, nome: 'Paróquia Cristo Rei (Ivaí)' },
  { id: 2, nome: 'Paróquia Espírito Santo (Ponta Grossa)' },
  { id: 3, nome: 'Paróquia Imaculada Conceição (Ponta Grossa)' },
  { id: 4, nome: 'Paróquia Menino Jesus (Guamiranga)' },
  { id: 5, nome: 'Paróquia Menino Jesus (Reserva)' },
  { id: 6, nome: 'Paróquia Nossa Senhora Auxiliadora (Ponta Grossa)' },
  { id: 7, nome: 'Paróquia Nossa Senhora da Conceição (Ipiranga)' },
  { id: 8, nome: 'Paróquia Nossa Senhora da Conceição (Teixeira Soares)' },
  { id: 9, nome: 'Paróquia Nossa Senhora da Luz (Irati)' },
  { id: 10, nome: 'Paróquia Nossa Senhora da Saúde (Ponta Grossa)' },
  { id: 11, nome: 'Paróquia Nossa Senhora de Fátima (Ponta Grossa)' },
  { id: 12, nome: 'Paróquia Nossa Senhora de Fátima (Telêmaco Borba)' },
  { id: 13, nome: 'Paróquia Nossa Senhora do Guadalupe (Ponta Grossa)' },
  { id: 14, nome: 'Paróquia Nossa Senhora do Monte Claro (Ponta Grossa)' },
  { id: 15, nome: 'Paróquia Nossa Senhora do Perpétuo Socorro (Castro)' },
  { id: 16, nome: 'Paróquia Nossa Senhora do Perpétuo Socorro (Irati)' },
  { id: 17, nome: 'Paróquia Nossa Senhora do Perpétuo Socorro (Ponta Grossa)' },
  { id: 18, nome: 'Paróquia Nossa Senhora dos Remédios (Tibagi)' },
  { id: 19, nome: 'Paróquia Nossa Senhora Imaculada Conceição (Carambeí)' },
  { id: 20, nome: 'Paróquia Nossa Senhora Medianeira (Ponta Grossa)' },
  { id: 21, nome: 'Paróquia Nossa Senhora do Pilar (Ponta Grossa)' },
  { id: 22, nome: 'Paróquia Nossa Senhora do Rosário (Castro)' },
  { id: 23, nome: 'Paróquia Nossa Senhora do Rosário (Ponta Grossa)' },
  { id: 24, nome: 'Paróquia Santa Rita de Cássia (Ponta Grossa)' },
  { id: 25, nome: 'Paróquia Santa Teresinha do Menino Jesus (Ponta Grossa)' },
  { id: 26, nome: "Paróquia Sant'Ana - Catedral (Ponta Grossa)" },
  { id: 27, nome: 'Paróquia Santo Antônio (Imbituva)' },
  { id: 28, nome: 'Paróquia Santo Antônio (Ponta Grossa)' },
  { id: 29, nome: 'Paróquia São Cristóvão (Ponta Grossa)' },
  { id: 30, nome: 'Paróquia São Francisco de Assis (Ponta Grossa)' },
  { id: 31, nome: 'Paróquia São João Batista (Irati)' },
  { id: 32, nome: 'Paróquia São João Paulo II (Ponta Grossa)' },
  { id: 33, nome: 'Paróquia São Jorge (Ponta Grossa)' },
  { id: 34, nome: 'Paróquia São José (Imbaú)' },
  {
    id: 35,
    nome: 'Paróquia São José/Santuário Diocesano de Nossa Senhora do Perpétuo Socorro (Ponta Grossa)',
  },
  { id: 36, nome: 'Paróquia São Judas Tadeu (Castro)' },
  { id: 37, nome: 'Paróquia São Judas Tadeu (Ponta Grossa)' },
  { id: 38, nome: 'Paróquia São Miguel (Irati)' },
  { id: 39, nome: 'Paróquia São Pedro Apóstolo (Ponta Grossa)' },
  { id: 40, nome: 'Paróquia São Pedro e São Paulo (Telêmaco Borba)' },
  { id: 41, nome: 'Paróquia São Roque (Ventania)' },
  {
    id: 42,
    nome: 'Paróquia São Sebastião - Santuário Diocesano de Nossa Senhora Aparecida (Ponta Grossa)',
  },
  { id: 43, nome: 'Paróquia São Sebastião (Fernandes Pinheiro)' },
  { id: 44, nome: 'Paróquia São Sebastião (Ortigueira)' },
  { id: 45, nome: 'Paróquia Senhor Bom Jesus (Ponta Grossa)' },
  { id: 46, nome: 'Paróquia Senhor Menino Deus (Piraí do Sul)' },
  { id: 47, nome: 'Reitoria do Sagrado Coração de Jesus (Ponta Grossa)' },
]
