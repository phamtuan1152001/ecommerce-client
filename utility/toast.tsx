import { toast } from "sonner"
import { ToastIconSuccess, ToastIconFail } from "@/public/assets/svg"

export const toastNotiSuccess = (message: string) => {
  toast.success(message, {
    action: {
      label: "",
      onClick: () => {},
    },
    actionButtonStyle: {
      background: "transparent",
      backgroundImage: "url(/assets/images/toast-cancel.png)",
      width: 24,
      height: 24
    },
    style: {
      border: "none",
      background: "#333",
      padding: 8,
      borderRadius: 8,
      gap: 8,
      color: "#FFFFFF",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "400",
      width: "300px"
    },
    icon: <ToastIconSuccess />
  })
}

export const toastNotiFail = (message: string) => {
  toast.success(message, {
    action: {
      label: "",
      onClick: () => {},
    },
    actionButtonStyle: {
      background: "transparent",
      backgroundImage: "url(/assets/images/toast-cancel.png)",
      width: 24,
      height: 24
    },
    style: {
      border: "none",
      background: "#333",
      padding: 8,
      borderRadius: 8,
      gap: 8,
      color: "red",
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "400",
      width: "300px"
    },
    icon: <ToastIconFail />
  })
}