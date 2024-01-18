import { Slider } from '@/components/ui/slider';

export const FilterPrice = () => {
  return (
    <div className='space-y-2'>
      <div className='flex items-center'>
        <span className='inline-block px-1 py-2 uppercase text-[#637381] text-xs font-medium border border-[#D9D9D9] bg-[#F5F5F5] rounded-[99px] min-w-[90px] text-center'>
          0đ
        </span>
        <span className='flex-grow h-[1px] w-full bg-[#D9D9D9]'></span>
        <span className='inline-block px-1 py-2 uppercase text-[#637381] text-xs font-medium border border-[#D9D9D9] bg-[#F5F5F5] rounded-[99px] min-w-[90px] text-center'>
          10.000.000 đ
        </span>
      </div>

      <Slider defaultValue={[25, 75]} max={100} step={1} />
    </div>
  );
};
