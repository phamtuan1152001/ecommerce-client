"use client"

import React, { useEffect } from "react"
import { useDispatch } from "react-redux";
import { connect } from "socket.io-client"
import { toast } from "sonner"

// @constants
import { BASE_URL_API_DEV, PAGE_LIMIT, PAGE_NUMBER } from "@/constants";
const host = BASE_URL_API_DEV;

// @common
import { getUserInfo, getUserToken, logOut } from "@/utility/common";

// @api
import apiMethod from "@/utility/ApiMethod";

// @service
import { trackingVisistor, verifyToken } from "@/lib/api";

// @action-notification
import { getListNotification } from "@/redux/notification/actions";

const App = ({ children }: any) => {
  const accessToken = getUserToken()
  const socket = connect(host)
  const dispatch = useDispatch();

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

      /* Will receive after admin review customized product successfully or cancel */
      socket.on('notiForReviewCustomizedProduct', (data) => {
        // console.log("notiForReviewCustomizedProduct", data)
        toast.message(data?.title, {
          description: data?.description,
          duration: 2000
        })
        const req = {
          page: PAGE_NUMBER,
          size: PAGE_LIMIT,
          userId: getUserInfo().id
        }
        dispatch(getListNotification(req))
      })

      /* Will receive after admin confirm payment successfully or cancel */
      socket.on('getNewNotificationsInClient', (data) => {
        // console.log("data", data)
        toast.message(data?.title, {
          description: data?.description,
          duration: 2000
        })
        const req = {
          page: PAGE_NUMBER,
          size: PAGE_LIMIT,
          userId: getUserInfo().id
        }
        dispatch(getListNotification(req))
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

  return children
}

export default App;