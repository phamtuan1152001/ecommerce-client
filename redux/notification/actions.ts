import * as Actions from "./constants"

// @types
import {
  IGetNotificationPayload,
  ISetSuccessGetListNotificationPayload,
  ISetFailGetListNotificationPayload,
  ISetLoadingGetListNotificationPayload,
  ISetNotificationPayload
} from "./types"

export const getListNotification = (payload: IGetNotificationPayload) => {
  return {
    type: Actions.GET_LIST_NOTIFICATION,
    payload
  }
}

export const setNotification = (payload: ISetNotificationPayload) => {
  return {
    type: Actions.SET_NOTIFICATION,
    payload
  }
}

export const resetNotification = () => {
  return {
    type: Actions.RESET_NOTIFICATION
  }
}

export const setSuccessGetListNotification = (payload: ISetSuccessGetListNotificationPayload) => {
  return {
    type: Actions.SET_SUCCESS_NOTIFICATION,
    payload
  }
}

export const setFailGetListNotification = (payload: ISetFailGetListNotificationPayload) => {
  return {
    type: Actions.SET_FAIL_NOTIFICATION,
    payload
  }
}

export const setLoadingGetListNotification = (payload: ISetLoadingGetListNotificationPayload) => {
  return {
    type: Actions.SET_LOADING_NOTIFICATION,
    payload
  }
}