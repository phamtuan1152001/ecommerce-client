"use client"

import { useState } from 'react';
import CustomPagination from '../CustomPagination';
import { getPaginationItems } from '@/utility/pagination';

import { ProductCard } from '@/components/product/product-card';
import Spinner from '../spin';
import NoData from '../no-data';

// @constants
import { PAGE_NUMBER, MAX_LENGTH } from '@/constants';

// @types
import { ProductType } from '@/types';

interface CategoryViewProps {
  titleCate: string | undefined,
  loading: boolean,
  listProducts: ProductType[],
  slug: string,
  onChangePage: (page: number) => void,
  totalProduct: number | undefined
}

export const CategoryView = ({
  titleCate,
  listProducts,
  slug,
  onChangePage,
  totalProduct,
  loading
}: CategoryViewProps) => {
  const [currentPage, setCurrentPage] = useState(PAGE_NUMBER)
  const LAST_PAGE = totalProduct || 0
  const pageNums = getPaginationItems(currentPage, LAST_PAGE, MAX_LENGTH)

  return (
    <div className='space-y-6 max-[1024px]:space-y-4'>
      <h3 className='text-2xl font-bold text-[#333] text-center max-[1024px]:mt-4'>{titleCate}</h3>

      <div className='flex flex-row justify-between items-center max-[1024px]:flex-col'>
        <p className='text-lg text-[#333] font-bold max-[1024px]:text-center'>
          {listProducts.length} products
        </p>
      </div>

      <div className=''>
        <Spinner spinning={loading} className='h-[120vh]'>
          {listProducts.length > 0
            ? (
              <div className='grid grid-cols-5 gap-x-1 gap-y-6 max-[1024px]:grid-cols-2'>
                {listProducts?.map((product: ProductType, index: number) => (
                  <ProductCard key={index} product={product} slugName={slug} />
                ))}
              </div>
            )
            : (
              <div className='flex flex-col justify-center items-center w-full'>
                <NoData />
              </div>
            )}
        </Spinner>
      </div>


      <CustomPagination
        data={listProducts}
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
