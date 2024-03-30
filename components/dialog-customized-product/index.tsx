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

interface DialogCustomizedProductProps {
  isOpen: boolean,
  handleOpen: () => void,
}

const DialogCustomizedProduct = ({
  isOpen,
  handleOpen
}: DialogCustomizedProductProps) => {
  const [isOnSale, setIsOnSale] = useState<boolean>(false)
  const [regularPrice, setRegularPrice] = useState("")
  // 1. Define your form.
  const form = useForm<z.infer<typeof formCustomizedProductSchema>>({
    resolver: zodResolver(formCustomizedProductSchema),
    defaultValues: {
      code: undefined,
      name: undefined,
      regularPrice: undefined,
      status: undefined,
      onSale: false,
      salePrice: undefined,
      dateOnSaleFrom: undefined,
      dateOnSaleTo: undefined
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formCustomizedProductSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  // console.log("isOnSale", isOnSale)
  // console.log("data", form.getValues())
  return (
    <Dialog open={isOpen} onOpenChange={handleOpen}>
      <DialogContent className="sm:max-w-[825px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-widest uppercase">Create customized product</DialogTitle>
          <DialogDescription className="text-base font-normal tracking-widest">
            Please, filling information below to finish creating your customized product.
          </DialogDescription>
        </DialogHeader>
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
                      <Input placeholder="Code of product" {...field} />
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
      </DialogContent>
    </Dialog>
  )
}

export default DialogCustomizedProduct