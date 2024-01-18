import React from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"


// @icons and image
import { IconSuccess, IconCloseBoxSuccess } from "@/public/assets/svg"

interface BoxConfirmProps {
  isOpen: boolean,
  onOpenChange: any,
  title: string,
  description: string,
  status: boolean
}

const BoxConfirm = ({ isOpen, onOpenChange, title, description, status }: BoxConfirmProps) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-[525px]">
        {/* <div className="flex flex-row justify-end items-center">
          <AlertDialogCancel
            className="border-0"
            onClick={() => onOpenChange()}
          >
            <IconCloseBoxSuccess/>
          </AlertDialogCancel>
        </div> */}
        <div className="mb-6">
          <div className="flex flex-col justify-center items-center">
            <IconSuccess/>
          </div>
        </div>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-2xl font-bold text-textColor-title">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center mb-8 text-textColor-description font-normal text-base">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Button type="submit" className="font-semibold text-base h-12 w-full text-white" onClick={() => {
          if (status) {
            window.location.reload()
          } else {
            onOpenChange()
          }
        }}>{status ? "Về trang chủ" : "Thử lại"}</Button>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BoxConfirm