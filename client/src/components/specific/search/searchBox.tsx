'use client'
import React, { useState } from 'react'
import { Slide } from '@mui/material'
import { redirect } from 'next/navigation'
import icons from '@icons'
import Link from 'next/link'
import SearchCarousel from './searchCarousel'

interface SearchBoxProps {
  onClose: () => void
}

interface PsButton {
  name: string
  link: string
}

const SearchBox: React.FC<SearchBoxProps> = ({ onClose }) => {
  const [inProp, setInProp] = useState(true)
  const [query, setQuery] = useState('')
  const psButtons: PsButton[] = [
    {
      name: 'Best Sellers',
      link: 'best-sellers'
    },
    {
      name: 'Soho',
      link: 'soho'
    },
    {
      name: 'Sale',
      link: 'sale'
    },
    {
      name: 'Monza',
      link: 'monza'
    },
    {
      name: 'Jack',
      link: 'jack'
    }
  ]

  const handleClose = () => {
    setInProp(false)
    setTimeout(onClose, 300)
  }

  const handleSearch = () => {
    if (query.trim() === '') {
      alert('Please enter a valid search term')
      return
    }
    handleClose()
    redirect(`/results?q=${query}`)
  }

  return (
    <div className=''>
      <div
        onClick={handleClose}
        className='fixed left-0 top-0 z-10 h-screen w-screen bg-black/60 transition-opacity duration-300 dark:bg-white/60'
      ></div>
      <Slide
        className='fixed left-0 top-0 z-10 flex w-screen flex-col gap-[5px] rounded-b-lg bg-white lg:left-[220px] lg:top-[50px] lg:w-[31%] lg:rounded-lg dark:bg-[#313131]'
        direction='down'
        in={inProp}
        mountOnEnter
        unmountOnExit
      >
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleSearch()
            }}
            className='flex border-b p-4 dark:border-[#ffffff1a]'
          >
            <input
              type='text'
              className='h-[30px] w-full bg-transparent text-[#0e3cf6] outline-none'
              placeholder='Search for...'
              value={query}
              autoFocus={true}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type='button' onClick={handleClose}>
              <icons.cross className='h-4 w-4 text-black dark:text-white' />
            </button>
          </form>
          <div className='h-full flex-grow py-2 pl-4 pr-0 text-black dark:text-white'>
            <div className='flex flex-col gap-2 pr-4'>
              <p>Popular Search</p>
              <div className='flex flex-wrap gap-2'>
                {psButtons.map((button) => (
                  <Link
                    className='mr-2.5'
                    key={button.link}
                    href={`/${button.link}`}
                    passHref
                  >
                    {button.name}
                  </Link>
                ))}
              </div>
            </div>
            <SearchCarousel />
          </div>

          <div className='flex flex-col justify-end gap-[8px] border-t p-4 text-black dark:border-[#ffffff1a] dark:text-white'>
            <p className='text-sm'>Useful pages</p>
            <ul className='flex gap-2'>
              <li>Contact</li>
              <li>FAQs</li>
              <li>About</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
        </div>
      </Slide>
    </div>
  )
}

export default SearchBox
