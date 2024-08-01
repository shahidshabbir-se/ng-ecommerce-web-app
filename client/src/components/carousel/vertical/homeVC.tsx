/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client'
import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Keyboard, Mousewheel } from 'swiper/modules'
import Image from 'next/image'
import { HomeCarousel } from '@interfaces/homeCarousel.interfaces'
import 'swiper/css'
import 'swiper/css/pagination'
import './style.css'

interface CarouselProps {
  images: HomeCarousel[]
}

export function Carousel({ images }: CarouselProps) {
  return (
    <Swiper
      className='cursor-pointer'
      direction='vertical'
      autoHeight={true}
      slidesPerView='auto'
      // height={900}
      pagination={{
        el: '.swiper-pagination',
        clickable: false
      }}
      keyboard={{
        enabled: true
      }}
      mousewheel={{
        forceToAxis: true,
        releaseOnEdges: true
      }}
      // className='h-screen w-screen' // Ensure the Swiper takes full screen
      speed={1200}
      modules={[Pagination, Keyboard, Mousewheel]}
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={image.img}
            className='h-screen w-screen object-cover lg:h-full lg:object-cover' // Adjust class for full coverage

            // objectPosition='center'
          />
          <div className='absolute top-0 h-screen w-screen pl-10'>
            <div className='absolute bottom-[20%] space-y-2.5'>
              <h2
                className='font-bold font-chronicle text-[1.625rem] text-white'
                dangerouslySetInnerHTML={{ __html: image.title }}
              />
              <p className='font-bold text-lg text-white'>
                {image.description}
              </p>
            </div>
          </div>
        </SwiperSlide>
      ))}
      <div className='swiper-pagination'></div>
    </Swiper>
  )
}
