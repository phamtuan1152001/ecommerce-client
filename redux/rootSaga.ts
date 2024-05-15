import { all, fork } from "redux-saga/effects";

import cartSaga from "./cart/sagas";
import notificationSaga from "./notification/sagas"

export function* rootSaga() {
  yield all([cartSaga(), notificationSaga()]);
}