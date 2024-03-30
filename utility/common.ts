import { NUM_NAME_SLICE, PAYMENT_ATM_BANKING, PAYMENT_COD, PAYMENT_METAMASK, PAYMENT_MOMO_BANKING } from "@/constants";
import { UserInfoType } from "@/types";

export const formatNumber = (input: string | undefined) => {
  if (input) {
    let value = input;

    // Remove any non-digit characters
    value = value.replace(/\D/g, '');

    // Format the number with commas
    value = numberWithCommas(value);

    return value
  }
}

function numberWithCommas(x: any) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

export const renderText = (type: string) => {
    switch (type) {
      case PAYMENT_ATM_BANKING:
        return "Banking transfer"
      case PAYMENT_MOMO_BANKING:
        return "MOMO transfer"
      case PAYMENT_COD:
        return "COD"
      case PAYMENT_METAMASK:
        return "Metamask payment"
      default:
        return "--"
    }
  }

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
  // const ele = document.getElementById("title-content") 
  // window.scrollTo({
  //     top: ele?.getBoundingClientRect().top,
  //     behavior: "smooth"
  //   })
}

export const usdToEth = (usdAmount: number, ethRate: any) => {
  return usdAmount / ethRate;
}

export const getUserInfo = () => {
  const userTokenRaw: string | null = localStorage.getItem("USER_INFO");
  const userToken: UserInfoType = userTokenRaw
    ? JSON.parse(userTokenRaw)
    : "";
  
  return userToken
}

export const getIsSavePassword = () => {
  const userTokenRaw: string | null = localStorage.getItem("USER_INFO");
  const userToken: string = userTokenRaw ? JSON.parse(userTokenRaw) : "";
  const savepassword: string = (userToken as any).savepassword;
  
  return savepassword
}

export const getRefreshToken = () => {
  const userTokenRaw: string | null = localStorage.getItem("USER_INFO");
  const userToken: string = userTokenRaw ? JSON.parse(userTokenRaw) : "";
  const refreshToken: string = (userToken as any).refreshToken;
  
  return refreshToken
}

export const getUserToken = () => {
  if (typeof window !== 'undefined') { 
    const userTokenRaw: string | null = localStorage.getItem("USER_INFO");
    const userToken: string = userTokenRaw ? JSON.parse(userTokenRaw) : "";
    const accessToken: string = (userToken as any).accessToken;
    
    return accessToken
  } else {
    console.log('localStorage is not available');
  }
}

export const logOut = () => {
  localStorage.removeItem("USER_INFO")
  window.location.href = "/"
}

export const slitName = (name: string) => {
  const a = String(name?.trim()).split(" ");

  if (a.length > NUM_NAME_SLICE) {
    const n = a.slice(Math.max(a.length - NUM_NAME_SLICE, 1));
    return n.join(" ");
  }
  return name;
};

export function formatToCurrencyVND(number: number) {
  if (number) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(number);
  }

  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(0);
}

export function calculatePercentPrice(originalPrice: number, salePrice: number) {
  if (originalPrice && salePrice) {
    const price_sale_in_percent = salePrice / originalPrice;
    const result = 1 - price_sale_in_percent;
    return (result * 100).toFixed(1) + "%";
  }
}

export const nameCate = (type: string) => {
  switch (type) {
    case "fashion":
      return "Fashion"
    case "watch":
      return "Watch"
    case "perfume":
      return "Perfume"
    case "cosmetics":
      return "Cosmetics"
    case "lipstick":
      return "Lipstick"
    case "glasses":
      return "Glasses"
    case "shoe":
      return "Shoe"
    case "jewelry":
      return "Jewelry"
    case "hat":
      return "Hat"
    case "functional-foods":
      return "Functional foods"
    case "hand-bag":
      return "Hand bag"
    
    default:
      return "Thuốc"
  }
}