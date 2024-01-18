import Image from 'next/image';
import Link from 'next/link';

// @ultility
import { formatToCurrencyVND, calculatePercentPrice } from '@/utility/common';

// @components
import { ProductFinalPrice, ProductOldPrice } from './product';

interface ProductCardProps {
  product: {
    id: number,
    createdAt: string,
    updatedAt: string,
    code: string,
    sku: string,
    name: string,
    status: string,
    slug: string,
    regularPrice: string,
    salePrice: string,
    quantity: number,
    defaultImageId: null,
    unit: string,
    onSale: null,
    dateOnSaleFrom: null,
    dateOnSaleTo: null,
    manageStock: boolean,
    stockStatus: string,
    description: string,
    content: string,
    shortDescription: string,
    categories?: {
      name: string,
      displayName: string,
      slug: string,
    }[],
    images: {
      url: string,
      name: string
    }[]
  };
  slugName?: string
}

export const ProductCard = ({ product, slugName }: ProductCardProps) => {
  const { name, salePrice, regularPrice, slug, images, categories, onSale } = product || {};

  const imageUrl = (images || [])[0]?.url || "/assets/images/products-by-category/thoi-trang-nam-02.png"
  const categoriesSlug = (categories || [])[0]?.slug ?? ""

  return (
    <div className='relative mx-2 bg-white rounded-[4px]'>
      <Link href={`/${slugName ?? categoriesSlug}/` + slug ?? ""} >
        <div className='aspect-square relative'>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className='object-cover rounded-[4px]'
          />
        </div>

        <div className='p-2 space-y-2 text-center'>
          <h3 className='text-base text-[#333] font-bold line-clamp-2'>{name}</h3>

          <div>
            {!!onSale
              ? (
                <>
                  <ProductOldPrice>
                    {formatToCurrencyVND(parseInt(regularPrice))}
                  </ProductOldPrice>
                  <ProductFinalPrice>
                    {formatToCurrencyVND(parseInt(salePrice))}
                  </ProductFinalPrice>
                </>
              )
              : (
                <ProductFinalPrice>
                  {formatToCurrencyVND(parseInt(regularPrice))}
                </ProductFinalPrice>
              )}
          </div>
        </div>

        {!!onSale && (
          <span className='absolute top-2 left-2 text-xs leading-normal text-white px-2 py-1 bg-[#1A3C7F] inline-block rounded-2xl'>
            {calculatePercentPrice(parseInt(regularPrice), parseInt(salePrice))}
          </span>
        )}
      </Link>
    </div>
  );
};
