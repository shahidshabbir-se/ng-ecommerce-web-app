import { prisma } from '@configs/prisma.config'
import { ProductDataInput } from '@interfaces/product.interfaces'
import { Response, Request } from 'express'

export async function createProduct(req: Request, res: Response) {
  try {
    const {
      productName,
      productDescription,
      productCare,
      categoryId,
      regPrice,
      salePrice,
      brandId,
      couponId,
      productVariants
    }: ProductDataInput = req.body

    if (
      !productName ||
      !productDescription ||
      !productCare ||
      !categoryId ||
      !regPrice ||
      !brandId ||
      !productVariants ||
      !productVariants.length
    ) {
      res.status(400).json({
        message:
          'Product name, description, category, price, brand, and variants are required'
      })
      return
    }

    const category = await prisma.category.findUnique({
      where: { categoryId }
    })

    if (!category) {
      res.status(404).json({ message: 'Category not found' })
      return
    }

    const brand = await prisma.brand.findUnique({
      where: { brandId }
    })

    if (!brand) {
      res.status(404).json({ message: 'Brand not found' })
      return
    }

    if (couponId) {
      const coupon = await prisma.coupon.findUnique({
        where: { couponId }
      })

      if (!coupon) {
        res.status(404).json({ message: 'Coupon not found' })
        return
      }
    }

    const product = await prisma.product.create({
      data: {
        productName,
        productDescription,
        productCare,
        regPrice,
        salePrice,
        averageRating: 0,
        soldCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId,
        brandId,
        couponId,
        productVariants: {
          create: productVariants.map((variant) => ({
            variantName: variant.variantName,
            stock: variant.stock,
            color: variant.color,
            size: variant.size
          }))
        }
      }
    })

    res.status(201).json({ message: 'Product created', product })
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
