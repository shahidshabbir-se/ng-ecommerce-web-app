import React, { useState } from 'react';
import Gallery from '@components/specific/productPage/product_gallery';

interface Variant {
  variantId: number;
  color: string;
  images: string[];
}

interface Product {
  productId: number;
  productName: string;
  brand: {
    brandName: string;
  };
  regPrice: number;
  salePrice: number | null;
  productVariants: Variant[];
}

interface ProductGridProps {
  filteredProducts: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ filteredProducts }) => {
  const [selectedVariantImages, setSelectedVariantImages] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  // Function to handle color change
  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    const variant = filteredProducts
      .find(product => product.productVariants.some(variant => variant.color === color))
      ?.productVariants.find(variant => variant.color === color);

    if (variant) {
      setSelectedVariantImages(variant.images);
    }
  };
  
  return (
    <div className='width-full grid grid-cols-2 gap-x-5 gap-y-10 md:gap-x-2 lg:grid-cols-4'>
      {filteredProducts.map(product => (
        <div className='grid max-w-[400px] pb-2 pr-2' key={product.productId}>
          <div className='grid'>
            {/* Product images */}
            <div className='flex'>
              <Gallery image={selectedVariantImages[0]} />
            </div>

            {/* Brand and product details */}
            <span className='pt-2 font-extraBold leading-8'>
              {product.brand ? product.brand.brandName : ''}
            </span>{' '}
            <strong className='mb-2.5 line-clamp-3 break-words'>
              {product.productName}
            </strong>

            {/* Prices */}
            <div className='mb-4 flex-wrap items-baseline justify-between font-bold sm:flex sm:flex-col md:flex md:flex-row'>
              <div>
                {product.salePrice && product.salePrice > 0 && (
                  <span className='mr-2 font-extraBold text-red-500'>
                    ${product.salePrice}
                  </span>
                )}
                <span
                  className={`${product.salePrice ? 'mr-2 line-through' : 'font-extraBold'}`}
                >
                  ${product.regPrice}
                </span>
              </div>
              {product.salePrice && product.salePrice > 0 && (
                <span className='text-red-500'>{product.discount}</span>
              )}
            </div>

            {/* Color variants */}
            <ul className='flex flex-wrap items-center pb-4'>
              {product.productVariants.map(variant => (
                <li
                  key={variant.variantId}
                  className={`variant-item ${selectedColor === variant.color ? 'selected' : ''}`}
                  onClick={() => handleColorChange(variant.color)}
                >
                  <img
                    className='mr-1 h-6 w-6 overflow-hidden rounded-full border border-white outline outline-[1px] outline-black'
                    src={variant.color}
                    alt={variant.color}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
