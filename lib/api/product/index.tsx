import {
  GET_LIST_PRODUCTS,
  GET_DETAIL_PRODUCT,
  GET_RANKING_PRODUCTS_AS_TYPE,
  CREATE_RANKLING_PRODUCT_AS_TYPE,
  PAGE_NUMBER,
  PAGE_LIMIT,
  ACTION_USER
} from "@/constants";
import apiMethod from "@/utility/ApiMethod";

export const getRankingProducts = async (
  page: number = PAGE_NUMBER,
  size: number = PAGE_LIMIT,
  action: number = ACTION_USER.BUY
) => {
  const { data } = await apiMethod.post(GET_RANKING_PRODUCTS_AS_TYPE, {
    page,
    size,
    action
  })
  return data
}

export const getProducts = async (
  page: number = PAGE_NUMBER,
  size: number = PAGE_LIMIT,
  categories = "",
  productText = "",
  status = "publish"
) => {
  const { data } = await apiMethod.post(GET_LIST_PRODUCTS, {
    page,
    size,
    categories,
    productText,
    status
  })
  return data
}

export const getDetailProduct = async (
  slug: string,
  detailProduct: string
) => {
  const { data } = await
    apiMethod.get(GET_DETAIL_PRODUCT + `/${slug}/${detailProduct}`)
  return data
}