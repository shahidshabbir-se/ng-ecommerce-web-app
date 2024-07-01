import React from 'react'
import { getProductsByTerm } from '@utils/search/wildSearchProducts.utils'
import Loading from '@components/specific/result/loading'
import ProductList from './ProductList' // Adjust the import path as needed

const Page = async ({ params:any }) => {
  const sortBy = params.sortBy || 'relevance'
  const filters = {
    size: params.size ? params.size.split(',') : [],
    variantName: params.variantName || '',
    minDiscount: params.minDiscount || '',
    brand: params.brand || '', // Assuming params.brand is passed correctly
    categoryId: params.categoryId || ''
  }

  let results
  try {
    results = await getProductsByTerm('Shoe', 0) // Replace 'Shoe' with your actual search term
  } catch (error) {
    console.error('Error fetching products:', error)
    // Handle error here, for example, by returning an error message or rendering an error component
    // return (
    //   <div>
    //     <h1>Internal Server Error</h1>
    //     <p>Something went wrong. Please try again later.</p>
    //   </div>
    // );
  }

  if (!results) {
    return <Loading /> // Show loading indicator while fetching
  }

  const formattedProducts = formatProducts(results, filters)

  return (
    <ProductList
      initialProducts={formattedProducts}
      initialSortBy={sortBy}
      initialFilters={filters}
    />
  )
}

export default Page

const formatProducts = (products, filters) => {
  return products
    .map((product) => ({
      productId: product.productId,
      productName: product.productName,
      productDescription: product.productDescription,
      regPrice: product.regPrice,
      salePrice: product.salePrice,
      categoryId: product.categoryId,
      soldCount: product.soldCount,
      brand: product.brand,
      updatedAt: product.updatedAt,
      productVariants: product.productVariants.map((variant) => ({
        variantId: variant.variantId,
        variantName: variant.variantName,
        images: variant.images,
        size: variant.size,
        color: variant.color
      })),
      discount: calculateDiscount(product.regPrice, product.salePrice)
    }))
    .filter((product) => {
      // Apply additional filters if needed
      if (
        filters.brand &&
        product.brand &&
        product.brand.brandName.toLowerCase() !== filters.brand.toLowerCase()
      ) {
        return false
      }
      return true
    })
}

const calculateDiscount = (regPrice, salePrice) => {
  if (!salePrice) {
    return 0
  }
  return Math.floor(((regPrice - salePrice) / regPrice) * 100)
}
