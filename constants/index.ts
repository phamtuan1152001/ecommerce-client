import NO_IMG from "@/public/assets/images/empty-data/no-data-image.jpg"

export const BASE_URL_API_DEV = "http://localhost:3002"
// export const BASE_URL_API_DEV = "https://ecommerce-ptuanstore-api.onrender.com"
export const URL_DEV_VNAPPMOB = "https://vapi.vnappmob.com/api"
export const USD_TO_VND_API = "https://open.er-api.com/v6/latest/USD"
export const ETH_EXCHANGE_RATE_API = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"

/* PRODUCTS API */
export const GET_LIST_PRODUCTS = "/products/listProducts"
export const GET_DETAIL_PRODUCT = "/products/detail"
export const GET_RANKING_PRODUCTS_AS_TYPE = "/ranking-products/get-list-client"
export const CREATE_RANKLING_PRODUCT_AS_TYPE = "/ranking-products/create"

/* AUTHENTICATION API */
export const AUTHENTICATE_API_SIGNIN = '/auth/signin'
export const AUTHENTICATE_API_SIGNUP = '/auth/signup'

/* CART API */
export const ADD_ITEM_TO_CART = "/cart/create-cart"
export const GET_LIST_PRODUCTS_IN_CART = "/cart/get-cart"
export const ADD_ONE_ITEM_IN_CART = "/cart/add-single-item"
export const DELETE_ONE_ITEM_IN_CART = "/cart/delete-single-item"
export const REMOVE_PRODUCT_IN_CART = "/cart/remove-item-cart"
export const DELETE_ALL_PRODUCTS_IN_CART = "/cart/delete-all-products-in-cart"

/* ORDER API */
export const CREATE_ORDER_CLIENT = "/order/create-order"
export const GET_ORDER_DETAIL = "/order/get-detail-order-client"
export const UPDATE_ORDER_DETAIL = "/order/update-detail-order-client"

/* PAYMENT API */
export const CREATE_PAYMENT_MOMO = "/payment/momo-payment"

/* CONSTANTS DATA */
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

export const PAYMENT_COD: string = "COD"
export const PAYMENT_ATM_BANKING: string = "atm-banking"
export const PAYMENT_MOMO_BANKING: string = "momo-banking"
export const PAYMENT_METAMASK: string = "metamask"

export const NO_DATA_IMAGE = NO_IMG
export const WALLET_ADDRESS_OWNER = "0xAFdF41f48E7796580B909054FF75b3428ecD9E1B"

/* ACTION DETEC USER */
export const ACTION_USER = {
  BUY: 1,
  REVIEW: 2,
  INTRODUCE: 3,
  SAVE: 4
}