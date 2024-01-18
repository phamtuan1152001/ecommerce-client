"use client"

import React from "react";
import moment from "moment"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

// @components
import HeaderTitle from "./components/HeaderTitle";
import OptFieldInput from "./components/OtpInput";
import ErrorBox from "./components/ErrorBox";
import BoxConfirm from "./components/BoxConfirm";

// @hooks
import { useCountDown } from "../../../hooks/useCountDown"

const formSchema = z.object({
  otp: z.string()
    .min(4, {
      message: "Mã OTP phải có ít nhất 2 kí tự!",
    })
})

interface Props {
  // setOpen: (a:boolean) => void
  setOpen: any,
  idTab: number
}

const OtpConfirm = ({ idTab, setOpen }: Props) => {
  const [isError, setIsError] = React.useState(false)
  const [isStart, setIsStart] = React.useState(!false)
  const [isRefresh, setIsRefresh] = React.useState(false)
  const [isOpen, setIsOpen] = React.useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      otp: "",
    },
  })

  const countDown = useCountDown({
    isStart,
    initValue: 1000 * 60 * 5,
    isRefresh
  });

  React.useEffect(() => {
    if (!countDown) {
      setIsStart(false);
    } else {
      onStartCount()
    }
  }, [countDown]);

  const getTimeString = (time = 0) => {
    return `${moment.duration(time).minutes() < 10
      ? "0" + moment.duration(time).minutes()
      : moment.duration(time).minutes()
      }:${moment.duration(time).seconds() < 10
        ? "0" + moment.duration(time).seconds()
        : moment.duration(time).seconds()
      }`;
  };

  const getTimeMinutes = (time = 0) => {
    return `${moment.duration(time).minutes() < 10
      ? "0" + moment.duration(time).minutes()
      : moment.duration(time).minutes()
      }`
  }

  const onStartCount = () => {
    setIsStart(true);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
    // test
    setTimeout(() => {
      setIsError(true)
    }, 1000)
    setTimeout(() => {
      setIsOpen(true)
    }, 2000)
  }

  return (
    <React.Fragment>
      <HeaderTitle
        title="MÃ XÁC THỰC"
        description="Hãy kiểm tra email của bạn. Chúng tôi gửi mã xác nhận đến email linh123@gmail.com"
        idTab={idTab}
        setOpen={setOpen}
      />
      <div className="mt-8">
        <h3 className="text-center text-base font-normal text-textColor-description">{getTimeString(countDown)}</h3>
      </div>

      <div className="mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <OptFieldInput {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
              }}
            />
            <Button type="submit" className="font-semibold text-base h-12 w-full text-white">Xác nhận</Button>
          </form>
        </Form>
      </div>

      <div className="mt-8">
        <h4 className="text-center text-base font-normal text-textColor-description">
          Gửi mã xác thực sẽ kết thúc sau {getTimeMinutes(countDown)} phút.
        </h4>
        <h4 className="text-center text-base font-normal text-textColor-description">
          Bạn chưa nhận được mã xác thực?
          <span className="ml-2 cursor-pointer font-bold">Gửi lại mã</span>
        </h4>
      </div>

      <div className="mt-8 mb-6">
        <h4 className="text-center text-base font-normal text-textColor-description">
          Quay trở lại trang?
          <span className="ml-2 text-textColor-login cursor-pointer">Đăng nhập</span>
        </h4>
      </div>

      <ErrorBox isError={isError} onClose={() => setIsError(false)} />

      {/* <BoxConfirm
        isOpen={isOpen}
        onOpenChange={() => setIsOpen(!isOpen)}
        title=""
        description=""
      /> */}
    </React.Fragment>
  )
}

export default OtpConfirm