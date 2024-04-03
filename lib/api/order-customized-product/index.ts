import apiMethod from "@/utility/ApiMethod";
import {
  CREATE_ORDER_CUSTOMIZED_PRODUCT_CLIENT,
  GET_LIST_ORDER_CUSTOMIZED_PRODUCT_CLIENT,
  GET_DETAIL_ORDER_CUSTOMIZED_PRODUCT_CLIENT,
  UPDATE_DETAIL_ORDER_CUSTOMIZED_PRODUCT_CLIENT
} from "@/constants";
import {
  CreateOrderCustomizedProductPayload
} from "@/types";

export const createOrderCustomizedProductClient = async (
  payload: CreateOrderCustomizedProductPayload
) => {
  const { data } = await apiMethod.post(CREATE_ORDER_CUSTOMIZED_PRODUCT_CLIENT, {
    ...payload
  })
  return data
}

export const getListOrderCustomizedProductClient = async (
  payload: {
    page: number,
    size: number,
    orderText: string,
    dateStart: string,
    dateEnd: string,
    userId: string
}
) => {
  const { data } = await apiMethod.post(GET_LIST_ORDER_CUSTOMIZED_PRODUCT_CLIENT, {
    ...payload
  })
  return data
}

export const getDetailOrderCustomizedProductClient = async (
  payload: {
    orderCustomizedProductId: string
  }
) => {
  const { data } = await apiMethod.get(GET_DETAIL_ORDER_CUSTOMIZED_PRODUCT_CLIENT + `/${payload.orderCustomizedProductId}`)
  return data
}