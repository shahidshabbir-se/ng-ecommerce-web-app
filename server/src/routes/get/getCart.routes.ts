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
            Product: {
              include: {
                productVariants: true
              }
            }
          }
        }
      }
    })

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' })
    }

    // Identify cart items with quantity 0
    const products = cart.cartItems
      .filter((cartItem) => cartItem.quantity > 0)
      .map((cartItem) => {
        return {
          productId: cartItem.productId,
          quantity: cartItem.quantity,
          product: {
            id: cartItem.Product.productId,
            name: cartItem.Product.productName,
            color: cartItem.Product.productVariants.find(
              (variant) => variant.variantId === cartItem.variantId
            )?.color,
            salePrice: cartItem.Product.salePrice,
            regPrice: cartItem.Product.regPrice,
            imageUrl: cartItem.Product.productVariants.find(
              (variant) => variant.variantId === cartItem.variantId
            )?.images[0]
          }
        }
      })

    return res.json(products)
  } catch (error) {
    console.error('Error retrieving products from cart:', error)
    return res
      .status(500)
      .json({ message: 'Error retrieving products from cart' })
  }
}
