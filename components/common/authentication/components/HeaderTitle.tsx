import React, { FC } from "react";

// @icons and image
import { IconBack } from "@/public/assets/svg";

interface StringProps {
  title: string,
  description: string,
  // setOpen: (a:boolean) => void
  setOpen: any,
  idTab: number
}

const HeaderTitle: FC<StringProps> = ({ title, description, setOpen, idTab }): JSX.Element => {
  return (
    <div className="flex flex-col justify-start gap-8 mb-8">
      <div className="flex flex-row justify-start items-center gap-6 relative">
        <div className="absolute cursor-pointer">
          <div className="flex flex-col justify-center items-center">
            <IconBack onClick={() => {
              if (idTab === 2) {
                setOpen(1)
              } else {
                setOpen(2)
              }
            }} />
          </div>
        </div>
        <h3 className="text-center text-lg font-bold w-full text-textColor-title uppercase">
          {title}
        </h3>
      </div>
      <div className="text-sm font-normal text-center text-textColor-description">
        {description}
      </div>
    </div>
  )
}

export default HeaderTitle