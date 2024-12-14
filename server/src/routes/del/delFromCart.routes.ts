import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'

export async function delFromCart(req: Request, res: Response): Promise<void> {
  try {
    const { userId, variantId, size } = req.body
    if (!userId) {
      res.status(400).json({ message: 'User ID is required' })
      return
    }
    if (!variantId) {
      res.status(400).json({ message: 'Variant ID is required' })
      return
    }
    if (!size) {
      res.status(400).json({ message: 'Size is required' })
      return
    }

    // Check if the cart for the user exists
    const cart = await prisma.cart.findUnique({
      where: {
        userId: userId
      },
      include: {
        cartItems: true
      }
    })

    if (!cart) {
      res.status(404).json({ message: "Haven't added any product to cart" })
      return
    }

    // Check if the product exists in the cart
    const cartProduct = await prisma.cartProduct.findFirst({
      where: {
        cartId: cart.cartId,
        variantId: variantId,
        size: size
      }
    })

    if (!cartProduct) {
      res.status(404).json({ message: 'Product not found in the cart' })
      return
    }

    // Product exists in the cart, delete it
    await prisma.cartProduct.delete({
      where: {
        cartProductId: cartProduct.cartProductId
      }
    })

    await prisma.productVariant.update({
      where: {
        variantId: variantId
      },
      data: {
        stock: {
          increment: cartProduct.quantity
        }
      }
    })

    res.json({ message: 'Product removed from the cart' })
  } catch (error) {
    console.error('Error removing cart item:', error)
    res.status(500).json({ message: 'Error removing cart item' })
  }
}
