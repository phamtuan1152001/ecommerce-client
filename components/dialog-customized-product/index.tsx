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
import { formatNumber } from "@/utility/common"
import { convertImageToPsd, uploadImgProduct } from "@/lib/api/common"
import Spinner from "../spin"

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
  const [isOnSale, setIsOnSale] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingConvert, setLoadingConvert] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formCustomizedProductSchema>>({
    resolver: zodResolver(formCustomizedProductSchema),
    defaultValues: {
      code: `ECOM-U1`,
      name: undefined,
      regularPrice: undefined,
      status: "draft",
      onSale: false,
      salePrice: undefined,
      dateOnSaleFrom: undefined,
      dateOnSaleTo: undefined
    },
  })

  function onSubmit(values: z.infer<typeof formCustomizedProductSchema>) {
    console.log(values)
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
    psdImage: string /* https://eu-central.storage.cloudconvert.com/tasks/9791b880-42b5-4339-8d8d-85371833fe08/brvn0id9lu74jetmchxm.psd?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=cloudconvert-production%2F20240330%2Ffra%2Fs3%2Faws4_request&X-Amz-Date=20240330T172204Z&X-Amz-Expires=86400&X-Amz-Signature=c4556504739bee6deee842108e03dc9ab490d3eb866be5358413f7a8419b256d&X-Amz-SignedHeaders=host&response-content-disposition=attachment%3B%20filename%3D%22brvn0id9lu74jetmchxm.psd%22&response-content-type=image%2Fvnd.adobe.photoshop&x-id=GetObject */,
    values: z.infer<typeof formCustomizedProductSchema>
  ) => {
    try {
      console.log("data", { urlImage, psdImage, values })
    } catch (err) {
      console.log("FETCHING FAIL!", err)
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
                    name="regularPrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel
                          className='text-sm font-bold text-[#333333]'
                        >
                          Regular price:
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Regular price of product"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Regular price: {formatNumber(field.value)} VND
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='status'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-sm font-bold text-[#333333]'>
                          Status:
                        </FormLabel>
                        <SelectionComponent
                          datas={[
                            {
                              id: "draft",
                              name: "Draft",
                              type: ""
                            },
                            {
                              id: "publish",
                              name: "Publish",
                              type: ""
                            },
                          ]}
                          placeholder="Select status of product"
                          value={field.value}
                          onChange={(value) => {
                            // console.log("v", value)
                            field.onChange(value)
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="onSale"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex flex-row justify-start items-center gap-x-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              onClick={() => {
                                if (isOnSale) {
                                  setIsOnSale(false)
                                  form.setValue("salePrice", undefined)
                                  form.setValue("dateOnSaleFrom", undefined)
                                  form.setValue("dateOnSaleTo", undefined)
                                } else {
                                  setIsOnSale(true)
                                }
                              }}
                            />
                          </FormControl>
                          <div className="">
                            <FormLabel className='text-sm font-bold text-[#333333]'>
                              On sale
                            </FormLabel>
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {isOnSale && (
                    <>
                      <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className='text-sm font-bold text-[#333333]'
                            >
                              Sale price:
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Sale price of product"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Sale price: {formatNumber(field.value)} VND
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateOnSaleFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className='text-sm font-bold text-[#333333]'
                            >
                              Date on sale from:
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Date on sale from of product"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="dateOnSaleTo"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel
                              className='text-sm font-bold text-[#333333]'
                            >
                              Date on sale to:
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Date on sale to of product"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
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