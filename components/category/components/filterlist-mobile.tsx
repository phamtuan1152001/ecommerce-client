import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FilterList } from '@/components/filter/filter-list';

export const FilterListMobile = () => {
  return (
    <SheetContent side={"left"} className='rounded-r-[8px] flex flex-col justify-between items-start'>
      <SheetHeader className='text-left'>
        <SheetTitle className='text-lg font-bold'>Bộ lọc</SheetTitle>
      </SheetHeader>
      <ScrollArea className="">
        <FilterList />
      </ScrollArea>
      <SheetFooter className='w-full flex flex-row justify-between items-center'>
        <Button className='bg-white py-3 px-6 text-base font-semibold text-textColor-deleteFilter border border-[#00508F] active:bg-backgroundColor-cover active:text-white focus:text-white'>
          Xóa bộ lọc
        </Button>
        <Button className='bg-backgroundColor-cover py-3 px-6 text-base font-semibold text-white active:bg-white focus:bg-white active:text-textColor-deleteFilter focus:text-textColor-deleteFilter active:border-[#00508F] focus:border-[#00508F] visited:border-[#00508F]'>
          Áp dụng
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}