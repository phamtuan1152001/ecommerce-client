'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getCartSelector, getLoadingSelector, getErrorSelector } from "@/redux/cart/selector";
import { X } from 'lucide-react';

// @components
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetOverlay
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/icons/CartIcon';
import {
  ProductQuantity,
  ProductImage,
  ProductFinalPrice,
  ProductTitle,
  ProductOldPrice
} from '@/components/product/product';
import { TrashIcon } from '@/components/icons/TrashIcon';
import Link from 'next/link';
import { TailSpin } from "react-loader-spinner"
import { Checkbox } from "@/components/ui/checkbox"
import { DiaglogPopup } from "../pop-up/dialog-popup";

// @action-cart
import { fetchUpdateQuantityCartRequest, fetchDeleteItemCartRequest, fetchCartRequest } from "@/redux/cart/actions";

// @utility
import { formatToCurrencyVND, calculatePercentPrice, getUserToken } from "@/utility/common";

// @constants
import { INCREMENT_BTN } from "@/constants";
import { IProduct } from "@/redux/cart/types";
import SlideInModal from "../slide-in-modal";
import { deleteItemInCart } from "@/redux/cart/service";

interface ICartItem {
  id: number,
  cartId: number,
  productId: number,
  product: IProduct
}

export const CartButton = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const carts = useSelector(getCartSelector);
  const loading = useSelector(getLoadingSelector);

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [listSelected, setListSelected] = useState<ICartItem[]>([])
  // console.log("listSelected", listSelected);

  const handleUpdateItemInCart = (
    type: string,
    quantity: number,
    productId: number
  ) => {
    if (type === INCREMENT_BTN) {
      const req = {
        quantity: quantity += 1,
        productId: productId,
        accessToken: getUserToken()
      }
      // console.log("req-inc", req);
      dispatch(fetchUpdateQuantityCartRequest(req))
    } else {
      const req = {
        quantity: quantity -= 1,
        productId: productId,
        accessToken: getUserToken()
      }
      // console.log("req-dec", req);
      dispatch(fetchUpdateQuantityCartRequest(req))
    }
  }

  const removeItemFromCart = (productId: number) => {
    const req = {
      productId,
      accessToken: getUserToken()
    }
    setListSelected([])
    dispatch(fetchDeleteItemCartRequest(req))
  }

  const handleCartSelected = async () => {
    if (listSelected.length > 0) {
      if (carts.items.length === listSelected.length) {
        handleClose()
        setListSelected([])
        router.push("/checkout")
      } else {
        const listCarts = carts.items
        const resultArray = listCarts.filter(itemA => !listSelected.includes(itemA));
        const promises = resultArray.map(async (item) => {
          try {
            const req = {
              productId: item.productId,
              accessToken: getUserToken()
            }
            await deleteItemInCart(req)
            return 'Success' 
          } catch (err) {
            console.log("Err", err)
            return 'Error';
          }
        })
        Promise.all(promises)
          .then((results) => {
            // console.log('All promises completed:', results);
            // Handle completion
            dispatch(fetchCartRequest({
              accessToken: getUserToken()
            }));
            handleClose()
            setListSelected([])
            router.push("/checkout")
          })
          .catch((error) => {
            console.log('Error in one of the promises:', error);
            // Handle error
          });
      }
    } else {
      DiaglogPopup({
        icon: null,
        title: "THANH TOÁN THẤT BẠI",
        description: "Vui lòng tick vào ô vuông ít nhất 1 sản phẩm",
        textButtonOk: "Đóng",
        textButtonCancel: "",
        isBtnCancel: false,
        closeOnClickOverlay: false,
        className: "max-[768px]:w-[380px]",
        onSubmit: () => {
          SlideInModal.hide()
        },
        onCancle: () => { }
      })
    }
  }

  const handleClose = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Sheet open={isOpen} onOpenChange={() => handleClose()}>
      <SheetTrigger asChild>
        <Button
          size='icon'
          variant='ghost'
          className='hover:bg-transparent relative'
        >
          <CartIcon className='w-6 h-6 text-white' />

          <span className='inline-flex items-center justify-center bg-[#F4B324] text-[#181818] text-sm font-semibold h-5 min-w-[20px] rounded-[10px] absolute right-0 -translate-y-1/2'>
            {carts?.items?.length ?? 0}
          </span>
        </Button>
      </SheetTrigger>

      {/* <SheetOverlay /> */}
      <SheetContent className='sm:max-w-xl p-0 flex flex-col gap-0 w-full'>
        {/* <SheetClose>
          <X className='h-6 w-6 max-[768px]:h-5 max-[768px]:w-5' />
        </SheetClose> */}
        <SheetHeader className='p-6 border-b border-b-[#DFE3E8] max-[768px]:px-3'>
          <SheetTitle className='text-2xl font-bold text-[#333] max-[768px]:text-left max-[768px]:text-lg'>
            Giỏ hàng ({carts?.items?.length})
          </SheetTitle>
        </SheetHeader>

        <div className='flex-grow overflow-y-auto p-6 space-y-6 max-[768px]:p-3'>
          {loading
            ? (
              <div className="flex flex-col justify-center items-center h-full">
                <TailSpin
                  height="40"
                  width="40"
                  color="#676767"
                  radius="1"
                  visible={true}
                  ariaLabel="tail-spin-loading"
                />
              </div>
            )
            : (
              <div className="flex flex-col justify-start gap-6 max-[768px]:gap-4">
                <div className="flex flex-row justify-start items-center gap-3 max-[768px]:gap-1">
                  <Checkbox
                    id="all"
                    checked={listSelected?.length === carts?.items?.length && listSelected?.length > 0 ? true : false}
                    onCheckedChange={(isCheckedAll) => {
                      if (isCheckedAll) {
                        setListSelected(carts?.items)
                      } else {
                        setListSelected([])
                      }
                    }}
                  />
                  <div className="flex flex-col justify-center items-center">
                    <label
                      htmlFor="all"
                      className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Tất cả sản phẩm
                    </label>
                  </div>
                </div>
                <div className="flex flex-col justify-start gap-6 max-[768px]:gap-4">
                  {carts?.items?.map((item, index) => (
                    <div className='flex gap-3 max-[768px]:gap-1' key={index}>
                      <div className="flex flex-col justify-start">
                        <Checkbox
                          id={`${item.id}`}
                          checked={!!listSelected.find(ele => (ele as any).id === item.id)}
                          onCheckedChange={() => {
                            if (listSelected.find(ele => (ele as any).id === item.id)?.id === item.id) {
                              const filter = listSelected.filter(v => v.id !== item.id)
                              setListSelected(filter)
                            } else {
                              setListSelected((prev) =>
                                [...prev, item])
                            }
                          }}
                        />
                      </div>

                      <ProductImage
                        wrapperClassName='w-28 flex-shrink-0'
                        src={item.product.images[0].url}
                        alt={item.product.images[0].name}
                      />

                      <div className='p-2 flex flex-col flex-1'>
                        <ProductTitle>{item.product.name}</ProductTitle>

                        <div className='mt-auto flex items-center justify-between max-[768px]:flex-col max-[768px]:items-start'>
                          <div className="flex flex-col flex-start">
                            {!!item.product.onSale ? (
                              <>
                                <ProductFinalPrice className='text-base leading-9'>
                                  {formatToCurrencyVND(parseInt(item.product.salePrice))}
                                </ProductFinalPrice>

                                <div className='flex flex-row justify-start items-center gap-2'>
                                  <ProductOldPrice className='text-base font-bold'>
                                    {formatToCurrencyVND(parseInt(item.product.regularPrice))}
                                  </ProductOldPrice>
                                  <div className='p-1 rounded-full flex flex-col justify-center items-center bg-backgroundColor-salePrice'>
                                    <h4 className='text-xs text-white font-bold'>{calculatePercentPrice(parseInt(item.product.regularPrice), parseInt(item.product.salePrice))}</h4>
                                  </div>
                                </div>
                              </>
                            ) : (
                              <ProductFinalPrice className='text-lg leading-9'>
                                {formatToCurrencyVND(parseInt(item.product.regularPrice))}
                              </ProductFinalPrice>
                            )}
                          </div>

                          <div className='flex items-center space-x-6'>
                            <ProductQuantity
                              quantity={item.quantity}
                              onChange={(type: string) => handleUpdateItemInCart(
                                type,
                                item.quantity,
                                item.productId
                              )}
                            />

                            <Button
                              size='icon'
                              variant='ghost'
                              className='w-9 h-9 rounded-full bg-[#F5F5F5]'
                              onClick={() => removeItemFromCart(item.productId)}
                            >
                              <TrashIcon className='w-5 h-5 text-[#333]' />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>

        <SheetFooter className='mt-auto p-6 bg-[#F5F5F5] grid grid-cols-3 max-[768px]:p-3 max-[768px]:grid-cols-1'>
          <div className='flex-1 text-[#181818] max-[768px]:w-full max-[768px]:grid max-[768px]:grid-cols-2'>
            <p className='text-base font-semibold'>Tạm tính</p>
            <p className='text-lg font-bold'>{formatToCurrencyVND(carts?.total)}</p>
          </div>

          <div className="col-span-2">
            <div className="flex flex-row justify-between items-center w-full gap-3">
              <Button
                className='text-base font-semibold h-12 w-full'
                onClick={() => handleClose()}
              >
                Tiếp tục mua sắm
              </Button>
              <Button
                className='text-base font-semibold bg-[#00508F] h-12 w-full'
                onClick={() => handleCartSelected()}
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
