import { Box } from '@/components/ui/box';
import {
  ProductImage,
  ProductTitle,
  ProductOldPrice,
  ProductFinalPrice,
} from '../product/product';
import { formatToCurrencyVND } from '@/utility/common';
import { TailSpin } from "react-loader-spinner"

interface SearchSuggestionProps {
  loading: boolean,
  datas: {
    name: string,
    onSale: boolean,
    regularPrice: string,
    salePrice: string,
    images: {
      url: string
    }[]
  }[]
}

export const SearchSuggestion = ({ loading, datas }: SearchSuggestionProps) => {
  return (
    <Box className='py-4 space-y-4'>
      <h5 className='text-base font-bold text-[#181818] uppercase'>
        GỢI Ý CHO BẠN {`${datas.length} sản phẩm`}
      </h5>

      {loading
        ? (
          <div className='flex flex-row justify-center items-center'>
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
        : (
          <div className='grid grid-cols-2 gap-4 max-h-64 overflow-y-auto'>
            {datas.map((item, index) => (
              <div className='flex' key={index}>
                <ProductImage
                  wrapperClassName='w-28 flex-shrink-0'
                  src={item.images[0].url}
                  alt={item.name}
                />

                <div className='p-2 flex-1 flex flex-col'>
                  <ProductTitle className='text-sm'>{item.name}</ProductTitle>

                  <div className='mt-4'>
                    {!!item.onSale
                      ? (
                        <>
                          <ProductOldPrice className='text-xs'>
                            {formatToCurrencyVND(parseInt(item.regularPrice))}
                          </ProductOldPrice>
                          <ProductFinalPrice className='text-sm'>
                            {formatToCurrencyVND(parseInt(item.salePrice))}
                          </ProductFinalPrice>
                        </>
                      )
                      : (
                        <ProductFinalPrice className='text-sm'>
                          {formatToCurrencyVND(parseInt(item.regularPrice))}
                        </ProductFinalPrice>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
    </Box>
  );
};
