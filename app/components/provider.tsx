"use client"

import React, { useEffect } from "react"
import { Provider } from "react-redux";
import store, { persist } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

// @common
import { getUserToken } from "@/utility/common";

// @api
import apiMethod from "@/utility/ApiMethod";

const ProviderComponents = ({ children }: any) => {
  const accessToken = getUserToken()

  useEffect(() => {
    const isAuthenticated = accessToken ? true : false;
    if (isAuthenticated) {
      apiMethod.defaults.headers.common["Authorization"] = accessToken;
    }
  }, [accessToken])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ProviderComponents