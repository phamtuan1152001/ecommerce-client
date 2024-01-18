'use client';

import { Input } from '@/components/ui/input';
import { BiSearch } from 'react-icons/bi';

export const Search = () => {
  return (
    <div className='w-[230px] bg-[#F5F5F5] rounded-3xl'>
      <div className='flex items-center px-4 space-x-2'>
        <BiSearch size={24} className='shrink-0' />

        <Input
          type='text'
          defaultValue=''
          placeholder='Bạn cần tìm gì?'
          className='bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-[#2E2E2E] px-0'
        />
      </div>
    </div>
  );
};
