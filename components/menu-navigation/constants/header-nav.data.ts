import { IconGucci, IconDior, IconHermes, IconLacoste, IconNike, IconLV } from "@/public/assets/svg"

import LogoGucci from "../../../public/assets/images/nav/brand/gucci/logo.png"
import ImageGucci from "../../../public/assets/images/nav/brand/gucci/image.png"
import LogoDior from "../../../public/assets/images/nav/brand/dior/logo.png"
import ImageDior from "../../../public/assets/images/nav/brand/dior/image.png"
import LogoHermes from "../../../public/assets/images/nav/brand/hermes/logo.png"
import ImageHermes from "../../../public/assets/images/nav/brand/hermes/image.png"
import LogoLacoste from "../../../public/assets/images/nav/brand/lacoste/logo.png"
import ImageLacoste from "../../../public/assets/images/nav/brand/lacoste/image.png"
import LogoNike from "../../../public/assets/images/nav/brand/nike/logo.png"
import ImageNike from "../../../public/assets/images/nav/brand/nike/image.png"
import LogoLV from "../../../public/assets/images/nav/brand/lv/logo.png"
// import ImageLV from "../../../public/assets/images/nav/brand/lv/image.png"

export const HEADER_NAV = [
  {
    id: 1,
    name: "Nữ",
  },
  {
    id: 2,
    name: "Nam",
  },
  {
    id: 3,
    name: "UNISEX",
  },
  {
    id: 4,
    name: "TRẺ EM",
  }
]

export const NAV_DETAIL = [
  {
    id: 1,
    name: "Trang phục",
    child: [
      {
        id: 1,
        nameChild: "Váy và Đầm",
        path: "/vayvadam"
      },
      {
        id: 2,
        nameChild: "Áo - Quần",
        path: "/aoquan"
      },
      {
        id: 3,
        nameChild: "Đầm",
        path: "/dam"
      },
      {
        id: 4,
        nameChild: "Váy",
        path: "/vay"
      },
      {
        id: 5,
        nameChild: "Áo khoác",
        path: "/aokhoac"
      },
      {
        id: 6,
        nameChild: "Đồ thể thao",
        path: "/dothetheo"
      },
      {
        id: 7,
        nameChild: "Denim",
        path: "/denim"
      },
    ]
  },
  {
    id: 2,
    name: "Áo - Quần",
    child: [
      {
        id: 1,
        nameChild: "Áo kiểu",
        path: "/denim"
      },
      {
        id: 2,
        nameChild: "Áo trễ vai",
        path: "/denim"
      },
      {
        id: 3,
        nameChild: "Quần Jogger",
        path: "/denim"
      },
      {
        id: 4,
        nameChild: "Quần Jean",
        path: "/denim"
      },
      {
        id: 5,
        nameChild: "Áo hoodie",
        path: "/denim"
      },
      {
        id: 6,
        nameChild: "Jumpsuit",
        path: "/denim"
      },
      {
        id: 7,
        nameChild: "Áo khoác",
        path: "/denim"
      },
    ]
  },
  {
    id: 3,
    name: "Váy - Đầm",
    child: [
      {
        id: 1,
        nameChild: "Đầm dự tiệc",
        path: "/denim"
      },
      {
        id: 2,
        nameChild: "Đầm suông",
        path: "/denim"
      },
      {
        id: 3,
        nameChild: "Đầm công sở",
        path: "/denim"
      },
      {
        id: 4,
        nameChild: "Đầm maxi",
        path: "/denim"
      },
      {
        id: 5,
        nameChild: "Chân váy bút chì",
        path: "/denim"
      },
      {
        id: 6,
        nameChild: "Chân váy chữu A",
        path: "/denim"
      },
      {
        id: 7,
        nameChild: "Chân váy xếp li",
        path: "/denim"
      },
    ]
  },
  {
    id: 4,
    name: "Nội Y - Đồ Bơi",
    child: [
      {
        id: 1,
        nameChild: "Áo ngực",
        path: "/denim"
      },
      {
        id: 2,
        nameChild: "Quần lót",
        path: "/denim"
      },
      {
        id: 3,
        nameChild: "Nịt bụng",
        path: "/denim"
      },
      {
        id: 4,
        nameChild: "Đồ ngủ",
        path: "/denim"
      },
      {
        id: 5,
        nameChild: "Đồ bơi 1 mảnh",
        path: "/denim"
      },
      {
        id: 6,
        nameChild: "Đồ bơi 2 mảnh",
        path: "/denim"
      },
      {
        id: 7,
        nameChild: "Bikini",
        path: "/denim"
      },
    ]
  },
  {
    id: 5,
    name: "Áo khoác",
    child: [
      {
        id: 1,
        nameChild: "Áo blazer, vest",
        path: "/denim"
      },
      {
        id: 2,
        nameChild: "Áo khoác jean",
        path: "/denim"
      },
      {
        id: 3,
        nameChild: "Áo khoác dạ",
        path: "/denim"
      },
      {
        id: 4,
        nameChild: "Áo chống nắng",
        path: "/denim"
      },
      {
        id: 5,
        nameChild: "Áo khoác đi biển",
        path: "/denim"
      },
      {
        id: 6,
        nameChild: "Áo khoác bomber",
        path: "/denim"
      },
      {
        id: 7,
        nameChild: "Áo khoác mùa đông",
        path: "/denim"
      },
    ]
  },
]

export const LIST_BRAND = [
  {
    id: 1,
    name: "gucci",
    logo: LogoGucci,
    image: ImageGucci,
    icon: IconGucci,
    background: "#CAD3D2"
  },
  {
    id: 2,
    name: "dior",
    logo: LogoDior,
    image: ImageDior,
    icon: IconDior,
    background: "#FDD79D"
  },
  {
    id: 3,
    name: "hermes",
    logo: LogoHermes,
    image: ImageHermes,
    icon: IconHermes,
    background: "#CAD3D2"
  },
  {
    id: 4,
    name: "lacoste",
    logo: LogoLacoste,
    image: ImageLacoste,
    icon: IconLacoste,
    background: "linear-gradient(0deg, #ECCCB2 0%, #ECCCB2 100%), #ECCCB2"
  },
  {
    id: 5,
    name: "nike",
    logo: LogoNike,
    image: ImageNike,
    icon: IconNike,
    background: "#82CCF1"
  },
  {
    id: 6,
    name: "lv",
    logo: LogoLV,
    image: ImageNike,
    icon: IconLV,
    background: "#AFD6B0"
  },
]