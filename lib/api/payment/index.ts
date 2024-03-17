import apiMethod from "@/utility/ApiMethod";
import { CREATE_PAYMENT_MOMO } from "@/constants";

export const createPaymentWithMOMO = async (payload: {
  amount: string,
  orderId: string,
}) => {
  const { data } = await apiMethod.post(CREATE_PAYMENT_MOMO, {
    ...payload
  })
  return data
}