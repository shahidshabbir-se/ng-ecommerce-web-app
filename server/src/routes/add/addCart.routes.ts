import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateOrAddCartItem(req: Request, res: Response) {
  try {
    const { userId, variantId, quantity } = req.body

    // Validate incoming data
    if (
      !userId ||
      !variantId ||
      !quantity ||
      isNaN(userId) ||
      isNaN(variantId) ||
      isNaN(quantity)
    ) {
      return res.status(400).json({
        message:
          'User ID, Variant ID, and Quantity are required and must be numbers'
      })
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: {
        userId: userId
      }
    })

    if (!user) {
      return res.status(404).json({
        message: 'User not found for the given userId'
      })
    }

    // Find the product variant and check stock availability
    const productVariant = await prisma.productVariant.findUnique({
      where: {
        variantId: variantId
      }
    })

    if (!productVariant) {
      return res.status(404).json({
        message: 'Product variant not found for the given variantId'
      })
    }

    if (productVariant.stock < quantity) {
      return res.status(400).json({
        message: 'Insufficient stock for the requested quantity'
      })
    }

    // Find or create cart
    let cart = await prisma.cart.findUnique({
      where: {
        userId: userId
      },
      include: {
        cartItems: true
      }
    })

    if (!cart) {
      // Create a new cart for the user
      cart = await prisma.cart.create({
        data: {
          userId: userId,
          cartItems: {
            create: {
              variantId: variantId,
              quantity: quantity,
              productId: productVariant.productId
            }
          }
        },
        include: { cartItems: true }
      })

      return res.status(201).json(cart)
    }

    // Check if the product already exists in the user's cart
    const existingCartProduct = cart.cartItems.find(
      (cp) => cp.variantId === variantId
    )

    if (existingCartProduct) {
      return res.status(400).json({
        message:
          "Product variant already exists in the user's cart. Use a different endpoint to update the quantity."
      })
    } else {
      // Add new product to the existing cart
      const newCartProduct = await prisma.cartProduct.create({
        data: {
          cartId: cart.cartId,
          variantId: variantId,
          quantity: quantity,
          productId: productVariant.productId
        }
      })

      return res.status(201).json(newCartProduct)
    }
  } catch (error) {
    console.error('Error adding cart item:', error)
    return res.status(500).json({ message: 'Error adding cart item' })
  }
}
