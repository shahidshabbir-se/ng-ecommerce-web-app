'use client'

import React, { useState, useEffect } from 'react'
import icons from '@icons'
import Link from 'next/link'
import { useSearchVisibilityStore } from '@store/index'
import { useRouter } from 'next/navigation'

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

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery === '') {
      console.log('Search query is empty')
      return
    }
    setLoading(true)
    router.push(`/results?search_query=${encodeURIComponent(trimmedQuery)}`)
    setLoading(false)
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
        className={`search-bar fixed right-0 top-0 z-[2000] h-screen w-96 transition duration-300 ${
          searchBarVisibility ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='relative z-[100] flex gap-3 bg-bar-100 p-[9px]'>
          <form
            className='flex h-[42px] w-full items-center border-b'
            onSubmit={handleSearch}
          >
            <Link
              className='flex size-9 items-center'
              href={`/results?search_query=${encodeURIComponent(searchQuery)}`}
            >
              <icons.search className='size-6' />
            </Link>
            <input
              className='h-full w-full bg-transparent text-lg placeholder-black outline-none'
              type='text'
              placeholder='search'
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
          <h1 className='text-lg'>Popular</h1>
        </div>
      </div>
      {searchBarVisibility && (
        <div
          className={`fixed left-0 top-0 flex h-screen w-screen items-center bg-gray-500/65 z-[1999] duration-500`}
        >
          {loading && <p>Loading ...</p>}
        </div>
      )}
    </>
  )
}
