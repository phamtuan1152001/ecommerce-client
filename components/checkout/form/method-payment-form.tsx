import Image from 'next/image';

// @components
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';

// @icon
import { PiHandbagThin } from 'react-icons/pi';

// @constants
import {
  PAYMENT_MOMO_BANKING,
  PAYMENT_ATM_BANKING,
  PAYMENT_COD,
  PAYMENT_METAMASK
} from "@/constants";

interface MethodPaymentFormProps {
  onChangeMethodPayment: (v: string) => void
}

const MethodPaymentForm = ({
  onChangeMethodPayment
}: MethodPaymentFormProps) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className=' flex items-center gap-x-2'>
        <PiHandbagThin size={24} />
        <h3 className=' text-[20px] font-bold'>
          Payment methods
        </h3>
      </div>
      <RadioGroup>
        <div className='flex flex-col gap-y-4'>
          <div className='w-full flex items-center gap-x-4'>
            <RadioGroupItem
              value={PAYMENT_COD}
              id='r1'
              onClick={() => onChangeMethodPayment(PAYMENT_COD)}
            />
            <Label
              htmlFor='r1'
              className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
            >
              <div className=' aspect-square relative w-full max-w-[50px] '>
                <Image
                  alt='image'
                  src='/assets/images/checkout/payment.png'
                  fill
                  className='object-cover object-center rounded-[8px]'
                />
              </div>
              <div>
                <p className=' font-bold'>
                  Payment on delivery
                </p>
                <p className=' text-sm font-medium text-[#745B3E]'>
                  Customers will pay for all items upon receipt
                </p>
              </div>
            </Label>
          </div>
          {/* <div className='w-full flex items-center gap-x-4'>
            <RadioGroupItem
              value={PAYMENT_ATM_BANKING}
              id='r2'
              onClick={() => onChangeMethodPayment(PAYMENT_ATM_BANKING)}
            />
            <Label
              htmlFor='r2'
              className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
            >
              <div className=' aspect-square relative w-full max-w-[50px] '>
                <Image
                  alt='image'
                  src='/assets/images/checkout/chuyen-khoan-ngan-hang.png'
                  fill
                  className='object-cover object-center rounded-[8px]'
                />
              </div>
              <div>
                <p className=' font-bold'>Payment by bank transfer</p>
                <p className=' text-sm font-medium text-[#745B3E]'>
                  Via banking app
                </p>
              </div>
            </Label>
          </div> */}
          <div className='w-full flex items-center gap-x-4'>
            <RadioGroupItem
              value={PAYMENT_MOMO_BANKING}
              id='r3'
              onClick={() => onChangeMethodPayment(PAYMENT_MOMO_BANKING)}
            />
            <Label
              htmlFor='r3'
              className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
            >
              <div className=' aspect-square relative w-full max-w-[50px] '>
                <Image
                  alt='image'
                  src='/assets/images/checkout/momo.png'
                  fill
                  className='object-cover object-center rounded-[8px]'
                />
              </div>
              <div>
                <p className=' font-bold'>Payment by Momo</p>
                <p className=' text-sm font-medium text-[#745B3E]'>
                  Via Momo banking app
                </p>
              </div>
            </Label>
          </div>
          <div className='w-full flex items-center gap-x-4'>
            <RadioGroupItem
              value={PAYMENT_METAMASK}
              id='r4'
              onClick={() => onChangeMethodPayment(PAYMENT_METAMASK)}
            />
            <Label
              htmlFor='r4'
              className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
            >
              <div className=' aspect-square relative w-full max-w-[50px] '>
                <Image
                  alt='image'
                  src='/assets/images/checkout/metamask-icon.png'
                  fill
                  className='object-cover object-center rounded-[8px]'
                />
              </div>
              <div>
                <p className=' font-bold'>Payment by Metamask</p>
                <p className=' text-sm font-medium text-[#745B3E]'>
                  Via Metamask app
                </p>
              </div>
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  )
}

export default MethodPaymentForm