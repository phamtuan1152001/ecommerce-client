"use client"
import { useState } from 'react';
import CustomPagination from '../CustomPagination';
import { getPaginationItems } from '@/utility/pagination';

import { ProductCard } from '@/components/product/product-card';
import { ButtonCommon } from '../common/button-common';
import {
  Sheet,
  SheetTrigger,
} from "@/components/ui/sheet"
import { FilterListMobile } from './components/filterlist-mobile';
import { TailSpin } from "react-loader-spinner"

// @constants
import { PAGE_NUMBER, MAX_LENGTH } from '@/constants';

// @svg
import { IconArrange, IconFilter } from '@/public/assets/svg';

interface CategoryViewProps {
  loading: boolean,
  listProducts: any,
  slug: string,
  onChangePage: (page: number) => void,
  totalProduct: number | undefined
}

export const CategoryView = ({ listProducts, slug, onChangePage, totalProduct, loading }: CategoryViewProps) => {
  const [currentPage, setCurrentPage] = useState(PAGE_NUMBER)
  const LAST_PAGE = totalProduct || 0
  const pageNums = getPaginationItems(currentPage, LAST_PAGE, MAX_LENGTH)

  return (
    <div className='space-y-6 max-[768px]:space-y-4'>
      <h3 className='text-2xl font-bold text-[#333] text-center max-[768px]:mt-4'>Thời trang</h3>

      <div className='flex flex-row justify-between items-center max-[768px]:flex-col'>
        <p className='text-lg text-[#333] font-bold max-[768px]:text-center'>
          {listProducts?.items?.length} sản phẩm
        </p>
        {/* Desktop Components */}
        <div className='max-[768px]:hidden'>
          <div className='flex flex-row justify-between items-center gap-4 max-[768px]:w-full max-[768px]:mt-3'>
            {/* <div className='max-[768px]:w-full'>
              <ButtonCommon title='Bộ lọc' icon={<IconFilter />} className='max-[768px]:flex-row-reverse' />
            </div> */}
            <div className='max-[768px]:w-full'>
              <ButtonCommon title='Sắp xếp' icon={<IconArrange />} className='max-[768px]:flex-row-reverse' />
            </div>
          </div>
        </div>
        {/* End of Desktop */}

        {/* Mobile Component */}
        <div className='min-[1280px]:hidden max-[768px]:w-full'>
          <Sheet>
            <div className='flex flex-row justify-center items-center gap-4 max-[768px]:mt-2'>
              {/* <div className='max-[768px]:w-full'>
                <SheetTrigger asChild>
                  <ButtonCommon title='Bộ lọc' icon={<IconFilter />} className='max-[768px]:flex-row-reverse' />
                </SheetTrigger>
                <FilterListMobile/>
              </div> */}
              <div className=''>{/* max-[768px]:w-full */}
                <ButtonCommon title='Sắp xếp' icon={<IconArrange />} className='max-[768px]:flex-row-reverse' />
              </div>
            </div>
          </Sheet>
        </div>
        {/* End of Mobile */}
      </div>

      <div className=''>
        {loading
          ? (
            <div className='flex flex-col justify-center items-center h-full'>
              <TailSpin
                height="40"
                width="40"
                color="#676767"
                radius="1"
                visible={true}
                ariaLabel="tail-spin-loading"
              />
            </div>
          )
          : (
          <div className='grid grid-cols-5 gap-x-1 gap-y-6 max-[768px]:grid-cols-2'>
            {listProducts?.items?.map((product: any, index: number) => (
              <ProductCard key={index} product={product} slugName={slug} />
            ))}
          </div>
          )}
      </div>


      <CustomPagination
        data={listProducts?.items}
        currentPage={currentPage}
        lastPage={LAST_PAGE}
        maxLength={MAX_LENGTH}
        pageNums={pageNums}
        onChange={(value) => {
          setCurrentPage(value)
          onChangePage(value)
        }}
        onPrev={(value) => {
          setCurrentPage(value)
          onChangePage(value)
        }}
        onNext={(value) => {
          setCurrentPage(value)
          onChangePage(value)
        }}
      />
    </div>
  );
};
