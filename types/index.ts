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
  username: string,
  statusActive: number,
  phone: string,
  id: string,
  fullName: string,
  accessToken: string,
  roles: string[]
}