"use client"

import React, { useEffect } from "react"
import { Provider } from "react-redux";
import store, { persist } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { connect } from "socket.io-client"
import { BASE_URL_API_DEV } from "@/constants";
const host = BASE_URL_API_DEV;

// @common
import { getUserInfo, getUserToken, logOut } from "@/utility/common";

// @api
import apiMethod from "@/utility/ApiMethod";

// @service
import { trackingVisistor, verifyToken } from "@/lib/api";

const ProviderComponents = ({ children }: any) => {
  const accessToken = getUserToken()
  const socket = connect(host)

  useEffect(() => {
    const isAuthenticated = accessToken ? true : false;
    if (isAuthenticated) {
      apiMethod.defaults.headers.common["Authorization"] = accessToken;
      const payload = {
        accessToken
      }
      fetchVerifyToken(payload)
      // const req: {
      //   userId: string | undefined,
      //   accessToken: string | undefined
      // } = {
      //   userId: !!getUserInfo()?.id ? getUserInfo()?.id : "",
      //   accessToken
      // }
      // fetchTrackingVisistor(req)
      socket.on('connect', () => {
        console.log('Connected to server');
      });

      socket.on('getNewNotificationsInClient', (data) => {
        console.log("data", data)
      })

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });


      return () => {
        socket.disconnect()
      };
    }
  }, [accessToken])

  const fetchVerifyToken = async (payload: {
    accessToken: string | undefined
  }) => {
    try {
      return await verifyToken(payload)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
      if ((err as any)?.retCode === 1) {
        logOut()
      }
    }
  }

  const fetchTrackingVisistor = async (payload: {
    userId: string | undefined,
    accessToken: string | undefined
  }) => {
    try {
      return await trackingVisistor(payload)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persist}>
        {children}
      </PersistGate>
    </Provider>
  )
}

export default ProviderComponents