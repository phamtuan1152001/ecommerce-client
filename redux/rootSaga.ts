import { all, fork } from "redux-saga/effects";

import cartSaga from "./cart/sagas";

export function* rootSaga() {
  yield all([cartSaga()]);
}