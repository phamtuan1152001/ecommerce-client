import { GET_LIST_NOTIFICATION, RESET_NOTIFICATION, SET_FAIL_NOTIFICATION, SET_LOADING_NOTIFICATION, SET_NOTIFICATION, SET_SUCCESS_NOTIFICATION } from "./constants"

export interface IGetNotificationPayload {
  page: number,
  size: number,
  userId: string
}

export interface ISetNotificationPayload {
  notification: INotificationResponse
}

export interface ISetSuccessGetListNotificationPayload {
  success: string
}

export interface ISetFailGetListNotificationPayload {
  fail: string
}

export interface ISetLoadingGetListNotificationPayload {
  loading: boolean
}

export interface NotificationState {
  loading: boolean,
  success: string,
  fail: string,
  notification: INotificationResponse
}

export interface INotification {
  _id: string,
  title: string,
  description: string,
  userId: string,
  status: string,
  typeOrder: number,
  typePayment: number,
  idOrder: string,
  userType: string,
  createdAt: string,
  updatedAt: string,
}

export interface INotificationResponse {
  retCode: number,
  retText: string,
  retData: {
    totalItems: number,
    notifications: INotification[],
    totalPages: number,
    currentPage: number
  }
}

export type GetListNotification = {
  type: typeof GET_LIST_NOTIFICATION
}

export type SetSuccessNotification = {
  type: typeof SET_SUCCESS_NOTIFICATION,
  payload: ISetSuccessGetListNotificationPayload
}

export type SetFailNotification = {
  type: typeof SET_FAIL_NOTIFICATION,
  payload: ISetFailGetListNotificationPayload
}

export type SetLoadingNotification = {
  type: typeof SET_LOADING_NOTIFICATION,
  payload: ISetLoadingGetListNotificationPayload
}

export type ResetNotification = {
  type: typeof RESET_NOTIFICATION
}

export type SetNotification = {
  type: typeof SET_NOTIFICATION,
  payload: ISetNotificationPayload
}

export type NotificationAction =
  | GetListNotification
  | SetSuccessNotification
  | SetFailNotification
  | SetLoadingNotification
  | ResetNotification
  | SetNotification
