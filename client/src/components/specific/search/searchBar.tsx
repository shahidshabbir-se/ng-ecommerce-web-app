'use client'

import React, { useState, useEffect } from 'react'
import icons from '@icons'
import Link from 'next/link'
import {
  setAuthAsideVisibility,
  setSearchBarVisibility,
  useSearchVisibilityStore
} from '@store/index'
import { useRouter } from 'next/navigation'
import { popularTags } from '@data/popularTags'

export default function SearchBar() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const handleSearchBarVisibility = useSearchVisibilityStore(
    (state) => state.setSearchBarVisibility
  )
  const searchBarVisibility = useSearchVisibilityStore(
    (state) => state.searchBarVisibility
  )
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery === '') {
      console.log('Search query is empty')
      return
    }

    setLoading(true)
    try {
      router.push(`/results?search_query=${encodeURIComponent(trimmedQuery)}`)
      setSearchBarVisibility(false)
    } catch (err) {
      console.error('Navigation error:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleClickOutside = (e: MouseEvent) => {
    const searchBarElement = document.querySelector('.search-bar')
    if (searchBarElement && !searchBarElement.contains(e.target as Node)) {
      handleSearchBarVisibility(false)
    }
  }

  useEffect(() => {
    if (searchBarVisibility) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [searchBarVisibility])

  return (
    <>
      <div
        className={`search-bar fixed right-0 z-[2000] h-screen w-screen transition duration-300 md:top-0 md:w-96 ${
          searchBarVisibility ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='relative z-[100] flex gap-3 bg-white p-[9px] md:bg-bar-100'>
          <form
            className='flex h-[42px] w-full items-center border-b'
            onSubmit={handleSearch}
          >
            <Link
              className='mr-2 flex h-9 w-10 items-center justify-center hover:bg-gray-500/10'
              href={`/results?search_query=${encodeURIComponent(searchQuery)}`}
            >
              <icons.search className='size-6' />
            </Link>
            <input
              className='h-full w-full bg-transparent text-lg placeholder-black outline-none transition-opacity duration-500'
              type='text'
              placeholder='Search for products'
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              className='flex size-9 items-center justify-end'
              type='button'
              onClick={() => handleSearchBarVisibility(false)}
            >
              <icons.cross className='size-6' />
            </button>
          </form>
        </div>
        <div className='relative z-[100] h-full bg-white px-[18px] py-5'>
          <h1 className='pb-4 text-lg'>Popular</h1>
          <div className='grid'>
            {popularTags.map((tag) => (
              <Link
                key={tag.name}
                className='mb-4 flex items-center justify-between bg-bar-100 pb-[13px] pl-4 pr-[11px] pt-3'
                href={tag.link}
              >
                <span>{tag.name}</span>
                <icons.chevron className='size-3 -rotate-90' />
              </Link>
            ))}
          </div>
        </div>
      </div>
      {searchBarVisibility && (
        <div
          className={`fixed left-0 z-[1999] flex h-screen w-screen items-center bg-blurbg duration-500 md:top-0`}
        >
          {loading && <p>Loading ...</p>}
        </div>
      )}
    </>
  )
}
