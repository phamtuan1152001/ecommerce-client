"use client"

import React, { useEffect, useState } from 'react'
import moment from "moment";
import { useRouter } from "next/navigation"

// @utility
import { getPaginationItems } from '@/utility/pagination';

// @components
import BreadcrumbComponent from "@/components/bread-crumd"
import { Container } from "@/components/ui/container"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Spinner from '@/components/spin';
import CustomPagination from '@/components/CustomPagination';

// @common
import { formatToCurrencyVND, getUserToken, scrollToTop, getUserInfo, renderText } from '@/utility/common';

// @constants
import { PAGE_LIMIT, PAGE_NUMBER, SUCCESS, MAX_LENGTH, LANGUAGE_VI, INITIAL_DATA_ORDERS, PAYMENT_ATM_BANKING, PAYMENT_MOMO_BANKING, PAYMENT_COD, PAYMENT_METAMASK } from "@/constants"

// @svg
import { IconBackArrow } from '@/public/assets/svg'
import { GetListCustomizedProductPayload, CustomizedProductTypeResponse, CustomizedProductType } from '@/types';
import { getListCustomizedProductClient } from '@/lib/api/customized-product';

const ManageCustomizedProduct = () => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [
    listCustomizedProduct,
    setListCustomizedProduct
  ] = useState<CustomizedProductTypeResponse[]>([])
  const [
    totalCustomizedProduct,
    setTotalCustomizedProduct
  ] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(PAGE_NUMBER)
  const LAST_PAGE = totalCustomizedProduct || 0
  const pageNums = getPaginationItems(currentPage, LAST_PAGE, MAX_LENGTH)

  useEffect(() => {
    const req = {
      page: PAGE_NUMBER,
      size: PAGE_LIMIT,
      userId: getUserInfo()?.id,
      search: ""
    }
    fetchGetListCustomizedProductClient(req)
  }, [])

  const fetchGetListCustomizedProductClient = async (
    payload: GetListCustomizedProductPayload
  ) => {
    try {
      setLoading(true)
      const res: {
        retCode: number,
        retText: string,
        retData: {
          currentPage: number,
          customizedProducts: CustomizedProductTypeResponse[],
          totalItems: number,
          totalPages: number
        }
      } = await getListCustomizedProductClient(payload)
      // console.log("res", res)
      if (res.retCode === 0) {
        setListCustomizedProduct(res.retData.customizedProducts)
        setTotalCustomizedProduct(Math.ceil(res?.retData?.totalItems / PAGE_LIMIT))
      } else {
        setListCustomizedProduct([])
      }
    } catch (err) {
      console.log("FETCH FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const handleChangePage = (page: number) => {
    const req = {
      page: page,
      size: PAGE_LIMIT,
      userId: getUserInfo()?.id,
      search: ""
    }
    fetchGetListCustomizedProductClient(req)
  }

  const renderStatus = (type: number) => {
    switch (type) {
      case 0:
        return (
          <span
            className={"capitalize bg-[#fff3cd] text-[#856404] py-1 px-2 rounded-md text-base font-normal border border-[#ffeeba]"}
          >
            Pending
          </span>
        )
      case 1:
        return (
          <span
            className={"capitalize bg-[#c3e6cb] text-[#155724] py-1 px-2 rounded-md text-base font-normal border border-[#c3e6cb]"}
          >
            Confirmed
          </span>
        )
      default:
        return (
          <span
            className={"capitalize bg-[#f8d7da] text-[#721c24] py-1 px-2 rounded-md text-base font-normal border border-[#f5c6cb]"}
          >
            Cancel
          </span>
        )
    }
  }

  return (
    <div className="bg-[#F5F5F5] py-6 max-[1024px]:py-0">
      <div className=" pb-5 max-[1024px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Customized product",
              to: "/customize-product"
            },
            {
              title: "Manage customized product",
              to: `/customize-product/manage`
            }
          ]} />
        </Container>
      </div>
      <Container className="max-[1024px]:px-0">
        {/* Header Back Icon for mobile */}
        <div className='flex flex-row justify-between items-center min-[1280px]:hidden bg-white px-3 pt-2'>
          <button className='flex flex-col justify-center items-center bg-backgroundColor-buttonCommon w-10 h-10 rounded-full' onClick={() => router.back()}>
            <IconBackArrow />
          </button>
        </div>

        <div className='max-[1024px]:px-0'>
          <div className='bg-white p-6 rounded-[8px]'>
            <h1 id="title-content" className="font-bold text-lg uppercase">
              List customized products
            </h1>
            <div className="pt-4">
              <Table className="max-[1024px]:w-[1200px]">
                <TableHeader className="w-full">
                  <TableRow>
                    <TableHead className="font-bold text-sm">No</TableHead>
                    <TableHead className="font-bold text-sm">Code</TableHead>
                    <TableHead className="font-bold text-sm">Name</TableHead>
                    <TableHead className="font-bold text-sm">Total price</TableHead>
                    <TableHead className="font-bold text-sm">Status admin</TableHead>
                    <TableHead className="font-bold text-sm">Status client</TableHead>
                    <TableHead className="font-bold text-sm">Created</TableHead>
                    <TableHead className="font-bold text-sm">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="relative">
                  <Spinner spinning={loading}>
                    {listCustomizedProduct?.length > 0
                      ? listCustomizedProduct?.map((item: CustomizedProductType, index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <span className="text-sm font-bold">
                                {index + 1}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-bold">
                                {item?.code}
                              </span>
                            </TableCell>
                            <TableCell className="w-[400px]">
                              <h3 className="text-sm">
                                {item?.name}
                              </h3>
                            </TableCell>
                            <TableCell className="text-sm">
                              {formatToCurrencyVND(item?.totalPrice)}
                            </TableCell>
                            <TableCell className="text-sm font-bold">
                              {renderStatus(item.statusProductAdmin)}
                            </TableCell>
                            <TableCell className="text-sm font-bold">
                              {renderStatus(item.statusProductClient)}
                            </TableCell>
                            <TableCell className="">
                              <span className="text-sm font-bold">
                                {moment(item?.createdAt).isValid()
                                  ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm") : "--"
                                }
                              </span>
                            </TableCell>
                            <TableCell className="">
                              <span
                                className="text-sm font-bold hover:underline hover:underline-offset-4 cursor-pointer transition-all"
                              // onClick={() =>
                              //   router.push(`/checkout/order-detail?orderId=${item?._id}`)
                              // }
                              >
                                Edit
                              </span>
                            </TableCell>
                          </TableRow>
                        )
                      })
                      : (
                        <div className="flex flex-row justify-start items-center p-4">
                          Không có dữ liệu
                        </div>
                      )}
                  </Spinner>
                </TableBody>
              </Table>

              <CustomPagination
                data={listCustomizedProduct}
                currentPage={currentPage}
                lastPage={LAST_PAGE}
                maxLength={MAX_LENGTH}
                pageNums={pageNums}
                onChange={(value) => {
                  setCurrentPage(value)
                  handleChangePage(value)
                }}
                onPrev={(value) => {
                  setCurrentPage(value)
                  handleChangePage(value)
                }}
                onNext={(value) => {
                  setCurrentPage(value)
                  handleChangePage(value)
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ManageCustomizedProduct