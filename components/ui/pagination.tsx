import Link from 'next/link';

interface PaginationProps {
  className?: string;
}

export const Pagination = (props: PaginationProps) => {
  return (
    <div className='flex flex-col space-y-6 items-center'>
      <p className='text-black text-base'>
        Hiển thị từ 1 đến 20 / 1200 sản phẩm
      </p>

      <div className='flex items-center'>
        <Link
          href='/'
          className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center rounded-[6px] transition hover:bg-[#333] hover:text-white border border-[#D9D9D9] px-3 mr-2.5'
        >
          Previous
        </Link>

        <Link
          href='/'
          className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center rounded-[6px] transition hover:bg-[#333] hover:text-white'
        >
          1
        </Link>

        <Link
          href='/'
          className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center rounded-[6px] transition hover:bg-[#333] hover:text-white'
        >
          2
        </Link>

        <Link
          href='/'
          className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center rounded-[6px] transition hover:bg-[#333] hover:text-white'
        >
          3
        </Link>

        <p className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center'>
          ...
        </p>

        <Link
          href='/'
          className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center rounded-[6px] transition hover:bg-[#333] hover:text-white'
        >
          600
        </Link>

        <Link
          href='/'
          className='min-w-[40px] h-10 text-[#676767] inline-flex items-center justify-center rounded-[6px] transition hover:bg-[#333] hover:text-white border border-[#D9D9D9] px-3 ml-2.5'
        >
          Next
        </Link>
      </div>
    </div>
  );
};
