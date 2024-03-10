import Image from 'next/image';
import Link from 'next/link';

// @ultility
import { formatToCurrencyVND, calculatePercentPrice } from '@/utility/common';

// @components
import { ProductFinalPrice, ProductOldPrice } from './product';

// @type
import { ProductType } from '@/types';

// @constants
import { NO_DATA_IMAGE } from '@/constants';

interface ProductCardProps {
  product: ProductType
  slugName?: string
}

export const ProductCard = ({ product, slugName }: ProductCardProps) => {
  return (
    <div key={product._id} className='relative mx-2 bg-white rounded-[4px]'>
      <Link href={`/${product.categories.slug}/` + product.slug} >
        <div className='aspect-square relative'>
          <Image
            src={product.images.find((item) => item.uid === product.defaultImageId)?.url || NO_DATA_IMAGE}
            alt={product.slug}
            fill
            className='object-cover rounded-[4px]'
            sizes="(max-width: 768px)"
            priority
          />
        </div>

        <div className='p-2 space-y-2 text-center'>
          <h3 className='text-base text-[#333] font-bold line-clamp-2'>
            {product.name}
          </h3>

          <div>
            {!!product.onSale
              ? (
                <>
                  <ProductOldPrice>
                    {formatToCurrencyVND(product.regularPrice)}
                  </ProductOldPrice>
                  <ProductFinalPrice>
                    {formatToCurrencyVND(product.salePrice)}
                  </ProductFinalPrice>
                </>
              )
              : (
                <ProductFinalPrice>
                  {formatToCurrencyVND(product.regularPrice)}
                </ProductFinalPrice>
              )}
          </div>
        </div>

        {!!product.onSale && (
          <span className='absolute top-2 left-2 text-xs leading-normal text-white px-2 py-1 bg-[#1A3C7F] inline-block rounded-2xl'>
            {calculatePercentPrice(product.regularPrice, product.salePrice)}
          </span>
        )}
      </Link>
    </div>
  );
};
