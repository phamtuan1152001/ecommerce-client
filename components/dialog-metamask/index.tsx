"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { BrowserProvider, parseEther } from "ethers"
import { useRouter } from "next/navigation"

// @components
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { DiaglogPopup } from "../pop-up/dialog-popup"

// @service
import { getUsdToVndExchangeRate, getEthExchangeRate } from "@/lib/api/common"

// @utility
import { usdToEth } from "@/utility/common"

// @constants
import { IconSuccess } from "@/public/assets/svg"
import { WALLET_ADDRESS_OWNER } from "@/constants"
import SlideInModal from "../slide-in-modal"

interface DiaglogMetamaskProps {
  isOpen: boolean,
  totalPrice: number,
  orderId: string,
  onOpenChange: () => void
}

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ether: z.string(),
})

export function DiaglogMetamask({
  isOpen,
  orderId,
  totalPrice,
  onOpenChange
}: DiaglogMetamaskProps) {
  const [error, setError] = useState<string>("");

  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      ether: ""
    },
  })

  useEffect(() => {
    onInitData()
  }, [])

  const onInitData = async () => {
    const ethRate = await getEthExchangeRate();
    const vndRate = await getUsdToVndExchangeRate()
    const usdAmount = totalPrice / vndRate
    const ethAmount = usdToEth(usdAmount, ethRate).toFixed(10);

    form.setValue("address", WALLET_ADDRESS_OWNER)
    form.setValue("ether", ethAmount)
  }

  const startPayment = async ({ ether, addr }: {
    ether: string,
    addr: string
  }) => {
    try {
      if (!(window as any).ethereum)
        throw new Error("No crypto wallet found, Please install it.")
      await (window as any)?.ethereum?.send("eth_requestAccounts")
      const provider = new BrowserProvider((window as any)?.ethereum)
      const signer = await provider.getSigner()
      await provider._getAddress(addr)
      const tx = (await signer).sendTransaction({
        to: addr,
        value: parseEther(ether)
      })
      // console.log("data", { ether, addr })
      Promise.resolve(tx).
        then(data => {
          // console.log("data tx", data)
          if (Object.keys(data).length > 0) {
            DiaglogPopup({
              icon: <IconSuccess />,
              title: "Pay order successfully!",
              description: "Your order has been successfully paid",
              textButtonOk: "Continue",
              textButtonCancel: "",
              isBtnCancel: false,
              closeOnClickOverlay: false,
              className: "max-[1024px]:w-[380px]",
              onSubmit: () => {
                SlideInModal.hide()
                router.push(`/thank?orderId=${orderId}`)
              },
              onCancle: () => { }
            })
          }
        })
        .catch(error => {
          // console.log("err", error.message);
          const regex = /user rejected action/;
          const result = error.message.match(regex);
          setError(/* error.message */result)
        })
    } catch (err) {
      setError((err as any)?.message)
      console.log("FETCHING FAIL!", (err as any).message);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("")
    // console.log(values)
    await startPayment({
      ether: values?.ether,
      addr: values?.address
    })
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[750px] bg-[#F5F5F5]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-widest">Payment with Metamask</DialogTitle>
          <DialogDescription className="text-lg font-normal tracking-widest">
            Check your balance and click submit to start pay your order via Metamask app. Please check <span className="font-bold text-xl">Etherscan</span> to confirm that you have successfully send to wallet below
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold tracking-widest">To address</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base font-bold tracking-widest"
                      disabled={true}
                      placeholder="Address wallet"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ether"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-bold tracking-widest">Amount in ETH</FormLabel>
                  <FormControl>
                    <Input
                      className="text-base font-bold tracking-widest"
                      disabled={true}
                      placeholder="Amount in ETH"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-row justify-end items-center">
              <Button className="text-base font-normal tracking-widest" type="submit">Submit</Button>
            </div>
          </form>
        </Form>
        {!!error && (<h1 className="bg-red-200 p-4 rounded-lg text-base font-bold tracking-widest text-red-600">{error}</h1>)}
      </DialogContent>
    </Dialog>
  )
}