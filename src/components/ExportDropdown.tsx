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
import { exportToPDF } from '@/lib/exportToPDF'

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

export function ExportDropdown<TData>({
  data,
  type,
  disabled,
}: ExportDropdownProps<TData>) {
  const { exportToExcel } = useExport()
  const { toast } = useToast()
  function processData() {
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

  function handleExportClickExcel() {
    const fileName = `relatorio ${format(new Date(), 'dd-MM-yyyy-hh-mm')}`
    const newData = processData()
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
    const pdfBytes = await exportToPDF(data)

    // Criar um Blob a partir dos bytes do PDF
    const blob = new Blob([pdfBytes], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    // Criar um link para download
    const link = document.createElement('a')
    link.href = url
    link.download = 'Relatorio.pdf'
    link.click()

    // Limpar o objeto URL
    URL.revokeObjectURL(url)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-3" variant="outline" disabled={disabled}>
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
