import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateOrAddCartItem(req: Request, res: Response) {
  try {
    const { userId, productId, quantity, variantId, size } = req.body

    // Validate incoming data
    if (!userId) {
      return res.status(400).json({ message: 'Please Login or Register' })
    }

    if (!productId || !quantity || !variantId || !size) {
      return res.status(400).json({ message: 'Missing required fields' })
    }
    if (quantity <= 0) {
      return res
        .status(400)
        .json({ message: 'Quantity must be greater than 0' })
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { userId }
    })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Check if the cart exists
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: { cartItems: true }
    })

    // Product variant and stock check
    const productVariant = await prisma.productVariant.findFirst({
      where: { productId, variantId }
    })

    if (!productVariant) {
      return res.status(404).json({ message: 'Product variant not found' })
    }

    // If cart doesn't exist, create a new cart
    if (!cart) {
      if (productVariant?.stock ?? 0 < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' })
      }

      cart = await prisma.cart.create({
        data: {
          userId,
          cartItems: {
            create: {
              productId,
              quantity,
              variantId,
              size
            }
          }
        },
        include: { cartItems: true }
      })

      // Update product variant stock
      await prisma.productVariant.update({
        where: { variantId },
        data: { stock: { decrement: quantity } }
      })

      return res
        .status(201)
        .json({ message: 'Cart item added', cartItem: cart.cartItems[0] })
    }

    // Check if the product already exists in the cart
    const existingCartItem = cart.cartItems.find(
      (cp) =>
        cp.productId === productId &&
        cp.variantId === variantId &&
        cp.size === size
    )

    if (!existingCartItem) {
      // Add new cart item
      if (!productVariant || productVariant.stock < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' })
      }
      const newCartItem = await prisma.cartProduct.create({
        data: {
          cartId: cart.cartId,
          productId,
          quantity,
          variantId,
          size
        }
      })

      // Update product variant stock
      await prisma.productVariant.update({
        where: { variantId },
        data: { stock: { decrement: quantity } }
      })

      return res
        .status(201)
        .json({ message: 'Cart item added', cartItem: newCartItem })
    }

    if (existingCartItem.quantity === quantity) {
      return res.status(200).json({
        message: 'Cart item quantity is the same',
        cartItem: existingCartItem
      })
    }

    // Update existing cart item if quantity is different
    if (
      !productVariant ||
      productVariant.stock + existingCartItem.quantity < quantity
    ) {
      return res.status(400).json({ message: 'Insufficient stock' })
    }
    const totalStock = productVariant.stock + existingCartItem.quantity

    const updatedCartItem = await prisma.cartProduct.update({
      where: { cartProductId: existingCartItem.cartProductId },
      data: { quantity }
    })

    await prisma.productVariant.update({
      where: { variantId },
      data: { stock: totalStock - quantity }
    })

    return res
      .status(200)
      .json({ message: 'Cart item updated', cartItem: updatedCartItem })
  } catch (error) {
    console.error('Error adding or updating cart item:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
