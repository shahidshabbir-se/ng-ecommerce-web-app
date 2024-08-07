import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function createOrder(req: Request, res: Response) {
  const { userId, addressId, totalAmount, products } = req.body

  if (!userId || !addressId || !totalAmount || !products) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  try {
    // Validate if user exists
    const user = await prisma.user.findUnique({
      where: { userId }
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Validate if address exists
    const address = await prisma.address.findUnique({
      where: { addressId }
    })

    if (!address) {
      return res.status(404).json({ message: 'Address not found' })
    }

    // Create order with products
    const order = await prisma.order.create({
      data: {
        userId,
        addressId,
        orderTotal: totalAmount,
        orderStatus: 'PENDING',
        products: {
          create: products.map(
            (product: {
              productId: number
              variantId: number
              size: string
              quantity: number
            }) => ({
              productId: product.productId,
              variantId: product.variantId, // Handle optional fields
              size: product.size, // Handle optional fields
              quantity: product.quantity
            })
          )
        }
      },
      include: {
        products: true // Include related OrderProduct in the response
      }
    })

    return res
      .status(201)
      .json({ message: 'Order created successfully', order })
  } catch (error) {
    console.error('Error creating order:', error)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}
