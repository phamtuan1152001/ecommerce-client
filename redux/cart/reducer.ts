import { FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_FAILURE, RESET_CART } from "./constants";

import { CartActions, CartState } from "./types";

const initialState: CartState = {
  loading: false,
  error: null,
  cart: {
    _id: "",
    __v: 0,
    createdAt: "",
    updatedAt: "",
    userId: "",
    totalPrice: 0,
    subTotalPrice: 0,
    items: []
  }
}

export default (state = initialState, action: CartActions) => {  
  // console.log("action", action);
  
  switch (action.type) {
    case FETCH_CART_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        cart: action.payload.cart,
      };
    case FETCH_CART_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case RESET_CART:
      return initialState
    default:
      return state;
  }
}