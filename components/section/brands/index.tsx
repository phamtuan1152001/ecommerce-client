'use client';

import Image from 'next/image';
import Marquee from 'react-fast-marquee';

import { Container } from '@/components/ui/container';
import { Heading } from '@/components/ui/heading';

import { BRANDS } from './data';

export const Brands = () => {
  return (
    <section>
      <div className='bg-[#F8F7F7] py-[80px] max-[1024px]:px-3 max-[1024px]:py-6'>
        <Container>
          <Heading title='Thương hiệu nổi bật' className='text-left max-[1024px]:text-center' />
        </Container>

        <Marquee>
          <div className='flex gap-4'>
            {BRANDS.map((item, index) => (
              <div key={index} className='py-2 px-5 shrink-0'>
                <div className='relative aspect-[132/78] max-w-[132px] flex items-center justify-center'>
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    width={132}
                    height={78}
                    className='w-auto max-h-full'
                  />
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};
