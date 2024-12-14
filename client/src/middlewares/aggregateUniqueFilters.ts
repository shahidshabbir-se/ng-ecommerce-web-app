import { UniqueFilters } from '@interfaces/results.interface'
import { ProductSearchByTerm } from '@shared_interfaces/productSearchByTerm.interfaces'

export const aggregateUniqueFilters = (products: ProductSearchByTerm[]) => {
  const sizes = new Set<string>()
  const categories = new Set<string>()
  const brands = new Set<string>()
  products.forEach((product) => {
    product.productVariants.forEach((variant) => {
      variant.sizes.forEach((size) => {
        sizes.add(size)
      })
    })
  })
  products.forEach((product) => {
    categories.add(product.categoryName)
  })
  products.forEach((product) => {
    brands.add(product.brand.brandName)
  })
  const uniqueFilters: UniqueFilters = {
    sizes,
    categories,
    brands
  }
  return uniqueFilters
}
