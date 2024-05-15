"use client"

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation"

/* @ts-ignore */
import moment from "moment"

// @ts-ignore  
import { Bell } from 'lucide-react';

// @components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { getListNotificationSelector } from "@/redux/notification/selector";
import { cn } from "@/lib/utils";
import { PAGE_LIMIT, PAGE_NUMBER, RETCODE_SUCCESS, TYPE_SEEN } from "@/constants";

// @service
import { readAllNotification, updateStatusNotiClient } from "@/redux/notification/service";

// @common
import { getUserInfo, getUserToken } from "@/utility/common";

// @action-notification
import { getListNotification } from "@/redux/notification/actions";

const Notification = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const notification = useSelector(getListNotificationSelector)

  const [loading, setLoading] = useState<boolean>(false)

  // console.log("notification", notification)

  const onUpdateStatusNoti = async (typeOrder: number, idOrder: string, idNoti: string) => {
    try {
      setLoading(true)
      const req = {
        notificationId: idNoti
      }
      const res = await updateStatusNotiClient(req)
      if (res?.retCode === RETCODE_SUCCESS) {
        const req = {
          page: PAGE_NUMBER,
          size: PAGE_LIMIT,
          userId: getUserInfo().id
        }
        dispatch(getListNotification(req))
        if (typeOrder === 1) {
          router.push(`/checkout/order-detail?orderId=${idOrder}`)
        } else if (typeOrder === 2) {
          router.push(`/customize-product/manage/order-detail?orderId=${idOrder}`)
        } else {
          router.push(`/customize-product/manage`)
        }
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const handleReadAll = async () => {
    // console.log("read-all")
    try {
      setLoading(true)
      const req = {
        userId: getUserInfo().id,
        userType: "client"
      }
      const res = await readAllNotification(req)
      if ((res as any).retCode === RETCODE_SUCCESS) {
        const req = {
          page: PAGE_NUMBER,
          size: PAGE_LIMIT,
          userId: getUserInfo().id
        }
        dispatch(getListNotification(req))
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className='px-2 py-2 rounded-full hover:bg-[#676767]'>
          <div className='flex flex-col justify-center items-center relative'>
            <Bell color="white" size={22} />
            {notification?.retData.notifications.filter(item => item.status === TYPE_SEEN.NOTE_SEEN).length > 0 && (
              <span className='inline-flex items-center justify-center bg-[#F4B324] text-[#181818] text-sm font-semibold h-5 min-w-[20px] rounded-[10px] absolute -right-2 -translate-y-1/2'>
                {notification?.retData.notifications.filter(item => item.status === TYPE_SEEN.NOTE_SEEN).length}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <div className="flex flex-row justify-between items-center mb-2">
          <h1 className="text-xl font-bold">Notification:</h1>
          <h3
            className="text-base font-normal hover:underline hover:underline-offset-4 cursor-pointer"
            onClick={() => handleReadAll()}
          >
            Read all
          </h3>
        </div>
        <div className='flex flex-col justify-start gap-y-4 max-h-[750px] overflow-auto'>
          {!!getUserToken()
            ? notification?.retData.notifications?.length > 0
              ? (
                notification?.retData.notifications?.map((item, index) => {
                  return (
                    <div
                      key={`${item?._id}-${index}`}
                      className={cn(
                        "flex flex-col justify-start gap-1 p-3 rounded-lg",
                        item?.status === TYPE_SEEN.NOTE_SEEN ? "bg-gray-100" : ""
                      )}
                    >
                      <h1 className='text-base font-bold line-clamp-1'>{item?.title}</h1>
                      <p className='text-sm font-semibold line-clamp-1'>{item?.description}</p>
                      <div className='flex flex-row justify-between items-start'>
                        <p className='text-xs font-normal text-slate-500 line-clamp-1'>
                          Date created: {moment(item?.createdAt).format("DD/MM/YYY HH:mm")}
                        </p>

                        <Button
                          className={"bg-[#333333] text-white text-base h-[35px] px-4 hover:bg-white hover:border hover:text-[#333333]"}
                          onClick={() => onUpdateStatusNoti(item?.typeOrder, item?.idOrder, item?._id)}
                          disabled={loading}
                        >
                          Review
                        </Button>
                      </div>
                    </div>
                  )
                })
              )
              : (
                <div className="flex flex-row justify-center items-center">
                  <h1 className="text-base font-bold">
                    There is no notification here!
                  </h1>
                </div>
              )
            : (
              <div className="flex flex-row justify-center items-center">
                <h1 className="text-base font-bold">
                  Please, loggin to see your notification!
                </h1>
              </div>
            )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Notification