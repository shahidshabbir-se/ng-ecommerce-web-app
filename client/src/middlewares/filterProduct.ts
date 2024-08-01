import { ResultData } from '@interfaces/results.interface'
import { FilterData } from '@interfaces/results.interface'

export function filterProduct(data: ResultData[], filter: FilterData) {
  let filteredData = [...data]
  const { sizes, categories, brands, priceRange, productDiscount } = filter

  if (sizes) {
    if (sizes.size > 0) {
      filteredData = filteredData.filter((product) => {
        return product.productVariants.some((variant) => {
          return variant.size.some((size) => sizes.has(size))
        })
      })
    }
  }

  if(categories){if (categories.size > 0) {
    filteredData = filteredData.filter((product) => {
      return categories.has(product.categoryName)
    })
  }}

  if(brands){if (brands.size > 0) {
    filteredData = filteredData.filter((product) => {
      return brands.has(product.brandName)
    })
  }}

  if (priceRange) {
    filteredData = filteredData.filter((product) => {
      const price = product.salePrice ?? product.regPrice
      return price >= priceRange.min && price <= priceRange.max
    })
  }

  if (productDiscount) {
    filteredData = filteredData.filter((product) => {
      const discount = product.salePrice
        ? ((product.regPrice - product.salePrice) / product.regPrice) * 100
        : 0
      return (
        discount >= productDiscount.minDiscount &&
        discount <= productDiscount.maxDiscount
      )
    })
  }

  return filteredData
}
