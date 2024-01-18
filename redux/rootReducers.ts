import { combineReducers, Reducer } from "redux";

import cartReducer from "./cart/reducer";
import { CartActions, CartState } from "./cart/types";

import openDialogReducer from "./openDiaglog/reducer";
import { DialogState, DialogActions } from "./openDiaglog/types";

// Combine actions
type CombinedActions = CartActions | DialogActions;

const rootReducer: Reducer<{
  cart: CartState;
  openDiaglog: DialogState;
}, CombinedActions, Partial<{}>> = combineReducers({
  cart: cartReducer,
  openDiaglog: openDialogReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;