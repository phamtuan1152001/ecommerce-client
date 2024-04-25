import NO_IMG from "@/public/assets/images/empty-data/no-data-image.jpg"

export const BASE_URL_API_DEV = "http://localhost:3002"
// export const BASE_URL_API_DEV = "https://ecommerce-ptuanstore-api.onrender.com"
export const URL_DEV_VNAPPMOB = "https://vapi.vnappmob.com/api"
export const USD_TO_VND_API = "https://open.er-api.com/v6/latest/USD"
export const ETH_EXCHANGE_RATE_API = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
export const UPLOAD_PRODUCT = "/upload/upload-cloudinary"
export const CONVERT_IMAGE_TO_PSD = "/convert-to-svg/png-to-svg"

/* PRODUCTS API */
export const GET_LIST_PRODUCTS = "/products/listProducts"
export const GET_DETAIL_PRODUCT = "/products/detail"
export const GET_RANKING_PRODUCTS_AS_TYPE = "/ranking-products/get-list-client"
export const CREATE_RANKLING_PRODUCT_AS_TYPE = "/ranking-products/create"

/* CUSTOMIZED PRODUCT API */
export const CREATE_CUSTOMIZED_PRODUCT = "/customized-product/create"
export const GET_LIST_CUSTOMIZED_PRODUCT_CLIENT = "/customized-product/getListClient"
export const GET_DETAIL_CUSTOMIZED_PRODUCT_CLIENT = "/customized-product/detail-customized-product-client"
export const UPDATE_DETAIL_CUSTOMIZED_PRODUCT_CLIENT = "/customized-product/update-customized-product-client"
export const DELETE_DETAIL_CUSTOMIZED_PRODUCT_CLIENT = "/customized-product/delete-customized-product"
export const UPDATE_STATUS_ORDER_OF_CUSTOMIZED_PRODUCT = "/customized-product/update-status-order"

/* ORDER CUSTOMIZED PRODUCT API */
export const CREATE_ORDER_CUSTOMIZED_PRODUCT_CLIENT = "/order-customized-product/create"
export const GET_LIST_ORDER_CUSTOMIZED_PRODUCT_CLIENT = "/order-customized-product/getListClient"
export const GET_DETAIL_ORDER_CUSTOMIZED_PRODUCT_CLIENT = "/order-customized-product/get-detail-order-client"
export const UPDATE_DETAIL_ORDER_CUSTOMIZED_PRODUCT_CLIENT = "/order-customized-product/update-detail-order-client"

/* AUTHENTICATION API */
export const AUTHENTICATE_API_SIGNIN = '/auth/signin'
export const AUTHENTICATE_API_SIGNUP = '/auth/signup'
export const AUTHENTICATE_API_ACTIVEACCOUNT = "/auth/confirmCode"
export const SEND_CODE = "/auth/send-code"
export const RESET_PASSWORD = "/auth/reset-password"

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
export const GET_LIST_ORDERS = "/order/get-list-order-client"

/* PAYMENT API */
export const CREATE_PAYMENT_MOMO = "/payment/momo-payment"
export const CREATE_PAYMENT_MOMO_ORDER_CUSTOMIZED_PRODUCT = "/payment/momo-payment-order-customized-product"

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
export const PAGE_LIMIT = 10;
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

export const SIZE_LIST = [
  {
    id: "1",
    name: "XS",
    type: "xs"
  },
  {
    id: "2",
    name: "S",
    type: "s"
  },
  {
    id: "3",
    name: "M",
    type: "m"
  },
  {
    id: "4",
    name: "L",
    type: "l"
  },
  {
    id: "5",
    name: "XL",
    type: "xl"
  },
  {
    id: "6",
    name: "XXL",
    type: "xxl"
  },
]

/* ACTION DETEC USER */
export const ACTION_USER = {
  BUY: 1,
  REVIEW: 2,
  INTRODUCE: 3,
  SAVE: 4
}

/* INITIAL DATA FOR LIST OF ORDERS */
export const INITIAL_DATA_ORDERS = [{
  _id: "",
    __v: 0,
    userId: "",
    createdAt: "",
    updatedAt: "",
    statusOrder: 0,
    paymentMethod: "",
    orderAddress: {
      address: "",
      districtId: "",
      email: "",
      fullAddress: "",
      fullName: "",
      phone: "",
      provinceId: "",
      wardId: ""
    },
    cartId: "",
    cartDetail: {
      _id: "",
      userId: "",
      createdAt: "",
      updatedAt: "",
      totalPrice: 0,
      subTotalPrice: 0,
      items: [{
        _id: "",
        total: 0,
        subTotal: 0,
        quantity: 0,
        productId: "",
        product: {
          _id: "",
          __v: 0,
          updatedAt: "",
          status: "",
          slug: "",
          salePrice: 0,
          regularPrice: 0,
          quantity: 0,
          onSale: false,
          name: "",
          images: [{
            uid: "",
            url: "",
          }],
          description: "",
          defaultImageId: "",
          dateOnSaleTo: "",
          dateOnSaleFrom: "",
          createdAt: "",
          code: "",
          categories: {
            _id: "",
            __v: 0,
            status: "",
            slug: "",
            name: "",
            imageUrl: "",
            description: "",
            createdAt: "",
            updatedAt: "",
          }
        }
      }]
    }
}]