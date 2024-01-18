import { useDispatch, useSelector } from 'react-redux';

import { X } from 'lucide-react';
import { Box } from '@/components/ui/box';
import { CartIcon } from '@/components/icons/CartIcon';
import {
  ProductQuantity,
  ProductImage,
  ProductFinalPrice,
  ProductTitle,
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
import { INCREMENT_BTN, DECREMTN_BTN } from '@/constants';

export const CartOrderDetails = () => {
  const dispatch = useDispatch()

  const carts = useSelector(getCartSelector);
  const loading = useSelector(getLoadingSelector);

  // console.log("loading", loading);

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

      <div className='space-y-4 max-[768px]:mb-6'>
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
            <div className='flex' key={index}>
              <ProductImage
                wrapperClassName='w-28 flex-shrink-0'
                src={item.product.images[0].url}
                alt={item.product.images[0].name}
              />

              <div className='p-2 flex-1 flex'>
                <div className='flex flex-col'>
                  <ProductTitle>{item.product.name}</ProductTitle>

                  <div className='mt-auto flex items-center justify-between'>
                    <ProductQuantity
                      quantity={item.quantity}
                      onChange={(type: string) => handleUpdateItemInCart(
                        type,
                        item.quantity,
                        item.productId
                      )}
                    />

                    <ProductFinalPrice className='text-base'>
                      {!!item.product.onSale
                        ? formatToCurrencyVND(parseInt(item.product.salePrice))
                        : formatToCurrencyVND(parseInt(item.product.regularPrice))}
                    </ProductFinalPrice>
                  </div>
                </div>

                <Button
                  size='icon'
                  variant='ghost'
                  className='shrink-0 w-6 h-6'
                  onClick={() => {
                    removeItemFromCart(item.product.id)
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
