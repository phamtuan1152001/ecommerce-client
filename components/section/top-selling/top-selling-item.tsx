import Image from 'next/image';

import { cn } from '@/lib/utils';

interface TopSellingItemProps {
  item: { name: string; imgUrl: string };
}

export const TopSellingItem = ({ item }: TopSellingItemProps) => {
  return (
    <div
      className={cn(
        'flex items-center space-x-2.5 p-2 border border-[#D9D9D9] rounded-[99px] mx-2 max-[768px]:mx-4'
      )}
    >
      <div className='relative aspect-square w-8 rounded-full overflow-hidden'>
        <Image
          src={item.imgUrl}
          alt={item.name}
          fill
          className='object-cover object-center'
        />
      </div>

      <p className='text-sm font-bold text-[#333]'>{item.name}</p>
    </div>
  );
};
