import Image from 'next/image';
import Link from 'next/link';

// @ultility
import { formatToCurrencyVND, calculatePercentPrice } from '@/utility/common';

// @components
import { ProductFinalPrice, ProductOldPrice } from './product';

// @type
import { ProductType } from '@/types';

// @constants
import { ACTION_USER, NO_DATA_IMAGE } from '@/constants';
import { createRankingProducts } from '@/lib/api/product';

// @icons
import { BsEye } from 'react-icons/bs';

interface ProductCardProps {
  product: ProductType
  slugName?: string,
  type?: number,
  countBuy?: number,
  countSave?: number,
  countReview?: number,
}

export const ProductCard = ({ product, slugName, type, countBuy, countReview, countSave }: ProductCardProps) => {

  const handleDetecActionUser = async (id: string) => {
    try {
      const req: {
        productId: string,
        product: string,
        actionBuy: number,
        countBuy: number,
        actionReview: number,
        countReview: number,
        // "actionRate": 0,
        // "countRate": 0,
        actionIntroduce: number,
        countIntroduce: number,
        actionSave: number,
        countSave: number,
        type: number
      } = {
        productId: id,
        product: id,
        actionBuy: 0,
        countBuy: 0,
        actionReview: 1,
        countReview: 0,
        // "actionRate": 0,
        // "countRate": 0,
        actionIntroduce: 2,
        countIntroduce: 0,
        actionSave: 3,
        countSave: 0,
        type: ACTION_USER.REVIEW // Chi can thay doi field theo type
      }
      return await createRankingProducts(req)
    } catch (err) {
      console.log("FETCHING FAIL!")
    }
  }

  return (
    <div key={product._id} className='relative mx-2 bg-white rounded-[4px]' onClick={() => handleDetecActionUser(product._id)}>
      <Link href={`/${product.categories.slug}/` + product.slug} scroll={true}>
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

        {type === ACTION_USER.BUY && (
          <span className='absolute top-2 right-2 text-xs leading-normal text-white px-2 py-1 bg-[#1A3C7F] inline-block rounded-2xl w-[45px]'>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row justify-center items-center'><BsEye /></div>
              <div>{countBuy}</div>
            </div>
          </span>
        )}

        {type === ACTION_USER.REVIEW && (
          <span className='absolute top-2 right-2 text-xs leading-normal text-white px-2 py-1 bg-[#1A3C7F] inline-block rounded-2xl w-[45px]'>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row justify-center items-center'><BsEye /></div>
              <div>{countReview}</div>
            </div>
          </span>
        )}

        {type === ACTION_USER.SAVE && (
          <span className='absolute top-2 right-2 text-xs leading-normal text-white px-2 py-1 bg-[#1A3C7F] inline-block rounded-2xl w-[45px]'>
            <div className='flex flex-row justify-between items-center'>
              <div className='flex flex-row justify-center items-center'><BsEye /></div>
              <div>{countSave}</div>
            </div>
          </span>
        )}
      </Link>
    </div>
  );
};
