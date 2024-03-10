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
      alt: 'Shop PTuan',
    },
    children: [
      {
        label: '126/9 Le Bach, Phu Tho Hoa Ward, Tan Phu District, Ho Chi Minh City',
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
      'Pham Le Song Tuan - ITITIU19062',
  },
  about: {
    title: 'Introduction',
    children: [
      {
        label: 'News',
        href: '#',
      },
      {
        label: 'Support center',
        href: '#',
      },
    ],
  },
  customer_care: {
    title: 'Customer care',
    children: [
      {
        label: "Products inspection policy",
        href: "/chinh-sach/chinh-sach-kiem-hang"
      },
      {
        label: "Information security",
        href: "/chinh-sach/chinh-sach-bao-mat-thong-tin"
      },
    ],
  },
  policy: {
    title: "Policy",
    children: [
      {
        label: "Payment policy",
        href: "/chinh-sach-thanh-toan"
      },
      {
        label: "Complaint handling",
        href: "/chinh-sach-xu-li-khieu-nai"
      },
      {
        label: "Shipping and delivery",
        href: "/chinh-sach-van-chuyen-va-giao-nhan"
      },
      {
        label: "Returns and refunds",
        href: "/chinh-sach-doi-tra-va-hoan-tien"
      },
      {
        label: "Warranty Policy",
        href: "/chinh-sach-bao-hanh"
      },
    ]
  },
  certified_by: {
    title: 'Certified by',
    children: [
      {
        imgUrl: '/assets/images/footer/da-dang-ky-bo-cong-thuong.svg',
        alt: 'Registered with the Ministry of Industry and Trade',
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
    title: 'Connect with us:',
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
