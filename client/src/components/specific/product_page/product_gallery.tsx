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
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            key={index}
            src={image}
            className='aspect-[580/772] w-full object-cover'
          />
        ))}
      </Slider>
    </div>
  )
}
