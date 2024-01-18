'use client';

import { Settings } from 'react-slick';

import { Container } from '@/components/ui/container';
import { SlickSlider } from '@/components/ui/slick-slider';
import { ProductCard } from '@/components/product/product-card';

import { VIEWED_PRODUCTS } from './data';

import Link from 'next/link';

export const ViewedProducts = () => {
  const settings: Settings = {
    dots: true,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 3,
    dotsClass: 'min-[1280px]:absolute min-[1280px]:right-0 min-[1280px]:bottom-full min-[1280px]:-translate-y-6 mt-3 justify-center',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
    ]
  };

  return (
    <section className='py-10 max-[768px]:py-6 max-[768px]:px-3'>
      <Container>
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <h2 className='text-[26px] text-[#242424] leading-normal font-bold'>
              Sản phẩm đã xem
            </h2>
            <div className='min-[1280px]:hidden'>
              <Link href={"/"} className='text-base font-semibold'>
                Xem tất cả
              </Link>
            </div>
          </div>

          {/* <SlickSlider settings={settings} variant='inline'>
            {VIEWED_PRODUCTS.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </SlickSlider> */}

          <div className='max-[768px]:hidden text-center'>
            <Link href={"/"} className='text-base font-semibold'>
              Xem tất cả
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};
