"use client"

import { Container } from "@/components/ui/container"
import PaymentPolicy from "@/components/section/policy/payment-policy"
import ComplainPolicy from "@/components/section/policy/complain-policy"
import ShippmentPolicy from "@/components/section/policy/shipment-policy"
import RefundPolicy from "@/components/section/policy/refund-policy"
import MaintainPolicy from "@/components/section/policy/maintain-policy"
import CheckPolicy from "@/components/section/policy/check-policy"
import ProtectionPolicy from "@/components/section/policy/protection-policy"
import { useParams } from "next/navigation"

const Policy = () => {
  const {policy} = useParams()
  // console.log(policy);
  
  const renderPolicy = (type: string  | string[]) => {
    switch (type) {
      case "chinh-sach-xu-li-khieu-nai":
        return <ComplainPolicy />
      case "chinh-sach-van-chuyen-va-giao-nhan":
        return <ShippmentPolicy />
      case "chinh-sach-doi-tra-va-hoan-tien":
        return <RefundPolicy />
      case "chinh-sach-bao-hanh":
        return <MaintainPolicy />
      case "chinh-sach-kiem-hang":
        return <CheckPolicy />
      case "chinh-sach-bao-mat-thong-tin":
        return <ProtectionPolicy/>
      default:
        return <PaymentPolicy/>
    }
  }
  return (
    <Container className="py-12">
      {renderPolicy(policy)}
    </Container>
  )
}

export default Policy

