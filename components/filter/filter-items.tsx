import { LuSearch } from 'react-icons/lu';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';

import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface FilterItemsProps {
  options: { name: string; value: string; quantity?: number }[];
  hasShowMore?: boolean;
}

export const FilterItems = ({
  options = [],
  hasShowMore = true,
}: FilterItemsProps) => {
  return (
    <div className='space-y-4'>
      {hasShowMore && (
        <div className='flex items-center space-x-2 px-4  rounded-[99px] bg-[#F5F5F5]'>
          <LuSearch className='w-6 h-6 text-[#181818] shrink-0' />

          <Input
            placeholder='Tìm theo tên'
            className='border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0 bg-transparent'
          />
        </div>
      )}

      <div className='space-y-4'>
        {options.map((item) => (
          <div className='flex items-center' key={item.value}>
            <Checkbox id={item.value} className='border-[#BFBFBF]' />
            <label
              htmlFor={item.value}
              className='text-base text-[#202020] ml-1'
            >
              {item.name}
            </label>

            {item?.quantity && (
              <span className='text-base text-[#919EAB] ml-auto'>
                ({item.quantity})
              </span>
            )}
          </div>
        ))}
      </div>

      {hasShowMore && (
        <button
          type='button'
          className='text-sm text-[#202020] font-bold inline-flex items-center py-2'
        >
          <MdKeyboardDoubleArrowDown className='w-5 h-5 mr-2 text-current' />
          Xem thêm
        </button>
      )}
    </div>
  );
};
