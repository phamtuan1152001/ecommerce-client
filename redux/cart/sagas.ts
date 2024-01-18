import {
  all,
  call,
  put,
  takeLatest,
  takeEvery
} from "redux-saga/effects";

// @actions
import {
  fetchCartSuccess,
  fetchCartFailure,
  fetchCartRequest
} from "./actions";

// @constants
import {
  FETCH_CART_CREATE_REQUEST,
  FETCH_CART_DELETE_REQUEST,
  FETCH_CART_REQUEST,
  FETCH_CART_UPDATE_REQUEST
} from "./constants";
import { SUCCESS } from "@/constants";

// @types
import {
  FetchCreateCartPayload,
  ICart
} from "./types";

// @service
import {
  getCustomerCart,
  createAddItemToCart,
  updateQuantityInCart,
  deleteItemInCart
} from "./service";

// @toast-fuction
import { toastNotiSuccess, toastNotiFail } from "@/utility/toast";

function* fetchListCustomerCart({payload}: any) {
  try {
    const response: ReturnType<typeof getCustomerCart> = yield call(getCustomerCart, payload);    
    yield put(
      fetchCartSuccess({
        cart: (response as any).data
      }),
    );
  } catch (e) {
    yield put(
      fetchCartFailure({
        error: (e as any).message,
      })
    );
  }
}

function* fetchCreateCart({payload}: any) {
  try {
    const response: ReturnType<typeof createAddItemToCart> = yield call(createAddItemToCart, payload);    
    if ((response as any).statusCode === SUCCESS) {
      toastNotiSuccess("Đã thêm vào giỏ hàng")
    } else {
      toastNotiFail("Thêm giỏ hàng thất bại")
    }
    yield put(
      fetchCartSuccess({
        cart: (response as any).data
      }),
    );
  } catch (e) {
    yield put(
      fetchCartFailure({
        error: (e as any).message,
      })
    );
  }
}

function* fetchUpdateQuantityCart({ payload }: any) {
  try {
    const response: ReturnType<typeof updateQuantityInCart> = yield call(updateQuantityInCart, payload);    
    if ((response as any).statusCode === SUCCESS) {
      toastNotiSuccess("Cập nhật giỏ hàng thành công")
    } else {
      toastNotiFail("Cập nhật giỏ hàng thất bại")
    }
    yield put(
      fetchCartSuccess({
        cart: (response as any).data
      }),
    );
  } catch (e) {
    yield put(
      fetchCartFailure({
        error: (e as any).message,
      })
    );
  }
}

function* fetchDeleteItemInCart({ payload }: any) {
  try {
    const response: ReturnType<typeof deleteItemInCart> = yield call(deleteItemInCart, payload);    
    yield put(
      fetchCartRequest({
        accessToken: payload.accessToken
      }),
    );
  } catch (e) {
    yield put(
      fetchCartFailure({
        error: (e as any).message,
      })
    );
  }
}

function* cartSaga() {
  yield takeLatest(FETCH_CART_REQUEST, fetchListCustomerCart);
  yield takeEvery(FETCH_CART_CREATE_REQUEST, fetchCreateCart);
  yield takeEvery(FETCH_CART_UPDATE_REQUEST, fetchUpdateQuantityCart)
  yield takeEvery(FETCH_CART_DELETE_REQUEST, fetchDeleteItemInCart)
}

export default cartSaga;