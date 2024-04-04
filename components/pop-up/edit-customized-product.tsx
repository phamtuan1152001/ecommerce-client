"use client"

import { useState, useEffect } from "react"
import moment from "moment"
import Image from "next/image"

// @components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Spinner from "../spin"
import { Input } from "@/components/ui/input"

// @services
import {
  getDetailCustomizedProductClient
} from "@/lib/api/customized-product"

// @types
import { CustomizedProductType } from "@/types"
import { formatNumber } from "@/utility/common"

interface EditCustomizedProductProps {
  data: CustomizedProductType
  isOpen: boolean,
  handleOpen: () => void,
  onSubmit: (values: any) => void,
  onChangeData: () => void
}

const EditCustomizedProduct = ({
  data,
  isOpen,
  handleOpen,
  onSubmit,
  onChangeData
}: EditCustomizedProductProps) => {
  // console.log("data", data);

  const [loading, setLoading] = useState<boolean>(false)
  const [
    detailCustomized,
    setDetailCustomized
  ] = useState<CustomizedProductType>()
  const [
    regularPrice,
    setRegularPrice
  ] = useState<number>(0)
  const [
    totalPrice,
    setTotalPrice
  ] = useState<number>(0)

  useEffect(() => {
    if (!!data?._id) {
      fetchGetDetailCustomizedProduct()
    }
    return () => {
      onChangeData()
    }
  }, [data?._id])

  const fetchGetDetailCustomizedProduct = async () => {
    try {
      setLoading(true)
      const req = {
        customizedProductId: data?._id
      }
      const res = await getDetailCustomizedProductClient(req)
      // console.log("res", res)
      if (res?.retCode === 0) {
        setDetailCustomized(res?.retData)
        setRegularPrice(res?.retData?.regularPrice)
        setTotalPrice(res?.retData?.totalPrice)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const renderStatus = (type: number | undefined) => {
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
  // console.log("detailCustomized", detailCustomized)
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold uppercase">
            Customized product information
          </DialogTitle>
          <DialogDescription className="text-base font-normal">
            Please, check the information below carefully before confirming.
          </DialogDescription>
        </DialogHeader>
        <div className="relative p-3">
          <Spinner spinning={loading}>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col justify-start gap-3">
                <h2 className="text-lg font-bold">
                  Code:
                  <span className="ml-2 text-base font-normal">
                    {detailCustomized?.code}
                  </span>
                </h2>
                <h2 className="text-lg font-bold">
                  Name:
                  <span className="ml-2 text-base font-normal">
                    {detailCustomized?.name}
                  </span>
                </h2>
                <h2 className="text-lg font-bold">
                  Size:
                  <span className="ml-2 text-base font-normal">
                    {detailCustomized?.size}
                  </span>
                </h2>
                <h2 className="text-lg font-bold">
                  Quantity:
                  <span className="ml-2 text-base font-normal">
                    {detailCustomized?.quantity}
                  </span>
                </h2>
                <h2 className="text-lg font-bold">
                  Day created:
                  <span className="ml-2 text-base font-normal">
                    {moment(detailCustomized?.createdAt).isValid()
                      ? moment(detailCustomized?.createdAt)
                        .format("DD/MM/YYYY HH:mm")
                      : ""
                    }
                  </span>
                </h2>
              </div>
              <div className="flex flex-col justify-start gap-3">
                <div className="flex flex-col justify-start">
                  <div className="flex flex-row justify-start gap-3 items-center">
                    <h2 className="text-lg font-bold w-[200px]">
                      Regular price:
                    </h2>
                    <Input
                      disabled
                      autoFocus={false}
                      value={regularPrice}
                      placeholder={`Enter your product regular price`}
                      onChange={(e) => {
                        const price = parseInt(e.target.value)
                        // console.log("e", typeof price)
                        setRegularPrice(price)
                        const quantity = detailCustomized?.quantity || 0
                        setTotalPrice(price * quantity)
                      }}
                    />
                  </div>
                  <h2 className="text-sm font-normal">
                    Format price:
                    <span className="ml-2 font-bold">
                      {formatNumber(regularPrice.toString())} VND
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col justify-start">
                  <div className="flex flex-row justify-start gap-3 items-center">
                    <h2 className="text-lg font-bold w-[200px]">
                      Total price:
                    </h2>
                    <Input
                      value={totalPrice}
                      disabled
                      placeholder={`Enter your product total price`}
                    />
                  </div>
                  <h2 className="text-sm font-normal">
                    Format price:
                    <span className="ml-2 font-bold">
                      {formatNumber(totalPrice.toString())} VND
                    </span>
                  </h2>
                </div>
                <h2 className="text-lg font-bold">
                  Admin confirmed:
                  <span className="ml-2">
                    {renderStatus(detailCustomized?.statusProductAdmin)}
                  </span>
                </h2>
                <h2 className="text-lg font-bold">
                  Client confirmed:
                  <span className="ml-2">
                    {renderStatus(detailCustomized?.statusProductClient)}
                  </span>
                </h2>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col justify-start gap-2">
                  <h3 className="font-bold text-lg">Illustration image</h3>
                  <div
                    className="flex flex-row justify-center items-center"
                  >
                    <div className="relative w-full max-w-[300px] aspect-[300/300]">
                      <Image
                        src={detailCustomized?.imageUrl || ""}
                        alt="illustration-image"
                        fill
                        priority
                        sizes="(max-width: 768px) 100vw"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-row justify-end items-center gap-3">
                  <Button
                    className="bg-[#333333] text-white text-base h-[35px] px-4 capitalize"
                    onClick={() => {
                      window.open(detailCustomized?.imagePsd)
                    }}
                  >
                    Download image PSD
                  </Button>
                  <Button
                    className="bg-[#333333] text-white text-base h-[35px] px-4 capitalize"
                    disabled={
                      detailCustomized?.statusProductAdmin === 2
                        ? true
                        : detailCustomized?.statusProductClient !== 0
                          ? true
                          : false
                    }
                    onClick={() => {
                      const submitData = {
                        ...detailCustomized,
                        regularPrice: regularPrice,
                        totalPrice: totalPrice,
                        statusProductClient: 2
                      }
                      onSubmit(submitData)
                    }}
                  >
                    Cancel customized product
                  </Button>
                  <Button
                    className="bg-[#333333] text-white text-base h-[35px] px-4 capitalize"
                    disabled={
                      detailCustomized?.statusProductAdmin === 2
                        ? true
                        : detailCustomized?.statusProductClient !== 0
                          ? true
                          : false
                    }
                    onClick={() => {
                      const submitData = {
                        ...detailCustomized,
                        regularPrice: regularPrice,
                        totalPrice: totalPrice,
                        statusProductClient: 1
                      }
                      onSubmit(submitData)
                    }}
                  >
                    Confirm customized product
                  </Button>
                </div>
              </div>
            </div>
          </Spinner>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditCustomizedProduct