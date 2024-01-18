import {
  FETCH_CART_REQUEST,
  FETCH_CART_SUCCESS,
  FETCH_CART_FAILURE,
  FETCH_CART_CREATE_REQUEST,
  FETCH_CART_DELETE_REQUEST,
  FETCH_CART_UPDATE_REQUEST,
  RESET_CART
} from "./constants";

import {
  FetchCartRequest,
  FetchCartSuccess,
  FetchCartSuccessPayload,
  FetchCartFailure,
  FetchCartFailurePayload,
  FetchCreateCartRequest,
  FetchCreateCartPayload,
  FetchUpdateQuantiyCartPayload,
  FetchDeleteItemCartPayload
} from "./types";

export const fetchCartRequest = (payload: any) => ({
  type: FETCH_CART_REQUEST,
  payload
});

export const fetchCartSuccess = (
  payload: FetchCartSuccessPayload
): FetchCartSuccess => ({  
  type: FETCH_CART_SUCCESS,
  payload,
});

export const fetchCartFailure = (
  payload: FetchCartFailurePayload
): FetchCartFailure => ({
  type: FETCH_CART_FAILURE,
  payload,
});

export const fetchCreateCartRequest = (
  payload: FetchCreateCartPayload
) => ({
  type: FETCH_CART_CREATE_REQUEST,
  payload
})

export const fetchUpdateQuantityCartRequest = (
  payload: FetchUpdateQuantiyCartPayload
) => ({
  type: FETCH_CART_UPDATE_REQUEST,
  payload
})

export const fetchDeleteItemCartRequest = (
  payload: FetchDeleteItemCartPayload
) => ({
  type: FETCH_CART_DELETE_REQUEST,
  payload
})

export const resetCart = () => {
  return {
    type: RESET_CART,
  };
}