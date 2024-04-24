import apiMethod from "@/utility/ApiMethod";
import { AUTHENTICATE_API_SIGNIN, AUTHENTICATE_API_SIGNUP, AUTHENTICATE_API_ACTIVEACCOUNT } from "@/constants";

export const loginUser = async (payload: {
  username: string,
  password: string
}) => {
  const { data } = await apiMethod.post(AUTHENTICATE_API_SIGNIN, payload)
  return data
}

export const registerUser = async (payload: {
  fullName: string,
  email: string,
  phone: string,
  username: string,
  password: string,
  statusActive: number,
  roles: string[]
}) => {
  const { data } = await apiMethod.post(AUTHENTICATE_API_SIGNUP, payload)
  return data
}

export const activeAccount = async (payload: {
  code: number,
  userId: string
}) => {
  const { data } = await apiMethod.post(AUTHENTICATE_API_ACTIVEACCOUNT, payload)
  return data
}