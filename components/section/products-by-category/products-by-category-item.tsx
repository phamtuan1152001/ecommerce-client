'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// @components
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { SlickSlider } from '@/components/ui/slick-slider';

// @icon
import { ArrowRight } from 'lucide-react';

// @type
import { ProductType } from '@/types';

// @constant
import { NO_DATA_IMAGE } from '@/constants';

interface ProductsByCategoryItemProps {
  item?: {
    name: string;
    imageUrl: string;
    products: ProductType[];
    slug: string;
  };
  index: number
}

export default function ProductsByCategoryItem({
  item,
  index
}: ProductsByCategoryItemProps) {
  const router = useRouter()

  const settings = {
    dots: false,
    arrows: true,
    slidesToShow: 4,
    infinite: (item as any).products.length > 4,
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
    <div>
      <div className='py-10 max-[768px]:px-3 max-[768px]:py-6'>
        <div
          className={cn('flex gap-4 max-[768px]:flex-wrap', {
            'flex-row-reverse': index % 2 !== 0,
          })}
        >
          <div className='max-w-[20%] w-full max-[768px]:max-w-[100%]'>
            <div className='relative flex items-center justify-center aspect-[218/341] rounded-2xl overflow-hidden max-[768px]:aspect-[351/168]'>
              <Image
                src={item?.imageUrl || NO_DATA_IMAGE}
                alt={item?.name || "no-data-image"}
                fill
                className='object-cover'
                sizes="(max-width: 768px)"
              />

              <h3 className='text-2xl leading-normal px-6 py-2 font-bold text-[#3A3A3A] uppercase bg-white/80 rounded-[90px] relative max-w-[90%] inline-block text-center'>
                {item?.name}
              </h3>
            </div>
          </div>

          <div className='max-w-[80%] w-full max-[768px]:max-w-[100%]'>
            <SlickSlider settings={settings}>
              {(item as any).products?.length > 0
                ? (
                  (item as any)?.products?.map((
                    product: ProductType,
                    index: number
                  ) => (
                    <ProductCard
                      key={index}
                      product={product}
                      slugName={item?.slug}
                    />
                  ))
                )
                : (
                  <div className='flex flex-col justify-center items-center h-28 '>
                    <div className='aspect-[200/200] relative'>
                      <Image
                        src={"/assets/images/empty-data/no-data-image.jpg"}
                        alt={"no-data"}
                        fill
                        className='object-cover rounded-[4px]'
                        sizes='(max-width: 200px)'
                      />
                    </div>
                    <h2 className='text-center font-bold text-base uppercase'>Không có sản phẩm nào được trưng bày</h2>
                  </div>
                )}
            </SlickSlider>
          </div>
        </div>

        {(item as any)?.products?.length > 0 && (
          <div className='text-center mt-6 max-[768px]:mt-4'>
            <Button
              variant='outline'
              className='text-[#333] border-current rounded-3xl font-bold'
              onClick={() => router.push(item?.slug || "#")}
            >
              Read more
              <ArrowRight className='ml-1' />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
