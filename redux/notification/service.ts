import apiMethod from "@/utility/ApiMethod";

// @types
import { IGetNotificationPayload } from "./types";

// @constants
import { GET_LIST_NOTIFICATION_API_CLIENT } from "./constants";

export const getListNotificationService = async (payload: IGetNotificationPayload) => {
  const { data } = await apiMethod.post(GET_LIST_NOTIFICATION_API_CLIENT, payload)
  return data
}