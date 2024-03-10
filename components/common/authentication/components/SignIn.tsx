'use client'

import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

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
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { DiaglogPopup } from "@/components/pop-up/dialog-popup";

import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// @action-cart
import { fetchCartRequest } from "@/redux/cart/actions";

// @action-open-dialog
import { closeDialog } from "@/redux/openDiaglog/action";

// @api
import { loginUser } from "@/lib/api/authenticate";
import apiMethod from "@/utility/ApiMethod";

// @constants
import { SUCCESS } from "@/constants";

// @svg
import { IconFail, IconSuccess } from "@/public/assets/svg";
import SlideInModal from "@/components/slide-in-modal";

// @type
import { UserInfoType } from "@/types";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Trường này là bắt buộc.' }),
  // .email({ message: 'Không đúng định dạng email.' }),
  password: z
    .string()
    .min(1, { message: 'Trường này là bắt buộc.' }),
  savepassword: z
    .boolean().default(false).optional(),
  // phone: z
  //   .string()
  //   .min(1, { message: 'Trường này là bắt buộc.' }),
});

interface Props {
  setOpen: any
}

const SignIn = ({ setOpen }: Props) => {
  const dispatch = useDispatch();
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      savepassword: false
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // console.log(values);
    const { username, password, savepassword } = values || {}
    try {
      const req = {
        username: username,
        password: password
      }
      const res: {
        retCode: number,
        retText: string,
        retData: UserInfoType
      } = await loginUser(req)
      console.log("res", res)
      if (res?.retCode === 0) {
        const user_info = {
          savepassword,
          ...res?.retData
        }
        localStorage.setItem("USER_INFO", JSON.stringify(user_info))
        apiMethod.defaults.headers.common["Authorization"] = res.retData.accessToken;
        dispatch(fetchCartRequest({
          userId: res.retData.id
        }));
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "ĐĂNG NHẬP THÀNH CÔNG",
          description: "Chúc mừng bạn đã đăng nhập thành công",
          textButtonOk: "Tiếp tục mua sắm",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[768px]:w-[380px]",
          onSubmit: () => {
            dispatch(closeDialog())
            SlideInModal.hide()
            window.location.href = "/"
            // router.refresh()
          },
          onCancle: () => { }
        })
      } else {
        DiaglogPopup({
          icon: <IconFail />,
          title: "ĐĂNG NHẬP THẤT BẠI",
          description: res.retText,
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
      console.log("FETCH FAIL!", err);
      DiaglogPopup({
        icon: <IconFail />,
        title: "LỖI HỆ THỐNG",
        description: (err as any).retText,
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
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className=' text-sm font-bold text-[#333333] after:content-["*"] after:text-[#FF4842] after:ml-0.5'>
                      Tên tài khoản
                    </FormLabel>
                    <FormControl>
                      <Input
                        className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                        placeholder='Nhập tài khoản'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* <div className=" w-full">
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
              </div> */}
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
          <div className=" mt-2 flex items-center gap-x-1.5 ">
            <FormField
              control={form.control}
              name="savepassword"
              render={({ field }) => (
                <FormItem className=" flex items-center">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className=" h-[18px] w-[18px] rounded-[6px] border-[#BFBFBF]"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <p>Nhớ mật khẩu</p>
          </div>
          <div className=" mt-8 flex flex-col">
            <Button className=" py-6 px-6 text-base rounded-[8px] bg-[#333333] text-[#FFFFFF]">Sign In</Button>
            <Button onClick={() => setOpen(2)} className=" mt-6 py-6 px-6 text-base rounded-[8px] bg-white text-black hover:bg-white">Quên mật khẩu</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignIn