import { MdOutlineTrendingUp } from 'react-icons/md';

import { Box } from '@/components/ui/box';

const DATA = [
  '#Giày sneaker nữ',
  '#túi xách',
  '#Áo thun nữ',
  '#Quần jean',
  '#Áo croptop',
  '#đầm',
  '#Phụ kiện',
];

export const TopSearch = () => {
  return (
    <Box className='py-4 space-y-4'>
      <h5 className='text-base font-bold text-[#181818]'>
        Được tìm kiếm nhiều
      </h5>
      <div className='flex items-center flex-wrap gap-4'>
        <div className='w-8 h-8 inline-flex items-center justify-center rounded-full bg-[#E6E6E6]'>
          <MdOutlineTrendingUp className='w-6 h-6 text-[#333]' />
        </div>

        {DATA.map((item) => (
          <a
            href='#'
            rel='noopener noreferrer'
            key={item}
            className='text-xs font-semibold uppercase text-[#333] bg-[#F5F5F5] rounded-lg inline-block px-3 py-2'
          >
            {item}
          </a>
        ))}
      </div>
    </Box>
  );
};
