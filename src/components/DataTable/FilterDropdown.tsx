'use client'

import { Table } from '@tanstack/react-table'
import { Filter } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { setores } from '@/data/setores'

interface FilterBySetorAndParoquiaProps<TData> {
  table: Table<TData>
}

export function FilterBySetorAndParoquia<TData>({
  table,
}: FilterBySetorAndParoquiaProps<TData>) {
  const [selectedSetor, setSelectedSetor] = useState<number | null>(null)
  const [selectedParoquia, setSelectedParoquia] = useState<string | null>(null)
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)

  const handleSetorChange = (setor: number) => {
    setSelectedSetor(setor)
    setSelectedParoquia(null) // Reset paroquia when setor changes
  }

  const handleParoquiaChange = (paroquia: string) => {
    setSelectedParoquia(paroquia)
  }

  const handleApplyFilter = () => {
    if (selectedSetor !== null) {
      table.getColumn('setor')?.setFilterValue(selectedSetor.toString())
    }
    if (selectedParoquia) {
      table.getColumn('paroquia')?.setFilterValue(selectedParoquia)
    }
    setIsPopoverOpen(false) // Close the popover after applying the filter
  }

  const handleClearFilter = () => {
    setSelectedSetor(null)
    setSelectedParoquia(null)
    table.getColumn('setor')?.setFilterValue('')
    table.getColumn('paroquia')?.setFilterValue('')
  }

  const selectedSetorData = setores.find(
    (setor) => setor.setor === selectedSetor,
  )

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button className="ml-3" variant="outline">
          <Filter className="mr-2 h-4 w-4" /> Filtrar
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-4 p-4">
          <div className="flex flex-col gap-4">
            <Select
              onValueChange={(value) => handleSetorChange(Number(value))}
              value={selectedSetor?.toString() || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um Setor" />
              </SelectTrigger>
              <SelectContent>
                {setores.map((setor) => (
                  <SelectItem key={setor.setor} value={setor.setor.toString()}>
                    {setor.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={handleParoquiaChange}
              value={selectedParoquia || ''}
              disabled={!selectedSetor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione uma Paróquia" />
              </SelectTrigger>
              <SelectContent>
                {selectedSetorData?.paroquias.map((paroquia) => (
                  <SelectItem key={paroquia.id} value={paroquia.nome}>
                    {paroquia.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4">
            <Button
              className="w-full"
              onClick={handleApplyFilter}
              disabled={!selectedSetor && !selectedParoquia}
            >
              Aplicar
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={handleClearFilter}
              disabled={!selectedSetor}
            >
              Limpar
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
