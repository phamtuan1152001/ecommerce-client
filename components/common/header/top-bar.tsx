"use client"

import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import Image from 'next/image';
import { BiUserCircle, BiShoppingBag } from 'react-icons/bi';

// @ts-ignore  
import { LogOut, Receipt, Book, BookUser } from 'lucide-react';
import { useRouter } from "next/navigation";

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { CartButton } from '@/components/cart/cart-button';
import Notification from "@/components/notification";
import {
  Dialog,
  DialogTrigger,
} from '@/components/ui/dialog';

// @components 
import DialogAuth from '@/components/dialogauth/dialogauth';
import { GlobalSearch } from '@/components/search/global-search';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu"

// @action-cart
import { resetCart, fetchCartRequest } from '@/redux/cart/actions';

// @utility
import { slitName, logOut, getUserInfo } from '@/utility/common';

// @selector-open-dialog
import { getIsOpenDialog } from '@/redux/openDiaglog/selector';
import { closeDialog, openDiaglog } from '@/redux/openDiaglog/action';
import { resetNotification } from "@/redux/notification/actions";

export const TopBar = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const userInfo = getUserInfo()
  const isOpen = useSelector(getIsOpenDialog);

  const handleLogOut = () => {
    dispatch(resetCart());
    dispatch(resetNotification())
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
    <div className='bg-[#202020]'>
      <Container>
        <div className='relative flex items-center justify-between h-[70px]'>
          <div
            className='px-4 py-2.5 text-white rounded-3xl bg-[#3F3F3F] inline-block'
          >
            Hotline:{' '}
            <span className='inline-block font-bold'>0909 082 912</span>
          </div>

          <div style={{
            position: "absolute",
            top: "-20%",
            left: "46%",
            translate: "translate(-50%, -50%)",
            zIndex: 40
          }}>
            <Link href={"/"} scroll={true}>
              <Image
                src='/assets/images/logo.svg'
                alt='image'
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className='flex items-center gap-4'>
            <GlobalSearch />

            <div className='flex items-center'>
              {!!userInfo
                ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <div className='flex flex-row justify-start items-center cursor-pointer w-[130px]'>
                        <h2 className='text-sm text-white'>
                          Hello {" "}
                          <span className='font-bold'>
                            {slitName((userInfo as any)?.fullName)}
                          </span>
                        </h2>
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='bg-[#202020] border-0' side='bottom'>
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          className='cursor-pointer hover:bg-inherit focus:bg-transparent [&>span]:focus:underline [&>span]:focus:underline-offset-4'
                          onClick={() => router.push("/manage-orders")}
                        >
                          <Receipt className="mr-2 h-4 w-4" color='white' />
                          <span className='text-base font-normal text-white'>Manage orders</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='cursor-pointer hover:bg-inherit focus:bg-transparent [&>span]:focus:underline [&>span]:focus:underline-offset-4'
                          onClick={() => router.push("/customize-product")}
                        >
                          <Book className="mr-2 h-4 w-4" color='white' />
                          <span className='text-base font-normal text-white'>Customize product</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className='cursor-pointer hover:bg-inherit focus:bg-transparent [&>span]:focus:underline [&>span]:focus:underline-offset-4'
                          onClick={() => handleLogOut()}
                        >
                          <LogOut className="mr-2 h-4 w-4 hover:text-[#000]" color='white' />
                          <span className='text-base font-normal text-white'>Logout</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
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
              <Notification />
              <CartButton />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
