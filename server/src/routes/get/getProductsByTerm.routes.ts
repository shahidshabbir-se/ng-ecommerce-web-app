import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'
import { Prisma } from '@prisma/client'
import { ResultData } from '@interfaces/result.interfaces'

export const getProductsByTerm = async (req: Request, res: Response) => {
  try {
    const { term, startPoint } = req.query as {
      term: string
      startPoint: string
    }

    if (!term || !startPoint) {
      return res
        .status(400)
        .json({ message: 'Missing required query parameters' })
    }

    const parsedStartPoint = parseInt(startPoint, 10)
    if (isNaN(parsedStartPoint)) {
      return res.status(400).json({ message: 'Invalid startPoint parameter' })
    }

    const pageSize = 40

    // Fetch category IDs matching the term
    const categories = await prisma.category.findMany({
      where: {
        OR: [
          {
            categoryName: {
              contains: term,
              mode: 'insensitive'
            }
          },
          {
            categoryDescription: {
              contains: term,
              mode: 'insensitive'
            } as Prisma.StringFilter
          }
        ]
      },
      select: {
        categoryId: true
      }
    })

    // Extract categoryIds from the retrieved categories
    const categoryIds = categories.map((category) => category.categoryId)

    // Fetch products that match either the productName or the categoryId
    const products = await prisma.product.findMany({
      where: {
        OR: [
          {
            productName: {
              contains: term,
              mode: 'insensitive'
            }
          },
          {
            categoryId: {
              in: categoryIds
            }
          }
        ]
      },
      select: {
        productId: true,
        productName: true,
        regPrice: true,
        salePrice: true,
        categoryId: true,
        productCategory: {
          select: {
            categoryName: true
          }
        },
        soldCount: true,
        brand: {
          select: {
            brandName: true
          }
        },
        updatedAt: true,
        productVariants: {
          select: {
            variantName: true,
            variantId: true,
            images: true,
            size: true,
            color: true
          }
        }
      },
      skip: parsedStartPoint,
      take: pageSize
    })

    // Process the products to include only the first image of each variant
    const processedProducts = products.map((product) => {
      const variantsWithFirstImage = product.productVariants.map((variant) => ({
        ...variant,
        images: variant.images.length > 0 ? [variant.images[0]] : []
      }))
      const calculateDiscount = (regPrice: number, salePrice: number) => {
        const discount = ((regPrice - salePrice) / regPrice) * 100
        return Math.round(discount).toString() + '%'
      }
      const productData: ResultData = {
        productId: product.productId,
        productName: product.productName,
        regPrice: product.regPrice,
        categoryId: product.categoryId,
        categoryName: product.productCategory.categoryName,
        brandName: product.brand.brandName,
        updatedAt: product.updatedAt,
        productVariants: variantsWithFirstImage
      }
      if (product.salePrice !== null) {
        productData.salePrice = product.salePrice
      }
      if (productData.salePrice && productData.regPrice) {
        productData.discount = calculateDiscount(
          productData.regPrice,
          productData.salePrice
        )
      }
      return productData
    })

    // If no products found, return 404
    if (processedProducts.length === 0) {
      return res.status(404).json({ message: 'No products found' })
    }

    // Return only products in response
    return res.json(processedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return res
      .status(500)
      .json({ error: 'An error occurred while fetching products' })
  }
}
