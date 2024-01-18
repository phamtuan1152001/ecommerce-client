'use client';

import { ProductImage } from '@/components/product/product';

export const MoreChoiceProducts = () => {

  return (
    <>
      {/* Desktop */}
      <div className='space-y-2'>
        <h3 className='text-[#181818] text-lg font-bold'>Lựa chọn khác:</h3>

        <div className='grid grid-cols-3 gap-4'>
          <ProductImage src='/assets/images/related-products/01.png' alt='image' />
          <ProductImage src='/assets/images/related-products/02.png' alt='image' />
          <ProductImage src='/assets/images/related-products/03.png' alt='image' />
          <ProductImage src='/assets/images/related-products/01.png' alt='image' />
          <ProductImage src='/assets/images/related-products/02.png' alt='image' />
          <ProductImage src='/assets/images/related-products/03.png' alt='image' />
        </div>
      </div>
    </>
  );
};
