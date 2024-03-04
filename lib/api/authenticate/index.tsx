import { BASE_URL_API_DEV, AUTHENTICATE_API } from "@/constants";
import axios from "axios"
export const postUserRegister = async (req: any) => {  
  try {
    const response = await fetch(
      BASE_URL_API_DEV + AUTHENTICATE_API +
      `/user-register`,
      {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }
    );
      
    if (!response.ok) {
      // console.log(response);
      const result = await response.json();
      return result; 
      // throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("FETCHING FAIL!", err);
  }
}

export const postLogin = async (req: any) => {  
  try {
    const response = await fetch(
      BASE_URL_API_DEV + AUTHENTICATE_API +
      `/login`,
      {
        method: "POST",
        body: JSON.stringify(req),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        cache: 'no-cache'
      }
    );
      
    if (!response.ok) {
      // console.log(response);
      const result = await response.json();
      return result; 
      // throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("FETCHING FAIL!", err);
  }
}

export const verifyToken = async (req: {
  accessToken: string
}) => {
  const request = {
    accessToken: req.accessToken
  }
  try {
    const response = await fetch(
      BASE_URL_API_DEV + AUTHENTICATE_API +
      `/verify-token`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    );
      
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("FETCHING FAIL!", err);
  }
}

export const generateToken = async (req: {
  refreshToken: string
}) => {
  const request = {
    refreshToken: req.refreshToken
  }
  try {
    const response = await fetch(
      BASE_URL_API_DEV + AUTHENTICATE_API +
      `/generate-token`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      }
    );
      
    if (!response.ok) {
      console.log(response);
      throw new Error(`Error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.log("FETCHING FAIL!", err);
  }
}