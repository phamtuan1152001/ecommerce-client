"use client"
import React from "react"

// @components
import SlideInModal from "../slide-in-modal"
import { Button } from "@/components/ui/button"

interface DiaglogPopupProps {
  icon: any,
  title: string,
  description: string,
  textButtonOk: string,
  textButtonCancel: string,
  isBtnCancel: boolean,
  closeOnClickOverlay: boolean,
  className: string,
  onSubmit: () => void,
  onCancle: () => void
}

export const DiaglogPopup = ({
  icon,
  title,
  description,
  textButtonOk,
  textButtonCancel,
  isBtnCancel,
  closeOnClickOverlay,
  className,
  onSubmit,
  onCancle
}: DiaglogPopupProps) => {

  return SlideInModal.show(
    () => { },
    <div className="flex flex-row justify-center place-items-center">
      {icon}
    </div>,
    <div className="flex flex-col justify-center items-center gap-2">
      <h2 className="text-2xl text-center uppercase font-bold text-textColor-title">{title}</h2>
      <p className="text-base text-center font-normal text-[#000000]">{description}</p>
    </div>,
    <>
      {isBtnCancel
        ? (
          <div className="flex flex-row justify-center items-center gap-6 w-full">
            <Button
              className="text-base font-semibold text-center py-3 px-6 w-full"
              onClick={() => {
                if (typeof onSubmit === "function") onCancle();
              }}
            >
              {textButtonCancel}
            </Button>
            <Button
              className="text-base font-semibold text-center bg-backgroundColor-cancelDiaglogBtn py-3 px-6 w-full"
              onClick={() => {
                if (typeof onSubmit === "function") onSubmit();
              }}
            >
              {textButtonOk}
            </Button>
          </div>
        )
        : (
          <div className="w-full">
            <Button
              className="w-full text-base font-semibold text-center py-3 px-6"
              onClick={() => {
                if (typeof onSubmit === "function") onSubmit();
              }}
            >
              {textButtonOk}
            </Button>
          </div>
        )}
    </>,
    closeOnClickOverlay,
    className
  )
}