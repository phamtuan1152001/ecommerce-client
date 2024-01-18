import { FETCH_CART_REQUEST, FETCH_CART_SUCCESS, FETCH_CART_FAILURE, RESET_CART } from "./constants";

import { CartActions, CartState } from "./types";

const initialState: CartState = {
  loading: false,
  error: null,
  cart: {
    id: 0,
    createAt: "",
    updateAt: "",
    userId: 0,
    total: 0,
    subTotal: 0,
    items: []
  }
}

export default (state = initialState, action: CartActions) => {  
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