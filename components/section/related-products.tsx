import {
  ProductImage,
  ProductTitle,
  ProductOldPrice,
  ProductFinalPrice,
} from '@/components/product/product';

const DATA = [
  {
    name: 'MLB - Giày mule unisex đế bệt Playball Origin',
    discount_price: '2.250.000đ',
    price: '1.234.000đ',
    imgUrl: '/assets/images/related-products/01.png',
  },
  {
    name: 'Túi đeo chéo Kate Spade New York Sam Icon mini',
    discount_price: '2.250.000đ',
    price: '1.234.000đ',
    imgUrl: '/assets/images/related-products/02.png',
  },
  {
    name: 'Túi đeo vai Kate Spade New York Hudson cỡ trung',
    discount_price: '2.250.000đ',
    price: '1.234.000đ',
    imgUrl: '/assets/images/related-products/03.png',
  },
];

export const RelatedProducts = () => {
  return (
    <div className='space-y-4'>
      <h3 className='text-[#181818] text-xl capitalize font-bold'>
        Sản phẩm tương tự
      </h3>

      <div className='space-y-4'>
        {DATA.map((item) => (
          <div key={item.name} className='flex'>
            <ProductImage
              src={item.imgUrl}
              alt={item.name}
              wrapperClassName='w-full max-w-[114px]'
            />

            <div className='flex-grow space-y-2 p-2'>
              <ProductTitle className='text-sm leading-normal'>
                {item.name}
              </ProductTitle>

              <div>
                <ProductOldPrice className='text-xs leading-normal font-semibold'>
                  {item.discount_price}
                </ProductOldPrice>
                <ProductFinalPrice className='text-sm leading-normal'>
                  {item.price}
                </ProductFinalPrice>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
