/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import Image, { ImageProps } from 'next/image';
import { LuPlus, LuMinus } from 'react-icons/lu';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { DECREMTN_BTN, INCREMENT_BTN } from '@/constants';

interface ProductImageProps extends ImageProps {
  wrapperClassName?: string;
}

interface PriceProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}

interface ProductTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}

interface ProductQuantityProps {
  quantity?: number,
  onChange?: any
}

export const ProductImage = ({
  wrapperClassName,
  ...props
}: ProductImageProps) => {
  return (
    <div className={cn('aspect-square relative', wrapperClassName)}>
      <Image fill className='object-cover rounded-[4px]' {...props} />
    </div>
  );
};

export const ProductTitle = ({ className, ...props }: ProductTitleProps) => {
  return (
    <h3
      className={cn('text-base text-[#333] font-bold line-clamp-2', className)}
      {...props}
    />
  );
};

export const ProductOldPrice = ({ className, ...props }: PriceProps) => {
  return (
    <p
      className={cn(
        'text-sm leading-normal text-[#9B9B9B] line-through',
        className
      )}
      {...props}
    />
  );
};

export const ProductFinalPrice = ({ className, ...props }: PriceProps) => {
  return (
    <p
      className={cn(
        'text-xl leading-normal text-[#FA9E14] font-extrabold',
        className
      )}
      {...props}
    />
  );
};

export const ProductQuantity = ({quantity, onChange}:ProductQuantityProps) => {
  return (
    <div className='flex items-center'>
      <Button
        size='icon'
        variant='outline'
        className='w-[30px] h-[30px] border-[#D9D9D9]'
        onClick={() => onChange(DECREMTN_BTN)}
      >
        <LuMinus className='w-5 h-5 text-[#202020]' />
      </Button>

      <span className='text-sm text-[#333] mx-4'>{quantity?.toString().padStart(2, "0")}</span>

      <Button
        size='icon'
        variant='outline'
        className='w-[30px] h-[30px] border-[#D9D9D9]'
        onClick={() => onChange(INCREMENT_BTN)}
      >
        <LuPlus className='w-5 h-5 text-[#202020]' />
      </Button>
    </div>
  );
};
