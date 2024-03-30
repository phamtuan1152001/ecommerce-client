import * as z from "zod"
import { phoneRegex } from "@/utility/common"

export const formCustomizedProductSchema = z.object({
  code: z.string({
    required_error: "Please enter your code of product"
  }),
  name: z.string({
    required_error: "Please enter your name of product"
  }),
  regularPrice: z.string({
    required_error: "Please enter your regular price of product"
  }),
  status: z.string({
    required_error: "Please select your status of product"
  }),
  onSale: z.boolean(),
  salePrice: z.string().optional(),
  dateOnSaleFrom: z.string().optional(),
  dateOnSaleTo: z.string().optional()
}).superRefine(({onSale, salePrice, dateOnSaleFrom, dateOnSaleTo}, ctx) => {
  if (onSale) {
    if (!salePrice) {
      ctx.addIssue({
        code: "custom",
          message: "Please enter your sale price of product",
          path: ["salePrice"]
      })
    }

    if (!dateOnSaleFrom) {
      ctx.addIssue({
        code: "custom",
          message: "Please select your date on sale from",
          path: ["dateOnSaleFrom"]
      })
    }

    if (!dateOnSaleTo) {
      ctx.addIssue({
        code: "custom",
          message: "Please select your date on sale to",
          path: ["dateOnSaleTo"]
      })
    }
    
  }
})