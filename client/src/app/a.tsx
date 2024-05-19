/* eslint-disable @next/next/no-img-element */
'use client'
// import { Carousel } from '@components/carousel/vertical/home'
// import { womenSectionImages } from '@data/women.carousel'
// import { menSectionImages } from '@data/men.carousel'
// import { kidsSectionImages } from '@data/kids.carousel'
// import { useState, useRef, useEffect } from 'react'
// import React from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react'
// import { Pagination, Keyboard, Mousewheel } from 'swiper/modules'
// // import 'swiper/css'
// // import 'swiper/css/pagination'
// import Link from 'next/link'
// import icons from '@data/generator/icon.generator'

// Import the SwiperRef type from swiper/react
import type { SwiperRef } from 'swiper/react'

export default function App() {
  // const swiperRef = useRef<SwiperRef | null>(null)

  // const handleSectionToggle = (index: number) => {
  //   if (swiperRef.current && swiperRef.current.swiper) {
  //     swiperRef.current.swiper.slideTo(index)
  //   }
  // }

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (swiperRef.current && swiperRef.current.swiper) {
  //       const swiperInstance = swiperRef.current.swiper
  //       if (event.key === 'PageDown') {
  //         swiperInstance.slideNext()
  //       } else if (event.key === 'PageUp') {
  //         swiperInstance.slidePrev()
  //       }
  //     }
  //   }

  //   window.addEventListener('keydown', handleKeyDown)
  //   return () => {
  //     window.removeEventListener('keydown', handleKeyDown)
  //   }
  // }, [])

  return (
    <div className='overflow-hidden'>
      <div>
        <img
          className='absolute object-cover'
          src='https://im.uniqlo.com/global-cms/spa/res3a559e0fde4e8ce49e48fa8e8d08600dfr.jpg'
          alt=''
        />
      </div>
      <div className='fixed left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-[calc(100%-120px)]'>
        <img
          className='object-contain h-40'
          src='https://im.uniqlo.com/global-cms/spa/res8a92e1d199c202687b7246ca2f2734a0fr.jpg'
          alt=''
        />
      </div>
    </div>

    //   {/* fixed bottom-[5%] left-1/2 z-50 flex w-1/3 -translate-x-1/2 items-center justify-center gap-10 lg:gap-40 */}
    //   <div className='static top-10 z-40 bg-red-700'>
    //     <p>Shahid</p>
    //     {/* <Link
    //       href={'/'}
    //       className='white size-[38px] rounded-full bg-white p-1 opacity-85'
    //     >
    //       <icons.home />
    //     </Link>
    //     <Link href={'/'} className='white rounded-full bg-white p-2'>
    //       <icons.search />
    //     </Link>
    //     <Link
    //       href={'/'}
    //       className='white size-[38px] rounded-full bg-white p-1 opacity-85'
    //     >
    //       <icons.user />
    //     </Link> */}
    //   </div>
    // </div>
  )
}

{
  /* <button
            className='absolute left-0 top-16 z-40 bg-red-500 p-2 text-white'
            onClick={() => handleSectionToggle(0)}
          >
            Women
          </button>
          <button
            className='absolute left-0 top-32 z-40 bg-blue-500 p-2 text-white'
            onClick={() => handleSectionToggle(1)}
          >
            Men
          </button>
          <button
            className='absolute left-0 top-48 z-40 bg-green-500 p-2 text-white'
            onClick={() => handleSectionToggle(2)}
          >
            Kids
          </button> */
}

// {/* <div className='absolute left-1/2 -z-10 -translate-x-1/2'>
//   <Swiper
//     ref={swiperRef}
//     direction='horizontal'
//     slidesPerView='auto'
//     modules={[Pagination, Keyboard, Mousewheel]}
//     className='h-full w-full'
//   >
//     <SwiperSlide className='flex h-screen w-screen items-center justify-center'>
//       <Carousel images={womenSectionImages} />
//     </SwiperSlide>
//     <SwiperSlide className='flex h-screen w-screen items-center justify-center'>
//       <Carousel images={menSectionImages} />
//     </SwiperSlide>
//     <SwiperSlide className='flex h-screen w-screen items-center justify-center'>
//       <Carousel images={kidsSectionImages} />
//     </SwiperSlide>
//   </Swiper>
// </div> */}
