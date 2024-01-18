"use client"
import { useSelector, useDispatch } from "react-redux"
import React, { useState, useEffect } from "react"
import Image from 'next/image'

// @svg and image
import { HamburgerIcon, IconX } from "@/public/assets/svg"
import { BiUserCircle } from 'react-icons/bi';
import LogoMobileImage from "../../../public/assets/images/mobile/logo-image.png"

// @components
import { Button } from '@/components/ui/button';
import { CartButton } from '@/components/cart/cart-button';
import { GlobalSearch } from '@/components/search/global-search';
import NavbarMobile from "./components/navbar-mobile"
import {
  Sheet,
  SheetContent,
  SheetOverlay,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DialogAuth from '@/components/dialogauth/dialogauth';

// @action-cart
import { resetCart, fetchCartRequest } from '@/redux/cart/actions';

// @utility
import { slitName, logOut, getUserToken, getRefreshToken, getIsSavePassword } from '@/utility/common';

// @api
import { verifyToken, generateToken } from '@/lib/api/authenticate';

// @constants
import { SUCCESS } from '@/constants';

// @selector-open-dialog
import { getIsOpenDialog } from '@/redux/openDiaglog/selector';
import { closeDialog, openDiaglog } from '@/redux/openDiaglog/action';

export const HeaderMobile = () => {
  const dispatch = useDispatch()

  const isOpen = useSelector(getIsOpenDialog);

  const [userInfo, setUserInfo] = useState()
  const [loading, setLoading] = useState(false)
  const [isOpenNav, setIsOpenNav] = React.useState<boolean>(false)

  const handleOpenNav = () => {
    setIsOpenNav(!isOpenNav)
  }

  useEffect(() => {
    if (!!getUserToken()) {
      fetchVerifyToken()
    }
  }, [])

  const fetchGenerateNewToken = async () => {
    console.log("generate-new-token");
    try {
      const req = {
        refreshToken: getRefreshToken()
      }
      const res = await generateToken(req)
      if ((res as any)?.statusCode === SUCCESS) {
        const userTokenRaw: string | null = localStorage.getItem("USER_INFO");
        localStorage.removeItem("USER_INFO")
        let userToken: object | string = {};
        if (userTokenRaw) {
          userToken = JSON.parse(userTokenRaw);
        }
        const new_user_info = {
          ...(typeof userToken === "object" ? userToken : {}),
          accessToken: (res as any).data?.accessToken,
        };
        localStorage.setItem("USER_INFO", JSON.stringify(new_user_info))
        dispatch(fetchCartRequest({
          accessToken: (res as any).data?.accessToken
        }));
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const fetchVerifyToken = async () => {
    try {
      setLoading(true)
      const res = await verifyToken({
        accessToken: getUserToken()
      })
      if (res?.statusCode === SUCCESS) {
        const user = {
          ...res?.data,
          accessToken: getUserToken()
        }
        setUserInfo(user)
      } else {
        // localStorage.removeItem("USER_INFO")
        dispatch(resetCart());
        if (!!getIsSavePassword()) {
          fetchGenerateNewToken()
        }
      }
    } catch (err) {
      // localStorage.removeItem("USER_INFO")
      dispatch(resetCart());
      if (!!getIsSavePassword()) {
        fetchGenerateNewToken()
      }
      console.log("FETCH FAIL!", err);
    } finally {
      setLoading(false)
    }
  }

  const handleLogOut = () => {
    dispatch(resetCart());
    setTimeout(() => {
      logOut()
    }, 500)
  }

  const handleOpenDialog = () => {
    if (isOpen) {
      dispatch(closeDialog())
    } else {
      dispatch(openDiaglog())
    }
  }

  return (
    <Sheet open={isOpenNav} onOpenChange={handleOpenNav}>
      <nav className="relative flex flex-row justify-between items-center py-3 px-3">
        <div className="flex flex-row justify-between items-center gap-2">
          {!isOpenNav && (
            <SheetTrigger asChild>
              <button
                type='button'
                className='flex flex-col justify-center items-center rounded-lg py-2 px-1 focus:outline-none focus:ring-2'
                onClick={() => handleOpenNav()}
              >
                <HamburgerIcon />
              </button>
            </SheetTrigger>
          )}
          <div className='flex flex-col justify-center items-center'>
            <Image
              className='object-cover object-center rounded-l-lg'
              src={LogoMobileImage}
              alt='image-logo-mobile'
              width={52}
              height={52}
            />
          </div>
        </div>
        {isOpenNav ? (
          <div className="flex flex-row justify-between items-center gap-2">
            <div className="flex flex-col justify-center items-center">
              <IconX />
            </div>
            <button type="button" className="flex flex-col justify-center items-center" onClick={() => handleOpenNav()}>
              <h3 className="text-white font-bold text-sm">Đóng</h3>
            </button>
          </div>
        ) : (
          <div className='flex items-center'>
            {/* <GlobalSearch /> */}

            <div className='flex items-center'>
              {loading
                ? (
                  <h2 className='text-base text-white font-bold'>Đang tải...</h2>
                )
                : !!userInfo
                  ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className='flex flex-row justify-start items-center cursor-pointer'>
                          <h2 className='text-base text-white'>
                            Xin chào {" "}
                            <span className='font-bold'>
                              {slitName((userInfo as any)?.fullName)}
                            </span>
                          </h2>
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='bg-transparent p-0 border-0'>
                        <Button
                          className='w-full bg-backgroundColor-cover hover:bg-white hover:border-1 hover:border-[#00508F] hover:text-textColor-deleteFilter'
                          onClick={() => handleLogOut()}
                        >
                          <span className='font-bold text-sm'>Đăng xuất</span>
                        </Button>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                  : (
                    <Dialog open={isOpen} onOpenChange={() => handleOpenDialog()}>
                      <DialogTrigger asChild>
                        <Button
                          size='icon'
                          className='bg-transparent hover:bg-transparent'
                        >
                          <BiUserCircle size={24} className='text-white' />
                        </Button>
                      </DialogTrigger>
                      <DialogAuth />
                    </Dialog>
                  )}
              <CartButton />
            </div>
          </div>
        )}
        <SheetOverlay className="bg-inherit" />
        <SheetContent side={"top"} className="p-0 top-[75px] h-full">
          <NavbarMobile />
        </SheetContent>
      </nav>
    </Sheet>
  )
}