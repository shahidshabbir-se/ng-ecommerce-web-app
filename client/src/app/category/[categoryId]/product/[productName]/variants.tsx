/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect, useState } from 'react'
import { useProductsStore, setSelectedColor } from '@store/index'
import { productVariant } from '@interfaces/getProductData.interfaces'
import { AddToCart } from '@interfaces/cart.interfaces'

// Define Props interfaces
interface variantsProps {
  productVariants: productVariant[]
  setIsDisabled: (value: boolean) => void
  setCart: (value: any) => void
  cart: AddToCart
}

const Variants: React.FC<variantsProps> = ({
  productVariants,
  setIsDisabled,
  setCart,
  cart
}) => {
  const selectedColor = useProductsStore((state) => state.selectedColor)
  const setSelectedColor = useProductsStore((state) => state.setSelectedColor)
  const [selectedSize, setSelectedSize] = useState<string>('')

  // Set the default selected color to the first variant's color
  useEffect(() => {
    if (productVariants.length > 0) {
      setSelectedColor(productVariants[0].color)
    }
  }, [productVariants, setSelectedColor])

  const handleColorSelect = (color: string) => {
    setSelectedColor(color)
    setSelectedSize('')
    setIsDisabled(true)
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size)
    setIsDisabled(false)

    // Find the first variant that matches the selected size among filtered variants
    const selectedVariant = productVariants.find(
      (variant) =>
        variant.color === selectedColor &&
        (Array.isArray(variant.size)
          ? variant.size.includes(size)
          : variant.size === size)
    )

    if (selectedVariant) {
      console.log('selectedVariant', selectedVariant)
      setCart((prevCart: AddToCart) => ({
        ...prevCart,
        size: size,
        variantId: selectedVariant.variantId
      }))
    }
  }

  return (
    <>
      <div className='pb-3 pt-4'>
        <strong>Color:</strong>
        <div className='flex items-center gap-2 pb-4 pt-1 font-bold text-lg'>
          {productVariants.map((variant, index) => (
            <button
              key={index}
              className={`flex items-center justify-center rounded-full ${
                selectedColor === variant.color
                  ? 'size-[32.5px] border border-black bg-gray-200 p-0.5'
                  : 'size-[30px]'
              }`}
              onClick={() => handleColorSelect(variant.color)}
            >
              <img
                className='h-full w-full rounded-full object-cover'
                src={variant.color} // Adjust as per your data structure
                alt=''
              />
            </button>
          ))}
        </div>
      </div>

      <div className='py-2'>
        <strong>Select a Size:</strong>
      </div>

      <div className='flex gap-2 pb-4 pt-1 font-bold text-lg'>
        {productVariants
          .filter(
            (variant) => variant.color === selectedColor || selectedColor === ''
          )
          .map((variant) =>
            Array.isArray(variant.size)
              ? variant.size.map((size, index) => (
                  <button
                    key={index}
                    className={`flex size-[50px] items-center justify-center border border-black p-0.5 ${
                      selectedSize === size ? '' : 'border-gray-200'
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))
              : null
          )}
      </div>
    </>
  )
}

export default Variants
