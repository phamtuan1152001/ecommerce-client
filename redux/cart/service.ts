import { BASE_URL_API_DEV, V1_API } from "@/constants";

export const getCustomerCart = async (req: any) => {  
  const { accessToken } = req || {}  
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_API +
      `/customer/cart`,
      {
        method: "GET",
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: 'no-cache'
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

export const createAddItemToCart = async (req: any) => {  
  const { productId, quantity, accessToken } = req || {}  
  const request = {
    productId,
    quantity
  }
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_API +
      `/customer/cart/add-item`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: 'no-cache'
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

export const updateQuantityInCart = async (req: any) => {  
  const { productId, quantity, accessToken } = req || {}  
  const request = {
    productId,
    quantity
  }
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_API +
      `/customer/cart/update-item`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: 'no-cache'
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

export const deleteItemInCart = async (req: any) => {  
  const { productId, accessToken } = req || {}  
  const request = {
    productId,
  }
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_API +
      `/customer/cart/remove-item`,
      {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: 'no-cache'
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
