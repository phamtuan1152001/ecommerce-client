import apiMethod from "@/utility/ApiMethod";

// @types
import { IGetNotificationPayload } from "./types";

// @constants
import { GET_LIST_NOTIFICATION_API_CLIENT, UPDATE_NOTIFICATION_STATUS_API, READ_ALL_NOTIFICATION } from "./constants";

export const getListNotificationService = async (payload: IGetNotificationPayload) => {
  const { data } = await apiMethod.post(GET_LIST_NOTIFICATION_API_CLIENT, payload)
  return data
}

export const updateStatusNotiClient = async (payload: {
  notificationId: string
}) => {
  const { data } = await apiMethod.put(UPDATE_NOTIFICATION_STATUS_API, payload)
  return data
}

export const readAllNotification = async (payload: {
  userId: string,
  userType: string
}) => {
  const { data } = await apiMethod.put(READ_ALL_NOTIFICATION, payload)
  return data
}