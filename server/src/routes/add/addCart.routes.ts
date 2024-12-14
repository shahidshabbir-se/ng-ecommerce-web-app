import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function updateOrAddCartItem(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId, productId, quantity, variantId, size } = req.body

    // Validate incoming data
    if (!userId) {
      res.status(400).json({ message: 'Please Login or Register' })
      return
    }

    if (!productId || !quantity || !variantId || !size) {
      res.status(400).json({ message: 'Missing required fields' })
      return
    }
    if (quantity <= 0) {
      res.status(400).json({ message: 'Quantity must be greater than 0' })
      return
    }

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { userId }
    })
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
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
      res.status(404).json({ message: 'Product variant not found' })
      return
    }

    // If cart doesn't exist, create a new cart
    if (!cart) {
      if (productVariant?.stock < quantity) {
        res.status(400).json({ message: 'Insufficient stock' })
        return
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

      res
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
        res.status(400).json({ message: 'Insufficient stock' })
        return
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

      res
        .status(201)
        .json({ message: 'Cart item added', cartItem: newCartItem })
      return
    }

    if (existingCartItem.quantity === quantity) {
      res.status(200).json({
        message: 'Cart item quantity is the same',
        cartItem: existingCartItem
      })
    }

    // Update existing cart item if quantity is different
    if (
      !productVariant ||
      productVariant.stock + existingCartItem.quantity < quantity
    ) {
      res.status(400).json({ message: 'Insufficient stock' })
      return
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

    res
      .status(200)
      .json({ message: 'Cart item updated', cartItem: updatedCartItem })
  } catch (error) {
    console.error('Error adding or updating cart item:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
