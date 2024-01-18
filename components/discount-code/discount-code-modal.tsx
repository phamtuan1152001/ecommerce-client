'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DiscountCodeItem } from '@/components/discount-code/discount-code-item';

interface DiscountCodeModalProps {
  triggerText: string;
}

export const DiscountCodeModal = ({ triggerText }: DiscountCodeModalProps) => {
  return (
    <Dialog>
      <DialogTrigger className='text-base text-black'>
        {triggerText}
      </DialogTrigger>
      <DialogContent className='max-w-3xl gap-y-8'>
        <DialogHeader>
          <DialogTitle className='text-center text-2xl text-[#333] uppercase'>
            CHỌN MÃ GIẢM GIÁ
          </DialogTitle>
        </DialogHeader>

        <div className='grid grid-cols-2 gap-6 items-start'>
          <DiscountCodeItem />
          <DiscountCodeItem />
        </div>
      </DialogContent>
    </Dialog>
  );
};
