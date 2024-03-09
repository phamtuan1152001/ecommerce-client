import { MdLocationCity, MdPhoneAndroid, MdMailOutline } from 'react-icons/md';
import {
  BiLogoFacebook,
  BiLogoYoutube,
  BiLogoTiktok,
  BiLogoLinkedin,
} from 'react-icons/bi';

export const PAYMENT_METHODS = [
  {
    name: 'COD',
    imgUrl: '/assets/images/payments/cod.svg',
    large: true,
  },
  {
    name: 'Visa',
    imgUrl: '/assets/images/payments/visa.svg',
  },
  {
    name: 'Momo',
    imgUrl: '/assets/images/payments/momo.svg',
  },
];

export const FOOTER_MENU = {
  info: {
    logo: {
      imgUrl: '/assets/images/logo.png',
      alt: 'Shop Vũ Hoàng',
    },
    children: [
      {
        label: 'Số 126/9 Lê Thiệt, phường Phú Thọ Hòa, quận Tân Phú, thành phố Hồ Chí Minh',
        icon: MdLocationCity,
      },
      {
        label: '0898871665 - 0909661004',
        icon: MdPhoneAndroid,
      },
      {
        label: 'phamtuan11520012gmail.com',
        icon: MdMailOutline,
      },
    ],
    description:
      'Phạm Lê Song Tuấn - ITITIU19062',
  },
  about: {
    title: 'Giới thiệu',
    children: [
      {
        label: 'Tin tức',
        href: '#',
      },
      {
        label: 'Trung tâm hỗ trợ',
        href: '#',
      },
    ],
  },
  customer_care: {
    title: 'Chăm sóc khách hàng',
    children: [
      {
        label: "Chính sách kiểm hàng",
        href: "/chinh-sach/chinh-sach-kiem-hang"
      },
      {
        label: "Bảo Mật Thông Tin",
        href: "/chinh-sach/chinh-sach-bao-mat-thong-tin"
      },
    ],
  },
  policy: {
    title: "Chính sách",
    children: [
      {
        label: "Chính sách thanh toán",
        href: "/chinh-sach-thanh-toan"
      },
      {
        label: "Xử lý khiếu nại",
        href: "/chinh-sach-xu-li-khieu-nai"
      },
      {
        label: "Vận chuyển và giao nhận",
        href: "/chinh-sach-van-chuyen-va-giao-nhan"
      },
      {
        label: "Đổi trả và hoàn tiền",
        href: "/chinh-sach-doi-tra-va-hoan-tien"
      },
      {
        label: "Chính sách bảo hành",
        href: "/chinh-sach-bao-hanh"
      },
    ]
  },
  certified_by: {
    title: 'Được chứng nhận bởi',
    children: [
      {
        imgUrl: '/assets/images/footer/da-dang-ky-bo-cong-thuong.svg',
        alt: 'Đã đăng ký Bộ Công Thương',
        href: '#',
      },
      {
        imgUrl: '/assets/images/footer/dmca.png',
        alt: 'DMCA',
        href: '#',
      },
    ],
  },
  social_network: {
    title: 'Kết nối với chúng tôi:',
    children: [
      {
        label: 'Facebook',
        icon: BiLogoFacebook,
        href: '#',
      },
      {
        label: 'Youtube',
        icon: BiLogoYoutube,
        href: '#',
      },
      {
        label: 'Tiktok',
        icon: BiLogoTiktok,
        href: '#',
      },
      {
        label: 'Linkedin',
        icon: BiLogoLinkedin,
        href: '#',
      },
    ],
  },
};
