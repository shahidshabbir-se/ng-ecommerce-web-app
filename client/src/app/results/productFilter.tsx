'use client'
import React from 'react'
import { FilterData, UniqueFilters } from '@interfaces/results.interface'
import { PriceRange, DiscountRange } from '@interfaces/results.interface'
import { filterProduct } from '@middlewares/filterProduct'
import { useState } from 'react'
import { useResultStore } from '@store/results/store'

interface FilterProps {
  Filter: UniqueFilters
}

const priceFilter: PriceRange[] = [
  {
    id: 1,
    name: 'under $10',
    min: 0,
    max: 10
  },
  {
    id: 2,
    name: '$10 - $20',
    min: 10,
    max: 20
  },
  {
    id: 3,
    name: '$20 - $30',
    min: 20,
    max: 30
  },
  {
    id: 4,
    name: '$30 - $50',
    min: 30,
    max: 50
  },
  {
    id: 5,
    name: '$50 - $100',
    min: 50,
    max: 100
  },
  {
    id: 6,
    name: '$100 - $150',
    min: 100,
    max: 150
  },
  {
    id: 7,
    name: '$150 & $200',
    min: 150,
    max: 200
  },
  {
    id: 8,
    name: '$200 & Above',
    min: 200,
    max: 999999
  }
]

const productDiscount: DiscountRange[] = [
  {
    id: 1,
    name: '0%',
    minDiscount: 0,
    maxDiscount: 0
  },
  {
    id: 2,
    name: 'up to 20%',
    minDiscount: 0,
    maxDiscount: 20
  },
  {
    id: 3,
    name: '21%-30%',
    minDiscount: 21,
    maxDiscount: 30
  },
  {
    id: 4,
    name: '31%-40%',
    minDiscount: 31,
    maxDiscount: 40
  },
  {
    id: 5,
    name: '41%-50%',
    minDiscount: 41,
    maxDiscount: 50
  },
  {
    id: 6,
    name: '51%-60%',
    minDiscount: 51,
    maxDiscount: 60
  },
  {
    id: 7,
    name: '61%-70%',
    minDiscount: 61,
    maxDiscount: 70
  },
  {
    id: 8,
    name: '70% or more',
    minDiscount: 70,
    maxDiscount: 100
  }
]

const ProductFilter: React.FC<FilterProps> = ({ Filter }) => {
  const [filter, setFilter] = useState<FilterData>({
    sizes: new Set<string>(),
    categories: new Set<string>(),
    brands: new Set<string>(),
    priceRange: undefined,
    productDiscount: undefined
  })

  const resultData = useResultStore((state) => state.resultData)
  const setResultData = useResultStore((state) => state.setResultData)
  const originalData = useResultStore((state) => state.originalData)

  const handleFilterChange = (newFilter: Partial<FilterData>) => {
    const updatedFilter = { ...filter, ...newFilter }
    setFilter(updatedFilter)
    applyFilters(updatedFilter)
  }

  const applyFilters = (filters: FilterData) => {
    const filteredData = filterProduct(originalData, filters)
    setResultData(filteredData)
  }

  const renderSelectedFilters = () => {
    const selectedFilters = []

    if (filter.sizes && filter.sizes.size > 0) {
      selectedFilters.push(
        ...Array.from(filter.sizes).map((size) => ({
          key: `size_${size}`,
          label: size,
          type: 'size'
        }))
      )
    }
    if (filter.categories && filter.categories.size > 0) {
      selectedFilters.push(
        ...Array.from(filter.categories).map((category) => ({
          key: `category_${category}`,
          label: category,
          type: 'category'
        }))
      )
    }
    if (filter.brands && filter.brands.size > 0) {
      selectedFilters.push(
        ...Array.from(filter.brands).map((brand) => ({
          key: `brand_${brand}`,
          label: brand,
          type: 'brand'
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

    return selectedFilters.map((filter) => (
      <div key={filter.key} className=''>
        <button
          className='flex flex-row items-center rounded-full border px-3 py-0.5'
          onClick={() => handleFilterRemove(filter.type)}
        >
          {filter.label}
          <icons.cross className='size-6 p-0.5' />
        </button>
      </div>
    ))
  }

  const handleClearAllFilters = () => {
    setFilter({
      sizes: new Set<string>(),
      categories: new Set<string>(),
      brands: new Set<string>(),
      priceRange: undefined,
      productDiscount: undefined
    })
    setResultData(originalData) // Reset to original data
  }

  const handleFilterRemove = (type: string) => {
    switch (type) {
      case 'size':
        handleFilterChange({ sizes: new Set<string>() })
        break
      case 'category':
        handleFilterChange({ categories: new Set<string>() })
        break
      case 'brand':
        handleFilterChange({ brands: new Set<string>() })
        break
      case 'priceRange':
        handleFilterChange({ priceRange: undefined })
        break
      case 'productDiscount':
        handleFilterChange({ productDiscount: undefined })
        break
      default:
        break
    }
  }

  return (
    <div className='mr-8 hidden min-w-[250px] max-w-[250px] md:block'>
      {filter &&
        ((filter.sizes && filter.sizes.size > 0) ||
          (filter.categories && filter.categories.size > 0) ||
          (filter.brands && filter.brands.size > 0) ||
          filter.priceRange ||
          filter.productDiscount) && (
          <div className='py-4'>
            <div className='mb-2 flex flex-row justify-between font-bold'>
              <h3 className='text-lg'>Filtered by</h3>
              <button className='underline' onClick={handleClearAllFilters}>
                Clear All
              </button>
            </div>
            <div className='flex flex-row flex-wrap gap-2 font-bold'>
              {renderSelectedFilters()}
            </div>
          </div>
        )}

      <div className='border-t border-solid'>
        <AccordionTemplate
          title='Sizes'
          items={Array.from(Filter.sizes)}
          selectedItems={filter.sizes!}
          onChange={(item, checked) => {
            const newSizes = new Set(filter.sizes)
            if (checked) {
              newSizes.add(item)
            } else {
              newSizes.delete(item)
            }
            handleFilterChange({ sizes: newSizes })
          }}
        />
      </div>

      {/* Category Filter */}
      <AccordionTemplate
        title='Categories'
        items={Array.from(Filter.categories)}
        selectedItems={filter.categories!}
        onChange={(item, checked) => {
          const newCategories = new Set(filter.categories)
          if (checked) {
            newCategories.add(item)
          } else {
            newCategories.delete(item)
          }
          handleFilterChange({ categories: newCategories })
        }}
      />

      {/* Brand Filter */}
      <AccordionTemplate
        title='Brands'
        items={Array.from(Filter.brands)}
        selectedItems={filter.brands!}
        onChange={(item, checked) => {
          const newBrands = new Set(filter.brands)
          if (checked) {
            newBrands.add(item)
          } else {
            newBrands.delete(item)
          }
          handleFilterChange({ brands: newBrands })
        }}
      />

      {/* Price Range Filter */}
      <Accordion
        style={{
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
          borderRadius: '0px',
          marginTop: '4px',
          marginBottom: '4px'
        }}
        sx={{
          '&:before': {
            display: 'none'
          }
        }}
      >
        <AccordionSummary
          style={{
            margin: '0px',
            padding: '0px'
          }}
          expandIcon={<icons.chevron />}
        >
          <h3 className='font-bold text-lg'>Price</h3>
        </AccordionSummary>
        {priceFilter.map((price) => (
          <AccordionDetails
            key={price.id}
            className='flex items-center text-lg font-light capitalize'
          >
            <input
              type='radio'
              className='border-grey-200 mr-3 flex size-6 appearance-none items-center justify-center rounded border-2 border-solid checked:bg-transparent checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-black checked:before:content-["✓"]'
              checked={filter.priceRange === price}
              onChange={() => handleFilterChange({ priceRange: price })}
            />
            <span>{price.name}</span>
          </AccordionDetails>
        ))}
      </Accordion>

      <Accordion
        style={{
          boxShadow: 'none',
          borderBottom: '1px solid rgba(0, 0, 0, .125)',
          borderRadius: '0px',
          marginTop: '4px',
          marginBottom: '4px'
        }}
        sx={{
          '&:before': {
            display: 'none'
          }
        }}
      >
        <AccordionSummary
          style={{
            margin: '0px',
            padding: '0px'
          }}
          expandIcon={<icons.chevron />}
        >
          <h3 className='font-bold text-lg'>Product Discount</h3>
        </AccordionSummary>
        {productDiscount.map((discount) => (
          <AccordionDetails
            key={discount.id}
            className='flex items-center text-lg font-light capitalize'
          >
            <input
              className='border-grey-200 mr-3 flex size-6 appearance-none items-center justify-center rounded border-2 border-solid checked:bg-transparent checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-black checked:before:content-["✓"]'
              type='radio'
              checked={filter.productDiscount === discount}
              onChange={() => handleFilterChange({ productDiscount: discount })}
            />
            <span>{discount.name}</span>
          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  )
}

export default ProductFilter

import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import icons from '@data/generator/icon.generator'

interface AccordionTemplateProps {
  title: string
  items: string[]
  selectedItems: Set<string>
  onChange: (item: string, checked: boolean) => void
  isRadio?: boolean
}

const AccordionTemplate: React.FC<AccordionTemplateProps> = ({
  title,
  items,
  selectedItems,
  onChange,
  isRadio = false
}) => {
  return (
    <Accordion
      style={{
        boxShadow: 'none',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        borderRadius: '0px'
      }}
      sx={{
        '&:before': {
          display: 'none'
        }
      }}
    >
      <AccordionSummary
        style={{
          margin: '0px',
          padding: '0px'
        }}
        expandIcon={<icons.chevron />}
      >
        <h3 className='font-bold text-lg'>{title}</h3>
      </AccordionSummary>
      <AccordionDetails>
        {items.map((item) => (
          <div key={item} className='mb-3 flex flex-row items-center'>
            <input
              type={isRadio ? 'radio' : 'checkbox'}
              className='border-grey-200 mr-3 flex h-6 w-[1.7rem] appearance-none items-center justify-center rounded border-2 border-solid checked:bg-transparent checked:before:flex checked:before:items-center checked:before:justify-center checked:before:text-black checked:before:content-["✓"]'
              checked={selectedItems.has(item)}
              onChange={(e) => onChange(item, e.target.checked)}
            />
            <p className='flex w-full justify-between text-lg font-light tracking-wide'>
              {item}
            </p>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  )
}
