"use client"

import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link';
import Image from 'next/image';
import { BiUserCircle, BiShoppingBag } from 'react-icons/bi';

import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { CartButton } from '@/components/cart/cart-button';
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// @action-cart
import { resetCart, fetchCartRequest } from '@/redux/cart/actions';

// @utility
import { slitName, logOut, getUserInfo } from '@/utility/common';

// @selector-open-dialog
import { getIsOpenDialog } from '@/redux/openDiaglog/selector';
import { closeDialog, openDiaglog } from '@/redux/openDiaglog/action';

export const TopBar = () => {
  const dispatch = useDispatch()

  const userInfo = getUserInfo()
  const isOpen = useSelector(getIsOpenDialog);

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
    <div className='bg-[#202020]'>
      <Container>
        <div className='relative flex items-center justify-between h-[70px]'>
          <div className='px-4 py-2.5 text-white rounded-3xl bg-[#3F3F3F] inline-block'>
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
            <Link href={"/"}>
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
                    <DropdownMenuContent className='bg-transparent p-0 border-0'>
                      <Button
                        className='w-full bg-backgroundColor-cover hover:bg-white hover:border-1 hover:border-[#00508F] hover:text-textColor-deleteFilter'
                        onClick={() => handleLogOut()}
                      >
                        <span className='font-bold text-sm'>Logout</span>
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
        </div>
      </Container>
    </div>
  );
};
