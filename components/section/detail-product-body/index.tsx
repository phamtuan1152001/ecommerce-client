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
import { ProductVariantSelector } from '@/components/product/product-variant-selector';
import { MoreChoiceProducts } from '@/components/section/more-choice-products';
import PinnedProduct from '@/components/section/pinned-product';
import { ProductInfoTabs } from '@/components/section/product-info-tabs';
import { ProductVerification } from '@/components/section/product-verification';
import { RelatedProducts } from '@/components/section/related-products';
import { Button } from '@/components/ui/button';
import { BsFacebook, BsInstagram, BsHeart } from 'react-icons/bs';
import { DiaglogPopup } from '@/components/pop-up/dialog-popup';

// @service
import {
  createAddItemToCart,
  updateQuantityInCart
} from '@/redux/cart/service';

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
import { formatToCurrencyVND, calculatePercentPrice, getUserToken } from '@/utility/common';

// @svg
import { IconBackArrow, IconFail, IconShare, IconSuccess } from '@/public/assets/svg';
import SlideInModal from '@/components/slide-in-modal';

// @constants
import { SUCCESS } from '@/constants';

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
  // console.log("carts", carts);

  const [countItem, setCountItem] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)

  // const handleAddToCart = () => {    
  //   if (!!getUserToken()) {
  //     const isExist = !!carts?.items?.find((item) => item?.productId === productId)
  //     if (isExist) {
  //       const productExistQuantity = carts?.items?.find(item => item?.productId === productId)?.quantity || 0
  //       const reqExist = {
  //         quantity: countItem + productExistQuantity,
  //         productId,
  //         accessToken: getUserToken()
  //       }
  //       dispatch(fetchUpdateQuantityCartRequest(reqExist))
  //     } else {
  //       const req = {
  //         quantity: countItem,
  //         productId,
  //         accessToken: getUserToken()
  //       }
  //       dispatch(fetchCreateCartRequest(req))
  //     }
  //   } else {
  //     DiaglogPopup({
  //       icon: <IconFail />,
  //       title: "THÊM ĐƠN HÀNG THẤT BẠI",
  //       description: "Vui lòng đăng nhập để tiếp tục",
  //       textButtonOk: "Đăng nhập",
  //       textButtonCancel: "",
  //       isBtnCancel: false,
  //       closeOnClickOverlay: false,
  //       className: "max-[768px]:w-[380px]",
  //       onSubmit: () => {
  //         SlideInModal.hide()
  //         setTimeout(() => {
  //           dispatch(openDiaglog())
  //         }, 500)
  //       },
  //       onCancle: () => { }
  //     })
  //   }
  // }

  // const fetchUpdateCart = async () => {
  //   try {
  //     setLoading(true)
  //     const productExistQuantity = carts?.items?.find(item => item?.productId === productId)?.quantity || 0
  //     const reqExist = {
  //       quantity: countItem + productExistQuantity,
  //       productId,
  //       accessToken: getUserToken()
  //     }
  //     const res = await updateQuantityInCart(reqExist)
  //     if (res?.statusCode === SUCCESS) {
  //       dispatch(fetchCartSuccess({
  //         cart: (res as any).data
  //       }))
  //       setTimeout(() => {
  //         router.push('/checkout')
  //       }, 500)
  //     }
  //   } catch (err) {
  //     console.log("FETCH FAIL!", err);
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const fetchCreateCart = async () => {
  //   try {
  //     setLoading(true)
  //     const req = {
  //       quantity: countItem,
  //       productId,
  //       accessToken: getUserToken()
  //     }
  //     const res = await createAddItemToCart(req)
  //     if (res?.statusCode === SUCCESS) {
  //       dispatch(fetchCartSuccess({
  //         cart: (res as any).data
  //       }))
  //       setTimeout(() => {
  //         router.push('/checkout')
  //       }, 500)
  //     }
  //   } catch (err) {
  //     console.log("FETCH FAIL!", err);
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  // const handleBuyNow = () => {
  //   if (!!getUserToken()) {
  //     const isExist = !!carts?.items?.find((item) => item?.productId === productId)
  //     if (isExist) {
  //       fetchUpdateCart()
  //     } else {
  //       fetchCreateCart()
  //     }
  //   } else {
  //     DiaglogPopup({
  //       icon: <IconFail />,
  //       title: "THÊM ĐƠN HÀNG THẤT BẠI",
  //       description: "Vui lòng đăng nhập để tiếp tục",
  //       textButtonOk: "Đăng nhập",
  //       textButtonCancel: "",
  //       isBtnCancel: false,
  //       closeOnClickOverlay: false,
  //       className: "max-[768px]:w-[380px]",
  //       onSubmit: () => {
  //         SlideInModal.hide()
  //         setTimeout(() => {
  //           dispatch(openDiaglog())
  //         }, 500)
  //       },
  //       onCancle: () => { }
  //     })
  //   }
  // }

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

      <div className='bg-white p-6 max-[768px]:px-3 max-[768px]:pt-3 max-[768px]:pb-6'>
        <div className='grid grid-cols-4 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-0'>
          <div className='col-span-3'>
            <div className='grid grid-cols-[348px_minmax(0,_1fr)] gap-6 max-[768px]:gap-3 max-[768px]:grid-cols-1'>
              <div className='space-y-4'>
                {images?.length > 0 && (
                  <ProductGallery listImages={images} />
                )}

                {/* <div className='flex items-center gap-3 max-[768px]:hidden'>
                  <p className='text-sm font-bold text-[#003966] leading-normal'>
                    Share:
                  </p>

                  <div className='w-12 h-12 rounded-full inline-flex items-center justify-center bg-[#F5F5F5]'>
                    <BsInstagram className='w-6 h-6 text-[#637381]' />
                  </div>

                  <div className='w-12 h-12 rounded-full inline-flex items-center justify-center bg-[#F5F5F5]'>
                    <BsFacebook className='w-6 h-6 text-[#637381]' />
                  </div>

                  <Button
                    className='text-[#181818] font-medium'
                    variant='ghost'
                  >
                    <BsHeart className='w-6 h-6 mr-2' />
                    333 lượt thích
                  </Button>
                </div> */}
              </div>

              <div className='space-y-4 max-[768px]:space-y-2'>
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

                <ProductVariantSelector
                  quantity={quantity}
                  valueCountProduct={countItem}
                  onChangeSize={(size: any) => {/* console.log("size", size) */ }}
                  onChangeColor={(color: any) => {/* console.log("color", color) */ }}
                  onChangeCountProduct={(count: number) => setCountItem(count)}
                />

                <div className='flex items-center gap-2'>
                  <p className='text-base text-[#003966] font-bold'>
                    Gọi đặt mua:
                  </p>
                  <p className='text-lg text-black'>0909 082 912</p>
                  <p className='text-base text-[#181818]'>
                    (8h30 -19h00)
                  </p>
                </div>

                <div className='space-y-3'>
                  <Button
                    variant='outline'
                    className='text-[#00508F] font-semibold text-base border-current h-12 w-full'
                  // onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ hàng
                  </Button>

                  <Button
                    className='font-semibold text-base h-12 w-full text-white'
                  // onClick={() => handleBuyNow()}
                  >
                    Mua ngay
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-6 max-[768px]:space-y-4'>
            <ProductVerification />
          </div>
        </div>
      </div>

      <div className='bg-white p-6 max-[768px]:p-3 border-t-8 border-[#F5F5F5]'>
        <div className='grid grid-cols-4 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-0'>
          <div className='col-span-3'>
            <ProductInfoTabs description={description} />
          </div>
        </div>
      </div>
    </>
  )
}