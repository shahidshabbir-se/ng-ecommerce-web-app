'use client'
import React, { useEffect, useState } from 'react'
import { ResultData } from '@interfaces/results.interface'
import { useResultStore } from '@store/results/store'
import { sortProduct } from '@middlewares/sortProduct'
import icons from '@data/generator/icon.generator'

interface ProductSortOptions {
  name: string
  value: string
}

const ProductSortOptions: ProductSortOptions[] = [
  { name: 'Sort: Relevance', value: 'relevance' },
  { name: 'Price: Low to High', value: 'price-asc' },
  { name: 'Price: High to Low', value: 'price-desc' },
  { name: 'Sort: Newness', value: 'newest' }
]

const ProductSort = () => {
  const [originalData, setOriginalData] = useState<ResultData[]>([])
  const setResultData = useResultStore((state) => state.setResultData)
  const resultData = useResultStore((state) => state.resultData)

  useEffect(() => {
    if (resultData.length > 0 && originalData.length === 0) {
      setOriginalData([...resultData])
    }
  }, [resultData, originalData])

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortedProducts = sortProduct(resultData, e.target.value, originalData)
    setResultData(sortedProducts)
  }

  return (
    <div className='my-4 flex flex-row items-center justify-between md:justify-end gap-[10px] md:mt-0'>
      <div className='mr-[8px] flex h-[40px] w-[50%] cursor-pointer flex-row items-center border border-solid border-black pl-2 text-[14px] font-light tracking-wide hover:no-underline md:hidden'>
        <icons.filter className='mr-2 size-6' />
        <span>Filter</span>
      </div>
      <div className='w-[50%] relative md:w-auto flex items-center'>
        <icons.chevron className='pointer-events-none absolute right-0 mr-2' />
        <select
          className='md:focus:outline-auto h-[40px] w-full appearance-none rounded-none border border-solid border-black bg-white p-1 pr-0 md:text-lg font-light tracking-wide focus:outline-none md:border-none md:pr-8'
          onChange={handleSort}
        >
          {ProductSortOptions.map((option, index) => (
            <option className='font-bold' key={index} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default ProductSort
