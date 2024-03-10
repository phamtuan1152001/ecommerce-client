"use client"

import React, { useEffect, useState } from 'react';

// @api
import { getProducts } from '@/lib/api/product';
import { getCategories } from '@/lib/api';

// @constants
import { PAGE_NUMBER, PAGE_LIMIT } from '@/constants';

// @components
import { CategoryView } from '@/components/category/category-view';
import { ViewedProducts } from '@/components/section/viewed-products';
import { Container } from '@/components/ui/container';
import BreadcrumbComponent from '../bread-crumd';

// @utility
import { nameCate } from '@/utility/common';

// @types
import { CategoryType, ProductType } from '@/types';

interface ProductsBody {
  slug: string
}

const ProductsBody = ({ slug }: ProductsBody) => {

  const [products, setProducts] = useState<{
    retCode: number,
    retData: {
      currentPage: number,
      products: ProductType[],
      totalItems: number,
      totalPages: number
    },
    retText: string
  }>({
    retCode: 0,
    retData: {
      currentPage: 0,
      products: [],
      totalItems: 0,
      totalPages: 0
    },
    retText: ""
  })
  const [cateDetail, setCateDetail] = useState<CategoryType>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchGetListCategories()
  }, [])

  const fetchGetListCategories = async () => {
    try {
      const res: {
        retCode: number,
        retText: string,
        retData: CategoryType[]
      } = await getCategories()
      if (res.retCode === 0) {
        const categories = res.retData.find(item => item.slug === slug)
        setCateDetail(categories)
        fetchGetListProducts(
          PAGE_NUMBER,
          PAGE_LIMIT,
          categories?._id,
          "",
        )
      }
    } catch (err) {
      console.log("FETCHING FAIL!");
    }
  }

  const fetchGetListProducts = async (
    page: number = PAGE_NUMBER,
    size: number = PAGE_LIMIT,
    categories: string = "",
    productText: string = "",
  ) => {
    try {
      setLoading(true)
      const res: {
        retCode: number,
        retData: {
          currentPage: number,
          products: ProductType[],
          totalItems: number,
          totalPages: number
        },
        retText: string
      } = await getProducts(
        page,
        size,
        categories,
        productText,
      )
      // console.log(res);
      if (res?.retCode === 0) {
        setProducts(res)
      } else {
        setProducts({
          retCode: 0,
          retData: {
            currentPage: 0,
            products: [],
            totalItems: 0,
            totalPages: 0
          },
          retText: ""
        })
      }
    } catch (err) {
      console.log("FETCHING FAIL", err);
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (page: number) => {
    // console.log(page);
    fetchGetListProducts(
      page,
      PAGE_LIMIT,
      cateDetail?._id,
      "",
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
            <div className='bg-white'>
              {/* <div className='py-6 px-4 max-[768px]:p-0'>
                <TopSelling />
              </div> */}

              <div className='px-4 py-6 max-[768px]:p-0 max-[768px]:pb-6 max-[768px]:px-3'>
                <CategoryView
                  titleCate={cateDetail?.name}
                  loading={loading}
                  listProducts={products?.retData.products}
                  slug={slug}
                  onChangePage={(page: number) => handleChangePage(page)}
                  totalProduct={products?.retData.totalPages}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* <ViewedProducts /> */}
    </React.Fragment>
  )
}

export default ProductsBody