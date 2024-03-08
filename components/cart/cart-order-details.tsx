import { useDispatch, useSelector } from 'react-redux';

import { X } from 'lucide-react';
import { Box } from '@/components/ui/box';
import { CartIcon } from '@/components/icons/CartIcon';
import {
  ProductQuantity,
  ProductImage,
  ProductFinalPrice,
  ProductTitle,
  ProductOldPrice,
} from '@/components/product/product';
import { Button } from '../ui/button';
import { TailSpin } from "react-loader-spinner"

// @action-cart
import {
  fetchCreateCartRequest,
  fetchUpdateQuantityCartRequest,
  fetchCartSuccess,
  fetchDeleteItemCartRequest
} from '@/redux/cart/actions';

// @selector-cart
import { getCartSelector, getLoadingSelector } from '@/redux/cart/selector';

// @utility
import { formatToCurrencyVND, getUserToken } from '@/utility/common';

// @constants
import { INCREMENT_BTN, DECREMTN_BTN, NO_DATA_IMAGE } from '@/constants';

// @tpyes
import { IProduct } from '@/redux/cart/types';

export const CartOrderDetails = () => {
  const dispatch = useDispatch()

  const carts = useSelector(getCartSelector);
  const loading = useSelector(getLoadingSelector);

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

  return (
    <Box className='p-0'>
      <div className='flex items-center space-x-2 mb-4'>
        <CartIcon className='w-6 h-6' />
        <h5 className='text-xl text-black font-bold capitalize'>
          Chi tiết đơn hàng
        </h5>
      </div>

      <div className='space-y-4 max-[768px]:mb-6 pb-3'>
        {loading
          ? (
            <div className="flex flex-col justify-center items-center h-full py-3">
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
          : carts?.items?.map((item, index) => (
            <div className='flex flex-row justify-start' key={index}>
              <ProductImage
                wrapperClassName='w-28 flex-shrink-0'
                src={item.product.images.find((ele) => ele.uid === item.product.defaultImageId)?.url || NO_DATA_IMAGE}
                alt={item.product.images.find((ele) => ele.uid === item.product.defaultImageId)?.uid || ""}
              />

              <div className='p-2 flex-1 flex'>
                <div className='flex flex-col w-full'>
                  <ProductTitle>{item.product.name}</ProductTitle>

                  <div className='mt-auto flex items-center justify-between'>
                    <ProductQuantity
                      quantity={item.quantity}
                      onChange={(type: string) => handleUpdateItemInCart(
                        type,
                        carts.userId,
                        item.product
                      )}
                    />
                    <div className='flex flex-col justify-start'>
                      {!!item.product.onSale ? (
                        <>
                          <ProductOldPrice>
                            {formatToCurrencyVND(item.product.regularPrice)}
                          </ProductOldPrice>
                          <ProductFinalPrice className='text-base'>
                            {formatToCurrencyVND(item.product.salePrice)}
                          </ProductFinalPrice>
                        </>
                      ) : (
                        <ProductFinalPrice className='text-base'>
                          {formatToCurrencyVND(item.product.regularPrice)}
                        </ProductFinalPrice>
                      )}
                    </div>
                    {/* <ProductFinalPrice className='text-base'>
                      {!!item.product.onSale
                        ? formatToCurrencyVND(item.product.salePrice)
                        : formatToCurrencyVND(item.product.regularPrice)}
                    </ProductFinalPrice> */}
                  </div>
                </div>

                <Button
                  size='icon'
                  variant='ghost'
                  className='shrink-0 w-6 h-6'
                  onClick={() => {
                    removeItemFromCart(item)
                  }}
                >
                  <X className='w-4 h-4' />
                </Button>
              </div>
            </div>
          ))}
      </div>
    </Box>
  );
};
