export interface productData {
  productId: number;
  productName: string;
  productDescription: string
  productCare: string;
  productVariants: productVariant[];
  brand: {
    brandId: number;
    brandName: string;
    brandDescription: string;
    brandImage: string;
    createdAt: Date;
    updatedAt: Date;
  };
  categoryId: number;
  regPrice: number;
  salePrice: number;
}

export interface productVariant {
  variantId: number;
  variantName: string;
  variantImage: string;
  images: string[];
  color: string;
  size: string;
}