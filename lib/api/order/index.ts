import {
  BASE_URL_API_DEV,
  CREATE_ORDER_CLIENT,
  GET_ORDER_DETAIL,
  UPDATE_ORDER_DETAIL
} from "@/constants";
import apiMethod from "@/utility/ApiMethod";

export const postCreateOrder = async (payload: {
  userId: string,
  statusOrder: number,
  paymentMethod: string,
  orderAddress: {
    fullName: string,
    phone: string,
    address: string,
    provinceId: string,
    districtId: string,
    wardId: string,
    fullAddress: string,
  }
  cartId: string,
  cartDetail: {
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
      product: string
    }[],
    totalPrice: number,
    subTotalPrice: number
  }
}) => {
  const { data } = await apiMethod.post(BASE_URL_API_DEV + CREATE_ORDER_CLIENT, {
    ...payload
  })
  return data
}

export const getOrderDetail = async (code: string | null) => {
  const { data } = await apiMethod.get(GET_ORDER_DETAIL + `/${code}`)
  return data
}

export const updateOrderDetail = async (payload: any) => {
  const { data } = await apiMethod.put(UPDATE_ORDER_DETAIL + `/${payload._id}`, {
    ...payload
  })
  return data
}