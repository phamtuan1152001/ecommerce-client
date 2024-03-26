import { BagIcon } from '@/components/icons/BagIcon';
import { CosmeticIcon } from '@/components/icons/CosmeticIcon';
import { FashionIcon } from '@/components/icons/FashionIcon';
import { FootwearIcon } from '@/components/icons/FootwearIcon';
import { FunctionalFoodsIcon } from '@/components/icons/FunctionalFoodsIcon';
import { JewelryIcon } from '@/components/icons/JewelryIcon';
import { MedicineIcon } from '@/components/icons/MedicineIcon';
import { PerfumeIcon } from '@/components/icons/PerfumeIcon';
import { WatchIcon } from '@/components/icons/WatchIcon';

export const renderIcon = (type: string) => {
  switch (type) {
    case "fashion":
      return FashionIcon
    case "perfume":
      return PerfumeIcon
    case "shoe":
      return FootwearIcon
    case "hand-bag":
      return BagIcon
    case "hat":
      return FashionIcon
    case "glasses":
      return JewelryIcon
    case "lipstick":
      return CosmeticIcon
    case "watch":
      return WatchIcon
    case "cosmetics":
      return CosmeticIcon
    default:
      return FashionIcon
  }
}

export const MENU = [
  {
    name: 'THỜI TRANG',
    href: '/',
    icon: FashionIcon,
  },
  {
    name: 'VÍ TÚI',
    href: '/',
    icon: BagIcon,
  },
  {
    name: 'ĐỒNG HỒ',
    href: '/',
    icon: WatchIcon,
  },
  {
    name: 'TRANG SỨC',
    href: '/',
    icon: JewelryIcon,
  },
  // {
  //   name: 'THUỐC',
  //   href: '/',
  //   icon: MedicineIcon,
  // },
  // {
  //   name: 'THỰC PHẨM CHỨC NĂNG',
  //   href: '/',
  //   icon: FunctionalFoodsIcon,
  // },
  {
    name: 'NƯỚC HOA',
    href: '/',
    icon: PerfumeIcon,
  },
  {
    name: 'GIÀY DÉP',
    href: '/',
    icon: FootwearIcon,
  },
  {
    name: 'MỸ PHẨM',
    href: '/',
    icon: CosmeticIcon,
  },
];
