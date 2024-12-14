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
