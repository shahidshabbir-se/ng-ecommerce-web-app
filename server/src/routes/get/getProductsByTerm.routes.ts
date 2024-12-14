import { Response, Request } from 'express'
import { prisma } from '@configs/prisma.config'
import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'

export const getProductsByTerm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { term, startPoint } = req.query as {
      term: string
      startPoint: string
    }

    if (!term || !startPoint) {
      res.status(400).json({ message: 'Missing required query parameters' })
      return
    }

    const parsedStartPoint = parseInt(startPoint, 10)
    if (isNaN(parsedStartPoint)) {
      res.status(400).json({ message: 'Invalid startPoint parameter' })
      return
    }

    const pageSize = 20

    const searchTerms = term.split(/\s+/)
    const categories = await prisma.category.findMany({
      where: {
        OR: searchTerms.map((word) => ({
          OR: [
            { categoryName: { contains: word, mode: 'insensitive' } },
            { categoryDescription: { contains: word, mode: 'insensitive' } }
          ]
        }))
      },
      select: { categoryId: true }
    })

    const categoryIds = categories.map((category) => category.categoryId)

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
        brand: {
          select: {
            brandId: true,
            brandName: true
          }
        },
        updatedAt: true,
        productVariants: {
          select: {
            variantName: true,
            variantId: true,
            images: true,
            color: true,
            size: true
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
        images: variant.images.length > 0 ? [variant.images[0]] : [],
        sizes: variant.size
      }))

      const productData: ProductSearchByTerm = {
        productId: product.productId,
        productName: product.productName,
        regPrice: product.regPrice,
        categoryId: product.categoryId,
        categoryName: product.productCategory.categoryName,
        brand: {
          brandId: product.brand.brandId,
          brandName: product.brand.brandName
        },
        updatedAt: product.updatedAt,
        productVariants: variantsWithFirstImage
      }

      if (product.salePrice != null) {
        productData.salePrice = product.salePrice
      }

      return productData
    })

    if (processedProducts.length === 0) {
      res.status(404).json({ message: 'No products found' })
      return
    }

    res.json(processedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: 'An error occurred while fetching products' })
  }
}
