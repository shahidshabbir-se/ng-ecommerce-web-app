/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import { useProductsStore } from '@store/index'
import { productVariant } from '@interfaces/getProductData.interfaces'
import Image from 'next/image'

interface ImagesProps {
  productName: string
  productVariants: productVariant[]
  loading: boolean
}

const ProductImages: React.FC<ImagesProps> = ({
  productName,
  productVariants,
  loading
}) => {
  const selectedColor = useProductsStore((state) => state.selectedColor)

  // Filter variants based on selected color or show all if no color is selected
  const filteredVariants = productVariants.filter(
    (variant) => variant.color === selectedColor || selectedColor === ''
  )

  return (
    <div className='w-[55.73%]'>
      {loading ? (
        <div className='mb-3 grid grid-cols-2 gap-3'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='bg-slate-200 lg:h-[639px]' />
          ))}
        </div>
      ) : (
        <div className='grid grid-cols-2 gap-3'>
          {filteredVariants.map((variant) =>
            variant.images.map((image, index) => (
              <div key={index} className='h-screen'>
                <div className='relative h-full'>
                  <Image
                    layout='fill'
                    key={index}
                    src={image}
                    alt={`${productName} ${variant.color} ${variant.size} ${index}`}
                    className='mb-3 h-full object-cover'
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default ProductImages
