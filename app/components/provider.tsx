"use client"

import React from "react"
import { Provider } from "react-redux";
import store, { persist } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

const ProviderComponents = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        {children}  
      </PersistGate>
    </Provider>
  )
}

export default ProviderComponents