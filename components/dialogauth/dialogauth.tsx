'use client'

import React, { useState } from "react";
import Image from "next/image";

import {
  DialogContent,
} from '@/components/ui/dialog';
import { Container } from '@/components/ui/container';

// @icons and images
import LoginImage from "../../public/assets/images/login/LoginImage.png"
import LogoImage from "../../public/assets/images/login/LogoLogin.png"

// @components
import ForgotPassword from "../common/authentication/ForgotPassword";
import OtpConfirm from "../common/authentication/OtpConfirm";
import AuthTabs from "../common/authentication/AuthTabs";

const DialogAuth = () => {
  // const [open, setOpen] = useState(false)
  const [tab, setTab] = useState(1)
  
  const renderContent = (tab: number) => {
    switch (tab) {
      case 2:
        return <ForgotPassword idTab={tab} setOpen={setTab} />
      case 3:
        return <OtpConfirm idTab={tab} setOpen={setTab}/>
      default:
        return <AuthTabs setOpen={setTab} />
    }
  }

  return (
      <DialogContent className="sm:max-w-[850px] min-h-[697px] p-0 max-[768px]:h-full">
        <div className="grid grid-cols-2 gap-4 max-[768px]:grid-cols-1 max-[768px]:gap-0">
          <div className="relative">
            <Image
              alt='login-image'
              src={LoginImage}
              fill
              className='object-cover object-center rounded-l-lg max-[768px]:rounded-none'
            />
            <div
              className="absolute top-1/4 max-[768px]:top-[47%]"
              style={{
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Image
                alt='login-image'
                src={LogoImage}
                className='w-full h-auto object-contain aspect-auto'
              />
            </div>
          </div>
          <Container className="py-6 max-[768px]:p-3">
            {renderContent(tab)}
          </Container>
        </div>
      </DialogContent>
  )
}

export default DialogAuth;