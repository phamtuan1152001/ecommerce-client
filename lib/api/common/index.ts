import { URL_DEV_VNAPPMOB, USD_TO_VND_API, ETH_EXCHANGE_RATE_API, UPLOAD_PRODUCT, CONVERT_IMAGE_TO_PSD } from "@/constants";
import axios from "axios";
import apiMethod from "@/utility/ApiMethod";

export const convertImageToPsd = async (payload: any) => {
  const { data } = await apiMethod.post(CONVERT_IMAGE_TO_PSD, {
    ...payload
  })
  return data
}

export const uploadImgProduct = (payload: {
  data: string
}) => {
  return apiMethod.post(UPLOAD_PRODUCT, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// export const getListProvinces =async () => {
//   const { data } = await axios.get(URL_DEV_VNAPPMOB + "/province")
//   return data
// }
export const getListProvinces = async () => {
  try {
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(URL_DEV_VNAPPMOB + "/province")}`);

    // Extract JSON data from the response
    const data = JSON.parse(response.data.contents);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// export const getListDistrictsAsProvincesId = async (provinceId: string) => {
//   const { data } = await axios.get(URL_DEV_VNAPPMOB + "/province" + `/district/${provinceId}`)
//   return data
// }
export const getListDistrictsAsProvincesId = async (provinceId: string) => {
  try {
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(URL_DEV_VNAPPMOB + "/province" + `/district/${provinceId}`)}`);

    // Extract JSON data from the response
    const data = JSON.parse(response.data.contents);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

// export const getListWardsAsDistrictId = async (districtId: string) => {
//   const { data } = await axios.get(URL_DEV_VNAPPMOB + "/province" + `/ward/${districtId}`)
//   return data
// }
export const getListWardsAsDistrictId = async (districtId: string) => {
  try {
    const response = await axios.get(`https://api.allorigins.win/get?url=${encodeURIComponent(URL_DEV_VNAPPMOB + "/province" + `/ward/${districtId}`)}`);

    // Extract JSON data from the response
    const data = JSON.parse(response.data.contents);

    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
};

export const getUsdToVndExchangeRate = async () => {
    try {
      const response = await axios.get(USD_TO_VND_API);
      const usdToVndExchangeRate = response.data.rates.VND;
      return usdToVndExchangeRate;
    } catch (error) {
      console.error('Error fetching USD to VND exchange rate:', error);
      return null;
    }
  }

export const getEthExchangeRate = async () => {
  try {
      const response = await axios.get(ETH_EXCHANGE_RATE_API);
      const ethExchangeRate = response.data.ethereum.usd;
      return ethExchangeRate;
    } catch (error) {
      console.error('Error fetching ETH exchange rate:', error);
      return null;
    }
}