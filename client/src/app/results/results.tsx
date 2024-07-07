'use client'
import React, { useEffect, useState } from 'react'
import { aggregateUniqueFilters } from '@middlewares/aggregateUniqueFilters'
import { getProductsByTerm } from '@utils/search/wildSearchProducts.utils'
import { ResultData, UniqueFilters } from '@interfaces/results.interface'
import ProductGrid from './productGrid'
import ProductFilter from './productFilter'
import ProductSort from './productSort'
import LoadingBar from '@components/specific/result/loadingBar'
import { useSearchParams } from 'next/navigation'

interface LoadingParams {
  loadingFilters: JSX.Element
  loadingProducts: JSX.Element
}

const Results: React.FC<LoadingParams> = ({
  loadingFilters,
  loadingProducts
}) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [startPoint, setStartPoint] = useState(0)
  const [fetchedData, setFetchedData] = useState<ResultData[]>([])
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('search_query')
    if (!query) {
      return
    }
    setQuery(query)
    const fetchData = async () => {
      try {
        const data = await getProductsByTerm(query, startPoint)
        setFetchedData(data)
        setLoading(false)
      } catch (error) {
        setError('Failed to fetch product data')
        setLoading(false)
      }
    }
    fetchData()
  }, [searchParams, startPoint])

  if (error) {
    return (
      <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold'>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <>
      <div className='flex flex-col items-center py-8'>
        {loading ? (
          <LoadingBar width={100} height={36} py={8} />
        ) : (
          <>
            <p>Search Results For</p>
            <strong className='font-extraBold text-[20px]'>{query}</strong>
          </>
        )}
      </div>
      <div className='mx-5 flex flex-row justify-center pt-2'>
        <div className='hidden -translate-x-full md:block md:translate-x-0'>
          {loading ? (
            loadingFilters
          ) : (
            <ProductFilter Filter={aggregateUniqueFilters(fetchedData)} />
          )}
        </div>
        {loading ? (
          loadingProducts
        ) : (
          <div className='flex w-full max-w-[900px] flex-col'>
            <ProductSort />
            <ProductGrid products={fetchedData} />
          </div>
        )}
      </div>
    </>
  )
}

export default Results
