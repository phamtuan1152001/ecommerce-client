'use client'

import React from "react";

// @ts-ignore  
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';

import {
  Form,
  FormControl,
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

// @action-cart
import { fetchCartRequest } from "@/redux/cart/actions";

// @action-open-dialog
import { closeDialog } from "@/redux/openDiaglog/action";

// @action-notification
import { getListNotification } from "@/redux/notification/actions";

// @api
import { loginUser } from "@/lib/api/authenticate";
import apiMethod from "@/utility/ApiMethod";

// @svg
import { IconFail, IconSuccess } from "@/public/assets/svg";
import SlideInModal from "@/components/slide-in-modal";

// @type
import { UserInfoType } from "@/types";

// @constants
import { PAGE_LIMIT, PAGE_NUMBER } from "@/constants";

const formSchema = z.object({
  username: z
    .string()
    .min(1, { message: 'Please enter this field!' }),
  password: z
    .string()
    .min(1, { message: 'Please enter this field!' }),
  savepassword: z
    .boolean().default(false).optional(),
});

interface Props {
  setOpen: any,
  onChange: (v: string) => void,
  onHandleChangeUserId: (v: string) => void
}

const SignIn = ({ setOpen, onChange, onHandleChangeUserId }: Props) => {
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
      // console.log("res", res)
      if (res?.retCode === 0) {
        const user_info = {
          savepassword,
          ...res?.retData
        }
        localStorage.setItem("USER_INFO", JSON.stringify(user_info))
        apiMethod.defaults.headers.common["Authorization"] = res.retData.accessToken;
        /* Get list cart redux */
        dispatch(fetchCartRequest({
          userId: res.retData.id
        }));
        /* End */
        /* Get list notification */
        const req = {
          page: PAGE_NUMBER,
          size: PAGE_LIMIT,
          userId: res.retData.id
        }
        dispatch(getListNotification(req))
        /* End */
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "LOGIN SUCCESSFULLY",
          description: "Congratulation, you have been login successfully",
          textButtonOk: "Continue for shopping",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[1024px]:w-[380px]",
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
          title: "LOGIN UNSUCCESSFULLY",
          description: res.retText,
          textButtonOk: "Active account",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[1024px]:w-[380px]",
          onSubmit: () => {
            SlideInModal.hide()
            setOpen(3)
            onChange(res?.retData.email)
            onHandleChangeUserId((res as any).retData.userId)
          },
          onCancle: () => { }
        })
      }
    } catch (err) {
      // console.log("FETCH FAIL!", err);
      DiaglogPopup({
        icon: <IconFail />,
        title: "LOGIN UNSUCCESSFULLY",
        description: (err as any).retText,
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
          <div className=" mt-8 flex flex-col gap-y-4">
            <Button className=" py-6 px-6 text-base rounded-[8px] bg-[#333333] text-[#FFFFFF]">Sign In</Button>
            <h3 className="text-center font-normal text-base">Do you forgot your password?</h3>
            <Button onClick={() => setOpen(2)} className="p-0 text-base rounded-[8px] bg-white text-black hover:bg-white hover:underline hover:underline-offset-4">
              Forgot password
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default SignIn