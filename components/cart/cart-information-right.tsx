import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { CartDiscount } from '@/components/cart/cart-discount';
import { CartInformationContent } from '@/components/cart/cart-information-content';
import { CartTerm } from '@/components/cart/cart-term';
import { CartOrderDetails } from '@/components/cart/cart-order-details';
import { DiaglogPopup } from "@/components/pop-up/dialog-popup";

// @selector-cart
import { getCartSelector } from '@/redux/cart/selector';

// @utility
import { formatToCurrencyVND } from '@/utility/common';
import SlideInModal from '../slide-in-modal';

export const CartInformationRight = () => {
  const router = useRouter()
  const carts = useSelector(getCartSelector);
  // console.log("carts", carts);

  const handleCancelCheckout = () => {
    DiaglogPopup({
      icon: null,
      title: "CANCEL PAYMENT?",
      description: "If you leave here, all your payment information will be canceled. Are you sure you want to leave?",
      textButtonOk: "Continue payment",
      textButtonCancel: "Leave here",
      isBtnCancel: true,
      closeOnClickOverlay: false,
      className: "max-[1024px]:w-[400px]",
      onSubmit: () => {
        SlideInModal.hide()
      },
      onCancle: () => {
        SlideInModal.hide()
        router.back()
      }
    })
  }

  return (
    <>
      <Box className='divide-y divide-[#DFE3E8] max-[1024px]:p-3 border-b-8 border-[#F5F5F5]'>
        <CartOrderDetails />

        {/* <CartDiscount /> */}

        <CartInformationContent />

        <CartTerm />
      </Box>

      <Box className='bg-[#181818] max-[1024px]:fixed max-[1024px]:bottom-0 max-[1024px]:left-0 max-[1024px]:z-10'>
        <div className='grid grid-cols-2 gap-2.5'>
          <div>
            <p className='text-base text-white font-semibold'>Total</p>
            <p className='text-lg font-bold text-[#FA9E14]'>
              {formatToCurrencyVND(carts.totalPrice)}
            </p>
          </div>

          <div className='space-y-2.5'>
            <Button
              variant='secondary'
              className=' w-full text-base font-semibold text-[#202020] rounded-lg bg-[#F5F5F5]'
              type='submit'
            >
              Complete your order
            </Button>
            <Button
              variant='secondary'
              className='w-full text-base font-semibold text-white rounded-lg bg-[#00508F]'
              onClick={() => handleCancelCheckout()}
              type='button'
            >
              Return to cart
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};
