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
    name: 'Master Card',
    imgUrl: '/assets/images/payments/master-card.svg',
  },
  {
    name: 'JCB',
    imgUrl: '/assets/images/payments/jcb.svg',
  },
  {
    name: 'American Express',
    imgUrl: '/assets/images/payments/american-express.svg',
  },
  {
    name: 'Shopee Pay',
    imgUrl: '/assets/images/payments/shopee-pay.svg',
  },
  {
    name: 'VNPay',
    imgUrl: '/assets/images/payments/vn-pay.svg',
  },
  {
    name: 'Momo',
    imgUrl: '/assets/images/payments/momo.svg',
  },
  {
    name: 'Insta',
    imgUrl: '/assets/images/payments/insta.svg',
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
        label: '123 Đồng Khởi, P. Tam Hiệp TP Biên Hòa, Đồng Nai',
        icon: MdLocationCity,
      },
      {
        label: '0912912121 - 190029012',
        icon: MdPhoneAndroid,
      },
      {
        label: 'vudai@vn.com',
        icon: MdMailOutline,
      },
    ],
    description:
      '0108603370 do Sở Kế hoạch và Đầu tư Hà Nội cấp ngày 28/01/2019',
  },
  about: {
    title: 'Về chúng tôi',
    children: [
      {
        label: 'Giới thiệu',
        href: '/',
      },
      {
        label: 'Trung tâm hỗ trợ',
        href: '/',
      },
      {
        label: 'Tin tức',
        href: '/',
      },
      {
        label: 'Cơ chế hoạt động',
        href: '/',
      },
      {
        label: 'Cơ hội nghề nghiệp',
        href: '/',
      },
      {
        label: 'Liên hệ hợp tác',
        href: '/',
      },
    ],
  },
  customer_care: {
    title: 'Chăm sóc khách hàng',
    children: [
      {
        label: 'Chính sách bán hàng',
        href: '/',
      },
      {
        label: 'Chính sách bảo hành',
        href: '/',
      },
      {
        label: 'Chính sách đổi trả',
        href: '/',
      },
      {
        label: 'Chính sách thanh toán',
        href: '/',
      },
      {
        label: 'Đăng ký tài khoản',
        href: '/',
      },
      {
        label: 'Quyền lợi thành viên',
        href: '/',
      },
    ],
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
