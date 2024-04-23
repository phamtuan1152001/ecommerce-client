import { BASE_URL_API_DEV } from "@/constants";
import apiMethod from "@/utility/ApiMethod";

export const getCategories = async () => {
  const { data } = await apiMethod.get("/categories/listAllClient")
  return data
}

export const verifyToken = async (payload: {
  accessToken: string | undefined
}) => {
  const { data } = await apiMethod.post("/auth/verify-token", {
    ...payload
  })
  return data
}

export const trackingVisistor = async (payload: {
  userId: string | undefined,
  accessToken: string | undefined
}) => {
  const { data } = await apiMethod.post("/tracking/visitors", {
    ...payload
  })
  return data
}