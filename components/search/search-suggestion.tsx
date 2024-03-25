import { Box } from '@/components/ui/box';
import {
  ProductImage,
  ProductTitle,
  ProductOldPrice,
  ProductFinalPrice,
} from '../product/product';
import Spinner from '../spin';

// @utilites
import { formatToCurrencyVND } from '@/utility/common';

// @types
import { ProductType } from '@/types';

// @constants
import { NO_DATA_IMAGE } from '@/constants';

interface SearchSuggestionProps {
  loading: boolean,
  datas: ProductType[]
}

export const SearchSuggestion = ({ loading, datas }: SearchSuggestionProps) => {
  return (
    <Box className='py-4 space-y-4'>
      <h5 className='text-base font-bold text-[#181818] uppercase'>
        GỢI Ý CHO BẠN {`${datas.length} sản phẩm`}
      </h5>

      <Spinner spinning={loading}>
        <div className='grid grid-cols-2 gap-4 max-h-64 overflow-y-auto'>
          {datas.map((item, index) => (
            <div className='flex' key={index}>
              <ProductImage
                wrapperClassName='w-28 flex-shrink-0'
                src={item.images.find((ele) => ele.uid === item.defaultImageId)?.url || NO_DATA_IMAGE}
                alt={item.slug || ""}
              />

              <div className='p-2 flex-1 flex flex-col'>
                <ProductTitle className='text-sm'>{item.name}</ProductTitle>

                <div className='mt-4'>
                  {!!item.onSale
                    ? (
                      <>
                        <ProductOldPrice className='text-xs'>
                          {formatToCurrencyVND(item.regularPrice)}
                        </ProductOldPrice>
                        <ProductFinalPrice className='text-sm'>
                          {formatToCurrencyVND(item.salePrice)}
                        </ProductFinalPrice>
                      </>
                    )
                    : (
                      <ProductFinalPrice className='text-sm'>
                        {formatToCurrencyVND(item.regularPrice)}
                      </ProductFinalPrice>
                    )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Spinner>
    </Box>
  );
};
