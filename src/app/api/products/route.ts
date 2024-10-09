import { db } from '@/lib/prisma'

// apenas para referência, não é necessário
export async function GET() {
  const products = await db.product.findMany({})
  return Response.json(products, {
    status: 200,
  })
}

export async function POST(request: Request) {
  const body = await request.json()
  const name = body.name
  const price = body.price
  const stock = body.stock
  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  })
  return Response.json({}, { status: 201 })
}
