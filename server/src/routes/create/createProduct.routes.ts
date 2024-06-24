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

    // Validate required fields
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
      return res.status(400).json({
        message:
          'Product name, description, category, price, brand, and variants are required'
      })
    }

    // Check if the category exists
    const category = await prisma.category.findUnique({
      where: { categoryId }
    })

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    // Check if the brand exists
    const brand = await prisma.brand.findUnique({
      where: { brandId }
    })

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' })
    }

    // Check if the coupon exists (if provided)
    if (couponId) {
      const coupon = await prisma.coupon.findUnique({
        where: { couponId }
      })

      if (!coupon) {
        return res.status(404).json({ message: 'Coupon not found' })
      }
    }

    // Create the product along with variants
    const product = await prisma.product.create({
      data: {
        productName,
        productDescription,
        productCare,
        regPrice,
        salePrice,
        averageRating: 0, // Initial value, can be adjusted
        soldCount: 0, // Initial value, can be adjusted
        createdAt: new Date(),
        updatedAt: new Date(),
        categoryId,
        brandId,
        couponId,
        productVariants: {
          create: productVariants.map((variant) => ({
            variantName: variant.variantName,
            variantImage: variant.variantImage,
            stock: variant.stock,
            color: variant.color,
            size: variant.size
          }))
        }
      }
    })

    return res.status(201).json({ message: 'Product created', product })
  } catch (error) {
    console.error('Error creating product:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
