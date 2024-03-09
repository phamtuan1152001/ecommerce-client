import apiMethod from "@/utility/ApiMethod";
import {
  ADD_ITEM_TO_CART,
  GET_LIST_PRODUCTS_IN_CART,
  ADD_ONE_ITEM_IN_CART,
  DELETE_ONE_ITEM_IN_CART,
  REMOVE_PRODUCT_IN_CART,
  DELETE_ALL_PRODUCTS_IN_CART
} from "@/constants";

export const addProductToCart = async (payload: {
  userId: string,
  productId: string,
  quantity: number,
  total: number,
  subTotal: number
}) => {
  const { data } = await apiMethod.post(ADD_ITEM_TO_CART, {
    ...payload
  })
  return data
}

export const getListProductsInCart = async (payload: {
  userId: string
}) => {
  const { data } = await apiMethod.post(GET_LIST_PRODUCTS_IN_CART, {
    userId: payload.userId
  })
  return data
}

export const addOneProductInCart = async (payload: {
  userId: string,
  productId: string,
  quantity: number,
  total: number,
  subTotal: number
}) => {
  const { data } = await apiMethod.post(ADD_ONE_ITEM_IN_CART, {
    ...payload
  })
  return data
}

export const deleteOneProductInCart = async (payload: {
  userId: string,
  productId: string,
  quantity: number,
  total: number,
  subTotal: number
}) => {
  const { data } = await apiMethod.post(DELETE_ONE_ITEM_IN_CART, {
    ...payload
  })
  return data
}

export const removeProductInCart = async (payload: {
  userId: string,
  productId: string,
  total: number,
  subTotal: number
}) => {
  const { data } = await apiMethod.patch(REMOVE_PRODUCT_IN_CART, {
    ...payload
  })
  return data
}

export const deleteAllProductsInCart = async (userId: string) => {
  const { data } = await apiMethod.post(DELETE_ALL_PRODUCTS_IN_CART, {
    userId
  })
  return data
}