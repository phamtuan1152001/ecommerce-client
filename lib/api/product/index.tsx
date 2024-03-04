import { BASE_URL_API_DEV, PUBLIC_API } from "@/constants";

export const getBestSellerProducts = async () => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/best-seller-products`,
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

export const getAllProducts = async (
  page: number = 0,
  limit: number = 100,
  lang: string = "en",
  paginate: boolean = true,
  slug: string = ""
) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/products?page=${page}&limit=${limit}&lang=${lang}&cateSlug=${slug}`,
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

export const getDetailProduct = async (slug: string = "") => {  
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/products/${slug}`,
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

export const getProductByCate = async (
  page: number = 0,
  limit: number = 100,
  lang: string = "en",
  paginate: boolean = true,
  slug: string = ""
) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/product-by-cate`,
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

export const getProductsBySearching = async (
  page: number = 0,
  limit: number = 100,
  lang: string = "vi",
  search: string = ""
) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + PUBLIC_API +
      `/products?page=${page}&limit=${limit}&lang=${lang}&search=${search}`,
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