'use client'

import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef, useEffect } from 'react'
import type { SwiperRef } from 'swiper/react'
import { Pagination, Keyboard, Mousewheel } from 'swiper/modules'
import { Carousel } from '@components/carousel/vertical/homeVC'
import { womenSectionImages } from '@data/women.carousel'
import { menSectionImages } from '@data/men.carousel'
import { kidsSectionImages } from '@data/kids.carousel'

export default function HomeHC() {
  const swiperRef = useRef<SwiperRef | null>(null)
  const handleSectionToggle = (index: number) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (swiperRef.current && swiperRef.current.swiper) {
        const swiperInstance = swiperRef.current.swiper
        if (event.key === 'PageDown') {
          swiperInstance.slideNext()
        } else if (event.key === 'PageUp') {
          swiperInstance.slidePrev()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
  return (
    <Swiper
      ref={swiperRef}
      direction='horizontal'
      slidesPerView='auto'
      modules={[Pagination, Keyboard, Mousewheel]}
      className='h-full w-full'
    >
      <SwiperSlide className='flex h-screen w-screen items-center justify-center'>
        <Carousel images={womenSectionImages} />
      </SwiperSlide>
      <SwiperSlide className='flex h-screen w-screen items-center justify-center'>
        <Carousel images={menSectionImages} />
      </SwiperSlide>
      <SwiperSlide className='flex h-screen w-screen items-center justify-center'>
        <Carousel images={kidsSectionImages} />
      </SwiperSlide>
    </Swiper>
  )
}
