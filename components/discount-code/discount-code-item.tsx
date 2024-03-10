'use client';

import { useState } from 'react';
import { LuChevronDown, LuChevronUp } from 'react-icons/lu';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export const DiscountCodeItem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className='p-4 bg-[#F5F5F5] border border-[#BFBFBF] rounded-lg'>
      <Collapsible className='space-y-2' open={isOpen} onOpenChange={setIsOpen}>
        <div className='flex items-start'>
          <div className='text-lg font-bold text-black flex-1'>
            <p>KM123456789</p>
            <p>HSD: 21/11/2023</p>
          </div>
          <CollapsibleTrigger asChild>
            <Button
              variant='ghost'
              className='text-sm font-semibold text-[#202020]'
            >
              {isOpen ? 'Thu gọn' : 'Read more'}
              {isOpen ? (
                <LuChevronUp className='w-5 h-5 ml-2 text-[#637381]' />
              ) : (
                <LuChevronDown className='w-5 h-5 ml-2 text-[#637381]' />
              )}
            </Button>
          </CollapsibleTrigger>
        </div>

        <CollapsibleContent>
          <ul className='list-disc list-inside'>
            <li>Giảm 300,000₫ sản phẩm</li>
            <li>Áp dụng 1 lần cho toàn bộ đơn hàng</li>
            <li>Mua tối thiểu 3 sản phẩm</li>
            <li>Nhóm sản phẩm</li>
          </ul>
        </CollapsibleContent>

        <Button className='text-base font-semibold bg-[#00508F] h-12 uppercase w-full'>
          Áp dụng
        </Button>
      </Collapsible>
    </Box>
  );
};
