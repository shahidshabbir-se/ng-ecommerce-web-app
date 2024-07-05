export interface ResultData {
  productId: number
  productName: string
  regPrice: number
  salePrice?: number
  categoryId: number
  categoryName: string
  brandName: string
  updatedAt: Date
  discount?: string
  productVariants: ProductVariants[]
}

export interface ProductVariants {
  variantName: string
  variantId: number
  images: string[]
  size: string[]
  color: string
}

export interface FilterData {
  sizes?: Set<string>
  categories?: Set<string>
  brands?: Set<string>
  priceRange?: PriceRange
  productDiscount?: DiscountRange
}

export interface UniqueFilters {
  sizes: Set<string>
  categories: Set<string>
  brands: Set<string>
}

export interface PriceRange {
  id: number
  name: string
  min: number
  max: number
}

export interface DiscountRange {
  id: number
  name: string
  minDiscount: number
  maxDiscount: number
}
