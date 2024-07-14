/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import icons from '@icons'
import Link from 'next/link'
import useScreenSize from '@hooks/useScreenSize.hooks'
import { useState, useEffect } from 'react'

const KidsCarousel = () => {
  const screenSize = useScreenSize()
  const [isMobile, setIsMobile] = useState(false)
  const leftImage =
    'https://cdn.media.amplience.net/i/gapprod/SU246896_imgL_DESK'
  const rightImages = [
    'https://cdn.media.amplience.net/i/gapprod/SU246896_imgR1_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246896_imgR2_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246896_imgR3_DESK'
  ]

  useEffect(() => {
    if (!screenSize.width) return
    if (screenSize.width < 1024) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [screenSize.width])

  return (
    <div className='relative h-screen overflow-hidden'>
      <div className='flex h-full'>
        <Promo />
        <div className='flex w-full'>
          <img
            src={leftImage}
            alt='left'
            className='h-full xl:w-1/2 w-full object-cover'
          />
          {!isMobile && (
            <Swiper
              modules={[Pagination, A11y, Autoplay, EffectFade]}
              spaceBetween={30}
              effect='fade'
              loop={true}
              slidesPerView={1}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              fadeEffect={{ crossFade: true }}
              className='h-full w-full'
            >
              {rightImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt='right'
                    className='h-full w-full object-cover'
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* <style jsx global>{`
        .swiper-pagination {
          position: absolute;
          bottom: 80px !important;
          left: 43vw !important;
        }
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          border: 2px solid white;
          opacity: 1;
          background: transparent;
        }
        .swiper-pagination-bullet-active {
          background: white;
        }

        // responsive
        @media (max-width: 1024px) {
          .swiper-pagination {
            position: absolute;
            bottom: 80px !important;
            transform: translateX(-43vw);
          }
        }
      `}</style> */}
    </div>
  )
}

const Promo = () => {
  return (
    <div className='absolute left-12 bottom-12 text-center text-[40px] text-white xl:text-left'>
      <h1 className='absolute bottom-72'>New School</h1>
      <p className='text-sm w-96 my-6'>
        Big pockets. Relaxed fits. Neutral shades. New workwear-inspired
        essentials to inspire your summer.
      </p>
      <div className='flex gap-5 text-black text-base'>
        <Link href={'/'} className='flex h-8 items-center bg-white px-5'>
          Shop Back To School
          <span>
            <icons.plus className='mx-1 size-3' />
          </span>
        </Link>
        <Link href={'/'} className='flex h-8 items-center bg-white px-5'>
          Shop New Arrivals
          <span>
            <icons.plus className='mx-1 size-3' />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default KidsCarousel
