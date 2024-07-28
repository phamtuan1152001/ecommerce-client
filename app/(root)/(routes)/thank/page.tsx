"use client"

import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import moment from "moment"
import Image from 'next/image'
import { connect } from "socket.io-client";

//@svg 
import { CartIcon } from "@/components/icons/CartIcon"
import { PaymentFailIcon, PaymentSuccessStatus } from "@/public/assets/svg"

//@components
import { Container } from "@/components/ui/container"
import BreadcrumbComponent from "@/components/bread-crumd"
import Spinner from "@/components/spin"

//@constants
import { getUserInfo, renderText } from "@/utility/common"
import { BASE_URL_API_DEV, RETCODE_SUCCESS } from "@/constants";
const host = BASE_URL_API_DEV;

//@api
import { createNotification, getOrderDetail, updateOrderDetail } from "@/lib/api/order"

//@utility
import { formatToCurrencyVND, getUserToken } from "@/utility/common"

const ThankPage = () => {
  const param = useSearchParams()
  const socket = connect(host)

  const orderId = param.get("orderId")
  const resultCode: any = param.get('resultCode');
  // console.log("orderId", orderId);

  const [loading, setLoading] = useState<boolean>(false)
  const [detailOrder, setDetailOrder] = useState<any>()
  const isAuthenticated = !!getUserToken()

  useEffect(() => {
    if (parseInt(resultCode) === 1006) {
      fetchOrderDetail(orderId)
    } else {
      if (isAuthenticated) {
        if (!!orderId) {
          fetchOrderDetail(orderId)
        }
      } else {
        window.location.href = "/"
      }
    }
  }, [orderId])

  const fetchOrderDetail = async (code: string | null) => {
    try {
      setLoading(true)
      const res: {
        retCode: number,
        retText: string,
        retData: any
      } = await getOrderDetail(code)
      // console.log("res", res);
      if (res.retCode === 0) {
        setDetailOrder(res.retData)
        if (res.retData.statusOrder === 0) {
          fetchUpdateDetailOrder(res.retData)
        }
      }
    } catch (err) {
      console.log("FETCH FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCreateNotification = async (id: string, payment: number) => {
    try {
      const req = {
        userId: getUserInfo()?.id,
        typeOrder: 1,
        idOrder: id,
        typePayment: payment // 0 - pending (moi tao don hang), 1 - (thanh toan don hang thanh cong), 2 - (huy thanh toan don hang)
      }
      const res = await createNotification(req)
      if (res?.retCode === 0) {
        socket.emit("createOrder", res?.retData)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const fetchUpdateDetailOrder = async (detailOrder: any) => {
    try {
      const req = {
        ...detailOrder,
        statusOrder: parseInt(resultCode) === 1006 ? 2 : 1
      }
      const res = await updateOrderDetail(req)
      if (res?.retCode === RETCODE_SUCCESS) {
        fetchCreateNotification(detailOrder?._id, 1)
      }
      // console.log("res", res);
    } catch (err) {
      console.log("FETCHING FAIL!", err);
    }
  }

  // console.log("param", detailOrder)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='bg-[#F5F5F5] py-6 max-[1024px]:py-0'>
      <div className="pb-5 max-[1024px]:pb-0 max-[1024px]:pt-4">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Cart",
              to: "/"
            },
            {
              title: "Payment",
              to: `/checkout`
            },
            {
              title: "Review order",
              to: `/checkout/${orderId}`
            }
          ]} />
        </Container>
      </div>

      <Container className="max-[1024px]:p-4">
        <Spinner spinning={loading}>
          <div className="grid grid-cols-2 gap-x-6 max-[1024px]:grid-cols-1 max-[1024px]:gap-y-6">
            <div className="p-[24px] bg-white rounded-[12px]">
              <div className="flex flex-col gap-y-4 pb-6 border-b-2 border-[#DFE3E8]">
                <div className="flex flex-row justify-start items-center gap-x-2">
                  <div className="flex flex-col justify-center items-center">
                    <CartIcon className='w-6 h-6' />
                  </div>
                  <h1 className="font-bold text-lg text-[#000000]">Order details</h1>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-xs font-semibold text-[#000000]">Products</h3>
                  <h3 className="text-xs font-semibold text-[#000000]">Total order</h3>
                </div>
                <div className="flex flex-col justify-between items-start gap-y-3">
                  {detailOrder?.cartDetail?.items?.map((item: any, index: number) => {
                    return (
                      <React.Fragment key={`${item?.id}-${index}`}>
                        <div className="flex flex-row justify-between items-start w-full">
                          <div className="flex flex-col justify-start gap-y-2">
                            <h3 className="text-base font-bold text-[#333333]">
                              {item?.product?.name}
                            </h3>
                            <p className="text-sm font-normal text-[#676767]">
                              Quantity: {String(item?.quantity).padStart(2, "0")}
                            </p>
                          </div>
                          <h4 className="text-base font-bold text-[#FA9E14]">
                            {formatToCurrencyVND(parseInt(item?.total))}
                          </h4>
                        </div>
                      </React.Fragment>
                    )
                  })}
                </div>
              </div>
              <div className="flex flex-col gap-y-4 py-6 border-b-2 border-[#DFE3E8]">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Payment methods</h3>
                  <h3 className="text-base font-bold text-[#000000] max-[1024px]:text-right">
                    {renderText(detailOrder?.paymentMethod)}
                  </h3>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Tạm tính</h3>
                  <h3 className="text-base font-bold text-[#000000]">
                    {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
                  </h3>
                </div>
                {/* <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Giảm giá</h3>
                    <h3 className="text-base font-bold text-[#000000]">
                      {formatToCurrencyVND(parseInt(detailOrder?.totalDiscountAmount))}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Phí vận chuyển</h3>
                    <h3 className="text-base font-bold text-[#000000]">0VND</h3>
                  </div> */}
              </div>
              <div className="flex flex-col pt-6">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Total order</h3>
                  <h3 className="text-base font-bold text-[#000000]">
                    {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-[24px] bg-white h-fit rounded-[12px]">
              {parseInt(resultCode) === 1006
                ? (
                  <div className="flex flex-col justify-center items-center gap-y-4">
                    <div className="flex flex-col justify-center items-center">
                      <PaymentFailIcon />
                    </div>
                    <h2 className="text-lg font-bold text-red-500">
                      This payment has been canceled
                    </h2>
                  </div>
                )
                : (
                  <div className="flex flex-col justify-center items-center gap-y-4">
                    <div className="flex flex-col justify-center items-center">
                      <PaymentSuccessStatus />
                    </div>
                    <h2 className="text-lg font-bold text-[#4EC389] text-center">
                      Thank you. Your order has been paid successfully
                    </h2>
                  </div>
                )}
              <div className="flex flex-col gap-y-4 pt-4">
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Code order:</h3>
                  <h3 className="text-base font-bold text-[#000000]">{detailOrder?._id}</h3>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Date of purchase:</h3>
                  <h3 className="text-base font-bold text-[#000000]">
                    {moment(detailOrder?.updatedAt)?.isValid()
                      ? moment(detailOrder?.updatedAt).format("DD/MM/YYYY HH:mm")
                      : "--"}
                  </h3>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Total order</h3>
                  <h3 className="text-base font-bold text-[#000000]">
                    {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
                  </h3>
                </div>
                <div className="flex flex-row justify-between items-center">
                  <h3 className="text-base font-normal text-[#637381]">Payment methods:</h3>
                  <h3 className="text-base font-bold text-[#000000] max-[1024px]:text-right">
                    {renderText(detailOrder?.paymentMethod)}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </Spinner>
      </Container>
    </div>
  )
}

export default ThankPage