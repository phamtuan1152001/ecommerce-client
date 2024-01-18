import { BASE_URL_API_DEV, V1_LOCATION } from "@/constants";

export const getListProvinces =async () => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_LOCATION +
      `/provinces`,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json'
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

export const getListDistrictsAsProvincesId = async (req: {
  provincesId: number
}) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_LOCATION +
      `/provinces/${req.provincesId}/districts`,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json'
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

export const getListWardsAsDistrictId = async (req: {
  districtId: number
}) => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_LOCATION +
      `/wards?parentId=${req.districtId}`,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json'
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

export const getListDistricts =async () => {
  try {
    const response = await fetch(
      BASE_URL_API_DEV + V1_LOCATION +
      `/districts`,
      {
        method: "GET",
        headers: {
          'Accept': 'application/json'
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