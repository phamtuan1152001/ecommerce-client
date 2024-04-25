"use client"

import React, { useState } from "react";
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
import { sendCode } from "@/lib/api/authenticate";

const phoneRegex = /([\+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/;

const formSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  })
    .min(2, {
      message: "Email hoặc số điện thoại phải có ít nhất 2 kí tự!",
    })
    .email({
      message: "Xin vui lòng nhập đúng định dạng email!"
    })
})

interface Props {
  // setOpen: (a:boolean) => void
  idTab: number,
  setOpen: any,
  onChangeEmail: (v: string) => void,
  onChangeUserId: (v: string) => void
}

const ForgotPassword = ({ idTab, setOpen, onChangeEmail, onChangeUserId }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: undefined
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { email } = values || {}
      onChangeEmail(email)
      setLoading(true)
      const req = {
        email
      }
      const res: {
        "retCode": number,
        "retText": string,
        "retData": {
          "userId": string
        }
      } = await sendCode(req)
      if (res.retCode === 0) {
        onChangeUserId(res.retData.userId)
        setOpen(4)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <React.Fragment>
      <HeaderTitle
        title="Forgot password"
        description="Please enter your email here to receive the password reset OTP code."
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
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter email"
                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="font-semibold text-base h-12 w-full text-white" disabled={loading}>Submit</Button>
        </form>
      </Form>
      <div className="mt-8">
        <h4 className="text-center text-base font-normal text-textColor-description">
          Return to page?
          <span onClick={() => setOpen(1)} className="ml-2 text-textColor-login cursor-pointer">Sign In</span>
        </h4>
      </div>
    </React.Fragment>
  )
}

export default ForgotPassword