'use client'
import React, { useState, useEffect } from 'react'
import ProductGrid from '@app/results/a/productGrid'
import LoadingBar from '@components/specific/result/loadingBar'
import LoadingCard from '@components/specific/result/loadingCard'
import icons from '@data/generator/icon.generator'

interface Product {
  discount: number
  productId: number
  productName: string
  productDescription: string
  regPrice: number
  salePrice: number | null
  categoryId: number
  soldCount: number
  brand: {
    brandName: string
  }
  updatedAt: string
  productVariants: Variant[]
}

interface Filters {
  size: string[]
  variantName: string
  color: string
  minDiscount: string
  brand: { brandName: string }
  categoryId: string
}

interface Variant {
  variantId: number
  variantName: string
  images: string[]
  size: string[]
  color: string
}

interface ProductListProps {
  initialProducts: Product[]
  initialSortBy: string
  initialFilters: Filters
}

const ProductList: React.FC<ProductListProps> = ({
  initialProducts,
  initialSortBy,
  initialFilters
}) => {
  const [products] = useState<Product[]>(initialProducts)
  const [filteredProducts, setFilteredProducts] =
    useState<Product[]>(initialProducts)
  const [sortBy, setSortBy] = useState<string>(initialSortBy)
  const [filters, setFilters] = useState<Filters>(initialFilters)

  useEffect(() => {
    applyFilters(products)
  }, [sortBy, filters, products])

  const sortProducts = (products: Product[], sortBy: string): Product[] => {
    let sortedProducts = [...products]
    switch (sortBy) {
      case 'price-high-low':
        sortedProducts.sort((a, b) => b.regPrice - a.regPrice)
        break
      case 'price-low-high':
        sortedProducts.sort((a, b) => a.regPrice - b.regPrice)
        break
      case 'newest':
        sortedProducts.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )
        break
      case 'relevance':
      default:
        break
    }
    return sortedProducts
  }

  const applyFilters = (products: Product[]) => {
    const sortedProducts = sortProducts(products, sortBy)
    const filtered = sortedProducts.filter((product) => {
      if (
        filters.size.length > 0 &&
        !filters.size.some((size) =>
          product.productVariants.some((variant) => variant.size.includes(size))
        )
      ) {
        return false
      }
      if (
        filters.variantName !== '' &&
        !product.productVariants.some((variant) =>
          variant.variantName
            .toLowerCase()
            .includes(filters.variantName.toLowerCase())
        )
      ) {
        return false
      }
      if (
        filters.minDiscount !== '' &&
        product.discount < parseFloat(filters.minDiscount)
      ) {
        return false
      }
      if (
        filters.brand.brandName &&
        product.brand.brandName.toLowerCase() !==
          filters.brand.brandName.toLowerCase()
      ) {
        return false
      }
      if (
        filters.categoryId !== '' &&
        product.categoryId.toString() !== filters.categoryId
      ) {
        return false
      }
      return true
    })
    setFilteredProducts(filtered)
  }

  const handleFilterChange = (newFilters: Partial<Filters>): void => {
    setFilters({ ...filters, ...newFilters } as Filters)
  }

  const collectSizes = (products: Product[]): string[] => {
    let sizes: string[] = [];
    products.forEach((product) => {
      product.productVariants.forEach((variant) => {
        variant.size.forEach((size) => {
          if (!sizes.includes(size)) {
            sizes.push(size);
          }
        });
      });
    });
    return sizes;
  };

  const sizes = collectSizes(initialProducts);

  return (
    <div style={{ display: 'flex' }}>
      {/* Filters section */}
      <div
        style={{ width: '20%', padding: '10px', borderRight: '1px solid #ccc' }}
      >
        <h3>Filters</h3>
        <div>
          <label>
            Size:
            <select
              multiple
              value={filters.size}
              onChange={(e) =>
                handleFilterChange({
                  size: Array.from(
                    e.target.selectedOptions,
                    (option) => option.value
                  )
                })
              }
            >
              {sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Variant Name:
            <input
              type='text'
              value={filters.variantName}
              onChange={(e) =>
                handleFilterChange({ variantName: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Minimum Discount:
            <input
              type='number'
              value={filters.minDiscount}
              onChange={(e) =>
                handleFilterChange({ minDiscount: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Brand:
            <input
              type='text'
              value={filters.brand.brandName}
              onChange={(e) =>
                handleFilterChange({ brand: { brandName: e.target.value } })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Category ID:
            <input
              type='text'
              value={filters.categoryId}
              onChange={(e) =>
                handleFilterChange({ categoryId: e.target.value })
              }
            />
          </label>
        </div>
      </div>
      {/* Products grid */}
      <div className='relative w-full max-w-[900px]'>
        <div className='mb-4 mr-2 flex items-end md:justify-end justify-between md:items-center'>
          <div className='grid md:hidden'>
            <LoadingBar width={100} height={20} />
            <div className='md:hidden'>
              <LoadingBar width={100} height={36} py={8} />
            </div>
          </div>
          <div className='relative flex items-center'>
            <select
              className='md:focus:outline-auto h-10 w-full appearance-none rounded-none border border-solid border-black bg-white p-1 pr-8 text-lg font-light tracking-wide focus:outline-none md:border-none'
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option className='font-extrabold' value='relevance'>
                Sort: Relevance
              </option>
              <option className='font-extrabold' value='newest'>
                Sort: Newest
              </option>
              <option className='font-extrabold' value='price-high-low'>
                Price: High to Low
              </option>
              <option className='font-extrabold' value='price-low-high'>
                Price: Low to High
              </option>
            </select>
            <icons.chevron className='pointer-events-none absolute right-0 mr-4' />
          </div>
        </div>
        <ProductGrid filteredProducts={filteredProducts} />
      </div>
    </div>
  )
}

export default ProductList
