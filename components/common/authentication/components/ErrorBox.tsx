import React from "react";

// @icon and image
import { IconWarning, IconCloseX } from "@/public/assets/svg";

interface ErrorBoxProps {
  isError: boolean,
  onClose: any
}

const ErrorBox = ({isError, onClose}:ErrorBoxProps) => {
  return (
    <React.Fragment>
      <div className={`flex flex-row justify-start gap-3 p-2 bg-backgroundColor-cover rounded-lg mx-auto w-11/12 transition-all duration-200 ${isError ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col justify-center items-center">
          <IconWarning/>
        </div>
        <div className="w-full">
          <h4 className="text-base font-normal text-textColor-warning">Mã xác thực chưa đúng.</h4>
          <p className="text-base font-normal text-textColor-warning">Hãy nhập lại</p>
        </div>
        <div className="h-full cursor-pointer" onClick={() => onClose()}>
          <IconCloseX/>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ErrorBox