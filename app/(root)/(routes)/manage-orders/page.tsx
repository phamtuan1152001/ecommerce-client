"use client"

import React from 'react'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import moment from "moment";

// @utility
import { getPaginationItems } from '@/utility/pagination';

// @components
import { Container } from '@/components/ui/container'
import BreadcrumbComponent from '@/components/bread-crumd'
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

// @service
import { getListOrders } from '@/lib/api/order';

// @constants
import { PAGE_LIMIT, PAGE_NUMBER, SUCCESS, MAX_LENGTH, LANGUAGE_VI, INITIAL_DATA_ORDERS, PAYMENT_ATM_BANKING, PAYMENT_MOMO_BANKING, PAYMENT_COD, PAYMENT_METAMASK } from "@/constants"

// @svg
import { IconBackArrow } from '@/public/assets/svg'

// @types
import { OrderType } from '@/types';

function ManageOrders() {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [listOrders, setListOrders] = useState<OrderType[]>(INITIAL_DATA_ORDERS)
  const [totalProduct, setTotalProduct] = useState<number>()

  const [currentPage, setCurrentPage] = useState(PAGE_NUMBER)
  const LAST_PAGE = totalProduct || 0
  const pageNums = getPaginationItems(currentPage, LAST_PAGE, MAX_LENGTH)

  useEffect(() => {
    fetchGetListOrders()
  }, [])

  const fetchGetListOrders = async (
    page: number = PAGE_NUMBER,
    size: number = PAGE_LIMIT,
  ) => {
    try {
      setLoading(true)
      const req = {
        page,
        size,
        userId: getUserInfo()?.id
      }
      const res: {
        retCode: number,
        retText: string,
        retData: {
          currentPage: number,
          orders: OrderType[],
          totalItems: number,
          totalPages: number
        }
      } = await getListOrders(req)
      // console.log("res", res)
      if (res.retCode === 0) {
        setListOrders(res.retData.orders)
        setTotalProduct(Math.ceil(res?.retData?.totalItems / PAGE_LIMIT))
      } else {
        setListOrders([])
      }
    } catch (err) {
      console.log("FETCH FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const renderStatusOrder = (type: number) => {
    switch (type) {
      case 0:
        return <span className='text-base font-bold tracking-widest text-yellow-500'>Pending</span>
      case 1:
        return <span className='text-base font-bold tracking-widest text-green-500'>Successfully</span>
      default:
        return <span className='text-base font-bold tracking-widest text-red-500'>Cancel</span>
    }
  }

  const handleChangePage = (page: number) => {
    fetchGetListOrders(
      page,
      PAGE_LIMIT
    )
  }

  return (
    <div className='bg-[#F5F5F5] py-6 max-[1024px]:py-0'>
      <div className=" pb-5 max-[1024px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Homepage",
              to: "/"
            },
            {
              title: "Manage orders",
              to: `/manage-orders`
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
            <h1 id="title-content" className="font-bold text-lg uppercase">List orders</h1>
            <div className="pt-4">
              <Table className="max-[1024px]:w-[1200px]">
                <TableHeader className="w-full">
                  <TableRow>
                    <TableHead className="font-bold text-sm">No</TableHead>
                    <TableHead className="font-bold text-sm">Order's code</TableHead>
                    {/* <TableHead>Cửa hàng</TableHead> */}
                    <TableHead className="font-bold text-sm">Customer</TableHead>
                    <TableHead className="font-bold text-sm">Status</TableHead>
                    <TableHead className="font-bold text-sm">Method</TableHead>
                    <TableHead className="font-bold text-sm">Total</TableHead>
                    <TableHead className="font-bold text-sm">Created</TableHead>
                    <TableHead className="font-bold text-sm">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="relative">
                  <Spinner spinning={loading}>
                    {listOrders?.length > 0
                      ? listOrders?.map((item: OrderType, index: number) => {
                        return (
                          <TableRow key={index}>
                            <TableCell className="font-medium">
                              <span className="text-sm font-bold">
                                {index + 1}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-sm font-bold">
                                {item?._id}
                              </span>
                            </TableCell>
                            <TableCell className="w-[400px]">
                              <div className="flex flex-col justify-start gap-y-1">
                                <h3 className="text-sm"><span className="font-bold">Họ và tên</span>: {item?.orderAddress?.fullName}</h3>
                                <h3 className="text-sm"><span className="font-bold">Số điện thoại: </span> {item?.orderAddress?.phone}</h3>
                                <h3 className="text-sm"><span className="font-bold">Địa chỉ: </span> {item?.orderAddress?.address}</h3>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm">{renderStatusOrder(item.statusOrder)}</TableCell>
                            <TableCell className="text-sm font-bold">{renderText(item.paymentMethod)}</TableCell>
                            <TableCell className="">
                              <span className="text-sm font-bold">
                                {formatToCurrencyVND(item.cartDetail.totalPrice)}
                              </span>
                            </TableCell>
                            <TableCell className="">
                              <span className="text-sm font-bold">
                                {moment(item?.createdAt).isValid() ? moment(item?.createdAt).format("DD/MM/YYYY HH:mm") : "--"}
                              </span>
                            </TableCell>
                            <TableCell className="">
                              <span
                                className="text-sm font-bold underline underline-offset-4 cursor-pointer"
                                onClick={() =>
                                  router.push(`/checkout/order-detail?orderId=${item?._id}`)
                                }
                              >
                                Review
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
                data={listOrders}
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

export default ManageOrders