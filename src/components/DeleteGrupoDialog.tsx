'use client'

import Cookies from 'js-cookie'
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

interface DeleteGrupoDialogProps {
  grupoId: string
}

export function DeleteGrupoDialog({ grupoId }: DeleteGrupoDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) setIsDeleting(false)
  }, [isOpen])

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const token = Cookies.get('next-auth.session-token')
      const response = await fetch(`${API_BASE_URL}/api/grupos/${grupoId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Inclui o token no cabeçalho Authorization
        },
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar o grupo')
      }

      router.push('/admin/grupos')
      router.refresh()
      setIsOpen(false)
    } catch (error) {
      console.error('Erro ao deletar o grupo:', error)
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
          <AlertDialogTitle>Deseja remover o grupo?</AlertDialogTitle>
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
