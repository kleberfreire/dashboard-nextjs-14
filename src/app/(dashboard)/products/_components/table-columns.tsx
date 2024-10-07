'use client'

import { ColumnDef } from '@tanstack/react-table'
// import ProductTableDropdownMenu from './table-dropdown-menu'
// import { ProductDto } from '@/data-access/product/get-products'
import ProductStatusBadge from '@/components/product-status-badge'
import type { Product } from '@prisma/client'

export const productTableColumns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Produto',
  },
  {
    accessorKey: 'price',
    header: 'Valor unitário',
    cell: (row) => {
      const product = row.row.original
      return Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(product.price))
    },
  },
  {
    accessorKey: 'stock',
    header: 'Estoque',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row: { original: product } }) => {
      return <ProductStatusBadge status={product?.status ?? 'não informado'} />
    },
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    // cell: (row) => <ProductTableDropdownMenu product={row.row.original} />,
  },
]
