'use client';

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams } from "next/navigation";

// @container
import { Container } from '@/components/ui/container';
import {
  Form,
} from '@/components/ui/form';
import BreadcrumbComponent from "@/components/bread-crumd";
import CheckoutInformation from "@/components/checkout/information/checkout-infomartion";
import { DiaglogMetamask } from "@/components/dialog-metamask";
import ContactForm from "@/components/checkout/form/contact-form";
import DeliveryAddressForm from "@/components/checkout/form/delivery-address-form";
import MethodPaymentForm from "@/components/checkout/form/method-payment-form";
import { DiaglogPopup } from "@/components/pop-up/dialog-popup";
import SlideInModal from "@/components/slide-in-modal";

// @validation
import { formSchema } from "@/validation/form-checkout";

// @api
import {
  getListProvinces,
  getListDistrictsAsProvincesId,
  getListWardsAsDistrictId
} from "@/lib/api/common";

// @constants
import {
  PAYMENT_MOMO_BANKING,
  PAYMENT_ATM_BANKING,
  PAYMENT_METAMASK
} from "@/constants";

// @utility
import { getUserInfo, getUserToken } from "@/utility/common";

// @api
import { getDetailCustomizedProductClient, updateStatusOrderCustomizedProduct } from "@/lib/api/customized-product";
import { createPaymentWithMOMO, createPaymentWithMOMOOrderCustomizedProduct } from "@/lib/api/payment";
import {
  createOrderCustomizedProductClient
} from "@/lib/api/order-customized-product";
// @svg
import { IconSuccess, IconFail, IconBackArrow } from "@/public/assets/svg";

// @types
import {
  CreateOrderCustomizedProductType,
  CustomizedProductType,
  CustomizedProductTypeResponse
} from "@/types";

const CheckoutCustomizedProduct = () => {
  const router = useRouter()
  const params = useSearchParams()

  const isAuthenticated = !!getUserToken()

  const [listProvinces, setListProvinces] = React.useState<{
    id: string,
    name: string,
    type: string
  }[]>([])
  const [listDistricts, setListDistricts] = React.useState<{
    id: string,
    name: string,
    type: string,
  }[]>([])
  const [listWards, setListWards] = React.useState<{
    id: string,
    name: string,
    type: string,
  }[]>([])

  const [methodPayment, setMethodPayment] = React.useState<string>("")
  const [isOpen, setIsOpen] = React.useState(false)
  const [orderId, setOrderId] = React.useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: getUserInfo().email,
      fullName: getUserInfo().fullName,
      phone: getUserInfo().phone,
      address: "",
      provinceId: "",
      districtId: "",
      wardId: "",
    },
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchGetListProvinces()
      fetchGetDetailCustomizedProduct()
    } else {
      window.location.href = "/"
    }
  }, [])

  const [loading, setLoading] = React.useState<boolean>(false)
  const [
    detailCustomized,
    setDetailCustomized
  ] = React.useState<CustomizedProductType>({
    _id: "",
    userId: "",
    code: "",
    name: "",
    quantity: 0,
    size: "",
    imageUrl: "",
    imagePsd: "",
    statusProductAdmin: 0,
    statusProductClient: 0,
    regularPrice: 0,
    totalPrice: 0,
    createdAt: "",
    statusOrder: false
  })

  const fetchGetDetailCustomizedProduct = async () => {
    try {
      setLoading(true)
      const customizedProductId = params.get("customizedProductId") || ""
      const req = {
        customizedProductId: customizedProductId
      }
      const res: {
        retCode: number,
        retText: string,
        retData: CustomizedProductType
      } = await getDetailCustomizedProductClient(req)
      // console.log("res", res)
      if (res?.retCode === 0) {
        setDetailCustomized(res?.retData)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    } finally {
      setLoading(false)
    }
  }

  const fetchGetListProvinces = async () => {
    try {
      const res: {
        results: {
          province_id: string,
          province_name: string,
          province_type: string
        }[]
      } = await getListProvinces()
      if (res.results.length > 0) {
        const lists = res.results.map((item) => {
          return {
            id: item.province_id,
            name: item.province_name,
            type: item.province_type
          }
        })
        setListProvinces(lists)
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const fetchGetListDistrictsAsProvincesId = async (id: string) => {
    try {
      const res: {
        results: {
          district_id: string,
          district_name: string,
          district_type: string,
          province_id: string
        }[]
      } = await getListDistrictsAsProvincesId(id)
      // console.log("res", res);
      if (res?.results.length > 0) {
        const lists = res.results.map((item) => {
          return {
            id: item.district_id,
            name: item.district_name,
            type: item.district_type,
          }
        })
        setListDistricts(lists)
      } else {
        return
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const fetchGetListWardsAsDistrictId = async (id: string) => {
    try {
      const res: {
        results: {
          district_id: string,
          ward_name: string,
          ward_type: string,
          ward_id: string
        }[]
      } = await getListWardsAsDistrictId(id)
      if (res?.results.length > 0) {
        const lists = res.results.map((item) => {
          return {
            id: item.ward_id,
            name: item.ward_name,
            type: item.ward_type,
          }
        })
        setListWards(lists)
      } else {
        return
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const handleLogicAfterCreateOrderSuccessfully = (type: number, orderId: string) => {
    if (type === 1) {
      setTimeout(() => {
        router.push("/")
      }, 500)
    } else if (type === 2) {
      router.push(
        `/customize-product/manage/order-detail?orderId=${orderId}`
      )
    } else if (type === 3) {
      createPaymentMomo(orderId)
    } else if (type === 4) {
      setOrderId(orderId)
      onOpenChange()
    } else {
      setTimeout(() => {
        router.push(
          `/customize-product/manage/order-detail?orderId=${orderId}`
        )
      }, 500)
    }
  }

  const createPaymentMomo = async (orderId: string) => {
    try {
      const req = {
        amount: JSON.stringify(detailCustomized.totalPrice),
        orderId: orderId,
        orderInfo: detailCustomized.name
      }
      const res: {
        retCode: number,
        retText: string,
        retData: string
      } = await createPaymentWithMOMOOrderCustomizedProduct(req)
      if (res.retCode === 0) {
        router.push(res?.retData)
      }
      // console.log("res", res);
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const renderTextButton = (type: string) => {
    switch (type) {
      case PAYMENT_ATM_BANKING:
        return "Banking transfer"
      case PAYMENT_MOMO_BANKING:
        return "MOMO transfer"
      case PAYMENT_METAMASK:
        return "Metamask payment"
      default:
        return "Back to homepage"
    }
  }

  const onOpenChange = () => {
    setIsOpen(!isOpen)
  }

  const fetchUpdateStatusOrderOfCustomizedProduct = async (
    code: string
  ) => {
    try {
      const req = {
        code: code
      }
      return await updateStatusOrderCustomizedProduct(req)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const req = {
        userId: getUserInfo().id,
        statusOrder: 0,
        paymentMethod: methodPayment,
        orderAddress: {
          ...values,
          fullAddress: `${values.address} ${listWards.find((item) => item.id === values.wardId)?.name} ${listDistricts.find((item) => item.id === values.districtId)?.name} ${listProvinces.find((item) => item.id === values.provinceId)?.name}`
        },
        customizedProductId: detailCustomized._id,
        customizedProduct: detailCustomized._id
      }
      // console.log("req", req);
      const res: {
        retCode: number,
        retText: string,
        retData: CreateOrderCustomizedProductType
      } = await createOrderCustomizedProductClient(req)
      if (res.retCode === 0) {
        fetchUpdateStatusOrderOfCustomizedProduct(
          detailCustomized.code
        )
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "ORDER CUSTOMIZED PRODUCT CREATION SUCCESSFULLY",
          description: "Your order has been successfully created",
          textButtonOk: renderTextButton(methodPayment),
          textButtonCancel: "Review order",
          isBtnCancel: methodPayment === PAYMENT_ATM_BANKING
            || methodPayment === PAYMENT_MOMO_BANKING
            || methodPayment === PAYMENT_METAMASK
            ? false : true,
          closeOnClickOverlay: false,
          className: "max-[1024px]:w-[380px]",
          onSubmit: () => {
            SlideInModal.hide()
            if (methodPayment === PAYMENT_METAMASK) {
              // setTotalPriceMetamask(detailCustomized.totalPrice)
              handleLogicAfterCreateOrderSuccessfully(4, res.retData._id)
            } else if (methodPayment === PAYMENT_MOMO_BANKING) {
              handleLogicAfterCreateOrderSuccessfully(
                methodPayment === PAYMENT_ATM_BANKING
                  ? 2
                  : methodPayment === PAYMENT_MOMO_BANKING ? 3 : 1
                , res.retData._id
              )
              // type = 1 back to home page
            } else {
              handleLogicAfterCreateOrderSuccessfully(2, res.retData._id)
            }
          },
          onCancle: () => {
            SlideInModal.hide()
            handleLogicAfterCreateOrderSuccessfully(2, res.retData._id)
            // type = 2 push to order detail page
          }
        })
      } else {
        DiaglogPopup({
          icon: <IconFail />,
          title: "CREATE ORDER CUSTOMIZED PRODUCT FAILED",
          description: "Your order has failed to be created",
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
    } catch (err) {
      console.log("FETCHING FAIL!", err)
      DiaglogPopup({
        icon: <IconFail />,
        title: "SYSTEM ERROR",
        description: "Please try again later",
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

    }
  }

  if (!isAuthenticated) {
    return null
  }
  // console.log("form", form.getValues());

  return (
    <div className='bg-[#F5F5F5] py-6 max-[1024px]:py-0'>
      {!!detailCustomized.totalPrice && (
        <DiaglogMetamask
          orderId={orderId}
          totalPrice={detailCustomized.totalPrice}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          redirectSuccess={`/customize-product/manage/thank?orderId=${orderId}`}
        />
      )}

      <div className=" pb-5 max-[1024px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Manage customized product",
              to: "/customize-product/manage"
            },
            {
              title: "Checkout customized product",
              to: `/customize-product/manage/checkout`
            }
          ]} />
        </Container>
      </div>

      <Container className="max-[1024px]:px-0">
        {/* Header Back Icon for mobile */}
        <div className='flex flex-row justify-between items-center min-[1280px]:hidden bg-white px-3 pt-2'>
          <button className='flex flex-col justify-center items-center bg-backgroundColor-buttonCommon w-10 h-10 rounded-full' onClick={() => router.back()}>
            <IconBackArrow />
          </button>
        </div>
        {/* End */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-5 gap-6 max-[1024px]:grid-cols-1 max-[1024px]:gap-0'>
              <div className='bg-white col-span-3 max-[1024px]:order-2'>
                <div className=' p-6 flex flex-col gap-y-12 max-[1024px]:gap-y-6 max-[1024px]:p-3'>
                  <ContactForm form={form} />

                  <DeliveryAddressForm
                    form={form}
                    listProvinces={listProvinces}
                    listDistricts={listDistricts}
                    listWards={listWards}
                    onGetListDistrictsAsProvincesId={
                      (v) => fetchGetListDistrictsAsProvincesId(v)
                    }
                    onGetListWardsAsDistrictId={
                      (v) => fetchGetListWardsAsDistrictId(v)
                    }
                  />

                  <MethodPaymentForm
                    onChangeMethodPayment={(v) => setMethodPayment(v)}
                  />

                </div>
              </div>
              <div className='col-span-2 max-[1024px]:order-1'>
                <CheckoutInformation
                  detailCustomizedProduct={detailCustomized}
                  loading={loading}
                />
              </div>
            </div>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default CheckoutCustomizedProduct;
