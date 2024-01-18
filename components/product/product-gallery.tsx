'use client';

import { useState } from 'react';

import Image from 'next/image';

const DATA = [
  {
    imgUrl: '/assets/images/gallery/01.png',
  },
  {
    imgUrl: '/assets/images/gallery/02.png',
  },
  {
    imgUrl: '/assets/images/gallery/03.png',
  },
  {
    imgUrl: '/assets/images/gallery/04.png',
  },
];

interface ProductGalleryProps {
  listImages: {
    url: string,
    name: string
  }[]
}

export const ProductGallery = ({ listImages }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);  

  return (
    <div className='space-y-4 max-[768px]:space-y-2'>
      <div className='relative aspect-square'>
        <Image
          src={listImages[currentIndex]?.url}
          alt={listImages[currentIndex]?.name}
          fill
          className='object-cover object-center'
        />
      </div>

      <div className='flex items-center gap-2'>
        {listImages.map((item, index) => (
          <div
            className='relative aspect-square w-full max-w-[25%]'
            key={index}
          >
            <Image
              src={item.url}
              alt={item.name}
              fill
              className='object-cover object-center'
            />
          </div>
        ))}
      </div>
    </div>
  );
};
