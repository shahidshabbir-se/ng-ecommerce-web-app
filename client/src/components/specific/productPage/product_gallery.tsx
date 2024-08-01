import React from 'react';

interface GalleryProps {
  image: string | undefined; // Image URL for the selected variant
}

const Gallery: React.FC<GalleryProps> = ({ image }) => {
  return (
    <div className='w-[316px]'>
      {image ? (
        <img
          src={image}
          alt='product'
          className='w-full h-full object-cover'
        />
      ) : (
        <p>No image available</p>
      )}
    </div>
  );
};

export default Gallery;
