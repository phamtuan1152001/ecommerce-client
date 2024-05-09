"use client"

import { useSelector, useDispatch } from "react-redux";

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
import { TYPE_SEEN } from "@/constants";

const Notification = () => {
  const notification = useSelector(getListNotificationSelector)
  console.log("notification", notification)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className='px-2 py-2 rounded-full hover:bg-[#676767]'>
          <div className='flex flex-col justify-center items-center relative'>
            <Bell color="white" size={22} />
            {notification?.retData.notifications.length > 0 && (
              <span className='inline-flex items-center justify-center bg-[#F4B324] text-[#181818] text-sm font-semibold h-5 min-w-[20px] rounded-[10px] absolute -right-2 -translate-y-1/2'>
                {notification?.retData.notifications.length}
              </span>
            )}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <h1 className="text-xl font-bold mb-2">Notification:</h1>
        <div className='flex flex-col justify-start gap-y-4'>
          {notification?.retData.notifications?.map((item, index) => {
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
                    className={"bg-[#333333] text-white text-base h-[35px] px-4"}
                  // onClick={() => onSubmit(item?.typeOrder, item?.idOrder, item?._id)}
                  >
                    Review
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Notification