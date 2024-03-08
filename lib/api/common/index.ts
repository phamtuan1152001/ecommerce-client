import { URL_DEV_VNAPPMOB } from "@/constants";
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