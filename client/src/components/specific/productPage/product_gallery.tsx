import React from 'react'
import Image from 'next/image'

interface GalleryProps {
  image: string | undefined
}

const Gallery: React.FC<GalleryProps> = ({ image }) => {
  return (
    <div className='relative w-[316px]'>
      {image ? (
        <Image
          src={image}
          alt='product'
          layout='fill'
          className='object-cover'
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  )
}

export default Gallery
