import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function removeCartItem(req: Request, res: Response) {
  try {
    const { userId, productId, quantity } = req.body
    if (
      !userId ||
      !productId ||
      isNaN(userId) ||
      isNaN(productId) ||
      isNaN(quantity)
    ) {
      return res.status(400).json({
        message: 'User ID and Product ID are required and must be numbers'
      })
    }

    // Check if the cart for the user exists
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId
      },
      include: {
        products: true
      }
    })

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Haven't added any product to cart" })
    }

    // Check if the product exists in the cart
    const cartProduct = cart.products.find((cp) => cp.productId === productId)

    if (!cartProduct) {
      return res.status(404).json({ message: 'Product not found in the cart' })
    }

    // Product exists in the cart, delete it
    await prisma.cartProduct.update({
      where: {
        cartProductId: cartProduct.cartProductId
      },
      data: { quantity: { decrement: quantity } }
    })

    return res.json({ message: 'Product removed from the cart' })
  } catch (error) {
    console.error('Error removing cart item:', error)
    return res.status(500).json({ message: 'Error removing cart item' })
  }
}
