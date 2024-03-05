'use client';

import Image from 'next/image';
import { Settings } from 'react-slick';

import { Container } from '@/components/ui/container';
import { SlickSlider } from '@/components/ui/slick-slider';
import { BANNERS } from './data';

export const Banners = () => {
  const settings: Settings = {
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    dotsClass: 'absolute bottom-2.5 w-full',
    customPaging(index) {
      return (
        <div className={`slick-dot-banner before:bg-black`} />
      )
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        }
      },
    ]
  };

  return (
    <section>
      <Container className='max-[768px]:px-0'>
        <div>
          <SlickSlider settings={settings}>
            {BANNERS.map((item, index) => (
              <div key={index} className='relative aspect-[1152/356]'>
                <Image
                  src={item.imgUrl}
                  alt='image'
                  fill
                  priority
                  sizes="(max-width: 768px)"
                />
              </div>
            ))}
          </SlickSlider>
        </div>
      </Container>
    </section>
  );
};
