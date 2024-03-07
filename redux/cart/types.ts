import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  FETCH_CART_CREATE_REQUEST,
  FETCH_CART_DELETE_REQUEST,
  FETCH_CART_UPDATE_REQUEST,
  RESET_CART
} from "./constants";

export interface IProduct {
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
  categories: string
}

export interface ICart {
  _id: string;
  __v: number;
  createdAt: string,
  updatedAt: string,
  userId: string;
  items: {
    _id: string;
    total: number;
    subTotal: number;
    quantity: number;
    productId: string;
    product: IProduct
  }[],
  totalPrice: number,
  subTotalPrice: number
}

export interface CartState {
  loading: boolean;
  error: string | null;
  cart: ICart
}

export interface FetchDeleteItemCartPayload {
  userId: string,
  productId: string,
  total: number,
  subTotal: number
}

export interface FetchUpdateQuantiyCartPayload {
  userId: string,
  productId: string,
  quantity: number,
  total: number,
  subTotal: number,
  type: string
}

export interface FetchCreateCartPayload {
  userId: string,
  productId: string,
  quantity: number,
  total: number,
  subTotal: number
}

export interface FetchCartSuccessPayload {
  cart: ICart
}

export interface FetchCartFailurePayload {
  error: string;
}

export interface FetchCartRequest {
  type: typeof FETCH_CART_REQUEST;
  payload: any
}

export interface FetchCreateCartRequest {
  type: typeof FETCH_CART_CREATE_REQUEST
}

export interface FetchUpdateQuantityCartRequest {
  type: typeof FETCH_CART_UPDATE_REQUEST
}

export interface FetchDeleteItemCartRequest {
  type: typeof FETCH_CART_DELETE_REQUEST
}

export type FetchCartSuccess = {
  type: typeof FETCH_CART_SUCCESS;
  payload: FetchCartSuccessPayload
}

export type FetchCartFailure = {
  type: typeof FETCH_CART_FAILURE;
  payload: FetchCartFailurePayload;
};

export type ResetCard = {
  type: typeof RESET_CART;
}

export type CartActions =
  | FetchCartRequest
  | FetchCartSuccess
  | FetchCartFailure
  | ResetCard
  | FetchCreateCartRequest
  | FetchUpdateQuantityCartRequest
  | FetchDeleteItemCartRequest;