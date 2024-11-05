import React from 'react'
import Image from 'next/image'

interface GalleryProps {
  image: string | undefined // Image URL for the selected variant
}

const Gallery: React.FC<GalleryProps> = ({ image }) => {
  return (
    <div className='w-[316px]'>
      {image ? (
        <Image
          height={400}
          width={400}
          src={image}
          alt='product'
          className='h-full w-full object-cover'
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  )
}

export default Gallery
