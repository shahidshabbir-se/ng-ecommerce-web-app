/* eslint-disable @next/next/no-img-element */
import React from 'react'
import { Fragment } from 'react'
import icons from '@data/generator/icon.generator'
import AccordionUsage from './accordion'
import getProduct from '@utils/product/getProduct.utils'
import { productData } from '@interfaces/getProductData.interfaces'
import Variants from './variants'
import ProductImages from './productImages'
import BreadCrumbs from '@components/specific/product_page/breadCrumbs'

const breadCrumbs = ['Home', 'Shoes', 'Heels', 'Real Suede Studded Clogs']

const ProductPage = async () => {
  const product: productData = await getProduct(3, 1)

  return (
    <Fragment>
      {product ? (
        <Fragment>
          <div className='flex items-center p-4'>
            {/* {breadCrumbs.map((breadCrumb, index) => (
              <div key={index} className='flex items-center text-black'>
                <span className='mx-1 font-bold text-lg'>/</span>
                <span>{breadCrumb}</span>
              </div>
            ))} */}
            <BreadCrumbs categoryId={product.categoryId} />
            <p className='text-gray-500'>{product.productName}</p>
          </div>
          <div className='flex w-full px-3'>
            <ProductImages
              productName={product.productName}
              productVariants={product.productVariants}
            />
            <div className='relative w-[44.27%] px-16 py-4'>
              <div className='sticky top-4'>
                <strong className='font-extraBold text-lg'>
                  {product.brand.brandName}
                </strong>
                <div className='flex items-center'>
                  <h1 className='mr-1 text-[20px] leading-8'>
                    {product.productName}
                  </h1>
                  <button className='ml-3 rounded-full p-3 shadow-lg'>
                    <icons.heart className='size-5 font-light' />
                  </button>
                </div>
                <div className='pt-4 font-bold text-2xl text-red-400'>
                  {product.salePrice ? (
                    <Fragment>
                      <span>
                        $
                        {product.salePrice.toString().includes('.')
                          ? product.salePrice
                          : product.salePrice + '.00'}
                      </span>
                      <span className='px-2 text-black line-through'>
                        $
                        {product.regPrice.toString().includes('.')
                          ? product.regPrice
                          : product.regPrice + '.00'}
                      </span>
                      <span className='uppercase'>
                        {Math.floor(
                          ((product.regPrice - product.salePrice) /
                            product.regPrice) *
                            100
                        )}
                        % off
                      </span>
                    </Fragment>
                  ) : (
                    <span>
                      $
                      {product.regPrice.toString().includes('.')
                        ? product.regPrice
                        : product.regPrice + '.00'}
                    </span>
                  )}
                </div>
                <Variants productVariants={product.productVariants} />
                <div className='grid gap-4 py-4'>
                  <button className='h-[50px] rounded-full bg-[#444444] font-extraBold text-xl uppercase leading-4 text-white disabled:bg-[#E5E7EB] disabled:text-[#6B7280]'>
                    Add to Bag
                  </button>
                  <button className='rounded-xl bg-[#DFD4FF] px-2 py-2.5 font-bold leading-4'>
                    Free Delivery On All Orders Over £49
                  </button>
                </div>
                <div>
                  <AccordionUsage
                    productDescription={product.productDescription}
                    productCare={product.productCare}
                  />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <div>Product not found</div>
      )}
    </Fragment>
  )
}

export default ProductPage
