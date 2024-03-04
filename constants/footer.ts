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
  // {
  //   name: 'Master Card',
  //   imgUrl: '/assets/images/payments/master-card.svg',
  // },
  // {
  //   name: 'JCB',
  //   imgUrl: '/assets/images/payments/jcb.svg',
  // },
  // {
  //   name: 'American Express',
  //   imgUrl: '/assets/images/payments/american-express.svg',
  // },
  // {
  //   name: 'Shopee Pay',
  //   imgUrl: '/assets/images/payments/shopee-pay.svg',
  // },
  // {
  //   name: 'VNPay',
  //   imgUrl: '/assets/images/payments/vn-pay.svg',
  // },
  {
    name: 'Momo',
    imgUrl: '/assets/images/payments/momo.svg',
  },
  // {
  //   name: 'Insta',
  //   imgUrl: '/assets/images/payments/insta.svg',
  // },
];

export const FOOTER_MENU = {
  info: {
    logo: {
      imgUrl: '/assets/images/logo.png',
      alt: 'Shop Vũ Hoàng',
    },
    children: [
      {
        label: 'Số 334/13/7, đường Võ Thị Sáu, KP 1 - Phường Thống Nhất - Thành phố Biên Hoà - Đồng Nai.',
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
    // description:
    //   '0108603370 do Sở Kế hoạch và Đầu tư Hà Nội cấp ngày 28/01/2019',
    description:
      '',
  },
  about: {
    title: 'Giới thiệu',
    children: [
      // {
      //   label: 'Trang chủ',
      //   href: '/',
      // },
      // {
      //   label: 'Về chúng tôi',
      //   href: '/',
      // },
      {
        label: 'Tin tức',
        href: '/',
      },
      {
        label: 'Trung tâm hỗ trợ',
        href: '/',
      },
      // {
      //   label: 'Cơ chế hoạt động',
      //   href: '/',
      // },
      // {
      //   label: 'Cơ hội nghề nghiệp',
      //   href: '/',
      // },
      // {
      //   label: 'Liên hệ hợp tác',
      //   href: '/',
      // },
    ],
  },
  customer_care: {
    title: 'Chăm sóc khách hàng',
    children: [
      // {
      //   label: 'Chính sách bán hàng',
      //   href: '/',
      // },
      // {
      //   label: 'Chính sách bảo hành',
      //   href: '/',
      // },
      // {
      //   label: 'Chính sách đổi trả',
      //   href: '/',
      // },
      // {
      //   label: 'Chính sách thanh toán',
      //   href: '/',
      // },
      {
        label: 'Đăng ký tài khoản',
        href: '/dang-ky-tai-khoan',
      },
      // {
      //   label: 'Quyền lợi thành viên',
      //   href: '/',
      // },
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
      // {
      //   label: "Chính sách kiểm hàng",
      //   href: "/chinh-sach-kiem-hang"
      // },
      // {
      //   label: "Bảo Mật Thông Tin",
      //   href: "/chinh-sach-bao-mat-thong-tin"
      // },
    ]
  },
  certified_by: {
    title: 'Được chứng nhận bởi',
    children: [
      {
        imgUrl: '/assets/images/footer/da-dang-ky-bo-cong-thuong.svg',
        alt: 'Đã đăng ký Bộ Công Thương',
        href: 'http://online.gov.vn/Home/WebDetails/113059?AspxAutoDetectCookieSupport=1',
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
        href: '/',
      },
      {
        label: 'Youtube',
        icon: BiLogoYoutube,
        href: '/',
      },
      {
        label: 'Tiktok',
        icon: BiLogoTiktok,
        href: '/',
      },
      {
        label: 'Linkedin',
        icon: BiLogoLinkedin,
        href: '/',
      },
    ],
  },
};
