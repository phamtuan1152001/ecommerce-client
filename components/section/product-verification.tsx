'use client';

import { ConsumableIcon } from '../icons/ConsumableIcon';
import { DeliveryTruckIcon } from '../icons/DeliveryTruckIcon';
import { LotsOfCashIcon } from '../icons/LotsOfCashIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';

import { Settings } from 'react-slick';

import { SlickSlider } from '@/components/ui/slick-slider';

const DATA = [
  {
    name: 'Cam kết hàng chính hãng',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Đổi trả trong vòng 7 ngày\n(theo chính sách đổi trả)',
    icon: ConsumableIcon,
  },
  {
    name: 'Giao hàng thần tốc',
    icon: DeliveryTruckIcon,
  },
  {
    name: 'Mua hàng giá gốc',
    icon: LotsOfCashIcon,
  },
];

export const ProductVerification = () => {
  const settings: Settings = {
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          autoplay: true,
          autoplaySpeed: 2000
        }
      },
    ]
  };

  return (
    <>
      {/* Desktop */}
      <div className='space-y-[1px] max-[768px]:hidden'>
        {DATA.map((item) => {
          const { name, icon: Icon } = item;

          return (
            <div
              key={name}
              className='space-y-2.5 p-2 bg-[#F5F5F5] rounded flex flex-col items-center text-center'
            >
              <Icon className='w-6 h-6 text-[#AC8253]' />

              <p className='text-sm leading-normal text-[#181818] font-medium whitespace-pre-line'>
                {name}
              </p>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className='min-[1280px]:hidden'>
        <SlickSlider settings={settings}>
          {DATA.map((item) => {
            const { name, icon: Icon } = item;

            return (
              <div
                key={name}
                className='space-y-2.5 p-2 bg-[#F5F5F5] rounded flex flex-col items-center text-center justify-center'
              >
                <div className='flex flex-col justify-center items-center'>
                  <Icon className='w-6 h-6 text-[#AC8253]' />
                </div>

                <p className='text-sm leading-normal text-[#181818] font-medium whitespace-pre-line'>
                  {name}
                </p>
              </div>
            );
          })}
        </SlickSlider>
      </div>
    </>
  );
};
