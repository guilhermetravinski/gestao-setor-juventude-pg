'use client'

import { Trash } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
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
import { useToast } from '@/components/ui/use-toast'

interface DeleteAtaDialogProps {
  ataId: string
}

export function DeleteAtaDialog({ ataId }: DeleteAtaDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()
  const { grupoId } = useParams()
  const { toast } = useToast()

  useEffect(() => {
    if (isOpen) setIsDeleting(false)
  }, [isOpen])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/grupos/${grupoId}/atas/${ataId}`,
        {
          method: 'DELETE',
        },
      )

      if (response.ok) {
        toast({
          variant: 'success',
          title: `Ata excluída com sucesso`,
          duration: 3000,
        })
        router.push(`/admin/grupos/${grupoId}`)
        router.refresh()

        setIsOpen(false)
      } else {
        toast({
          variant: 'destructive',
          title: `Erro ao deletar ata`,

          duration: 3000,
        })
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: `Erro ao deletar ata`,
        duration: 3000,
      })
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
          <AlertDialogTitle>Deseja remover ata?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita. Isso excluirá permanentemente a ata
            e removerá seus dados do servidor.
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
