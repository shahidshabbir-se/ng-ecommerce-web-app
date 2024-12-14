'use client'

import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Slide from '@mui/material/Slide'
import LinearProgress from '@mui/material/LinearProgress'
import Image from 'next/image'

export default function ClientLoader() {
  const [loading, setLoading] = useState(false)
  const [showSlideDiv, setShowSlideDiv] = useState(false)
  const pathname = usePathname()
  const isFirstRender = useRef(true) // Track the first render

  useEffect(() => {
    if (isFirstRender.current) {
      // Skip showing the loader during the initial render
      isFirstRender.current = false
      return
    }

    setLoading(true)
    setShowSlideDiv(true)

    const timer = setTimeout(() => {
      setLoading(false)
      setShowSlideDiv(false)
    }, 1000) // Mock delay of 1 second

    return () => clearTimeout(timer)
  }, [pathname])

  return loading ? (
    <Slide direction='down' in={showSlideDiv} mountOnEnter unmountOnExit>
      <div className='fixed left-0 top-0 z-[2000] flex h-screen w-screen -translate-x-1/2 transform flex-col items-center justify-center rounded-md bg-[#0e3cf6]'>
        <div className='relative m-4 h-8 w-full lg:h-14'>
          <Image
            src='/logo.svg'
            alt='Logo'
            layout='fill'
            className='object-contain'
          />
        </div>
        <div className='relative flex w-screen justify-center'>
          <LinearProgress
            sx={{
              height: '5px',
              borderRadius: '0px'
            }}
            className={'w-[10%]'}
          />
        </div>
      </div>
    </Slide>
  ) : null
}
