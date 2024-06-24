import { prisma } from '@configs/prisma.config'
import { productData } from '@interfaces/product.interfaces'
import { Request, Response } from 'express'

export async function getProduct(req: Request, res: Response) {
  const { categoryId, productId } = req.params
  if (!categoryId || !productId) {
    return res.status(400).json({ message: 'Missing required fields' })
  }

  const requiredFields: productData = {
    categoryId: Number(categoryId),
    productId: Number(productId)
  }
  console.log('requiredFields:', requiredFields)

  try {
    const product = await prisma.product.findFirst({
      where: {
        productId: Number(productId),
        categoryId: Number(categoryId)
      },
      select: {
        productId: true,
        productName: true,
        productDescription: true,
        productCare: true,
        productVariants: {
          select: {
            variantId: true,
            variantName: true,
            variantImage: true,
            images: true,
            color: true,
            size: true
          }
        },
        brand: true,
        categoryId: true,
        regPrice: true,
        salePrice: true
      }
    })
    if (product) {
      console.log('Product found:', product)
      return res.status(200).json(product)
    } else {
      // return res.status(404).json({ message: 'Product not found' })
      console.log('Product not found')
    }
  } catch (error) {
    console.error('Error in getProduct:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
