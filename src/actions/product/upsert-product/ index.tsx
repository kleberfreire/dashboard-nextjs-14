'use server'

import { revalidatePath } from 'next/cache'
import { upsertProductSchema } from './schema'
import { actionClient } from '@/app/_lib/safe-action'
import { db } from '@/lib/prisma'

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: { id, ...data } }) => {
    upsertProductSchema.parse(data)
    await db.product.upsert({
      where: { id: id ?? '' },
      update: data,
      create: data,
    })
    revalidatePath('/products', 'page')
    revalidatePath('/')
  })
