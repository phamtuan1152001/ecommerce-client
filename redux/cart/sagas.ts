import {
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
import { INCREMENT_BTN } from "@/constants";

// @service
import {
  addProductToCart,
  getListProductsInCart,
  addOneProductInCart,
  deleteOneProductInCart,
  removeProductInCart
} from "./service";

// @toast-fuction
import { toastNotiSuccess, toastNotiFail } from "@/utility/toast";

function* fetchListCustomerCart({ payload }: any) {  
  try {
    const response: ReturnType<typeof getListProductsInCart> = yield call(getListProductsInCart, payload);    
    yield put(
      fetchCartSuccess({
        cart: (response as any).retData
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
    const response: ReturnType<typeof addProductToCart> = yield call(addProductToCart, payload);
    // console.log("response", response);
    
    if ((response as any).retCode === 0) {
      toastNotiSuccess("Đã thêm vào giỏ hàng")
    } else {
      toastNotiFail("Thêm giỏ hàng thất bại")
    }
    yield put(
      fetchCartRequest({
        userId: (response as any).retData.userId
      })
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
  // console.log("payload", payload)
  const {type, ...rest} = payload || {}
  try {
    if (type === INCREMENT_BTN) {
      const response: ReturnType<typeof addOneProductInCart> = yield call(addOneProductInCart, rest);    
    if ((response as any).retCode === 0) {
      toastNotiSuccess("Cập nhật giỏ hàng thành công")
    } else {
      toastNotiFail("Cập nhật giỏ hàng thất bại")
    }
    yield put(
      fetchCartRequest({
        userId: (response as any).retData.userId
      })
    );
    } else {
      const response: ReturnType<typeof deleteOneProductInCart> = yield call(deleteOneProductInCart, rest);    
    if ((response as any).retCode === 0) {
      toastNotiSuccess("Cập nhật giỏ hàng thành công")
    } else {
      toastNotiFail("Cập nhật giỏ hàng thất bại")
    }
    yield put(
      fetchCartRequest({
        userId: (response as any).retData.userId
      })
    );
    }
  } catch (e) {
    yield put(
      fetchCartFailure({
        error: (e as any).message,
      })
    );
  }
}

function* fetchDeleteItemInCart({ payload }: any) {
  // console.log("payload", payload);
  try {
    const response: ReturnType<typeof removeProductInCart> = yield call(removeProductInCart, payload);    
    yield put(
      fetchCartRequest({
        userId: (response as any).retData.userId
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