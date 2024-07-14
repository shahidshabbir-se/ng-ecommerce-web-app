'use client'
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState, ChangeEvent } from 'react'
import { Fragment } from 'react'
import icons from '@icons'
import AccordionUsage from './accordion'
import getProduct from '@utils/product/getProduct.utils'
import { productData } from '@interfaces/getProductData.interfaces'
import Variants from './variants'
import ProductImages from './productImages'
import BreadCrumbs from '@components/specific/productPage/breadCrumbs'
import { usePathname } from 'next/navigation'
import { updateAddToCart } from '@utils/cart/updateAddToCart'
import { AddToCart } from '@interfaces/cart.interfaces'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

const ProductPage = () => {
  const [product, setProduct] = useState<productData | null>(null)
  const pathname = usePathname()
  const [quantity, setQuantity] = useState(1)
  const categoryId = parseInt(pathname.split('/')[2])
  const productId = parseInt(pathname.split('/')[4])
  const [userId, setUserId] = useState<number | null>(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const fetchProduct = async () => {
    try {
      const fetchedProduct = await getProduct(categoryId, productId)
      setProduct(fetchedProduct)
      setLoading(false)
    } catch (error) {
      setError('Product not found')
      setLoading(false)
    }
  }
  useEffect(() => {
    fetchProduct()
    if (product) {
      setLoading(false)
    }
    // Ensure cart.productId is set after product is fetched
    setCart((prevCart) => ({
      ...prevCart,
      productId: productId
    }))
  }, [categoryId, productId])

  const [cart, setCart] = useState<AddToCart>({
    userId: userId,
    productId: null,
    quantity: quantity,
    variantId: null,
    size: null
  })

  const [isDisabled, setIsDisabled] = useState(true)

  const handleQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    // ensure value must be greater than 0
    if (value > -1) {
      setQuantity(value)
      setCart((prevCart) => ({
        ...prevCart,
        quantity: value
      }))
    }
  }

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1)
    setCart((prevCart) => ({
      ...prevCart,
      quantity: quantity + 1
    }))
  }

  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1)
      setCart((prevCart) => ({
        ...prevCart,
        quantity: quantity - 1
      }))
    }
  }

  const [message, setMessage] = useState('')
  const handleAddToCart = async () => {
    try {
      console.log('cart before request', cart)

      const response = await updateAddToCart(cart)

      if (response) {
        console.log('response from server', response)
        setMessage(response.message)
      } else {
        console.log('Error adding to cart')
        setMessage('Failed to add to cart. Please try again later.')
      }
    } catch (error) {
      console.error('Error in handleAddToCart:', error)
      setMessage('Failed to add to cart. Please try again later.')
    }
  }

  return (
    <Fragment>
      {loading ? (
        <Fragment>
          <div className='flex items-center gap-3 p-4'>
            <div className='h-4 w-32 animate-pulse rounded-md bg-slate-300' />/
            <div className='h-4 w-32 animate-pulse rounded-md bg-slate-300' />/
            <div className='h-4 w-32 animate-pulse rounded-md bg-slate-300' />/
            <div className='h-4 w-32 animate-pulse rounded-md bg-slate-300' />
          </div>
          <div className='flex w-full px-3'>
            <div className='w-[55.73%]'>
              <div className='mb-3 grid grid-cols-2 gap-3'>
                <div className='w-full animate-pulse bg-slate-300 lg:h-[639px]' />
                <div className='w-full animate-pulse bg-slate-300 lg:h-[639px]' />
                <div className='w-full animate-pulse bg-slate-300 lg:h-[639px]' />
                <div className='w-full animate-pulse bg-slate-300 lg:h-[639px]' />
              </div>
            </div>
            <div className='relative w-[44.27%] px-16 py-4'>
              <div className='h-5 w-full animate-pulse rounded-md bg-slate-300' />
              <div className='my-4 flex items-center justify-between'>
                <div className='space-y-2'>
                  <div className='mr-1 h-4 animate-pulse rounded-md bg-slate-300 lg:w-80' />
                  <div className='mr-1 h-4 animate-pulse rounded-md bg-slate-300 lg:w-80' />
                </div>
                <div className='ml-3 size-8 animate-pulse rounded-full bg-slate-300 shadow-lg' />
              </div>
              <div className='h-11 w-60 animate-pulse rounded-md bg-slate-300' />
              <div className='pb-3 pt-4'>
                <strong>Color:</strong>
                <div className='flex items-center gap-2 pb-4 pt-1 font-bold text-lg'>
                  <div className='size-[32.5px] animate-pulse rounded-full bg-slate-300' />
                  <div className='size-[32.5px] animate-pulse rounded-full bg-slate-300' />
                </div>
              </div>
              <div className='py-2'>
                <strong>Select a Size:</strong>
              </div>
              <div className='flex gap-2 pb-4 pt-1 font-bold text-lg'>
                <div className='size-[50px] animate-pulse bg-slate-300' />
                <div className='size-[50px] animate-pulse bg-slate-300' />
                <div className='size-[50px] animate-pulse bg-slate-300' />
              </div>
              <div className='grid gap-4 py-4'>
                <div className='flex h-[50px] items-center gap-2.5'>
                  <div className='h-[40px] w-[120px] animate-pulse bg-slate-300' />
                  <button className='size-full animate-pulse rounded-full bg-slate-300' />
                </div>
                <button className='h-9 animate-pulse rounded-md bg-slate-300' />
              </div>
              <div className='text-lg'>
                <Accordion
                  defaultExpanded
                  style={{
                    boxShadow: 'none',
                    borderTop: '1px solid rgba(0, 0, 0, .125)',
                    borderRadius: '0rem',
                    marginTop: '4px',
                    marginBottom: '4px'
                  }}
                >
                  <AccordionSummary
                    expandIcon={<icons.chevron className='size-4 text-black' />}
                    className='font-bold'
                    style={{
                      margin: '0px',
                      padding: '0px'
                    }}
                  >
                    Description
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className='h-32 animate-pulse rounded-md bg-slate-300' />
                  </AccordionDetails>
                </Accordion>
                <div className='border-[rgba(0, 0, 0, .125)] flex h-[48px] items-center justify-between border-y font-bold'>
                  Product Care
                  <icons.chevron className='size-4 text-black' />
                </div>
                <div className='border-[rgba(0, 0, 0, .125)] flex h-[48px] items-center justify-between border-b font-bold'>
                  Returns
                  <icons.chevron className='size-4 text-black' />
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      ) : error ? (
        <div>{error}</div>
      ) : product ? (
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
              loading={loading}
            />
            <div className='relative w-[44.27%] px-16 py-4'>
              <div className='sticky top-4'>
                <strong className='font-extraBold text-lg'>
                  {product.brand.brandName}
                </strong>
                <div className='flex items-center justify-between'>
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
                <Variants
                  setCart={setCart}
                  cart={cart}
                  setIsDisabled={setIsDisabled}
                  productVariants={product.productVariants}
                />
                <div className='grid gap-4 py-4'>
                  <div className='flex h-[50px] items-center gap-2.5'>
                    <div className='flex'>
                      <button
                        onClick={handleDecrement}
                        className='flex size-[40px] items-center justify-center border border-gray-400'
                      >
                        <icons.minus className='size-4' />
                      </button>
                      <input
                        value={quantity}
                        onChange={handleQuantity}
                        type='tel'
                        className='size-[40px] border-y border-gray-400 text-center text-xl text-black outline-none'
                      />
                      <button
                        onClick={handleIncrement}
                        className='flex size-[40px] items-center justify-center border border-gray-400'
                      >
                        <icons.plus className='size-4' />
                      </button>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      disabled={isDisabled}
                      className='size-full rounded-full bg-[#444444] font-extraBold text-xl uppercase leading-4 text-white disabled:bg-[#E5E7EB] disabled:text-[#6B7280]'
                    >
                      Add to Bag
                    </button>
                  </div>
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
