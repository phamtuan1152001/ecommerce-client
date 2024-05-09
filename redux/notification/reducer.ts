import * as Actions from "./constants"

// @types
import { NotificationState, NotificationAction } from "./types"

const initialState: NotificationState = {
  loading: false,
  fail: "",
  success: "",
  notification: {
    retCode: 0,
    retText: "",
    retData: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 0,
      notifications: []
    }
  }
}

export default (state = initialState, action: NotificationAction) => {
  // console.log("test", {state, action})

  switch (action.type) {
    case Actions.SET_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: action.payload.success
      } 
    case Actions.SET_FAIL_NOTIFICATION:
      return {
        ...state,
        fail: action.payload.fail
      }
    case Actions.SET_LOADING_NOTIFICATION:
      return {
        ...state,
        loading: action.payload.loading
      }
    case Actions.RESET_NOTIFICATION:
      return initialState
    case Actions.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload.notification
      };
    default:
      return initialState
  }
}