'use client';

import { useState, useEffect } from 'react';
import { BiPlus, BiMinus } from 'react-icons/bi';

import { cn } from '@/lib/utils';

import { RuleIcon } from '../icons/RuleIcon';
import { Button } from '../ui/button';

// @constants
import { DECREMTN_BTN, INCREMENT_BTN } from '@/constants';
const SIZES = ['xs', 's', 'l', 'xl', '2xl'];
const COLORS = ['#A3E6A4', '#FED1DD'];

interface ProductVariantSelectorProps {
  quantity: number,
  valueCountProduct: number,
  onChangeSize: any,
  onChangeColor: any,
  onChangeCountProduct: any
}

export const ProductVariantSelector = ({
  quantity,
  valueCountProduct,
  onChangeSize,
  onChangeColor,
  onChangeCountProduct
}: ProductVariantSelectorProps) => {
  const [currentSize, setCurrentSize] = useState(0);
  const [currentColor, setCurrentColor] = useState(0);
  const [countProduct, setCountProduct] = useState(valueCountProduct)

  useEffect(() => {
    // onChangeSize(SIZES[currentSize])
    // onChangeColor(COLORS[currentColor])
    onChangeCountProduct(countProduct)
  }, [countProduct]) // /* currentSize */, /* currentColor */,

  const handleSelectedSize = (value: number) => {
    setCurrentSize(value)
  }

  const handleSelectedColor = (value: number) => {
    setCurrentColor(value)
  }

  const handleCountProduct = (type: string) => {
    if (type === INCREMENT_BTN) {
      setCountProduct(countProduct + 1)
    } else {
      setCountProduct(countProduct - 1)
    }
  }
  
  return (
    <div className='space-y-4'>
      {/* <div className='space-y-2'>
        <div className='flex items-center justify-between'>
          <h5 className='text-sm font-bold text-[#003966]'>Chọn size:</h5>

          <div className='flex items-center space-x-1 text-[#637381]'>
            <RuleIcon className='w-6 h-6' />
            <span className='text-xs'>Hướng dẫn chọn size</span>
          </div>
        </div>

        <div className='flex flex-row justify-between items-center'>
          {SIZES.map((item, index) => (
            <Button
              key={item}
              variant='outline'
              className={cn("uppercase text-[#181818] font-medium min-w-[70px] h-12", currentSize === index && "shadow-3xl bg-backgroundColor-cover text-white")}
              onClick={() => handleSelectedSize(index)}
            >
              {item}
            </Button>
          ))}
        </div>
      </div> */}

      {/* <div className='space-y-2'>
        <h5 className='text-sm font-bold text-[#003966]'>Chọn màu:</h5>

        <div className='flex items-center space-x-4'>
          {COLORS.map((color, index) => (
            <div
              className={cn(
                'w-6 h-6 rounded-full border-0  border-transparent relative before:absolute before:inset-0 before:rounded-full before:bg-current before:transition-transform transition cursor-pointer',
                {
                  'before:scale-[0.6] border-2 border-black':
                    index === currentColor,
                }
              )}
              key={color}
              style={{ color }}
              onClick={() => handleSelectedColor(index)}
            />
          ))}
        </div>
      </div> */}

      <div className='space-y-2'>
        <h5 className='text-sm font-bold text-[#003966]'>Số lượng:</h5>

        <div className='flex items-center space-x-4'>
          <Button
            variant='outline'
            onClick={() => handleCountProduct(DECREMTN_BTN)}
            disabled={countProduct === 0}
          >
            <BiMinus className='w-6 h-6' />
          </Button>
          <span className='text-sm text-[#333]'>{countProduct}</span>
          <Button
            variant='outline'
            onClick={() => handleCountProduct(INCREMENT_BTN)}
            disabled={countProduct === quantity}
          >
            <BiPlus className='w-6 h-6' />
          </Button>
        </div>
      </div>
    </div>
  );
};
