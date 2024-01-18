import { BASE_URL_API_DEV, V1_CUSTOMER } from "@/constants";

export const postCreateOrder = async (req: any) => {  
  const {accessToken, ...rest} = req || {}
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_CUSTOMER +
      `/orders`,
      {
        method: "POST",
        body: JSON.stringify(rest),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        cache: "no-cache"
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