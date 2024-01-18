'use client';

import "../../../public/css/index.css"
import React from 'react';
import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { ProductCard } from '@/components/product/product-card';
import { SlickSlider } from '@/components/ui/slick-slider';
import { CustomArrowProps, Settings } from 'react-slick';

// import './SellProduts.css';
import { VIEWED_PRODUCTS } from '../viewed-products/data';

interface ArrowProps extends CustomArrowProps {
  type: 'prev' | 'next';
}

interface SellProductsProps {
  listBestSellerProducts: any
}

export const SellProduts = ({ listBestSellerProducts }: SellProductsProps) => {
  const [currentSlide, setCurrentSlide] = React.useState<number>(0)
  const settings: Settings = {
    dots: true,
    arrows: true,
    slidesToShow: 4.5,
    slidesToScroll: 2,
    dotsClass: 'mt-6 max-[768px]:mt-4',
    customPaging(index) {
      return (
        <div className={`slick-dot before:bg-white`} />
      )
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
    ]
  };

  return (
    <section>
      <Container className='max-[768px]:px-0'>
        <div className='py-10 max-[768px]:px-3 max-[768px]:py-6'>
          <div className=' bg-[#26282B] rounded-3xl py-8 px-16 max-[768px]:px-0 max-[768px]:py-6'>
            <div className='flex justify-center items-center gap-2'>
              <Image
                src='/assets/images/sell-product/Sell-products.png'
                alt='image'
                width={21}
                height={38}
                // style={{
                //   width: "auto",
                //   height: "auto"
                // }}
              />
              <h2 className=' font-bold text-[#FFFFFF] text-[26px] leading-9 uppercase max-[768px]:text-2xl'>
                Sản Phẩm Bán Chạy
              </h2>
            </div>
            <div className='sell-products pt-6 max-[768px]:pt-4'>{/* pt-6 max-[768px]:pt-4 */}
              <SlickSlider settings={settings}>
                {listBestSellerProducts?.data?.items?.map((product: any, index: any) => (
                  <ProductCard key={index} product={product} />
                ))}
              </SlickSlider>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
