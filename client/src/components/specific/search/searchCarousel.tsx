import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Image from 'next/image'
function SearchCarousel() {
  const settings = {
    // dots: true,
    infinite: false,
    // centerMode: true,
    speed: 500,
    arrows: false,
    slidesToShow: 2.5,
    // centerMode: true,
    slidesToScroll: 1
  }

  const carouselItems = [
    {
      url: 'https://mediahub.debenhams.com/dbz_prod_WK44_NG_NEW_CATTILES_COATS_JACKETS?qlt=80&w=341&h=453&ttl=86400&dpr=1&fit=cvr',
      caption: 'Coats and Jackets'
    },
    {
      url: 'https://mediahub.debenhams.com/dbz_prod_WK44_NG_NEW_CATTILES_DRESSES?qlt=80&w=341&h=453&ttl=86400&dpr=1&fit=cvr',
      caption: 'Dresses'
    },
    {
      url: 'https://mediahub.debenhams.com/dbz_prod_WK44_NG_NEW_CATTILES_TOPS?qlt=80&w=341&h=453&ttl=86400&dpr=1&fit=cvr',
      caption: 'Tops'
    }
  ]

  return (
    <div className='pt-4'>
      <Slider {...settings}>
        {carouselItems.map((item, index) => (
          <div key={index} className='h-[200px] w-[150px]'>
            <div className='mb-1 mr-2 rounded'>
              <Image
                src={item.url}
                alt={item.caption}
                width={200}
                height={150}
                className='object-cover'
              />
              <h1>{item.caption}</h1>
            </div>
          </div>
        ))}
      </Slider>
      <style jsx global>{`
        .slick-slide {
          width: 150px !important;
          height: 210px !important;
        }
      `}</style>
    </div>
  )
}

export default SearchCarousel
