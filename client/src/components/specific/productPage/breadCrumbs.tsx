'use client'

import * as React from 'react'
import getCategory from '@utils/category/getCategory.utils'
import { categoryData } from '@interfaces/categoryData.interfaces'
import Link from 'next/link'

interface BreadCrumbsProps {
  categoryId: number
}

// get Categories until the root category which has parent ID null

export default function BreadCrumbs({ categoryId }: BreadCrumbsProps) {
  const [categories, setCategories] = React.useState<categoryData[]>([])

  React.useEffect(() => {
    const fetchCategories = async () => {
      let currentCategoryId = categoryId
      const categoriesArray: categoryData[] = []

      // Fetch categories recursively until reaching the root category
      while (currentCategoryId !== null) {
        const category = await getCategory(currentCategoryId)
        categoriesArray.unshift(category) // Add category at the beginning of the array
        currentCategoryId = category.parentId // Update currentCategoryId to parent ID
      }

      setCategories(categoriesArray)
    }

    fetchCategories()
  }, [categoryId]) // Run effect whenever categoryId changes

  return (
    <div>
      {/* Render breadcrumbs based on fetched categories */}
      <Link className='hover:underline' href={'/'}>
        Home
      </Link>
      <span className='font-bold text-lg'> / </span>
      {categories.map((category, index) => (
        <span key={category.categoryId}>
          <Link className='hover:underline' href={'#'}>
            {category.categoryName}
          </Link>
          {index < categories.length - 1 && (
            <span className='font-bold text-lg'> / </span>
          )}
        </span>
      ))}
      <span className='mr-1 font-bold text-lg'> / </span>
    </div>
  )
}
