export interface CreateOrderCustomizedProductType {
  orderAddress: {
    fullName: string,
    phone: string,
    email: string,
    address: string,
    provinceId: string,
    districtId: string,
    wardId: string,
    fullAddress: string
  },
  _id: string,
  userId: string,
  statusOrder: number,
  paymentMethod: string,
  customizedProductId: string,
  customizedProduct: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface CreateOrderCustomizedProductPayload {
  userId: string,
  statusOrder: number,
  paymentMethod: string,
  orderAddress: {
    email: string,
    fullName: string,
    phone: string,
    provinceId: string,
    districtId: string,
    wardId: string,
    address: string,
    fullAddress: string
  },
  customizedProductId: string,
  customizedProduct: string
}

export interface GetListCustomizedProductPayload {
  page: number,
  size: number,
  userId: string,
  search: string
}

export interface CustomizedProductTypeResponse {
  _id: string,
  userId: string,
  code: string,
  name: string,
  quantity: number,
  size: string,
  imageUrl: string,
  imagePsd: string,
  statusProductAdmin: number,
  statusProductClient: number,
  regularPrice: number,
  totalPrice: number,
  createdAt: string,
  statusOrder: boolean
}

export interface CustomizedProductTypePayload {
  userId: string,
  code: string,
  name: string,
  quantity: number,
  size: string | undefined,
  imageUrl: string,
  imagePsd: string,
  statusProductAdmin: number,
  statusProductClient: number,
  regularPrice: number,
  totalPrice: number,
  statusOrder: boolean
}

export interface CustomizedProductType {
  _id: string,
  userId: string,
  code: string,
  name: string,
  quantity: number,
  size: string,
  imageUrl: string,
  imagePsd: string,
  statusProductAdmin: number | undefined,
  statusProductClient: number | undefined,
  regularPrice: number,
  totalPrice: number,
  createdAt: string,
  statusOrder: boolean
}

export type DecalTypeKey = 'logo' | 'full';

export interface ProductType {
  _id: string,
  __v: number,
  updatedAt: string,
  status: string,
  slug: string,
  salePrice: number,
  regularPrice: number,
  quantity: number,
  onSale: boolean,
  name: string,
  images: {
    uid: string,
    url: string,
  }[],
  description: string,
  defaultImageId: string,
  dateOnSaleTo: string,
  dateOnSaleFrom: string,
  createdAt: string,
  code: string,
  categories: {
    _id: string,
    __v: number,
    status: string,
    slug: string,
    name: string,
    imageUrl: string,
    description: string,
    createdAt: string
    updatedAt: string,
  }
}

export interface CategoryType {
  _id: string,
  name: string,
  slug: string,
  description: string,
  imageUrl: string,
  status: string,
  createdAt: string,
  updatedAt: string,
  __v: number
}

export interface UserInfoType {
  email: string,
  username: string,
  statusActive: number,
  phone: string,
  id: string,
  fullName: string,
  accessToken: string,
  roles: string[]
}

export interface OrderType {
  _id: string,
  __v: number,
  userId: string,
  createdAt: string,
  updatedAt: string,
  statusOrder: number,
  paymentMethod: string,
  orderAddress: {
    address: string,
    districtId: string,
    email: string,
    fullAddress: string,
    fullName: string,
    phone: string,
    provinceId: string,
    wardId: string
  },
  cartId: string,
  cartDetail: {
    _id: string,
    userId: string,
    createdAt: string,
    updatedAt: string,
    totalPrice: number,
    subTotalPrice: number,
    items: {
      _id: string,
      total: number,
      subTotal: number,
      quantity: number,
      productId: string,
      product: ProductType
    }[]
  }
}