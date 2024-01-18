'use client';

import { useState } from 'react';
import { LuSearch } from 'react-icons/lu';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TopSearch } from '@/components/search/top-search';
import { SearchHistory } from '@/components/search/search-history';
import { SearchSuggestion } from '@/components/search/search-suggestion';

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSearch = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='relative flex-shrink-0 max-w-[220px] w-full'>
      <div className='bg-[#F5F5F5] rounded-3xl flex items-center px-4 space-x-2 '>
        <Button variant='ghost' size='icon' className='w-6 h-6 shrink-0'>
          <LuSearch className='w-5 h-5' />
        </Button>

        <Input
          type='text'
          placeholder='Bạn cần tìm gì?'
          className='bg-transparent border-none placeholder:text-[#2E2E2E] px-0 flex-1 w-full'
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
        />
      </div>

      {isOpen && (
        <div className='w-[620px] absolute top-[calc(100%_+_8px)] right-0 bg-white rounded-lg overflow-hidden divide-y divide-[#DFE3E8] z-50 shadow'>
          <TopSearch />

          <SearchHistory />

          <SearchSuggestion />
        </div>
      )}
    </div>
  );
};
