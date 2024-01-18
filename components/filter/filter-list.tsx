import { BrandIcon } from '@/components/icons/BrandIcon';
import { TShirtIcon } from '@/components/icons/TShirtIcon';
import { PaletteIcon } from '@/components/icons/PaletteIcon';
import { VerifiedBadgeIcon } from '@/components/icons/VerifiedBadgeIcon';
import { UserIcon } from '@/components/icons/UserIcon';
import { ShoppingModeIcon } from '@/components/icons/ShoppingModeIcon';
import { CoinIcon } from '@/components/icons/CoinIcon';

import { FilterBlock } from './filter-block';
import { FilterColors } from './filter-colors';
import { FilterPrice } from './filter-price';
import { FilterItems } from './filter-items';

export const FilterList = () => {
  return (
    <div className='space-y-8'>
      <FilterBlock title='Khoảng giá' icon={CoinIcon}>
        <FilterPrice />
      </FilterBlock>

      <FilterBlock title='Thương hiệu' icon={BrandIcon}>
        <FilterItems
          options={[
            {
              name: 'Tất cả',
              value: 'brand_all',
            },
            {
              name: 'Gucci',
              value: 'gucci',
              quantity: 42,
            },
            {
              name: 'MLB',
              value: 'mlb',
              quantity: 142,
            },
            {
              name: 'Helmes',
              value: 'helmes',
              quantity: 48,
            },
            {
              name: 'Nike',
              value: 'nike',
              quantity: 333,
            },
          ]}
        />
      </FilterBlock>

      <FilterBlock title='Kiểu dáng' icon={TShirtIcon}>
        <FilterItems
          options={[
            {
              name: 'Tất cả',
              value: 'shape_all',
            },
            {
              name: 'Áo Polo',
              value: 'ao_polo',
              quantity: 42,
            },
            {
              name: 'Áo thun',
              value: 'ao_thun',
              quantity: 142,
            },
            {
              name: 'Áo sơ mi',
              value: 'ao_so_mi',
              quantity: 48,
            },
            {
              name: 'Quần Short',
              value: 'quan_short',
              quantity: 333,
            },
          ]}
        />
      </FilterBlock>

      <FilterBlock title='Màu sắc' icon={PaletteIcon}>
        <FilterColors 
          options={[
            {
              color:'#FD7E6E'
            },
            {
              color:'#FDB52C'
            },
            {
              color:'#FED1DD'
            },
            {
              color:'#FFE5AB'
            },
            {
              color: '#A3E6A4'
            },
            {
              color: '#9A8DEB'
            },
            {
              color: '#376EE7'
            },
            {
              color: '#FFFFFF'
            },
            {
              color: '#202020'
            },
            {
              color: '#C8C8C8'
            },
          ]}
        />
      </FilterBlock>

      <FilterBlock title='Size thời trang' icon={VerifiedBadgeIcon}>
        <FilterItems
          options={[
            {
              name: 'Tất cả',
              value: 'size_all',
            },
            {
              name: 'S',
              value: 's',
              quantity: 42,
            },
            {
              name: 'M',
              value: 'm',
              quantity: 142,
            },
            {
              name: 'L',
              value: 'l',
              quantity: 48,
            },
            {
              name: 'XL',
              value: 'xl',
              quantity: 333,
            },
          ]}
        />
      </FilterBlock>

      <FilterBlock title='Giới tính' icon={UserIcon}>
        <FilterItems
          options={[
            {
              name: 'Nam',
              value: 'nam',
              quantity: 42,
            },
            {
              name: 'Nữ',
              value: 'nu',
              quantity: 142,
            },
            {
              name: 'Trẻ em',
              value: 'tre_em',
              quantity: 48,
            },
            {
              name: 'Unisex',
              value: 'unisex',
              quantity: 333,
            },
          ]}
          hasShowMore={false}
        />
      </FilterBlock>

      <FilterBlock title='Chất liệu' icon={ShoppingModeIcon}>
        <FilterItems
          options={[
            {
              name: 'Da',
              value: 'da',
              quantity: 42,
            },
            {
              name: 'Da lộn',
              value: 'da_lon',
              quantity: 142,
            },
            {
              name: 'Jean',
              value: 'jean',
              quantity: 48,
            },
            {
              name: 'Nỉ',
              value: 'ni',
              quantity: 333,
            },
          ]}
          hasShowMore={false}
        />
      </FilterBlock>
    </div>
  );
};
