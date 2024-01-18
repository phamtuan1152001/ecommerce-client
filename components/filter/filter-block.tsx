'use client';

import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { BiPlus, BiMinus } from 'react-icons/bi';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

interface FilterBlockProps {
  title: string;
  icon: IconType;
  children: React.ReactNode;
}

export const FilterBlock = (props: FilterBlockProps) => {
  const { title, icon: Icon, children } = props;
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className='flex items-center w-full'>
        <Icon className='w-6 h-6' />
        <h3 className='text-base text-[#333] font-bold flex-grow mx-1.5 text-left'>
          {title}
        </h3>
        {isOpen ? (
          <BiMinus className='w-6 h-6 text-[#919EAB]' />
        ) : (
          <BiPlus className='w-6 h-6 text-[#919EAB]' />
        )}
      </CollapsibleTrigger>

      <CollapsibleContent className='mt-4'>{children}</CollapsibleContent>
    </Collapsible>
  );
};
