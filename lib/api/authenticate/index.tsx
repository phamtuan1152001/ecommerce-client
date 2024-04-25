import apiMethod from "@/utility/ApiMethod";
import { AUTHENTICATE_API_SIGNIN, AUTHENTICATE_API_SIGNUP, AUTHENTICATE_API_ACTIVEACCOUNT, SEND_CODE, RESET_PASSWORD, DELETE_CODE_ACTIVE } from "@/constants";

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

export const sendCode = async (payload: {
  email: string
}) => {
  const { data } = await apiMethod.post(SEND_CODE, payload)
  return data
}

export const resetPassword = async (payload: {
  userId: string,
  code: number,
  newPassword: string
}) => {
  const { data } = await apiMethod.post(RESET_PASSWORD, payload)
  return data
}

export const deleteCodeActive = async (payload: {
  userId: string
}) => {
  const { data } = await apiMethod.post(DELETE_CODE_ACTIVE, payload)
  return data
}