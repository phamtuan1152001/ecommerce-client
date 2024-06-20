"use client"
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  ProductFinalPrice,
  ProductOldPrice,
  ProductTitle,
} from '@/components/product/product';
import { ProductGallery } from '@/components/product/product-gallery';
import { ProductInfoTabs } from '@/components/section/product-info-tabs';
import { ProductVerification } from '@/components/section/product-verification';
import { Button } from '@/components/ui/button';
import { DiaglogPopup } from '@/components/pop-up/dialog-popup';

// @action-cart
import {
  fetchCreateCartRequest,
  fetchUpdateQuantityCartRequest,
  fetchCartSuccess,
  fetchCartRequest
} from '@/redux/cart/actions';

// @selector-cart
import { getCartSelector } from '@/redux/cart/selector';

// @action-open-dialog
import { openDiaglog } from '@/redux/openDiaglog/action';

// @utility
import { formatToCurrencyVND, calculatePercentPrice, getUserToken, getUserInfo } from '@/utility/common';

// @svg
import { IconBackArrow, IconFail, IconShare, IconSuccess } from '@/public/assets/svg';
import SlideInModal from '@/components/slide-in-modal';
import { BsFacebook, BsInstagram, BsHeart } from 'react-icons/bs';

// @constants
import { ACTION_USER, SUCCESS } from '@/constants';

// @types
import { UserInfoType } from '@/types';
import { createRankingProducts } from '@/lib/api/product';

interface DetailProductBodyProps {
  name: string,
  regularPrice: number,
  salePrice: number,
  images: {
    uid: string,
    url: string,
  }[],
  description: string,
  quantity: number,
  productId: string,
  onSale: boolean
}

export default function DetailProductBody({
  name,
  regularPrice,
  salePrice,
  images,
  quantity,
  productId,
  onSale,
  description
}: DetailProductBodyProps) {
  const dispatch = useDispatch()
  const router = useRouter()

  const carts = useSelector(getCartSelector);
  const userInfo: UserInfoType | string = getUserInfo()
  // console.log("carts", carts);

  // const [countItem, setCountItem] = useState<number>(1)
  // const [loading, setLoading] = useState<boolean>(false)

  const handleAddToCart = () => {
    if (!!getUserToken()) {
      const req = {
        userId: userInfo.id,
        productId: productId,
        quantity: 1,
        total: regularPrice,
        subTotal: salePrice
      }
      dispatch(fetchCreateCartRequest(req))
    } else {
      DiaglogPopup({
        icon: <IconFail />,
        title: "FAIL TO ADD PRODUCT IN CART",
        description: "Please log in to continue",
        textButtonOk: "Sign In",
        textButtonCancel: "",
        isBtnCancel: false,
        closeOnClickOverlay: false,
        className: "max-[1024px]:w-[380px]",
        onSubmit: () => {
          SlideInModal.hide()
          setTimeout(() => {
            dispatch(openDiaglog())
          }, 500)
        },
        onCancle: () => { }
      })
    }
  }

  const handleBuyNow = () => {
    if (!!getUserToken()) {
      const req = {
        userId: userInfo.id,
        productId: productId,
        quantity: 1,
        total: regularPrice,
        subTotal: salePrice
      }
      dispatch(fetchCreateCartRequest(req))
      setTimeout(() => {
        router.push('/checkout')
      }, 500)
    } else {
      DiaglogPopup({
        icon: <IconFail />,
        title: "FAIL TO ADD PRODUCT IN CART",
        description: "Please log in to continue",
        textButtonOk: "Sign In",
        textButtonCancel: "",
        isBtnCancel: false,
        closeOnClickOverlay: false,
        className: "max-[1024px]:w-[380px]",
        onSubmit: () => {
          SlideInModal.hide()
          setTimeout(() => {
            dispatch(openDiaglog())
          }, 500)
        },
        onCancle: () => { }
      })
    }
  }

  const handleDetecActionUser = async (id: string) => {
    try {
      const req: {
        productId: string,
        product: string,
        actionBuy: number,
        countBuy: number,
        actionReview: number,
        countReview: number,
        // "actionRate": 0,
        // "countRate": 0,
        actionIntroduce: number,
        countIntroduce: number,
        actionSave: number,
        countSave: number,
        type: number
      } = {
        productId: id,
        product: id,
        actionBuy: 0,
        countBuy: 0,
        actionReview: 1,
        countReview: 0,
        // "actionRate": 0,
        // "countRate": 0,
        actionIntroduce: 2,
        countIntroduce: 0,
        actionSave: 3,
        countSave: 0,
        type: ACTION_USER.SAVE // Chi can thay doi field theo type
      }
      return await createRankingProducts(req)
    } catch (err) {
      console.log("FETCHING FAIL!")
    }
  }

  return (
    <>
      {/* Header Back Icon for mobile */}
      <div className='flex flex-row justify-between items-center min-[1280px]:hidden bg-white px-3 pt-2'>
        <button className='flex flex-col justify-center items-center bg-backgroundColor-buttonCommon w-10 h-10 rounded-full' onClick={() => router.back()}>
          <IconBackArrow />
        </button>
        <button className='flex flex-col justify-center items-center bg-backgroundColor-buttonCommon w-10 h-10 rounded-full'>
          <IconShare />
        </button>
      </div>
      {/* End */}

      <div className='bg-white p-6 max-[1024px]:px-3 max-[1024px]:pt-3 max-[1024px]:pb-6'>
        <div className='grid grid-cols-4 gap-6 max-[1024px]:grid-cols-1 max-[1024px]:gap-0'>
          <div className='col-span-3'>
            <div className='grid grid-cols-[348px_minmax(0,_1fr)] gap-6 max-[1024px]:gap-3 max-[1024px]:grid-cols-1'>
              <div className='space-y-4'>
                {images?.length > 0 && (
                  <ProductGallery listImages={images} />
                )}

                <div className='flex items-center gap-3 max-[1024px]:hidden'>
                  {/* <p className='text-sm font-bold text-[#003966] leading-normal'>
                    Share:
                  </p>

                  <div className='w-12 h-12 rounded-full inline-flex items-center justify-center bg-[#F5F5F5]'>
                    <BsInstagram className='w-6 h-6 text-[#637381]' />
                  </div>

                  <div className='w-12 h-12 rounded-full inline-flex items-center justify-center bg-[#F5F5F5]'>
                    <BsFacebook className='w-6 h-6 text-[#637381]' />
                  </div> */}

                  <Button
                    className='text-[#181818] font-medium'
                    variant='ghost'
                    onClick={() => {
                      // handle save product to favourite products
                      handleDetecActionUser(productId)
                    }}
                  >
                    <BsHeart className='w-6 h-6 mr-2' />
                    Like
                  </Button>
                </div>
              </div>

              <div className='space-y-4 max-[1024px]:space-y-2'>
                <ProductTitle className='text-xl text-[#181818]'>
                  {name}
                </ProductTitle>

                <div>
                  {!!onSale ? (
                    <>
                      <ProductFinalPrice className='text-[28px] leading-9'>
                        {formatToCurrencyVND(salePrice)}
                      </ProductFinalPrice>

                      <div className='flex flex-row justify-start items-center gap-2'>
                        <ProductOldPrice className='text-lg font-bold'>
                          {formatToCurrencyVND(regularPrice)}
                        </ProductOldPrice>
                        <div className='p-1 rounded-full flex flex-col justify-center items-center bg-backgroundColor-salePrice'>
                          <h4 className='text-xs text-white font-bold'>{calculatePercentPrice(regularPrice, salePrice)}</h4>
                        </div>
                      </div>
                    </>
                  ) : (
                    <ProductFinalPrice className='text-[28px] leading-9'>
                      {formatToCurrencyVND(regularPrice)}
                    </ProductFinalPrice>
                  )}
                </div>

                {/* <ProductVariantSelector
                  quantity={quantity}
                  valueCountProduct={countItem}
                  onChangeSize={(size: any) => { }}
                  onChangeColor={(color: any) => {}}
                  onChangeCountProduct={(count: number) => setCountItem(count)}
                /> */}

                <div className='flex items-center gap-2'>
                  <p className='text-base text-[#003966] font-bold'>
                    Call to order:
                  </p>
                  <p className='text-lg text-black'>089 887 1665</p>
                  <p className='text-base text-[#181818]'>
                    (8h30 -22h00)
                  </p>
                </div>

                <div className='space-y-3'>
                  <Button
                    variant='outline'
                    className='text-[#00508F] font-semibold text-base border-current h-12 w-full'
                    onClick={() => handleAddToCart()}
                  >
                    Add to cart
                  </Button>

                  <Button
                    className='font-semibold text-base h-12 w-full text-white'
                    onClick={() => handleBuyNow()}
                  >
                    Buy now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-6 max-[1024px]:space-y-4'>
            <ProductVerification />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 max-[1024px]:p-3 border-t-8 border-[#F5F5F5]'>
        <div className='grid grid-cols-4 gap-6 max-[1024px]:grid-cols-1 max-[1024px]:gap-0'>
          <div className='col-span-3'>
            <ProductInfoTabs description={description} />
          </div>
        </div>
      </div>
    </>
  )
}