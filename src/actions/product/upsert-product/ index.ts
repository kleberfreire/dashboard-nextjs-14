'use server'

import { revalidatePath } from 'next/cache'
import { upsertProductSchema, type UpsertProductSchema } from './schema'
// import { actionClient } from '@/app/_lib/safe-action'
import { db } from '@/lib/prisma'

export const upsertProduct = async (data: UpsertProductSchema) => {
  console.log('upsertProduct', data)
  upsertProductSchema.parse(data)
  await db.product.upsert({
    where: { id: data.id ?? '' },
    update: data,
    create: data,
  })
  revalidatePath('/products', 'page')
  revalidatePath('/')
}
// export const upsertProduct = actionClient
//   .schema(upsertProductSchema)
//   .action(async ({ parsedInput: { id, ...data } }) => {
//     upsertProductSchema.parse(data)
// await db.product.upsert({
//   where: { id: id ?? '' },
//   update: data,
//   create: data,
// })
//     revalidatePath('/products', 'page')
//     revalidatePath('/')
//   })
