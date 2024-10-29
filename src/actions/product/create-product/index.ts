'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface ProductCreateData {
  name: string
  price: number
  stock: number
}

export async function createProduct({ stock, price, name }: ProductCreateData) {
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  })
  revalidatePath('/products', 'page')
  revalidatePath('/')
}
