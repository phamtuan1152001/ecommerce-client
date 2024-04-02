"use client"
import React, { useState } from "react"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { formCustomizedProductSchema } from "@/validation/form-customized-product"

// @components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import SelectionComponent from "@/components/form/selection-component"
import { Checkbox } from "@/components/ui/checkbox"
import { formatNumber, getUserInfo } from "@/utility/common"
import { convertImageToPsd, uploadImgProduct } from "@/lib/api/common"
import Spinner from "../spin"
import { SIZE_LIST, SUCCESS } from "@/constants"
import { createCustomizedProduct } from "@/lib/api/customized-product"
import { CustomizedProductTypePayload, CustomizedProductTypeResponse } from "@/types"
import { IconSuccess, IconFail } from "@/public/assets/svg"
import { DiaglogPopup } from "../pop-up/dialog-popup"
import { useRouter } from "next/navigation"
import SlideInModal from "../slide-in-modal"

interface DialogCustomizedProductProps {
  isOpen: boolean,
  handleOpen: () => void,
  canvasBase64: string
}

const DialogCustomizedProduct = ({
  isOpen,
  handleOpen,
  canvasBase64
}: DialogCustomizedProductProps) => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [loadingConvert, setLoadingConvert] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formCustomizedProductSchema>>({
    resolver: zodResolver(formCustomizedProductSchema),
    defaultValues: {
      code: `ECOM-U1`,
      name: undefined,
      quantity: undefined,
      size: "1"
    },
  })

  function onSubmit(values: z.infer<typeof formCustomizedProductSchema>) {
    // console.log(values)
    fetchUploadImg(canvasBase64, values)
  }

  const fetchUploadImg = async (
    img: string,
    values: z.infer<typeof formCustomizedProductSchema>
  ) => {
    if (img) {
      try {
        setLoading(true);
        const req = {
          data: img
        }
        const res = await uploadImgProduct(req);

        if (res?.status === 200) {
          const imageRes = {
            uid: res?.data?.version_id,
            url: res?.data?.secure_url,
            name: "haha"
          };
          // console.log("imageRes", imageRes)
          fetchConvertImgToPSD(imageRes, values)
        }

      } catch (err) {
        console.log("FETCH FAIL!", err);
      } finally {
        setLoading(false);
      }
    }
  }

  const fetchConvertImgToPSD = async (
    imageRes: {
      uid: string,
      url: string,
      name: string
    },
    values: z.infer<typeof formCustomizedProductSchema>
  ) => {
    try {
      setLoadingConvert(true);
      const req = {
        urlImage: imageRes.url,
        fileNameImage: imageRes.name
      }
      const res = await convertImageToPsd(req)
      // console.log("res", res)
      if (res?.retCode === 0) {
        const imagePsd = res?.retData?.tasks?.find((item: any) => item?.name === "export-1")?.result?.files[0]?.url
        fetchCreateCustomizedProduct(imageRes?.url, imagePsd, values)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoadingConvert(false);
    }
  }

  const fetchCreateCustomizedProduct = async (
    urlImage: string,
    psdImage: string,
    values: z.infer<typeof formCustomizedProductSchema>
  ) => {
    try {
      const req: CustomizedProductTypePayload = {
        userId: getUserInfo().id,
        code: values.code,
        name: values.name,
        size: SIZE_LIST.find(item => item.id === values.size)?.name,
        quantity: parseInt(values.quantity),
        regularPrice: 0,
        totalPrice: 0,
        imageUrl: urlImage,
        imagePsd: psdImage,
        statusProductAdmin: 0,
        statusProductClient: 0
      }
      const res: {
        retCode: number,
        retText: string,
        retData: CustomizedProductTypeResponse
      } = await createCustomizedProduct(req)
      if (res.retCode === 0) {
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "CREATE CUSTOMIZED PRODUCT SUCCESSFULLY",
          description: "Your customized product has been successfully created",
          textButtonOk: "Come back to Homepage",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[1024px]:w-[380px]",
          onSubmit: () => {
            SlideInModal.hide()
            router.push("/")
          },
          onCancle: () => { }
        })
      } else {
        DiaglogPopup({
          icon: <IconFail />,
          title: "CREATE CUSTOMIZED PRODUCT UNSUCCESSFULLY",
          description: "Your customized product has been unsuccessfully created",
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
      // console.log("data", req)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
      DiaglogPopup({
        icon: <IconFail />,
        title: "System error",
        description: "Please, try again later",
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">Create customized product</DialogTitle>
          <DialogDescription className="text-base font-normal tracking-widest">
            Please, filling information below to finish creating your customized product.
          </DialogDescription>
        </DialogHeader>
        <div className="relative p-3">
          <Spinner spinning={loading || loadingConvert}>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className='text-sm font-bold text-[#333333]'
                        >
                          Code:
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Code of product" {...field} disabled />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className='text-sm font-bold text-[#333333]'
                        >
                          Name:
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Name of product" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className='text-sm font-bold text-[#333333]'
                        >
                          Quantity:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Quantity of product"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='size'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className=' text-sm font-bold text-[#333333]'>
                          Size:
                        </FormLabel>
                        <SelectionComponent
                          datas={SIZE_LIST}
                          placeholder="Select size of product"
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </Spinner>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustomizedProduct