"use client"

import React, { useEffect, useState } from "react"
import { useParams, useSearchParams } from "next/navigation"
import moment from "moment"
import Image from 'next/image'

//@svg 
import { CartIcon } from "@/components/icons/CartIcon"
import { PaymentSuccessStatus } from "@/public/assets/svg"

//@components
import { Container } from "@/components/ui/container"
import BreadcrumbComponent from "@/components/bread-crumd"
import { TailSpin } from "react-loader-spinner"

//@constants
import { PAYMENT_ATM_BANKING, PAYMENT_COD, SUCCESS } from "@/constants"

//@api
import { getOrderDetail } from "@/lib/api/order"
import { formatToCurrencyVND, getUserToken } from "@/utility/common"

const OrderDetailPage = () => {
  const param = useSearchParams()
  const orderId = param.get("orderId")
  // console.log("orderId", orderId);

  const [loading, setLoading] = useState<boolean>(false)
  const [detailOrder, setDetailOrder] = useState<any>()
  const isAuthenticated = !!getUserToken()

  useEffect(() => {
    if (isAuthenticated) {
      if (!!orderId) {
        fetchOrderDetail(orderId)
      }
    } else {
      window.location.href = "/"
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
      }
    } catch (err) {
      console.log("FETCH FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  // console.log("param", detailOrder)

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='bg-[#F5F5F5] py-6 max-[768px]:py-0'>
      <div className="pb-5 max-[768px]:pb-0 max-[768px]:pt-4">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Giỏ hàng",
              to: "/"
            },
            {
              title: "Thanh toán",
              to: `/checkout`
            },
            {
              title: "Xem lại",
              to: `/checkout/${orderId}`
            }
          ]} />
        </Container>
      </div>

      <Container className="max-[768px]:p-4">
        {loading
          ? (
            <div className="flex flex-col justify-center items-center h-full">
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
            <div className="grid grid-cols-2 gap-x-6 max-[768px]:grid-cols-1 max-[768px]:gap-y-6">
              <div className="p-[24px] bg-white rounded-[12px]">
                {detailOrder?.paymentMethod === PAYMENT_ATM_BANKING
                  ? (
                    <div className="">
                      <p className="text-base font-normal">
                        Vui lòng kiểm tra tin nhắn để theo dõi đơn. Shipper sẽ giao hàng sau khi nhận được thanh toán.
                      </p>
                      <p className="text-base font-normal">
                        Quét mã QR thanh toán:
                      </p>
                      <div className='flex flex-row justify-center items-center'>
                        <Image
                          alt='image'
                          src='/assets/images/checkout/qr-banking.png'
                          // fill
                          width={250}
                          height={327}
                          className='object-cover object-center rounded-[8px]'
                        />
                      </div>
                    </div>
                  )
                  : null}
                <div className="flex flex-col gap-y-4 pb-6 border-b-2 border-[#DFE3E8]">
                  <div className="flex flex-row justify-start items-center gap-x-2">
                    <div className="flex flex-col justify-center items-center">
                      <CartIcon className='w-6 h-6' />
                    </div>
                    <h1 className="font-bold text-lg text-[#000000]">Chi tiết đơn hàng</h1>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-xs font-semibold text-[#000000]">Sản phẩm</h3>
                    <h3 className="text-xs font-semibold text-[#000000]">Tổng đơn hàng</h3>
                  </div>
                  <div className="flex flex-col justify-between items-start">
                    {detailOrder?.cartDetail?.items?.map((item: any, index: number) => {
                      return (
                        <React.Fragment key={`${item?.id}-${index}`}>
                          <div className="flex flex-col justify-start gap-y-2">
                            <h3 className="text-base font-bold text-[#333333]">
                              {item?.product?.name}
                            </h3>
                            <p className="text-sm font-normal text-[#676767]">
                              Số lượng: {String(item?.quantity).padStart(2, "0")}
                            </p>
                          </div>
                          <h4 className="text-base font-bold text-[#FA9E14]">
                            {formatToCurrencyVND(parseInt(item?.total))}
                          </h4>
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 py-6 border-b-2 border-[#DFE3E8]">
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Phương thức thanh toán</h3>
                    <h3 className="text-base font-bold text-[#000000] max-[768px]:text-right">
                      {detailOrder?.paymentMethod
                        ? detailOrder?.paymentMethod === PAYMENT_COD ? "COD (Thanh toán khi nhận hàng)" : "Chuyển khoản ngân hàng"
                        : "--"}
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
                    <h3 className="text-base font-normal text-[#637381]">Tổng đơn đặt hàng</h3>
                    <h3 className="text-base font-bold text-[#000000]">
                      {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-[24px] bg-white h-fit rounded-[12px]">
                <div className="flex flex-col justify-center items-center gap-y-4">
                  <div className="flex flex-col justify-center items-center">
                    <PaymentSuccessStatus />
                  </div>
                  <h2 className="text-lg font-bold text-[#4EC389]">
                    Cảm ơn bạn. Đơn hàng của bạn đã được xác nhận
                  </h2>
                </div>
                <div className="flex flex-col gap-y-4 pt-4">
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Mã đơn hàng:</h3>
                    <h3 className="text-base font-bold text-[#000000]">{detailOrder?._id}</h3>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Ngày mua hàng:</h3>
                    <h3 className="text-base font-bold text-[#000000]">
                      {moment(detailOrder?.updateAt)?.isValid()
                        ? moment(detailOrder?.updateAt).format("DD/MM/YYYY HH:MM")
                        : "--"}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Tổng đơn đặt hàng</h3>
                    <h3 className="text-base font-bold text-[#000000]">
                      {formatToCurrencyVND(detailOrder?.cartDetail?.totalPrice)}
                    </h3>
                  </div>
                  <div className="flex flex-row justify-between items-center">
                    <h3 className="text-base font-normal text-[#637381]">Phương thức Thanh toán:</h3>
                    <h3 className="text-base font-bold text-[#000000] max-[768px]:text-right">
                      {detailOrder?.paymentMethod
                        ? detailOrder?.paymentMethod === PAYMENT_COD ? "COD (Thanh toán khi nhận hàng)" : "Chuyển khoản ngân hàng"
                        : "--"}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          )}
      </Container>
    </div>
  )
}

export default OrderDetailPage