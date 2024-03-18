import { URL_DEV_VNAPPMOB, USD_TO_VND_API, ETH_EXCHANGE_RATE_API } from "@/constants";
import axios from "axios";

export const getListProvinces =async () => {
  const { data } = await axios.get(URL_DEV_VNAPPMOB + "/province")
  return data
}

export const getListDistrictsAsProvincesId = async (provinceId: string) => {
  const { data } = await axios.get(URL_DEV_VNAPPMOB + "/province" + `/district/${provinceId}`)
  return data
}

export const getListWardsAsDistrictId = async (districtId: string) => {
  const { data } = await axios.get(URL_DEV_VNAPPMOB + "/province" + `/ward/${districtId}`)
  return data
}

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