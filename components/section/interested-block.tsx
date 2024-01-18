'use client';

import { Container } from '@/components/ui/container';
import Link from 'next/link';
import { Settings } from 'react-slick';
import { SlickSlider } from '@/components/ui/slick-slider';

const DATA = [
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Túi hiệu',
    href: '/',
  },
  {
    name: 'Mũ Gucci',
    href: '/',
  },
  {
    name: 'Son MAC',
    href: '/',
  },
  {
    name: 'Lăn khử mùi',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
  {
    name: 'Đồng hồ',
    href: '/',
  },
];

export const InterestedBlock = () => {
  const settings: Settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          initialSlide: 4
        }
      },
    ]
  };

  return (
    <section>
      <div className='py-6 max-[768px]:px-3 max-[768px]:pt-3 max-[768px]:pb-0 border-y-8 border-[#F5F5F5]'>
        <Container className='max-[768px]:px-0'>
          <div className='space-y-3'>
            <h4 className='text-2xl text-[#333] font-bold text-center'>
              Có thể bạn quan tâm
            </h4>

            <div className='flex items-center justify-center flex-wrap gap-4 max-[768px]:hidden'>
              {DATA.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className='text-sm font-medium text-black px-4 py-3 inline-block border border-[#D9D9D9] rounded-[99px]'
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className='min-[1200px]:hidden'>
              <SlickSlider settings={settings}>
                {DATA.map((item, index) => (
                  <div key={index} className='flex flex-col justify-center items-center'>
                    <Link
                      // key={index}
                      href={item.href}
                      className='text-sm font-medium text-black px-4 py-3 inline-block border border-[#D9D9D9] rounded-[99px]'
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}
              </SlickSlider>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
};
