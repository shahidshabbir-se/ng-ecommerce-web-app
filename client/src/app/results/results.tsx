'use client'

import { Fragment, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Slide, Snackbar, Alert, LinearProgress } from '@mui/material'
import icons from '@icons'
import ProductFilter from '../../components/specific/result/productFilter'
import { fetchProducts } from '@services/search/fetchProducts'
import { aggregateUniqueFilters } from '@middlewares/aggregateUniqueFilters'
import { useOutsideClick } from '@hooks/clickOutside.hooks'
import { useSearchParams } from 'next/navigation'
import { useResultStore } from '@store/results/store'
import { isHexColor } from '@utils/isHexColor'

const Results = () => {
  // State variables
  const [showFilters, setShowFilters] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [startPoint, setStartPoint] = useState(0)
  const [retryCount, setRetryCount] = useState(0)
  const [tempLoading, setTempLoading] = useState(false)
  const [selectedImages, setSelectedImages] = useState<Record<number, string>>(
    {}
  )

  // Ref for handling clicks outside the filters
  const filtersRef = useOutsideClick(() => setShowFilters(false))

  // Zustand store access
  const resultData = useResultStore((state) => state.resultData)
  const setResultData = useResultStore((state) => state.setResultData)

  // Constants
  const maxRetries = 3
  const retryDelay = 2000
  const placeholderImage = '/placeholder.png'
  const searchParams = useSearchParams()
  const isNoProducts = !loading && !error && resultData.length === 0
  const isNoMoreProducts = error === 'No products found'

  // Retry logic for loading images
  useEffect(() => {
    if (imageError && retryCount < maxRetries) {
      const retryTimer = setTimeout(() => {
        setImageLoading(true)
        setImageError(false)
        setRetryCount((prev) => prev + 1)
      }, retryDelay)

      return () => clearTimeout(retryTimer)
    }
  }, [imageError, retryCount])

  // Handle search term changes from query params
  useEffect(() => {
    const query = searchParams.get('q')
    if (!query) {
      return
    }
    if (query !== searchTerm) {
      setResultData([])
      setLoading(true)
      setStartPoint(0)
    }
    setSearchTerm(query)
  }, [searchParams, setResultData, searchTerm])

  // Fetch products when search term or start point changes
  useEffect(() => {
    if (searchTerm) {
      fetchProducts(
        setLoading,
        setError,
        setSelectedImages,
        searchTerm,
        startPoint
      )
      setLoadingMore(false)
    }
    if (tempLoading) {
      setTimeout(() => {
        setTempLoading(false)
      }, 3000)
    }
  }, [searchTerm, startPoint])

  // Show snackbar for end-of-results
  useEffect(() => {
    if (isNoMoreProducts) {
      setSnackbarOpen(true)
      setTimeout(() => {
        setSnackbarOpen(false)
      }, 2000)
    }
  }, [isNoMoreProducts])

  // Handlers
  const handleImageLoad = () => {
    setImageLoading(false)
  }
  const handleImageError = () => {
    setImageLoading(false)
    setImageError(true)
  }
  const handleVariantMouseEnter = (productId: number, image: string) => {
    setSelectedImages((prev) => ({ ...prev, [productId]: image }))
  }
  const handleLoadMore = () => {
    setLoadingMore(true)
    setStartPoint((prev) => prev + 20)
    setTempLoading(true)
  }

  return (
    <Fragment>
      <div className='flex flex-col'>
        {/* Conditional rendering for different states */}
        {loading ? (
          <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center gap-3'>
            <span className='text-xl text-black dark:text-gray-300'>
              Loading products...
            </span>
            <LinearProgress
              sx={{
                height: '5px',
                borderRadius: '0px',
                backgroundColor: '#b1b1b1',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#0e3cf6'
                }
              }}
              className={'w-[10%]'}
            />
          </div>
        ) : error && (resultData === null || resultData.length === 0) ? (
          <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center gap-3'>
            <span className='text-xl text-red-600'>{error}</span>
            {error !== 'No products found' && (
              <button
                className='mt-3 rounded bg-blue-500 p-2 text-white'
                onClick={() =>
                  fetchProducts(
                    setLoading,
                    setError,
                    setSelectedImages,
                    searchTerm,
                    startPoint
                  )
                }
              >
                Retry
              </button>
            )}
          </div>
        ) : isNoProducts ? (
          <div className='flex h-[calc(100vh-120px)] flex-col items-center justify-center gap-3'>
            <span className='text-xl text-gray-500 dark:text-gray-400'>
              No products found.
            </span>
          </div>
        ) : (
          <div className='relative order-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {resultData.map((product) => (
              <Link
                key={product.productId}
                href='#'
                className='relative border-b border-r border-[#d1ced1] dark:border-[#646464]'
              >
                <button className='absolute right-1.5 top-1.5 z-10 cursor-copy rounded-full p-1 text-[25px] text-black ring-black dark:text-white'>
                  <icons.heart />
                </button>

                <div className='relative aspect-[1900/3000]'>
                  <Image
                    layout='fill'
                    quality={70}
                    src={`${selectedImages[product.productId] || product.productVariants[0].images[0]}`}
                    alt={product.productName}
                    placeholder='blur'
                    blurDataURL={placeholderImage}
                    onLoadingComplete={handleImageLoad}
                    onError={handleImageError}
                  />
                </div>
                <div className='flex flex-col gap-1 p-1.5 text-[13px] font-light'>
                  <strong className='underline'>
                    {product.brand.brandName}
                  </strong>
                  <strong className='mb-1 truncate pr-1 font-medium'>
                    {product.productName}
                  </strong>
                  <span className={'-mb-9'}>
                    {product.regPrice && (
                      <strong className='mr-2 text-gray-500 line-through dark:text-gray-400'>
                        £{product.regPrice}
                      </strong>
                    )}
                    {product.salePrice && (
                      <strong className='font-bold text-[#D80003]'>
                        £{product.salePrice}
                      </strong>
                    )}
                  </span>
                </div>
                <div className='flex w-full justify-end gap-2 p-1.5'>
                  {product.productVariants.map((variant, index) => {
                    if (variant.color) {
                      return isHexColor(variant.color) ? (
                        <div key={index}>
                          <div
                            className='size-6 rounded-full'
                            style={{ backgroundColor: variant.color }}
                            onClick={(e) => {
                              e.preventDefault()
                              e.stopPropagation()
                              handleVariantMouseEnter(
                                product.productId,
                                variant.images[0]
                              )
                            }}
                          />
                        </div>
                      ) : (
                        <Image
                          key={index}
                          className={
                            'rounded-sm border border-[#464646] object-cover'
                          }
                          width={24}
                          height={48}
                          src={variant.color}
                          alt={product.productName}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            handleVariantMouseEnter(
                              product.productId,
                              variant.images[0]
                            )
                          }}
                        />
                      )
                    }
                    return null
                  })}
                </div>
              </Link>
            ))}
          </div>
        )}
        {/* Filters Section */}
        <div className='order-1 lg:order-2'>
          <button
            type='submit'
            className='bottom-5 z-50 m-3 flex w-[calc(100vw-24px)] items-center justify-between rounded-[5px] border-[#e5e7eb] bg-white px-5 py-2 text-black md:fixed md:left-5 md:m-0 md:w-[162px] md:border-2 lg:border-0 dark:border-0 dark:bg-[#313131] dark:text-white'
            onClick={() => {
              setShowFilters(!showFilters)
            }}
          >
            <span>Filters</span>
            <icons.filter />
          </button>
          <div>
            <div
              onClick={() => setShowFilters(false)} // Close filter when clicking outside
              className={`fixed left-0 top-[68] z-[50] h-screen w-screen bg-black/60 transition-opacity duration-300 lg:top-0 dark:bg-white/60 ${showFilters ? '' : 'hidden'}`}
            />
            <Slide
              ref={filtersRef}
              className='fixed bottom-[21px] left-0 right-0 z-[50] mx-auto max-h-[calc(100vh-120px)] w-3/4 overflow-y-scroll rounded-[5px] bg-white md:left-[202px] md:mx-0 md:w-1/3 lg:ml-5 lg:max-h-[89.5%] lg:w-[25%] dark:bg-[#313131]'
              direction='up'
              in={showFilters}
              mountOnEnter
            >
              <div className='w-full max-w-[600px] rounded-[5px] md:max-w-none dark:bg-[#313131]'>
                <div className='flex w-full items-center justify-between border-b border-[#e8e8e8] p-5 dark:border-[#464646]'>
                  <span>Filter</span>
                  <button onClick={() => setShowFilters(false)} type='submit'>
                    <icons.cross className='-mr-1 size-5' />
                  </button>
                </div>
                <ProductFilter Filter={aggregateUniqueFilters(resultData)} />
              </div>
            </Slide>
          </div>
        </div>
      </div>

      {/* Load More Button */}
      {!isNoMoreProducts && resultData.length > 0 && (
        <div className='flex w-full flex-col items-center justify-center p-5'>
          {tempLoading ? (
            <Fragment>
              <span className='mb-3 text-xl text-black dark:text-gray-300'>
                Loading products...
              </span>
              <LinearProgress
                sx={{
                  height: '5px',
                  borderRadius: '0px',
                  backgroundColor: '#b1b1b1',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#0e3cf6'
                  }
                }}
                className={'w-1/3 md:w-[10%]'}
              />
            </Fragment>
          ) : (
            <div className='flex flex-col items-center justify-center'>
              <div className='group'>
                <button
                  className='flex items-center gap-2 rounded-[5px] bg-[#313131] px-5 py-2 font-medium text-white transition-all ease-in-out hover:bg-[#0e3cf6] hover:text-white lg:px-10 lg:py-2.5 dark:bg-[#ffffff] dark:text-black'
                  type='submit'
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                >
                  <span className='invisible size-1.5 animate-pulse rounded-full bg-white transition-all duration-300 ease-in-out group-hover:visible' />
                  <span>Load More</span>
                  <icons.arrow className='invisible -mb-[1px] -ml-2 size-6 -rotate-45 group-hover:visible' />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
      {resultData.length > 0 && (
        <div className='relative z-0'>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            TransitionComponent={Slide}
          >
            <Alert
              severity='info'
              className='shadow-black drop-shadow-2xl dark:shadow-white'
              sx={{
                width: '250px'
              }}
            >
              {"You've reached the end!"}
            </Alert>
          </Snackbar>
        </div>
      )}
    </Fragment>
  )
}

export default Results
