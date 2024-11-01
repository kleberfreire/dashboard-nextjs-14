'use client'
import * as React from 'react'
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { Input } from '@/components/ui/input'
import { Combobox, type ComboboxOption } from '@/components/ui/combobox'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import type { Product } from '@prisma/client'
import { formatCurrency } from '@/helpers/format-money'

const formSchema = z.object({
  productId: z.string().uuid({
    message: 'O produto é obrigatório',
  }),
  quantity: z.coerce
    .number()
    .int({
      message: 'A quantidade deve ser um número inteiro positivo',
    })
    .positive({
      message: 'A quantidade deve ser um número inteiro positivo',
    }),
})

type FormSchema = z.infer<typeof formSchema>

interface UpsertSheetContentProps {
  productOptions: ComboboxOption[]
  products: Product[]
}

interface SelectedProduct {
  id: string
  name: string
  price: number
  quantity: number
}

const UpsertSheetContent = ({
  productOptions,
  products,
}: UpsertSheetContentProps) => {
  const [selectedProduct, setSelectedProduct] = React.useState<
    SelectedProduct[]
  >([])
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productId: '',
      quantity: 1,
    },
  })

  const onSubmit = (data: FormSchema) => {
    console.log(data)
    const productInProducts = products.find(
      (product) => product.id === data.productId,
    )
    if (!productInProducts) return null
    setSelectedProduct((prev) => {
      const existingProduct = prev.find(
        (product) => product.id === productInProducts.id,
      )

      if (existingProduct) {
        return prev.map((product) => {
          if (product.id === productInProducts.id) {
            return {
              ...product,
              quantity: product.quantity + data.quantity,
            }
          }
          return product
        })
      } else {
        return [
          ...prev,
          {
            id: productInProducts.id,
            name: productInProducts.name,
            price: Number(productInProducts.price),
            quantity: data.quantity,
          },
        ]
      }
    })
  }

  const productTotal = React.useMemo(() => {
    return selectedProduct.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0,
    )
  }, [selectedProduct])

  return (
    <SheetContent className="!max-w-[700px]">
      <SheetHeader>
        <SheetTitle>Nova venda</SheetTitle>
        <SheetDescription>
          Insira as informações da venda abaixo.
        </SheetDescription>
      </SheetHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
          <FormField
            control={form.control}
            name="productId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Produto</FormLabel>
                <FormControl>
                  <Combobox
                    placeholder="Selecione o produto"
                    {...field}
                    options={productOptions}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantidade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Digite a quantidade"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full">
            <PlusIcon className="mr-2" size={20} />
            Adicionar produto à venda
          </Button>
        </form>
      </Form>
      <Table>
        <TableCaption>Lista de produtos adicionados à venda</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Produto</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Preço unitário</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {selectedProduct.length > 0 ? (
            selectedProduct.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{formatCurrency(product.price)}</TableCell>
                <TableCell>
                  {formatCurrency(product.price * product.quantity)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="py-5 text-center">
                Nenhum produto Selecionado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell>{formatCurrency(productTotal)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </SheetContent>
  )
}

export default UpsertSheetContent
