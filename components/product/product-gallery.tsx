'use client';

import { useState } from 'react';

import Image from 'next/image';

interface ProductGalleryProps {
  listImages: {
    uid: string
    url: string,
  }[]
}

export const ProductGallery = ({ listImages }: ProductGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className='space-y-4 max-[1024px]:space-y-2'>
      <div className='relative aspect-square'>
        <Image
          src={listImages[currentIndex]?.url}
          alt={listImages[currentIndex]?.uid}
          fill
          sizes="(max-width: 768px) 100vw"
          priority
          className='object-cover object-center'
        />
      </div>

      <div className='flex items-center gap-2'>
        {listImages.map((item, index) => (
          <div
            className='relative aspect-square w-full max-w-[25%] cursor-pointer'
            key={index}
            onClick={() => setCurrentIndex(index)}
          >
            <Image
              src={item.url}
              alt={item.uid}
              fill
              sizes="(max-width: 768px) 100vw"
              priority
              className='object-cover object-center'
            />
          </div>
        ))}
      </div>
    </div>
  );
};
