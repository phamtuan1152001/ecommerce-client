import {
  BASE_URL_API_DEV,
  V1_ORDER_DETAIL,
  CREATE_ORDER_CLIENT
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
  cartDetail: string
}) => {  
  const { data } = await apiMethod.post(BASE_URL_API_DEV + CREATE_ORDER_CLIENT, {
    ...payload
  })
  return data
}

export const getOrderDetail = async (code: string | null, accessToken: string | null) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_ORDER_DETAIL +
      `/${code}`,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: "no-cache"
      }
    );
      
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("FETCHING FAIL!", err);
  }
}