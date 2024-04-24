'use client'

import React from "react";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { DiaglogPopup } from "@/components/pop-up/dialog-popup";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// @constants
import { registerUser } from "@/lib/api/authenticate";
import { POST_SUCCESS, SUCCESS } from "@/constants";

// @svg
import { IconFail, IconSuccess } from "@/public/assets/svg";
import SlideInModal from "@/components/slide-in-modal";
import { phoneRegex } from "@/utility/common";

const formSchema = z.object({
  fullname: z
    .string()
    .min(1, { message: 'Please enter this field!' }),
  email: z
    .string()
    .min(1, { message: 'Please enter this field!' })
    .email({ message: 'Please enter a correct format of email!' }),
  phone: z
    .string()
    .min(1, { message: 'Please enter this field!' })
    .refine((data) => phoneRegex.test(data), {
      message: "Please, enter a correct format of phone number"
    }),
  usename: z
    .string()
    .min(1, { message: 'Please enter this field!' }),
  password: z
    .string()
    .min(1, { message: 'Please enter this field!' }),
});

interface Props {
  setOpen: any,
  onChange: (v: string) => void,
  onHandleChangeUserId: (v: string) => void
}

const SignUp = ({ setOpen, onChange, onHandleChangeUserId }: Props) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      usename: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { fullname, email, phone, usename, password } = values || {}
    onChange(email)
    try {
      const req = {
        fullName: fullname,
        email: email,
        phone: phone,
        username: usename,
        password: password,
        statusActive: 0,
        roles: ["user"]
      }
      const res: {
        retCode: number,
        retText: string,
        retData: {
          userId: string
        }
      } = await registerUser(req)
      // console.log("res", res);
      if (res?.retCode === 0) {
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "REGISTER SUCCESSFULLY",
          description: "Congratulation, you have been registed successfully",
          textButtonOk: "Active account",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[1024px]:w-[380px]",
          onSubmit: () => {
            // window.location.reload()
            onHandleChangeUserId(res?.retData?.userId)
            setOpen(3)
            SlideInModal.hide()
          },
          onCancle: () => { }
        })
      } else {
        DiaglogPopup({
          icon: <IconFail />,
          title: "REGISTER UNSUCCESSFULLY",
          description: "Please, try again later",
          textButtonOk: "Try again",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[1024px]:w-[380px]",
          onSubmit: () => {
            SlideInModal.hide()
          },
          onCancle: () => { }
        })
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
      DiaglogPopup({
        icon: <IconFail />,
        title: "SYSTEM ERROR",
        description: (err as any).retText,
        textButtonOk: "Close",
        textButtonCancel: "",
        isBtnCancel: false,
        closeOnClickOverlay: false,
        className: "max-[1024px]:w-[380px]",
        onSubmit: () => {
          SlideInModal.hide()
        },
        onCancle: () => { }
      })
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className=" flex flex-col gap-y-6">
            <div className=" w-full">
              <FormField
                control={form.control}
                name='fullname'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-sm font-bold text-[#333333] after:content-["*"] after:text-[#FF4842] after:ml-0.5'>
                      Fullname
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Enter your fullname'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-full">
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-sm font-bold text-[#333333] after:content-["*"] after:text-[#FF4842] after:ml-0.5'>
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Enter your email'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-full">
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-sm font-bold text-[#333333] after:content-["*"] after:text-[#FF4842] after:ml-0.5'>
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Enter your phone'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-full">
              <FormField
                control={form.control}
                name='usename'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-sm font-bold text-[#333333] after:content-["*"] after:text-[#FF4842] after:ml-0.5'>
                      Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Enter your username'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className=" w-full">
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-sm font-bold text-[#333333] after:content-["*"] after:text-[#FF4842] after:ml-0.5'>
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        type="password"
                        placeholder='Enter your password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className=" mt-8 ">
            <Button className=" w-full py-6 px-6 text-base rounded-[8px] bg-[#333333] text-[#FFFFFF]">Create account</Button>
          </div>
        </form>
      </Form>
    </div>

  )
}

export default SignUp