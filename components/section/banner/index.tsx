'use client'

import Image from 'next/image'

import { Container } from '@/components/ui/container';
import { SlickSlider } from "@/components/ui/slick-slider"


import './bannerSlider.css'
import { SLIDER, SETTING_SLIDER } from './data'

export const Banner = () => {
  const settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    dotsClass: "banner-slider slick-dots line-indicator dots-black"
}
  return (
    <section>
      <Container>
        <div className='banner-slider' >
          <SlickSlider settings={settings} >
            {SLIDER.map((item, index) => (
              <div key={index}>
                <Image 
                  src={item.img}
                  alt='Slider'
                  fill
                />
              </div>
             ))
            }
        </SlickSlider>
        </div>
      </Container>
    </section>
  )
}

