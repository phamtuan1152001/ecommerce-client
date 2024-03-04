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
import { postUserRegister } from "@/lib/api/authenticate";
import { POST_SUCCESS, SUCCESS } from "@/constants";

// @svg
import { IconFail, IconSuccess } from "@/public/assets/svg";
import SlideInModal from "@/components/slide-in-modal";

const formSchema = z.object({
  fullname: z
    .string(),
  email: z
    .string()
    .min(1, { message: 'Trường này là bắt buộc.' })
    .email({ message: 'Không đúng định dạng email.' }),
  phone: z
    .string()
    .min(1, { message: 'Trường này là bắt buộc.' }),
  usename: z
    .string()
    .min(1, { message: 'Trường này là bắt buộc.' }),
  password: z
    .string()
    .min(1, { message: 'Trường này là bắt buộc.' }),
});

const SignUp = () => {

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
    try {
      const req = {
        fullName: fullname,
        username: usename,
        email: email,
        password: password,
        phone: phone
      }
      const res = await postUserRegister(req)
      // console.log("res", res);
      if (res?.statusCode === SUCCESS) {
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "ĐĂNG KÝ THÀNH CÔNG",
          description: "Chúc mừng bạn đã đăng ký tài khoản mới thành công",
          textButtonOk: "Về trang chủ",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[768px]:w-[380px]",
          onSubmit: () => {
            window.location.reload()
          },
          onCancle: () => { }
        })
      } else {
        const errors = res["errors"]
        // console.log(errors);
        for (const key in errors) {
          const field: any = key
          form.setError(field, {
            type: "onChange",
            message: res?.errors[`${key}`]
          }, {
            shouldFocus: true
          })
        }
        DiaglogPopup({
          icon: <IconFail />,
          title: "ĐĂNG KÝ THẤT BẠI",
          description: res?.message,
          textButtonOk: "Thử lại",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[768px]:w-[380px]",
          onSubmit: () => {
            SlideInModal.hide()
          },
          onCancle: () => { }
        })
      }
    } catch (err) {
      // console.log("FETCH FAIL!", err);
      DiaglogPopup({
        icon: <IconFail/>,
        title: "LỖI HỆ THỐNG",
        description: "Vui lòng thử lại sau",
        textButtonOk: "Đóng",
        textButtonCancel: "",
        isBtnCancel: false,
        closeOnClickOverlay: false,
        className: "max-[768px]:w-[380px]",
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
                      Họ và tên
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Nhập Họ và tên'
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
                        placeholder='Nhập email'
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
                      Điện thoại
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Nhập số điện thoại'
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
                      Tên tài khoản
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Nhập tên tài khoản'
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
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        type="password"
                        placeholder='Nhập mật khẩu'
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
            <Button className=" w-full py-6 px-6 text-base rounded-[8px] bg-[#333333] text-[#FFFFFF]">Tạo tài khoản</Button>
          </div>
        </form>
      </Form>
    </div>

  )
}

export default SignUp