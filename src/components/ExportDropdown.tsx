'use client'

import { format } from 'date-fns'
import { Download, FileText, Sheet } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useExport } from '@/hooks/useExport'
import {
  Ata,
  CoordenadorDiocesano,
  Evento,
  Grupo,
  MovimentoPastoral,
} from '@/lib/definitions'

import { Button } from './ui/button'
import { useToast } from './ui/use-toast'

interface ExportDropdownProps<TData> {
  data: TData[]
  type:
    | 'grupos'
    | 'atas'
    | 'movimentos-e-pastorais'
    | 'coordenadores-diocesanos'
    | 'eventos'
  disabled: boolean
}

function formatType(type: string): string {
  switch (type) {
    case 'grupos':
      return 'Grupos'
    case 'atas':
      return 'Atas'
    case 'movimentos-e-pastorais':
      return 'Movimentos e Pastorais'
    case 'coordenadores-diocesanos':
      return 'Coordenadores Diocesanos'
    case 'eventos':
      return 'Eventos'
    default:
      return 'Tipo desconhecido'
  }
}

export function ExportDropdown<TData>({
  data,
  type,
  disabled,
}: ExportDropdownProps<TData>) {
  const { exportToExcel, exportToPDF } = useExport()
  const { toast } = useToast()
  function processDataExcel() {
    if (type === 'grupos') {
      const newData = (data as Grupo[]).map((grupo) => {
        return {
          Nome: grupo.nome,
          Setor: grupo.setor,
          Paróquia: grupo.paroquia,
          Comunidade: grupo.comunidade,
          'Ano de fundação': grupo.anoFundacao,
          Biografia: grupo.biografia,
          'Jovens ativos': grupo.jovensAtivos,
          Reuniões: grupo.reunioes,
          Observações: grupo.observacoes,
        }
      })
      return newData
    } else if (type === 'atas') {
      const newData = (data as Ata[]).map((ata) => {
        return {
          Data: format(new Date(ata.data), 'dd/MM/yyyy'),
          Descrição: ata.descricao,
        }
      })
      return newData
    } else if (type === 'movimentos-e-pastorais') {
      const newData = (data as MovimentoPastoral[]).map((movimentoPastoral) => {
        return {
          Nome: movimentoPastoral.nome,
          'Local de atuação': movimentoPastoral.localAtuacao,
          Tipo: movimentoPastoral.tipo,
          'Ano de fundação': movimentoPastoral.anoFundacao,
          Carisma: movimentoPastoral.carisma,
          Biografia: movimentoPastoral.biografia,
          'Jovens ativos': movimentoPastoral.jovensAtivos,
          Atividades: movimentoPastoral.atividades,
          Observações: movimentoPastoral.observacoes,
        }
      })
      return newData
    } else if (type === 'coordenadores-diocesanos') {
      const newData = (data as CoordenadorDiocesano[]).map(
        (movimentoPastoral) => {
          return {
            Nome: movimentoPastoral.nome,
            Telefone: movimentoPastoral.telefone,
            Representação: movimentoPastoral.representacao,
            Paróquia: movimentoPastoral.paroquia,
          }
        },
      )
      return newData
    } else if (type === 'eventos') {
      const newData = (data as Evento[]).map((evento) => {
        return {
          Título: evento.titulo,
          Local: evento.local,
          'Público Alvo': evento.publicoAlvo,
          Organizador: evento.organizador,
          'Data de início': format(
            new Date(evento.dataInicio),
            'dd/MM/yyyy - HH:mm',
          ),
          'Data de fim': format(new Date(evento.dataFim), 'dd/MM/yyyy - HH:mm'),
          Descrição: evento.descricao,
        }
      })
      return newData
    }
  }

  function processDataPDF() {
    if (type === 'grupos') {
      const newData = (data as Grupo[]).map((grupo) => {
        return {
          Nome: grupo.nome,
          Setor: grupo.setor,
          Paróquia: grupo.paroquia.replace('Paróquia ', ''),
          Comunidade: grupo.comunidade,
          'Ano de fundação': grupo.anoFundacao,
          'Jovens ativos': grupo.jovensAtivos,
        }
      })
      return newData
    } else if (type === 'atas') {
      const newData = (data as Ata[]).map((ata) => {
        return {
          Data: format(new Date(ata.data), 'dd/MM/yyyy'),
          Descrição: ata.descricao,
        }
      })
      return newData
    } else if (type === 'movimentos-e-pastorais') {
      const newData = (data as MovimentoPastoral[]).map((movimentoPastoral) => {
        return {
          Nome: movimentoPastoral.nome,
          'Local de atuação': movimentoPastoral.localAtuacao,
          Tipo: movimentoPastoral.tipo,
          'Ano de fundação': movimentoPastoral.anoFundacao,
          Carisma: movimentoPastoral.carisma,
          // Biografia: movimentoPastoral.biografia,
          'Jovens ativos': movimentoPastoral.jovensAtivos,
          // Atividades: movimentoPastoral.atividades,
          // Observações: movimentoPastoral.observacoes,
        }
      })
      return newData
    } else if (type === 'coordenadores-diocesanos') {
      const newData = (data as CoordenadorDiocesano[]).map(
        (movimentoPastoral) => {
          return {
            Nome: movimentoPastoral.nome,
            Telefone: movimentoPastoral.telefone,
            Representação: movimentoPastoral.representacao,
            Paróquia: movimentoPastoral.paroquia.replace('Paróquia ', ''),
          }
        },
      )
      return newData
    } else if (type === 'eventos') {
      const newData = (data as Evento[]).map((evento) => {
        return {
          Título: evento.titulo,
          Local: evento.local,
          'Público Alvo': evento.publicoAlvo,
          Organizador: evento.organizador,
          'Data de início': format(
            new Date(evento.dataInicio),
            'dd/MM/yyyy - HH:mm',
          ),
          'Data de fim': format(new Date(evento.dataFim), 'dd/MM/yyyy - HH:mm'),
          // Descrição: evento.descricao,
        }
      })
      return newData
    }
  }

  function handleExportClickExcel() {
    const fileName = `relatorio ${format(new Date(), 'dd-MM-yyyy-hh-mm')}`
    const newData = processDataExcel()
    const now = JSON.stringify(newData)
    if (newData) {
      exportToExcel(JSON.parse(now), fileName)
    } else {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um erro ao exportar',
        duration: 3000,
      })
    }
  }

  const handleExportClickPDF = async () => {
    const fileName = `relatorio ${format(new Date(), 'dd-MM-yyyy-hh-mm')}`
    const newData = processDataPDF()

    // Outra forma de fazer o mesmo usando concat e spread operator
    const repeatedData = [].concat(...Array(10).fill(newData))
    const dataString = JSON.stringify(repeatedData)
    const reportTitle = formatType(type)
    if (newData) {
      exportToPDF(JSON.parse(dataString), reportTitle, fileName, '/logo.png')
    } else {
      toast({
        variant: 'destructive',
        title: 'Ocorreu um erro ao exportar',
        duration: 3000,
      })
    }
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-2" variant="outline" disabled={disabled}>
          <Download className="mr-2 h-4 w-4" /> Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportClickPDF}>
          <FileText className="mr-2 h-4 w-4" />
          PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportClickExcel}>
          <Sheet className="mr-2 h-4 w-4" /> Excel
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
