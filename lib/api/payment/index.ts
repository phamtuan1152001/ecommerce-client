import apiMethod from "@/utility/ApiMethod";
import {
  CREATE_PAYMENT_MOMO,
  CREATE_PAYMENT_MOMO_ORDER_CUSTOMIZED_PRODUCT
} from "@/constants";

export const createPaymentWithMOMO = async (payload: {
  amount: string,
  orderId: string,
}) => {
  const { data } = await apiMethod.post(CREATE_PAYMENT_MOMO, {
    ...payload
  })
  return data
}

export const createPaymentWithMOMOOrderCustomizedProduct = async (payload: {
  amount: string,
  orderId: string,
}) => {
  const { data } = await apiMethod.post(CREATE_PAYMENT_MOMO_ORDER_CUSTOMIZED_PRODUCT, {
    ...payload
  })
  return data
}