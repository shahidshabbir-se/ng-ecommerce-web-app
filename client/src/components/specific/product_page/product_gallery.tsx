'use client'
import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import Image from 'next/image'
import 'slick-carousel/slick/slick-theme.css'

export default function gallery({ images }: { images: string[] }) {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
  }
  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div className='relative w-full'>
            <Image
              key={index}
              src={image}
              alt='Product Image'
              layout='fill'
              className='aspect-[580/772] object-cover'
            />
          </div>
        ))}
      </Slider>
    </div>
  )
}
