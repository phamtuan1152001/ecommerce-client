import { BASE_URL_API_DEV, PUBLIC_API } from "@/constants";
import apiMethod from "@/utility/ApiMethod";

export const getAllCategories = async (
  page: number = 0,
  limit: number = 100,
  lang: string = "en",
  paginate: boolean = true
) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/categories?page=${page}&limit=${limit}&lang=${lang}&paginate=${paginate}`, {
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

export const getAllBrands = async (
  page: number = 0,
  limit: number = 100,
  lang: string = "en",
  paginate: boolean = true
) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/manufacturers`,
      {
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

export const getCategories = async () => {
  const { data } = await apiMethod.get("/categories/listAllClient")
  return data
}