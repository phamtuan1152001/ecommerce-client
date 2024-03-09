import {
  GET_LIST_PRODUCTS,
  GET_DETAIL_PRODUCT
} from "@/constants";
import apiMethod from "@/utility/ApiMethod";

export const getProducts = async (
  page: number = 1,
  size: number = 6,
  categories = "",
  productText = ""
) => {
  const { data } = await apiMethod.post(GET_LIST_PRODUCTS, {
    page,
    size,
    categories,
    productText
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