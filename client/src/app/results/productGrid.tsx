'use client'
import React, { useEffect, useState } from 'react'
import { ResultData, ProductVariants } from '@interfaces/results.interface'
import { useResultStore } from '@store/results/store'
import Image from 'next/image'
import Link from 'next/link'

interface ProductGridProps {
  products: ResultData[]
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const setResultData = useResultStore((state) => state.setResultData)
  const setOriginalData = useResultStore((state) => state.setOriginalData)
  const resultData = useResultStore((state) => state.resultData)

  const [selectedImages, setSelectedImages] = useState<{
    [key: number]: string
  }>({})
  const [hoveredImages, setHoveredImages] = useState<{
    [key: number]: string | undefined
  }>({})

  useEffect(() => {
    if (products.length > 0) {
      const initialSelectedImages: { [key: number]: string } = {}
      products.forEach((product) => {
        if (product.productVariants.length > 0) {
          initialSelectedImages[product.productId] =
            product.productVariants[0].images[0]
        }
      })
      setSelectedImages(initialSelectedImages)
    }
    setResultData(products)
    setOriginalData(products)
  }, [products, setResultData, setOriginalData])

  const handleColorClick = (productId: number, variant: ProductVariants) => {
    setSelectedImages((prevState) => ({
      ...prevState,
      [productId]: variant.images[0]
    }))
  }

  const handleMouseEnter = (productId: number, variant: ProductVariants) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [productId]: variant.images[0]
    }))
  }

  const handleMouseLeave = (productId: number) => {
    setHoveredImages((prevState) => ({
      ...prevState,
      [productId]: undefined
    }))
  }
  const isHexColor = (color: string) => /^#([0-9A-F]{3}){1,2}$/i.test(color)

  return (
    <div className='grid w-full grid-cols-2 gap-x-5 gap-y-10 md:gap-x-2 lg:grid-cols-4'>
      {resultData.map((product) => (
        <Link
          href={'#'}
          className='grid max-w-[400px] pb-2 md:pr-2'
          key={product.productId}
        >
          {selectedImages[product.productId] && (
            <img
              // className='h-full w-full'
              // objectFit='cover'
              // fill={true}
              className='h-full w-full'
              src={
                hoveredImages[product.productId] ||
                selectedImages[product.productId]
              }
              alt={`Product ${product.productId}`}
            />
          )}
          <h1 className='pt-2 font-extraBold'>{product.brandName}</h1>
          <strong className='mb-2.5 line-clamp-3 break-words'>
            {product.productName}
          </strong>
          <div className='mb-4 flex-wrap items-baseline justify-between font-bold sm:flex sm:flex-col md:flex md:flex-row'>
            <div>
              {product.salePrice && (
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
            {product.discount && (
              <span className='text-red-400'>Save {product.discount}</span>
            )}
          </div>
          <ul className='flex flex-wrap items-center pb-4'>
            {product.productVariants.map((variant) => (
              <li
                key={variant.variantId}
                onClick={() => handleColorClick(product.productId, variant)}
                onMouseEnter={() =>
                  handleMouseEnter(product.productId, variant)
                }
                onMouseLeave={() => handleMouseLeave(product.productId)}
              >
                {isHexColor(variant.color) ? (
                  <div>
                    <div
                      className={`h-6 w-6 cursor-pointer rounded-full border border-white outline outline-[1px] outline-black`}
                      style={{ backgroundColor: variant.color }}
                    />
                  </div>
                ) : (
                  <Image
                    className={`mr-1 overflow-hidden rounded-full border border-white ${
                      selectedImages[product.productId] === variant.images[0]
                        ? 'size-[22px] ring-1 ring-black'
                        : 'size-6'
                    }`}
                    width={24}
                    height={24}
                    src={variant.color}
                    alt={variant.color}
                  />
                )}
              </li>
            ))}
          </ul>
          {/* {product.productVariants.map((variant, index) => (
            <div key={index}>
              <button
                onClick={() => handleColorClick(product.productId, variant)}
                onMouseEnter={() =>
                  handleMouseEnter(product.productId, variant)
                }
                onMouseLeave={() => handleMouseLeave(product.productId)}
              >
                <img
                  className='size-5 rounded-full'
                  src={variant.images[0]}
                  alt={`Color ${variant.color}`}
                />
              </button>
            </div>
          ))} */}
          {/* <div className='relative h-full w-full'> */}
          {/* </div> */}
        </Link>
      ))}
    </div>
  )
}

export default ProductGrid
