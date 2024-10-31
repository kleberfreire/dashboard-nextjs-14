'use client'

import { deleteProduct } from '@/actions/product/delete-product'
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

interface DeleteProductDialogContentProps {
  productId: string
}

export function DeleteProductDialogContent({
  productId,
}: DeleteProductDialogContentProps) {
  const handleContinue = () => {
    try {
      deleteProduct({ id: productId })
      toast.success('Produto excluído com sucesso.')
    } catch (error) {
      console.error(error)
      toast.error('Ocorreu um erro ao excluir o produto.')
    }
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
        <AlertDialogDescription>
          Você está prestes a excluir este produto. Esta ação não pode ser
          desfeita. Deseja continuar?
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel asChild>
          <Button variant="ghost">Cancelar</Button>
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleContinue}>
          Continuar
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  )
}
