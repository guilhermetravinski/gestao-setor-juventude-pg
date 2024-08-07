'use client'

import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { useToast } from './ui/use-toast'

interface DeleteMovimentoPastoralDialogProps {
  movimentoPastoralId: string
}

export function DeleteMovimentoPastoralDialog({
  movimentoPastoralId,
}: DeleteMovimentoPastoralDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) setIsDeleting(false)
  }, [isOpen])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/movimentosPastorais/${movimentoPastoralId}`,
        {
          method: 'DELETE',
        },
      )

      if (response.ok) {
        toast({
          variant: 'success',
          title: `Movimento ou pastoral excluído com sucesso`,
          duration: 3000,
        })
        router.push('/movimentos-e-pastorais')
        router.refresh()
      } else {
        const errorData = await response.json()
        toast({
          variant: 'destructive',
          title: `Erro ao deletar movimento ou pastoral`,
          description: errorData.error,
          duration: 3000,
        })
      }

      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao deletar o movimento ou pastoral:', error)
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja remover o movimento ou pastoral?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente o
            grupo e removerá seus dados do servidor.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setIsOpen(false)}
            disabled={isDeleting}
          >
            Cancelar
          </AlertDialogCancel>
          <Button onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? 'Excluindo...' : 'Continuar'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
