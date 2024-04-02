import apiMethod from "@/utility/ApiMethod";
import {
  CREATE_CUSTOMIZED_PRODUCT,
  GET_LIST_CUSTOMIZED_PRODUCT_CLIENT,
  GET_DETAIL_CUSTOMIZED_PRODUCT_CLIENT,
  UPDATE_DETAIL_CUSTOMIZED_PRODUCT_CLIENT,
  DELETE_DETAIL_CUSTOMIZED_PRODUCT_CLIENT
} from "@/constants";
import {
  CustomizedProductType,
  GetListCustomizedProductPayload,
  CustomizedProductTypePayload
} from "@/types";

export const createCustomizedProduct = async (
  payload: CustomizedProductTypePayload
) => {
  const { data } = await apiMethod.post(CREATE_CUSTOMIZED_PRODUCT, {
    ...payload
  })

  return data
}

export const getListCustomizedProductClient = async (
  payload: GetListCustomizedProductPayload
) => {
  const { data } = await apiMethod.post(GET_LIST_CUSTOMIZED_PRODUCT_CLIENT, {
    ...payload
  })
  return data
}

export const getDetailCustomizedProductClient = async (payload: {
  customizedProductId: string
}) => {  
  const { data } = await apiMethod.get(
    GET_DETAIL_CUSTOMIZED_PRODUCT_CLIENT +
    `/${payload.customizedProductId}`
  )
  return data
}

export const updateStatusProductClient = async (
  payload: CustomizedProductType
) => {
  const { data } = await apiMethod.put(
    UPDATE_DETAIL_CUSTOMIZED_PRODUCT_CLIENT + `/${payload._id}`,
    {
    ...payload
  })
  return data
}

export const deleteCustomizedProductClient = async(
  payload: {
    customizedProductId: string
  }
) => {
  const { data } = await apiMethod.delete(
    DELETE_DETAIL_CUSTOMIZED_PRODUCT_CLIENT
    + `/${payload.customizedProductId}`
  )
  return data
}