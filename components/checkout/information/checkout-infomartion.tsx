"use client"

import { useRouter } from "next/navigation"

// @components
import { Box } from "@/components/ui/box"
import CheckoutDetail from "@/components/checkout/information/checkout-detail"
import CheckoutContent from "@/components/checkout/information/checkout-content"

// @types
import { CustomizedProductType } from "@/types"
import { DiaglogPopup } from "@/components/pop-up/dialog-popup"
import { Button } from "@/components/ui/button"
import CheckoutTerm from "@/components/checkout/information/checkout-term"
import SlideInModal from "@/components/slide-in-modal"

// @common
import { formatToCurrencyVND } from "@/utility/common"

interface CheckoutInformationProps {
  detailCustomizedProduct: CustomizedProductType,
  loading: boolean
}

const CheckoutInformation = ({ detailCustomizedProduct, loading }: CheckoutInformationProps) => {
  const router = useRouter()

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
        router.push("/")
      }
    })
  }

  return (
    <>
      <Box className="divide-y divide-[#DFE3E8] max-[1024px]:p-3 border-b-8 border-[#F5F5F5]">
        <CheckoutDetail
          data={detailCustomizedProduct}
          spinning={loading}
        />

        <CheckoutContent
          data={detailCustomizedProduct}
        />

        <CheckoutTerm />
      </Box>

      <Box className='bg-[#181818] max-[1024px]:fixed max-[1024px]:bottom-0 max-[1024px]:left-0 max-[1024px]:z-10'>
        <div className='grid grid-cols-2 gap-2.5'>
          <div>
            <p className='text-base text-white font-semibold'>Total</p>
            <p className='text-lg font-bold text-[#FA9E14]'>
              {formatToCurrencyVND(detailCustomizedProduct.totalPrice)}
            </p>
          </div>

          <div className='space-y-2.5'>
            <Button
              variant='secondary'
              className=' w-full text-base font-semibold text-[#202020] rounded-lg bg-[#F5F5F5] capitalize'
              type='submit'
            >
              Complete your order
            </Button>
            <Button
              variant='secondary'
              className='w-full text-base font-semibold text-white rounded-lg bg-[#00508F] capitalize'
              onClick={() => handleCancelCheckout()}
              type='button'
            >
              Return to home
            </Button>
          </div>
        </div>
      </Box>
    </>
  )
}

export default CheckoutInformation