import {
  call,
  put,
  takeLatest,
  takeEvery
} from "redux-saga/effects";

// @actions
import * as Actions from "./actions"

// @type
import { IGetNotificationPayload, INotificationResponse } from "./types";

// @service
import { getListNotificationService } from "./service";

// @constants
import { GET_LIST_NOTIFICATION } from "./constants";
import { RETCODE_SUCCESS } from "@/constants";

function* fetchGetListNotificationClient(payload: {
  type: string,
  payload: IGetNotificationPayload
}) {  
  // console.log("fetch-get-list", payload)
  try {
    yield put(
      Actions.setLoadingGetListNotification({
        loading: true
      })
    );
    const response: INotificationResponse = yield call(getListNotificationService, payload.payload);    
    console.log("response", response)
    if (response.retCode === RETCODE_SUCCESS) {
      yield put(
        Actions.setSuccessGetListNotification({
          success: response.retText
        })
      );
      yield put(
        Actions.setNotification({
          notification: response
        })
      );
    }
  } catch (e) {
    yield put(
      Actions.setFailGetListNotification({
        fail: (e as any).message
      })
    );
  } finally {
    yield put(
      Actions.setLoadingGetListNotification({
        loading: false
      })
    );
  }
}

function* notificationSaga() {
  yield takeLatest(GET_LIST_NOTIFICATION, fetchGetListNotificationClient);
  // yield takeEvery(FETCH_CART_CREATE_REQUEST, fetchCreateCart);
  // yield takeEvery(FETCH_CART_UPDATE_REQUEST, fetchUpdateQuantityCart)
  // yield takeEvery(FETCH_CART_DELETE_REQUEST, fetchDeleteItemInCart)
}

export default notificationSaga;