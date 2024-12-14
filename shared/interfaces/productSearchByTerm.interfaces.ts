export interface ProductSearchByTerm {
	productId: number
	productName: string
	categoryId: number,
	categoryName: string,
	regPrice: number
	salePrice?: number
	brand: {
		brandId: number
		brandName: string
	}
	productVariants: {
		variantId: number
		variantName: string
		images: string[]
		color: string
		sizes: string[]
	}[]
	updatedAt: Date
}
