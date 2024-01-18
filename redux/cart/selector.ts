import { AppState } from "../rootReducers";

export const getCartSelector = (state: AppState) => state.cart.cart;
export const getLoadingSelector = (state: AppState) => state.cart.loading;
export const getErrorSelector = (state: AppState) => state.cart.error;