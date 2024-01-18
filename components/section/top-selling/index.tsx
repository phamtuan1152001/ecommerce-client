'use client';

import { Settings } from 'react-slick';

import { SlickSlider } from '@/components/ui/slick-slider';

import { TopSellingItem } from './top-selling-item';

const DATA = [
  {
    name: 'Áo sơ mi',
    imgUrl: '/assets/images/top-selling/01.png',
  },
  {
    name: 'Áo Polo',
    imgUrl: '/assets/images/top-selling/02.png',
  },
  {
    name: 'Áo thun',
    imgUrl: '/assets/images/top-selling/03.png',
  },
  {
    name: 'Nội y',
    imgUrl: '/assets/images/top-selling/04.png',
  },
  {
    name: 'Quần Baggy',
    imgUrl: '/assets/images/top-selling/05.png',
  },
  {
    name: 'Áo khoác',
    imgUrl: '/assets/images/top-selling/06.png',
  },
  {
    name: 'Áo sơ mi X',
    imgUrl: '/assets/images/top-selling/01.png',
  },
  {
    name: 'Áo Polo X',
    imgUrl: '/assets/images/top-selling/02.png',
  },
];

export const TopSelling = () => {
  const settings: Settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
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
    <div className='bg-white p-4 border-b border-b-[#D9D9D9] max-[768px]:px-0'>
      <SlickSlider settings={settings}>
        {DATA.map((item) => (
          <TopSellingItem key={item.name} item={item} />
        ))}
      </SlickSlider>
    </div>
  );
};
