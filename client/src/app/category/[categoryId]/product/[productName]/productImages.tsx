/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useProductsStore } from '@store/index'
import { productVariant } from '@interfaces/getProductData.interfaces'

interface ImagesProps {
  productName: string
  productVariants: productVariant[]
}

const ProductImages: React.FC<ImagesProps> = ({
  productName,
  productVariants
}) => {
  const selectedColor = useProductsStore((state) => state.selectedColor)

  // Filter variants based on selected color or show all if no color is selected
  const filteredVariants = productVariants.filter(
    (variant) => variant.color === selectedColor || selectedColor === ''
  )

  return (
    <div className='w-[55.73%]'>
      {filteredVariants.map((variant) => (
        <div className='grid grid-cols-2 gap-3'>
          {variant.images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={
                productName + ' ' + variant.color + ' ' + variant.size + index
              }
              className='mb-3 h-full object-cover'
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default ProductImages
