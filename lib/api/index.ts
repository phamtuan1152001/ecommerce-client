import { BASE_URL_API_DEV } from "@/constants";
import apiMethod from "@/utility/ApiMethod";

export const getCategories = async () => {
  const { data } = await apiMethod.get("/categories/listAllClient")
  return data
}