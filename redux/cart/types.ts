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
  code: string,
  content: string,
  dateOnSaleFrom: string,
  dateOnSaleTo: string,
  description: string,
  id: number,
  images: {
    id: number, 
    name: string,
    url: string
  }[],
  manageStock: boolean,
  name: string,
  onSale: string,
  quantity: number,
  regularPrice: string,
  salePrice: string,
  shortDescription: string,
  sku: string,
  slug: string,
  status: string,
  stockStatus: string,
  unit: string
}

export interface ICart {
  id: number;
  createAt: string,
  updateAt: string,
  userId: number;
  items: {
    id: number;
    productId: number;
    quantity: number;
    cartId: number;
    product: IProduct
  }[],
  total: number,
  subTotal: number
}

export interface CartState {
  loading: boolean;
  error: string | null;
  cart: ICart
}

export interface FetchDeleteItemCartPayload {
  productId: number
}

export interface FetchUpdateQuantiyCartPayload {
  productId: number,
  quantity: number
}

export interface FetchCreateCartPayload {
  productId: number,
  quantity: number
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