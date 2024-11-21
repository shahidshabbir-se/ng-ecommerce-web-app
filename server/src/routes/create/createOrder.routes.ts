import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function createOrder(req: Request, res: Response): Promise<void> {
  const { userId, addressId, totalAmount, products } = req.body

  if (!userId || !addressId || !totalAmount || !products) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }

  try {
    // Validate if user exists
    const user = await prisma.user.findUnique({
      where: { userId }
    })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    // Validate if address exists
    const address = await prisma.address.findUnique({
      where: { addressId }
    })

    if (!address) {
      res.status(404).json({ message: 'Address not found' })
      return
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

    res.status(201).json({ message: 'Order created successfully', order })
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
