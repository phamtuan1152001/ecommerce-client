import { Box } from "@/components/ui/box"

// @icon
import { CartIcon } from "@/components/icons/CartIcon"

// @components
import {
  ProductImage,
  ProductFinalPrice,
  ProductTitle,
} from '@/components/product/product';
import Spinner from "@/components/spin"

// @types
import { CustomizedProductType } from "@/types"

// @constants
import { NO_DATA_IMAGE } from "@/constants";

// @common
import { formatToCurrencyVND } from "@/utility/common";

interface CheckoutDetailProps {
  data: CustomizedProductType,
  spinning: boolean
}

const CheckoutDetail = ({ data, spinning }: CheckoutDetailProps) => {
  // console.log("data", data);

  return (
    <Box className="p-0">
      <div className='flex items-center space-x-2 mb-4'>
        <CartIcon className='w-6 h-6' />
        <h5 className='text-xl text-black font-bold capitalize'>
          Order details
        </h5>
      </div>

      <div className="className='space-y-4 max-[1024px]:mb-6 relative py-3'">
        <Spinner spinning={spinning} className='rounded-none'>
          <div className='flex flex-row justify-start'>
            <ProductImage
              wrapperClassName='w-28 flex-shrink-0'
              src={data.imageUrl || NO_DATA_IMAGE}
              alt={data.name || ""}
            />

            <div className='p-2 flex-1 flex'>
              <div className='flex flex-col w-full gap-2'>
                <ProductTitle>{data.name}</ProductTitle>

                <div className='flex flex-col justify-start gap-2'>
                  <h3>Quantity: <span>{data.quantity}</span></h3>
                  <div className='flex flex-col justify-start'>
                    <ProductFinalPrice className='text-base'>
                      {formatToCurrencyVND(data.regularPrice)}
                    </ProductFinalPrice>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Spinner>
      </div>
    </Box>
  )
}

export default CheckoutDetail