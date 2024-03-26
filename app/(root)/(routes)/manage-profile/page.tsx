"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ethers, BrowserProvider, parseUnits, parseEther } from "ethers"
import axios from "axios"

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
import { Container } from "@/components/ui/container"
import { useState } from "react"

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  ether: z.string(),
})

const ManageProfile = () => {
  const [error, setError] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      ether: ""
    },
  })

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
      console.log("data", { ether, addr })
      Promise.resolve(tx).
        then(data => {
          console.log("data tx", data)
        })
        .catch(error => {
          // console.log("err", error.message);
          const regex = /user rejected action/;
          const result = error.message.match(regex);
          setError(/* error.message */result)
        })
      // console.log("tx", tx);
    } catch (err) {
      setError((err as any)?.message)
      console.log("FETCHING FAIL!", (err as any).message);
    }
  }

  async function getUsdToVndExchangeRate() {
    try {
      const response = await axios.get('https://open.er-api.com/v6/latest/USD');
      const usdToVndExchangeRate = response.data.rates.VND;
      return usdToVndExchangeRate;
    } catch (error) {
      console.error('Error fetching USD to VND exchange rate:', error);
      return null;
    }
  }

  async function getEthExchangeRate() {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
      const ethExchangeRate = response.data.ethereum.usd;
      return ethExchangeRate;
    } catch (error) {
      console.error('Error fetching ETH exchange rate:', error);
      return null;
    }
  }

  function usdToEth(usdAmount: number, ethRate: any) {
    return usdAmount / ethRate;
  }

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setError("")
    // console.log(values)
    const ethRate = await getEthExchangeRate();
    const vndRate = await getUsdToVndExchangeRate()
    const usdAmount = 25000 / vndRate
    const ethAmount = usdToEth(usdAmount, ethRate).toFixed(10);
    // console.log(`${usdAmount} USD is equivalent to ${ethAmount} ETH.`);
    await startPayment({
      ether: ethAmount.toString(),
      addr: values?.address
    })
  }

  return (
    <div className="bg-[#F5F5F5] py-6 max-[1024px]:py-0">
      <Container>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Recipient address" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ether"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Amount in ETH" {...field} />
                  </FormControl>
                  {/* <FormDescription>
                    This is your public display name.
                  </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {!!error && (<h1>{error}</h1>)}
      </Container>
    </div>
  )
}

export default ManageProfile