'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { getCartSelector, getLoadingSelector, getErrorSelector } from "@/redux/cart/selector";

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
import Spinner from "../spin";
import { TrashIcon } from '@/components/icons/TrashIcon';

// @action-cart
import { fetchUpdateQuantityCartRequest, fetchDeleteItemCartRequest, fetchCartRequest } from "@/redux/cart/actions";

// @utility
import { formatToCurrencyVND, calculatePercentPrice } from "@/utility/common";

// @constants
import { INCREMENT_BTN, NO_DATA_IMAGE } from "@/constants";
import { IProduct } from "@/redux/cart/types";

// @types
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
  // console.log("carts", carts);

  const handleUpdateItemInCart = (
    type: string,
    userId: string,
    product: IProduct
  ) => {
    const req = {
      userId: userId,
      productId: product._id,
      quantity: 1,
      total: product.regularPrice,
      subTotal: product.salePrice,
      type
    }
    if (type === INCREMENT_BTN) {
      // console.log("req-inc", req);
      dispatch(fetchUpdateQuantityCartRequest(req))
    } else {
      // console.log("req-dec", req);
      dispatch(fetchUpdateQuantityCartRequest(req))
    }
  }

  const removeItemFromCart = (product: {
    _id: string,
    total: number,
    subTotal: number,
    quantity: number,
    productId: string,
    product: IProduct,
  }) => {
    const req = {
      userId: carts.userId,
      productId: product.productId,
      total: product.total,
      subTotal: product.subTotal
    }
    dispatch(fetchDeleteItemCartRequest(req))
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
          <X className='h-6 w-6 max-[1024px]:h-5 max-[1024px]:w-5' />
        </SheetClose> */}
        <SheetHeader className='p-6 border-b border-b-[#DFE3E8] max-[1024px]:px-3'>
          <SheetTitle className='text-2xl font-bold text-[#333] max-[1024px]:text-left max-[1024px]:text-lg'>
            Giỏ hàng ({carts?.items?.length})
          </SheetTitle>
        </SheetHeader>

        <div className='flex-grow overflow-y-auto p-6 space-y-6 max-[1024px]:p-3 relative'>
          <Spinner spinning={loading} className="rounded-none">
            <div className="flex flex-col justify-start gap-6 max-[1024px]:gap-4">
              <div className="flex flex-col justify-start gap-6 max-[1024px]:gap-4">
                {carts?.items?.map((item, index) => (
                  <div className='flex gap-3 max-[1024px]:gap-1' key={index}>
                    <ProductImage
                      wrapperClassName='w-28 flex-shrink-0'
                      src={item.product.images.find((ele) => ele.uid === item.product.defaultImageId)?.url || NO_DATA_IMAGE}
                      alt={item.product.name}
                      sizes="(max-width: 768px) 100vw"
                    />

                    <div className='p-2 flex flex-col flex-1'>
                      <ProductTitle>{item.product.name}</ProductTitle>

                      <div className='mt-auto flex items-center justify-between max-[1024px]:flex-col max-[1024px]:items-start'>
                        <div className="flex flex-col flex-start">
                          {!!item.product.onSale ? (
                            <>
                              <ProductFinalPrice className='text-base leading-9'>
                                {formatToCurrencyVND(item.total)}
                              </ProductFinalPrice>

                              <div className='flex flex-row justify-start items-center gap-2'>
                                <ProductOldPrice className='text-base font-bold'>
                                  {formatToCurrencyVND(item.subTotal)}
                                </ProductOldPrice>
                                <div className='p-1 rounded-full flex flex-col justify-center items-center bg-backgroundColor-salePrice'>
                                  <h4 className='text-xs text-white font-bold'>{calculatePercentPrice(item.product.regularPrice, item.product.salePrice)}</h4>
                                </div>
                              </div>
                            </>
                          ) : (
                            <ProductFinalPrice className='text-lg leading-9'>
                              {formatToCurrencyVND(item.total)}
                            </ProductFinalPrice>
                          )}
                        </div>

                        <div className='flex items-center space-x-6'>
                          <ProductQuantity
                            quantity={item.quantity}
                            onChange={(type: string) => handleUpdateItemInCart(
                              type,
                              carts.userId,
                              item.product
                            )}
                          />

                          <Button
                            size='icon'
                            variant='ghost'
                            className='w-9 h-9 rounded-full bg-[#F5F5F5]'
                            onClick={() => removeItemFromCart(item)}
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
          </Spinner>
        </div>

        <SheetFooter className='mt-auto p-6 bg-[#F5F5F5] grid grid-cols-3 max-[1024px]:p-3 max-[1024px]:grid-cols-1'>
          <div className='flex-1 text-[#181818] max-[1024px]:w-full max-[1024px]:grid max-[1024px]:grid-cols-2'>
            <p className='text-base font-semibold'>Tạm tính</p>
            <p className='text-lg font-bold'>
              {formatToCurrencyVND(carts?.totalPrice)}
            </p>
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
                onClick={() => router.push("/checkout")}
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
