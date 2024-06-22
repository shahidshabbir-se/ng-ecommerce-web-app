import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getCartItems(req: Request, res: Response) {
  try {
    const userId = Number(req.query.userId)
    if (!userId || isNaN(userId)) {
      return res
        .status(400)
        .json({ message: 'User ID parameter is missing or invalid' })
    }

    // Find cart with cartItems and their associated products
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId
      },
      include: {
        cartItems: {
          include: {
            Product: true
          }
        }
      }
    })

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Identify cart items with quantity 0
    const itemsToDelete = cart.cartItems.filter(
      (cartItem) => cartItem.quantity === 0
    )

    // Delete cart items with quantity 0
    if (itemsToDelete.length > 0) {
      await prisma.cartProduct.deleteMany({
        where: {
          OR: itemsToDelete.map((item) => ({
            cartProductId: item.cartProductId
          }))
        }
      })
    }

    // Extract and format products from cartItems
    const products = cart.cartItems
      .filter((cartItem) => cartItem.quantity > 0) // Filter out items with quantity 0
      .map((cartItem) => ({
        cartId: cart.cartId,
        userId: cart.userId,
        cartItemId: cartItem.cartProductId,
        productId: cartItem.productId,
        quantity: cartItem.quantity
      }))

    return res.json(products)
  } catch (error) {
    console.error('Error retrieving products from cart:', error)
    return res
      .status(500)
      .json({ message: 'Error retrieving products from cart' })
  }
}
