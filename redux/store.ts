// import logger from "redux-logger";
import { createStore, applyMiddleware, Middleware, Store } from "redux";
import createSagaMiddleware, { SagaMiddleware } from "redux-saga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistPartial } from "redux-persist/es/persistReducer";

import rootReducer from "./rootReducers";
import { rootSaga } from "./rootSaga";
import { CartActions, CartState } from "./cart/types";
import { DialogActions, DialogState } from "./openDiaglog/types";
import { NotificationAction, NotificationState } from "./notification/types"; 

// Combine actions
type CombinedActions = CartActions | DialogActions | NotificationAction;

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the saga middleware
const sagaMiddleware: SagaMiddleware<object> = createSagaMiddleware();
// Explicitly assert the type to Middleware<unknown, any, any>
const middleware: Middleware<unknown, any, any> = sagaMiddleware as Middleware<unknown, any, any>;

// Mount it on the Store
const store: Store<{
  cart: CartState;
  openDiaglog: DialogState;
  notification: NotificationState
} & PersistPartial, CombinedActions, {}> = createStore(persistedReducer, applyMiddleware(middleware));
const persist = persistStore(store as Store);

// Run the saga
sagaMiddleware.run(rootSaga);

export { persist };
export default store;