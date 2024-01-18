"use client"

import React from "react";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


// @components
import HeaderTitle from "./components/HeaderTitle";

const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

const formSchema = z.object({
  email: z.string({
    required_error: "Name is required",
  })
    .min(2, {
      message: "Email hoặc số điện thoại phải có ít nhất 2 kí tự!",
    })
    .email({
      message: "Xin vui lòng nhập đúng định dạng email!"
    })
  // .refine((data) => phoneRegex.test(data), {
  //   message: "Xin vui lòng nhập đúng định dạng số điện thoại"
  // })
})

interface Props {
  // setOpen: (a:boolean) => void
  idTab: number,
  setOpen: any
}

const ForgotPassword = ({ idTab, setOpen }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <React.Fragment>
      <HeaderTitle
        title="Quên mật khẩu"
        description="Vui lòng nhập email hoặc số điện thoại của bạn ở đây để nhận hướng dẫn đặt lại mật khẩu."
        idTab={idTab}
        setOpen={setOpen}
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={"text-sm font-bold text-textColor-title required-label"}
                >
                  Email / số điện thoại
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Nhập email hoặc số điện thoại"
                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="font-semibold text-base h-12 w-full text-white" onClick={() => setOpen(3)}>Xác nhận</Button>
        </form>
      </Form>
      <div className="mt-8">
        <h4 className="text-center text-base font-normal text-textColor-description">
          Quay trở lại trang?
          <span onClick={() => setOpen(false)} className="ml-2 text-textColor-login cursor-pointer">Đăng nhập</span>
        </h4>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassword