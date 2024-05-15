import { combineReducers, Reducer } from "redux";

import cartReducer from "./cart/reducer";
import { CartActions, CartState } from "./cart/types";

import openDialogReducer from "./openDiaglog/reducer";
import { DialogState, DialogActions } from "./openDiaglog/types";

import notificationReducer from "./notification/reducer"
import { NotificationAction, NotificationState } from "./notification/types";

// Combine actions
type CombinedActions = CartActions | DialogActions | NotificationAction;

const rootReducer: Reducer<{
  cart: CartState;
  openDiaglog: DialogState;
  notification: NotificationState 
}, CombinedActions, Partial<{}>> = combineReducers({
  cart: cartReducer,
  openDiaglog: openDialogReducer,
  notification: notificationReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;