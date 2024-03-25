import React, { useRef } from 'react';
import Slider, { Settings, CustomArrowProps } from 'react-slick';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SlickSliderProps {
  settings?: Settings;
  children: React.ReactNode;
  variant?: 'default' | 'inline';
}

interface ArrowProps extends CustomArrowProps {
  type: 'prev' | 'next';
  customClassName?: string;
  customOnClick?: () => void;
}

const Arrow = (props: ArrowProps) => {
  const { type, onClick, customClassName, customOnClick } = props;

  const Icon = type === 'prev' ? ArrowLeft : ArrowRight;

  return (
    <button
      type='button'
      className={cn(
        'w-14 h-14 inline-flex items-center justify-center bg-white rounded-full text-[#2E2E2E] shadow-md absolute top-1/2 z-10 -translate-y-1/2',
        {
          'left-0 max-[1024px]:left-[25px] -translate-x-1/2': type === 'prev',
          'right-0 max-[1024px]:right-[25px] translate-x-1/2': type === 'next',
        },
        customClassName
      )}
      onClick={customOnClick ?? onClick}
    >
      <Icon size={24} />
    </button>
  );
};

const EmptyArrow = () => {
  return null;
};

export const SlickSlider = ({
  children,
  variant = 'default',
  settings = {},
}: SlickSliderProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const { dotsClass, ...restSettings } = settings;

  let defaultSettings: Settings = {
    infinite: true,
    dots: false,
    arrows: false,
    nextArrow: <Arrow type='next' />,
    prevArrow: <Arrow type='prev' />,
    dotsClass: cn('custom-slick-dots', dotsClass),
    customPaging: () => {
      return <div className='slick-dot' />;
    },
    ...restSettings,
  };

  if (variant === 'inline') {
    defaultSettings = {
      ...defaultSettings,
      nextArrow: <EmptyArrow />,
      prevArrow: <EmptyArrow />,
      dotsClass: cn('flex items-center relative space-x-4', dotsClass),
      appendDots: (dots) => {
        return (
          <div>
            {!!defaultSettings.arrows && (
              <Arrow
                type='prev'
                customClassName='left-auto translate-x-0 translate-y-0 relative w-10 h-10 shadow-none rounded-none bg-transparent'
                customOnClick={() => sliderRef?.current?.slickPrev?.()}
              />
            )}

            <ul className='custom-slick-dots mt-0'>{dots}</ul>

            {!!defaultSettings.arrows && (
              <Arrow
                type='next'
                customClassName='right-auto translate-x-0 translate-y-0 relative w-10 h-10 shadow-none rounded-none bg-transparent'
                customOnClick={() => sliderRef?.current?.slickNext?.()}
              />
            )}
          </div>
        );
      },
    };
  }

  return (
    <Slider {...defaultSettings} ref={sliderRef} className='relative'>
      {children}
    </Slider>
  );
};
