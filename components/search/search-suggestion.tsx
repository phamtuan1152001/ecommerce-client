import { Box } from '@/components/ui/box';
import {
  ProductImage,
  ProductTitle,
  ProductOldPrice,
  ProductFinalPrice,
} from '../product/product';

const DATA = [
  {
    name: 'Ví cầm tay Kate Spade New York Sam Icon KSNYL mini (Ks Green)',
    imgUrl: '/assets/images/products-by-category/tui-xach-02.png',
    price: '1.234.000đ',
  },
  {
    name: 'MLB - Giày mule unisex đế bệt Playball Origin',
    imgUrl: '/assets/images/products-by-category/giay-dep-04.png',
    price: '1.234.000đ',
  },
  {
    name: 'Ví cầm tay Kate Spade New York Sam Icon KSNYL mini (Ks Green)',
    imgUrl: '/assets/images/products-by-category/tui-xach-02.png',
    price: '1.234.000đ',
  },
  {
    name: 'MLB - Giày mule unisex đế bệt Playball Origin',
    imgUrl: '/assets/images/products-by-category/giay-dep-04.png',
    price: '1.234.000đ',
  },
  {
    name: 'Ví cầm tay Kate Spade New York Sam Icon KSNYL mini (Ks Green)',
    imgUrl: '/assets/images/products-by-category/tui-xach-02.png',
    price: '1.234.000đ',
  },
  {
    name: 'MLB - Giày mule unisex đế bệt Playball Origin',
    imgUrl: '/assets/images/products-by-category/giay-dep-04.png',
    price: '1.234.000đ',
  },
];

export const SearchSuggestion = () => {
  return (
    <Box className='py-4 space-y-4'>
      <h5 className='text-base font-bold text-[#181818] uppercase'>
        GỢI Ý CHO BẠN
      </h5>

      <div className='grid grid-cols-2 gap-4 max-h-64 overflow-y-auto'>
        {DATA.map((item, index) => (
          <div className='flex' key={index}>
            <ProductImage
              wrapperClassName='w-28 flex-shrink-0'
              src={item.imgUrl}
              alt={item.name}
            />

            <div className='p-2 flex-1 flex flex-col'>
              <ProductTitle className='text-sm'>{item.name}</ProductTitle>

              <div className='mt-auto'>
                <ProductOldPrice className='text-xs'>
                  2.250.000đ
                </ProductOldPrice>
                <ProductFinalPrice className='text-sm'>
                  {item.price}
                </ProductFinalPrice>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Box>
  );
};
