'use client'
import React, {useState} from 'react'
import icons from '@data/generator/icon.generator'
import Link from 'next/link'

export default function Bar() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: any) => {
    e.preventDefault()

    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery === '') {
      console.log('Search query is empty')
      return
    }

    console.log('Searching for:', trimmedQuery)
  }

  const handleInputChange = (e: any) => {
    setSearchQuery(e.target.value)
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <div className='fixed right-0 top-0 z-[2000] h-screen w-screen bg-white'>
      <div className='flex gap-3 bg-bar-100'>
        <form>
          <Link href={`/results?search_query=${encodeURIComponent(searchQuery)}`}>
            <icons.search/>
          </Link>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type='button' onClick={handleClearSearch}>
            <icons.cross/>
          </button>
        </form>
        {/* Use Link to navigate to results page */}
        {/*<Link*/}
        {/*  to={`/results?search_query=${encodeURIComponent(searchQuery)}`}*/}
        {/*  className='hidden'*/}
        {/*>*/}
        {/*  Go to Results*/}
        {/*</Link>*/}
      </div>
    </div>
  )
}
