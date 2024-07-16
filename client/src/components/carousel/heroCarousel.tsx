/* eslint-disable @next/next/no-img-element */
'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, A11y, Autoplay, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import icons from '@icons'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import useScreenSize from '@hooks/useScreenSize.hooks'

const HeroCarousel = () => {
  const screenSize = useScreenSize()
  const images = [
    'https://cdn.media.amplience.net/i/gapprod/SU246893_imgL3_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246893_imgR3_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246893_imgL1_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246893_imgR1_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246893_imgL2_DESK',
    'https://cdn.media.amplience.net/i/gapprod/SU246893_imgR2_DESK'
  ]

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (!screenSize.width) return
    if (screenSize.width < 1024) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }, [screenSize.width])

  // Split the images into pairs for desktop view
  const imagePairs: string[][] = images.reduce(
    (acc: string[][], image, index) => {
      if (index % 2 === 0) {
        acc.push([images[index], images[index + 1]])
      }
      return acc
    },
    []
  )

  return (
    <div className='relative h-screen overflow-hidden'>
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
        {isMobile
          ? images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className='absolute inset-0 flex'>
                  <img
                    className='w-full object-cover transition-opacity duration-[2000ms] ease-in-out'
                    src={image}
                    alt=''
                  />
                  <Promo />
                </div>
              </SwiperSlide>
            ))
          : imagePairs.map((pair, index) => (
              <SwiperSlide key={index}>
                <div className='absolute inset-0 flex'>
                  <img
                    className='w-1/2 object-cover transition-opacity duration-[2000ms] ease-in-out'
                    src={pair[0]}
                    alt=''
                  />
                  <img
                    className='w-1/2 object-cover transition-opacity duration-[2000ms] ease-in-out'
                    src={pair[1]}
                    alt=''
                  />
                  <Promo />
                </div>
              </SwiperSlide>
            ))}
      </Swiper>

      <style jsx global>{`
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
      `}</style>
    </div>
  )
}

const Promo = () => {
  return (
    <div className='absolute bottom-1/2 left-1/2 w-full -translate-x-1/2 translate-y-1/2 text-center font-bold text-[40px] text-white xl:bottom-0 xl:left-16 xl:-translate-x-0 xl:translate-y-0 xl:text-left'>
      <h1 className=''>The Utility Collection</h1>
      <p className='mx-10 mt-12 text-sm xl:mx-0 xl:mt-32 xl:w-96'>
        Big pockets. Relaxed fits. Neutral shades. New workwear-inspired
        essentials to inspire your summer.
      </p>
      <div className='mt-4 flex justify-center gap-5 text-base text-black xl:mb-20 xl:justify-start'>
        <Link href={'/'} className='flex h-8 items-center bg-white px-5'>
          Shop Utility
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
export default HeroCarousel
