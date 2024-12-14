'use client'
import { useEffect } from 'react'
import { FilterData, UniqueFilters } from '@interfaces/results.interface'
import { filterProduct } from '@middlewares/filterProduct'
import { useState, useCallback, useMemo } from 'react'
import { useResultStore } from '@store/results/store'
import { priceRange } from './priceRange'
import { discountRange } from './discountRange'
import AccordionTemplate from './accordionTemplate'

interface FilterProps {
  Filter: UniqueFilters
}

const ProductFilter: React.FC<FilterProps> = ({ Filter }) => {
  const [filter, setFilter] = useState<FilterData>({
    sizes: new Set<string>(),
    categories: new Set<string>(),
    brands: new Set<string>()
  })

  const setResultData = useResultStore((state) => state.setResultData)
  const originalData = useResultStore((state) => state.originalData)
  const resultData = useResultStore((state) => state.resultData)

  // When filters change, filter the original data and store it separately
  useEffect(() => {
    if (originalData.length === 0) return

    const newFilteredData = filterProduct(originalData, filter)
    setResultData(newFilteredData) // Only update the result data in the store
    console.log('Original data in the filter', originalData.length)
    console.log('Result data in the filter', resultData.length)
  }, [filter, originalData, setResultData])

  const handleFilterChange = useCallback(
    (newFilter: Partial<FilterData>) => {
      const updatedFilter = { ...filter, ...newFilter }
      setFilter(updatedFilter)
    },
    [filter]
  )
  const renderSelectedFilters = useMemo(() => {
    const selectedFilters: {
      key: string
      label: string
      type: keyof FilterData
    }[] = []

    if (filter.sizes.size > 0) {
      selectedFilters.push(
        ...Array.from(filter.sizes).map((size) => ({
          key: `size_${size}`,
          label: size,
          type: 'sizes' as const
        }))
      )
    }
    if (filter.categories.size > 0) {
      selectedFilters.push(
        ...Array.from(filter.categories).map((category) => ({
          key: `category_${category}`,
          label: category,
          type: 'categories' as const
        }))
      )
    }
    if (filter.brands.size > 0) {
      selectedFilters.push(
        ...Array.from(filter.brands).map((brand) => ({
          key: `brand_${brand}`,
          label: brand,
          type: 'brands' as const
        }))
      )
    }
    if (filter.priceRange) {
      selectedFilters.push({
        key: `priceRange_${filter.priceRange.id}`,
        label: filter.priceRange.name,
        type: 'priceRange'
      })
    }
    if (filter.productDiscount) {
      selectedFilters.push({
        key: `productDiscount_${filter.productDiscount.id}`,
        label: filter.productDiscount.name,
        type: 'productDiscount'
      })
    }

    return selectedFilters.map((selectedFilter) => (
      <div key={selectedFilter.key} className='selected-filter'>
        <button
          className='flex items-center rounded-full border px-3 py-0.5'
          onClick={() => handleFilterRemove(selectedFilter.type)}
        >
          {selectedFilter.label}
          <span className='ml-2'>✕</span>
        </button>
      </div>
    ))
  }, [filter])

  const handleClearAllFilters = useCallback(() => {
    setFilter({
      sizes: new Set<string>(),
      categories: new Set<string>(),
      brands: new Set<string>(),
      priceRange: undefined,
      productDiscount: undefined
    })
    setResultData(originalData)
  }, [originalData, setResultData])

  const handleFilterRemove = (type: keyof FilterData) => {
    handleFilterChange({
      [type]:
        type === 'sizes' || type === 'categories' || type === 'brands'
          ? new Set()
          : undefined
    })
  }

  return (
    <div className='dark:text-white'>
      {filter &&
        (filter.sizes.size > 0 ||
          filter.categories.size > 0 ||
          filter.brands.size > 0 ||
          filter.priceRange ||
          filter.productDiscount) && (
          <div className='px-5 py-4 text-sm'>
            <div className='mb-2 flex justify-between font-light'>
              <h3>Filtered by</h3>
              <button className='underline' onClick={handleClearAllFilters}>
                Clear All
              </button>
            </div>
            <div className='flex flex-wrap gap-2 font-light'>
              {renderSelectedFilters}
            </div>
          </div>
        )}

      <AccordionTemplate
        title='Sizes'
        items={Array.from(Filter.sizes)}
        selectedItems={filter.sizes}
        onChange={(item, checked) => {
          const newSizes = new Set(filter.sizes)
          checked ? newSizes.add(item) : newSizes.delete(item)
          handleFilterChange({ sizes: newSizes })
        }}
      />

      <AccordionTemplate
        title='Categories'
        items={Array.from(Filter.categories)}
        selectedItems={filter.categories}
        onChange={(item, checked) => {
          const newCategories = new Set(filter.categories)
          checked ? newCategories.add(item) : newCategories.delete(item)
          handleFilterChange({ categories: newCategories })
        }}
      />

      <AccordionTemplate
        title='Brands'
        items={Array.from(Filter.brands)}
        selectedItems={filter.brands}
        onChange={(item, checked) => {
          const newBrands = new Set(filter.brands)
          checked ? newBrands.add(item) : newBrands.delete(item)
          handleFilterChange({ brands: newBrands })
        }}
      />

      <AccordionTemplate
        title='Price'
        items={priceRange.map((p) => p.name)}
        selectedItems={new Set([filter.priceRange?.name || ''])}
        onChange={(_, checked) =>
          handleFilterChange({
            priceRange: checked ? priceRange[0] : undefined
          })
        }
        isRadio
      />

      <AccordionTemplate
        title='Discount'
        items={discountRange.map((d) => d.name)}
        selectedItems={new Set([filter.productDiscount?.name || ''])}
        onChange={(_, checked) =>
          handleFilterChange({
            productDiscount: checked ? discountRange[0] : undefined
          })
        }
        isRadio
      />
    </div>
  )
}

export default ProductFilter
