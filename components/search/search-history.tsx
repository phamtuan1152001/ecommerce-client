import { X } from 'lucide-react';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';

const DATA = ['Giày sneaker nữ', 'Túi canvas', 'Túi đeo chéo'];

export const SearchHistory = () => {
  return (
    <Box className='py-4 space-y-4'>
      <div className='flex items-center justify-between'>
        <h5 className='text-base font-bold text-[#181818]'>Lịch sử tìm kiếm</h5>

        <Button
          variant='ghost'
          className='text-sm font-semibold text-[#202020]'
        >
          Xóa tất cả
        </Button>
      </div>

      <div>
        {DATA.map((item) => (
          <div
            className='flex items-center justify-between py-2 px-3 transition-all hover:bg-[#F5F5F5]'
            key={item}
          >
            <span className='text-base text-[#333]'>{item}</span>

            <Button size='icon' variant='ghost' className='w-6 h-6'>
              <X className='w-5 h-5 text-[#676767]' />
            </Button>
          </div>
        ))}
      </div>
    </Box>
  );
};
