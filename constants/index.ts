import NO_IMG from "@/public/assets/images/empty-data/no-data-image.jpg"

export const BASE_URL_API_DEV = "http://localhost:3002"
export const URL_DEV_VNAPPMOB = "https://vapi.vnappmob.com/api"
export const PUBLIC_API = '/public/api'
export const PUBLIC_ORDER_DETAIL = "/public/orders"
export const AUTHENTICATE_API_SIGNIN = '/auth/signin'
export const AUTHENTICATE_API_SIGNUP = '/auth/signup'
export const ADD_ITEM_TO_CART = "/cart/create-cart"
export const GET_LIST_PRODUCTS_IN_CART = "/cart/get-cart"
export const ADD_ONE_ITEM_IN_CART = "/cart/add-single-item"
export const DELETE_ONE_ITEM_IN_CART = "/cart/delete-single-item"
export const REMOVE_PRODUCT_IN_CART = "/cart/remove-item-cart"
export const DELETE_ALL_PRODUCTS_IN_CART = "/cart/delete-all-products-in-cart"
export const CREATE_ORDER_CLIENT = "/order/create-order"
export const GET_ORDER_DETAIL = "/order/get-detail-order"
export const V1_API = "/v1/api"
export const V1_LOCATION = "/v1/location"
export const V1_CUSTOMER = "/v1/customer"
export const V1_ORDER_DETAIL = "/v1/customer/orders"

export const SUCCESS = 200;
export const BAD_REQUEST = 400;
export const SESSION_EXPIRED = 401;
export const NOT_FOUND = 404;
export const INTERNAL_SERVER_ERROR = 500;
export const POST_SUCCESS = 201;
export const DELETE_SUCCESS = 204;
export const RETCODE_SUCCESS = 0;
export const RETCODE_FAIL = 1;

export const PAGE_NUMBER = 1;
export const PAGE_LIMIT = 6;
export const MAX_LENGTH = 7;
export const LANGUAGE_VI = "vi";
export const LANGUAGE_EN = "en"

export const INCREMENT_BTN = "inc";
export const DECREMTN_BTN = "dec"

export const NUM_NAME_SLICE = 2

export const PAYMENT_COD = "COD"
export const PAYMENT_ATM_BANKING = "atm-banking"

export const NO_DATA_IMAGE = NO_IMG