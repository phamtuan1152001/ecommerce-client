// @components
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';

// @icon
import { PiHandbagThin } from 'react-icons/pi';

const MethodTransportForm = () => {
  return (
    <div className=' flex flex-col gap-y-4'>
      <div className=' flex items-center gap-x-2'>
        <PiHandbagThin size={24} />
        <h3 className=' text-[20px] font-bold'>
          Phương Thức Vận Chuyển
        </h3>
      </div>
      <RadioGroup defaultValue='comfortable'>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem value='default' id='r1' />
          <Label
            htmlFor='r1'
            className=' text-base font-normal text-[#202020]'
          >
            Giao hàng tiêu chuẩn (2-3 ngày)
          </Label>
        </div>
      </RadioGroup>
      <div>
        <p className=' text-sm text-[#745B3E]'>
          Miễn phí vận chuyển đối với đơn hàng từ 500.000đ giao tại
          nội thành Hà Nội, TP Hồ Chí Minh. Các địa chỉ khác: 30.000đ
        </p>
      </div>
    </div>
  )
}

export default MethodTransportForm