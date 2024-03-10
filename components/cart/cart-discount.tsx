import { Box } from '@/components/ui/box';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CartIcon } from '@/components/icons/CartIcon';
import { DiscountCodeModal } from '@/components/discount-code/discount-code-modal';

export const CartDiscount = () => {
  const handleSelecteCoupon = () => {
    console.log("Select coupon");
  }
  return (
    <Box className='px-0 space-y-6'>
      <div className='flex items-center space-x-2'>
        <CartIcon className='w-6 h-6' />
        <h5 className='text-xl text-black font-bold capitalize'>
          Áp dụng mã giảm giá
        </h5>
      </div>

      <div className='flex bg-[#F5F5F5] rounded-[99px] overflow-hidden '>
        <Input
          placeholder='Nhập mã ưu đãi'
          className='bg-transparent border-none'
        />
        <Button type='button' className='text-sm font-semibold rounded-[99px] bg-[#00508F]' onClick={() => handleSelecteCoupon()}>
          Áp dụng
        </Button>
      </div>

      <DiscountCodeModal triggerText='Read more mã giảm giá' />
    </Box>
  );
};
