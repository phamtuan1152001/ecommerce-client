"use client"

import { Container } from "@/components/ui/container"
import { IconType } from 'react-icons';
import { Settings } from 'react-slick';
import { SlickSlider } from '@/components/ui/slick-slider';

import { TESTIMONIAL } from './data'

export const Testimonial = () => {
  const settings: Settings = {
    autoplay: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    dots: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          autoplay: true,
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: false,
        }
      },
    ]
  };

  return (
    <section>
      <Container className="max-[1024px]:px-0">
        <div className='max-[1024px]:grid max-[1024px]:grid-cols-1'>
          <SlickSlider settings={settings}>
            {TESTIMONIAL.map(
              ({
                icon: Icon,
                title,
                subtitle
              }: {
                icon: IconType,
                title: string,
                subtitle: string
              }) => (
                <div className=' basis-1/4 odd:bg-[#F7F1EA] even:bg-[#E3DBCF]' key={title} >
                  <div className=' p-4 flex-col text-center'>
                    <div className=' mb-[10px] flex justify-center '>
                      <Icon
                        size={24}
                      />
                    </div>
                    <div>
                      <p className='font-semibold max-[1024px]:font-bold'>{title}</p>
                      <p className=' text-sm'>{subtitle}</p>
                    </div>
                  </div>
                </div>
              ))}
          </SlickSlider>
        </div>
      </Container>
    </section>
  )
}
