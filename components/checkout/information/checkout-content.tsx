// @components 
import { Box } from "@/components/ui/box"

// @types
import { CustomizedProductType } from "@/types"

// @common
import { formatToCurrencyVND } from "@/utility/common"

interface CheckoutContentProps {
  data: CustomizedProductType
}

const CheckoutContent = ({ data }: CheckoutContentProps) => {
  return (
    <Box className='px-0 space-y-4'>
      <div className='flex items-center justify-between text-base text-black'>
        <span>Provisional price:</span>
        <span>{formatToCurrencyVND(data.totalPrice)}</span>
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
        <span>Total order:</span>
        <span className='text-lg font-bold'>
          {formatToCurrencyVND(data.totalPrice)}
        </span>
      </div>
    </Box>
  )
}

export default CheckoutContent