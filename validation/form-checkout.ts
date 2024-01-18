import * as z from "zod"
import { phoneRegex } from "@/utility/common"

export const formSchema = z.object({
  email: z.string({
      required_error: "Vui lòng nhập Email"
    })
    .email("Vui lòng nhập đúng định dạng email")
    .max(250, {
      message: "Email phải nhỏ hơn 250 kí tự"
    }),
  fullName: z.string({
      required_error: "Vui lòng nhập Họ và tên"
    })
    // .email("Vui lòng nhập đúng định dạng email")
    .max(250, {
      message: "Họ và tên phải nhỏ hơn 250 kí tự"
    }),
  phone: z.string({
      required_error: "Vui lòng nhập Số điện thoại"
    })
    .refine((data) => phoneRegex.test(data), {
      message: "Vui lòng nhập đúng định dạng số điện thoại"
    }),
  provinceId: z.string({
    required_error: "Vui lòng chọn Tỉnh/Thành phố"
  }),
  districtId: z.string({
    required_error: "Vui lòng chọn Quận/Huyện"
  }),
  wardId: z.string({
    required_error: "Vui lòng chọn Phường/Xã"
  }),
  address: z.string({
    required_error: "Vui lòng nhập Địa chỉ"
  }),
  fullNameSender: z.string(),
  phoneReceiver: z.string(),
  fullNameReceiver: z.string(),
  description: z.string(),
  saveInfo: z.boolean().default(false).optional()
})