import { Box } from '@/components/ui/box';
import { useDispatch, useSelector } from 'react-redux';

// @selector-cart
import { getCartSelector } from '@/redux/cart/selector';

// @utility
import { formatToCurrencyVND } from '@/utility/common';

export const CartInformationContent = () => {
  const carts = useSelector(getCartSelector);

  return (
    <Box className='px-0 space-y-4'>
      <div className='flex items-center justify-between text-base text-black'>
        <span>Tạm tính</span>
        <span>{formatToCurrencyVND(carts.totalPrice)}</span>
      </div>

      {/* <div className='flex items-center justify-between text-base text-black'>
        <span>Giảm giá</span>
        <span>0 đ</span>
      </div> */}

      {/* <div className='flex items-center justify-between text-base text-black'>
        <span>Phí vận chuyển</span>
        <span className='text-[#003966]'>Vui lòng nhập địa chỉ</span>
      </div> */}

      <div className='flex items-center justify-between text-base text-black'>
        <span>Tổng đơn đặt hàng</span>
        <span className='text-lg font-bold'>
          {formatToCurrencyVND(carts.totalPrice)}
        </span>
      </div>
    </Box>
  );
};
