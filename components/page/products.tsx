"use client"
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// @api
import { getAllProducts } from '@/lib/api/product';

// @constants
import { PAGE_NUMBER, PAGE_LIMIT, LANGUAGE_VI, SUCCESS } from '@/constants';

// @components
import { CategoryView } from '@/components/category/category-view';
import { FilterList } from '@/components/filter/filter-list';
import { InterestedBlock } from '@/components/section/interested-block';
import { TopSelling } from '@/components/section/top-selling';
import { ViewedProducts } from '@/components/section/viewed-products';
import { Container } from '@/components/ui/container';
import BreadcrumbComponent from '../bread-crumd';

// @utility
import { nameCate } from '@/utility/common';

interface ProductsBody {
  slug: string
}

const ProductsBody = ({ slug }: ProductsBody) => {
  const pathName = usePathname()

  const [products, setProducts] = useState<{
    message: string,
    statusCode: number,
    data: {
      items: [],
      total: number
    }
  }>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGetListProducts(
      PAGE_NUMBER,
      PAGE_LIMIT,
      LANGUAGE_VI,
      true,
      slug
    )
  }, [])

  const fetchGetListProducts = async (
    currentPage: number = PAGE_NUMBER,
    limit: number = PAGE_LIMIT,
    lang: string = LANGUAGE_VI,
    paginate: boolean = true,
    slug: string
  ) => {
    try {
      setLoading(true)
      const res = await getAllProducts(
        currentPage,
        limit,
        lang,
        paginate,
        slug
      )
      if (res?.statusCode === SUCCESS) {
        setProducts(res)
      }
    } catch (err) {
      console.log("FETCHING FAIL", err);
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (page: number) => {
    fetchGetListProducts(
      page,
      PAGE_LIMIT,
      LANGUAGE_VI,
      true,
      slug
    )
  }
  
  return (
    <React.Fragment>
      <div className='bg-[#F5F5F5] p-6 max-[768px]:p-0'>
        <div className="pb-5 max-[768px]:hidden">
          <Container>
            <BreadcrumbComponent breadcrumbs={[
              {
                title: "Trang chủ",
                to: "/"
              },
              {
                title: nameCate(slug),
                to: `/${slug}`
              }
            ]} />
          </Container>
        </div>

        <Container className='max-[768px]:px-0'>
          <div className=''>
            {/* grid grid-cols-[280px_minmax(0,_1fr)] gap-6 max-[768px]:grid-cols-1 */}
            {/* <div className='bg-white p-4 max-[768px]:hidden'>
              <FilterList />
            </div> */}

            <div className='bg-white'>
              <div className='py-6 px-4 max-[768px]:p-0'>
                <TopSelling />
              </div>

              <div className='px-4 py-6 max-[768px]:p-0 max-[768px]:pb-6 max-[768px]:px-3'>
                <CategoryView
                  loading={loading}
                  listProducts={products?.data}
                  slug={slug}
                  onChangePage={(page: number) => handleChangePage(page)}
                  totalProduct={products?.data?.total}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      <InterestedBlock />

      <ViewedProducts />
    </React.Fragment>
  )
}

export default ProductsBody