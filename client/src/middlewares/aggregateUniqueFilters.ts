import { ResultData,UniqueFilters } from "@interfaces/results.interface"

export const aggregateUniqueFilters = (products: ResultData[]) => {
  const sizes = new Set<string>()
  const categories = new Set<string>()
  const brands = new Set<string>()
  products.forEach((product) => {
    product.productVariants.forEach((variant) => {
      variant.size.forEach((size) => {
        sizes.add(size)
      })
    })
  })
  products.forEach((product) => {
    categories.add(product.categoryName)
  })
  products.forEach((product) => {
    brands.add(product.brandName)
  })
  const uniqueFilters: UniqueFilters = {
    sizes,
    categories,
    brands
  }
  return uniqueFilters
}
