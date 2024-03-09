'use client';

import { useState, useEffect } from 'react';
import { LuSearch } from 'react-icons/lu';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TopSearch } from '@/components/search/top-search';
import { SearchHistory } from '@/components/search/search-history';
import { SearchSuggestion } from '@/components/search/search-suggestion';

// @api
import { getProducts } from '@/lib/api/product';

// @constants
import { LANGUAGE_VI, SUCCESS } from '@/constants';
import { ProductType } from '@/types';

let timeoutId: any;

export const GlobalSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseSearch = () => {
    setIsOpen(!isOpen)
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [listData, setListData] = useState<ProductType[]>([])
  // search
  const [input, setInput] = useState("");
  const [prevSearch, setPrevSearch] = useState("");
  const [searchData, setSearchData] = useState("");

  useEffect(() => {
    if (!!searchData) {
      const payload: {
        page: number,
        size: number,
        categories: string,
        productText: string
      } = {
        page: 1,
        size: 100,
        categories: "",
        productText: searchData
      };
      fetchProductsBySearching(
        payload.page,
        payload.size,
        payload.categories,
        payload.productText
      );
    }
  }, [searchData]);

  const fetchProductsBySearching = async (
    page: number = 1,
    size: number = 100,
    categories: string = LANGUAGE_VI,
    productText: string = ""
  ) => {
    try {
      setLoading(true)
      const res: {
        retCode: number,
        retText: string,
        retData: {
          currentPage: number,
          totalItems: number,
          totalPages: number,
          products: ProductType[]
        }
      } = await getProducts(
        page,
        size,
        categories,
        productText
      )
      // console.log("res", res);
      if (res?.retCode === 0) {
        setListData(res?.retData?.products)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false)
    }
  }

  const handleSeacrh = (e: any) => {
    const search = e.target.value;
    setInput(search);
    setPrevSearch(search);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      if (search !== prevSearch || search === "") {
        // setPage(1);
        setSearchData(search);
      }
    }, 1000);
  };

  return (
    <div className='relative flex-shrink-0 max-w-[220px] w-full'>
      <div className='bg-[#F5F5F5] rounded-3xl flex items-center px-4 space-x-2 '>
        <Button variant='ghost' size='icon' className='w-6 h-6 shrink-0'>
          <LuSearch className='w-5 h-5' />
        </Button>

        <Input
          type='text'
          placeholder='Bạn cần tìm gì?'
          className='bg-transparent border-none placeholder:text-[#2E2E2E] px-0 flex-1 w-full'
          value={input}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onChange={handleSeacrh}
        />
      </div>

      {isOpen && (
        <div className='w-[620px] absolute top-[calc(100%_+_8px)] right-0 bg-white rounded-lg overflow-hidden divide-y divide-[#DFE3E8] z-50 shadow'>
          <SearchSuggestion loading={loading} datas={listData} />
        </div>
      )}
    </div>
  );
};
