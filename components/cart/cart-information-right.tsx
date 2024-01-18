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

  const handleCancelCheckout = () => {
    DiaglogPopup({
      icon: null,
      title: "HỦY THANH TOÁN?",
      description: "Nếu bạn rời khỏi đây, mọi thông tin thanh toán của bạn sẽ bị huỷ. Bạn chắc chắn muốn rời khỏi?",
      textButtonOk: "Tiếp tục thanh toán",
      textButtonCancel: "Rời khỏi đây",
      isBtnCancel: true,
      closeOnClickOverlay: false,
      className: "max-[768px]:w-[400px]",
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
      <Box className='divide-y divide-[#DFE3E8] max-[768px]:p-3 border-b-8 border-[#F5F5F5]'>
        <CartOrderDetails />

        <CartDiscount />

        <CartInformationContent />

        <CartTerm />
      </Box>

      <Box className='bg-[#181818] max-[768px]:fixed max-[768px]:bottom-0 max-[768px]:left-0 max-[768px]:z-10'>
        <div className='grid grid-cols-2 gap-2.5'>
          <div>
            <p className='text-base text-white font-semibold'>Tổng cộng</p>
            <p className='text-lg font-bold text-[#FA9E14]'>{formatToCurrencyVND(carts.total)}</p>
          </div>

          <div className='space-y-2.5'>
            <Button
              variant='secondary'
              className=' w-full text-base font-semibold text-[#202020] rounded-lg bg-[#F5F5F5]'
              type='submit'
            >
              Hoàn tất đơn hàng
            </Button>
            <Button
              variant='secondary'
              className='w-full text-base font-semibold text-white rounded-lg bg-[#00508F]'
              onClick={() => handleCancelCheckout()}
              type='button'
            >
              Quay lại giỏ hàng
            </Button>
          </div>
        </div>
      </Box>
    </>
  );
};
