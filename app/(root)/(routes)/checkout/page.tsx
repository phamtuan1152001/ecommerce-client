'use client';

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";
import { connect } from "socket.io-client";

// @container
import { Container } from '@/components/ui/container';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import { Textarea } from '@/components/ui/textarea';
import { CartInformationRight } from '@/components/cart/cart-information-right';
import SelectionComponent from "@/components/form/selection-component";
import BreadcrumbComponent from "@/components/bread-crumd";
import { DiaglogPopup } from "@/components/pop-up/dialog-popup";
import SlideInModal from "@/components/slide-in-modal";
import { DiaglogMetamask } from "@/components/dialog-metamask";

// @icon
import { PiHandbagThin } from 'react-icons/pi';

// @validation
import { formSchema } from "@/validation/form-checkout";

// @api
import {
  getListProvinces,
  getListDistrictsAsProvincesId,
  getListWardsAsDistrictId
} from "@/lib/api/common";

// @constants
import { PAYMENT_MOMO_BANKING, PAYMENT_ATM_BANKING, PAYMENT_COD, SUCCESS, PAYMENT_METAMASK, ACTION_USER } from "@/constants";
import { BASE_URL_API_DEV } from "@/constants";
const host = BASE_URL_API_DEV;

// @utility
import { getUserToken, getUserInfo } from "@/utility/common";
import { toastNotiFail } from "@/utility/toast";

// @selector-cart
import { getCartSelector } from '@/redux/cart/selector';

// @services
import { postCreateOrder } from "@/lib/api/order";
import { deleteAllProductsInCart, removeProductInCart } from "@/redux/cart/service";
import { createRankingProducts } from "@/lib/api/product";
import { createPaymentWithMOMO } from "@/lib/api/payment";

// @svg
import { IconSuccess, IconFail, IconBackArrow } from "@/public/assets/svg";

// @action-cart
import { fetchCartRequest, resetCart } from "@/redux/cart/actions";

const CheckOut = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const socket = connect(host)

  const isAuthenticated = !!getUserToken()

  const carts = useSelector(getCartSelector);
  // console.log("carts", carts);

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
      // description: "",
      // saveInfo: userCheckoutInfo.saveInfo ?? false,
    },
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      fetchGetListProvinces()
      /* Setup-socket */
      // const socket = connect(host)

      socket.on('connect', () => {
        console.log('Connected to server');
      });

      // socket.on('admin', (data) => {
      //   console.log("data", data)
      // })

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });


      return () => {
        socket.disconnect()
      };
      /* End */
    } else {
      window.location.href = "/"
    }
  }, [])

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

  const handleDeleteAllProductsInCart = async (type: number, orderId: string) => {
    try {
      const res: {
        retCode: number,
        retText: string,
        retData: {
          userId: string
        }
      } = await deleteAllProductsInCart(carts.userId)
      if (res.retCode === 0) {
        if (type === 1) {
          dispatch(resetCart())
          setTimeout(() => {
            router.push("/")
          }, 500)
        } else if (type === 3) {
          dispatch(resetCart())
          createPaymentMomo(orderId)
        } else if (type === 4) {
          dispatch(resetCart())
          setOrderId(orderId)
          onOpenChange()
        } else {
          dispatch(resetCart())
          setTimeout(() => {
            router.push(`/checkout/order-detail?orderId=${orderId}`)
          }, 500)
        }
      }
    } catch (err) {
      console.log("FETCH FAIL", err)
    }
  }

  const createPaymentMomo = async (orderId: string) => {
    try {
      const req = {
        amount: JSON.stringify(carts.totalPrice),
        orderId: orderId,
        orderInfo: carts.items.map(item => item.product.name).join(", ")
      }
      const res: {
        retCode: number,
        retText: string,
        retData: string
      } = await createPaymentWithMOMO(req)
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

  const handleCreateBuyRankingProducts = async (orderProducts: any) => {
    try {
      const list = orderProducts?.map(async (item: any) => {
        const req: {
          productId: string,
          product: string,
          actionBuy: number,
          countBuy: number,
          actionReview: number,
          countReview: number,
          // "actionRate": 0,
          // "countRate": 0,
          actionIntroduce: number,
          countIntroduce: number,
          actionSave: number,
          countSave: number,
          type: number
        } = {
          productId: item?.productId,
          product: item?.productId,
          actionBuy: 0,
          countBuy: 0,
          actionReview: 1,
          countReview: 0,
          // "actionRate": 0,
          // "countRate": 0,
          actionIntroduce: 2,
          countIntroduce: 0,
          actionSave: 3,
          countSave: 0,
          type: ACTION_USER.BUY // Chi can thay doi field theo type
        }
        return await createRankingProducts(req)
      })
      return await Promise.all(list)
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const {
      address,
      // description,
      email,
      fullName,
      phone,
      provinceId,
      districtId,
      wardId,
      // saveInfo
    } = values || {}

    const req = {
      userId: carts.userId,
      statusOrder: 0,
      paymentMethod: methodPayment,
      orderAddress: {
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        provinceId: provinceId,
        districtId: districtId,
        wardId: wardId,
        fullAddress: `${address} ${listWards.find((item) => item.id === wardId)?.name} ${listDistricts.find((item) => item.id === districtId)?.name} ${listProvinces.find((item) => item.id === provinceId)?.name}`
      },
      cartId: carts._id,
      cartDetail: {
        ...carts,
        items: carts.items.map((item) => {
          return {
            ...item,
            product: item.productId
          }
        })
      }
    }
    // console.log("Req", req);
    try {
      const res: {
        retCode: number,
        retText: string,
        retData: {
          _id: string,
          createdAt: string,
          updatedAt: string,
          userId: string,
          statusOrder: number,
          paymentMethod: string,
          orderAddress: {
            fullName: string,
            phone: string,
            address: string,
            provinceId: string,
            districtId: string,
            wardId: string,
            fullAddress: string,
          }
          cartId: string,
          cartDetail: any
        }
      } = await postCreateOrder(req)
      if (res.retCode === 0) {
        socket.emit("createOrder", res.retData)
        handleCreateBuyRankingProducts(res?.retData?.cartDetail?.items)
        DiaglogPopup({
          icon: <IconSuccess />,
          title: "ORDER CREATION SUCCESSFULLY",
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
              // onOpenChange()
              handleDeleteAllProductsInCart(4, res.retData._id)
            } else {
              handleDeleteAllProductsInCart(
                methodPayment === PAYMENT_ATM_BANKING
                  ? 2
                  : methodPayment === PAYMENT_MOMO_BANKING ? 3 : 1
                , res.retData._id)
              // ) // type = 1 back to home page
            }
          },
          onCancle: () => {
            SlideInModal.hide()
            handleDeleteAllProductsInCart(2, res.retData._id)
            // type = 2 push to order detail page
          }
        })
      } else {
        DiaglogPopup({
          icon: <IconFail />,
          title: "CREATE ORDER FAILED",
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
      <DiaglogMetamask
        orderId={orderId}
        totalPrice={carts.totalPrice}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        redirectSuccess={`/thank?orderId=${orderId}`}
      />

      <div className=" pb-5 max-[1024px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
            {
              title: "Cart",
              to: "/"
            },
            {
              title: "Payment",
              to: `/checkout`
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
                  <div className=' flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>Contact Info</h3>
                    </div>
                    <div className=' flex flex-col gap-y-4 '>
                      <div className=' flex gap-x-6 justify-between items-end'>
                        <div className=' flex-1'>
                          <FormField
                            control={form.control}
                            name='email'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className=' text-sm font-bold text-[#333333]'>
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                    placeholder='Enter Email'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>Delivery address</h3>
                    </div>
                    <div className=' flex flex-col gap-y-4 '>
                      <div className='grid grid-cols-2 gap-4 max-[1024px]:grid-cols-1'>
                        <FormField
                          control={form.control}
                          name='fullName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                Full name
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                  placeholder='Enter your first and last name'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='phone'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                Phone
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                  placeholder='Enter your phone number'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid grid-cols-3 gap-4 max-[1024px]:grid-cols-1'>
                        <FormField
                          control={form.control}
                          name='provinceId'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                Province/City
                              </FormLabel>
                              <SelectionComponent
                                datas={listProvinces}
                                placeholder="Select Province/City"
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value)
                                  const data = form.getValues()
                                  fetchGetListDistrictsAsProvincesId(
                                    data.provinceId
                                  )
                                }}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='districtId'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                District
                              </FormLabel>
                              <SelectionComponent
                                datas={listDistricts}
                                placeholder="Select District"
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value)
                                  const data = form.getValues()
                                  fetchGetListWardsAsDistrictId(
                                    data.districtId
                                  )
                                }}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name='wardId'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                Wards
                              </FormLabel>
                              <SelectionComponent
                                datas={listWards}
                                placeholder="Select Ward/Commune"
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='flex'>
                        <div className=' flex-1'>
                          <FormField
                            control={form.control}
                            name='address'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className=' text-sm font-bold text-[#333333]'>
                                  Address house, street, area
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                    placeholder='Enter house number, street, area'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className=' flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>
                        Phương Thức Vận Chuyển
                      </h3>
                    </div>
                    <RadioGroup defaultValue='comfortable'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='default' id='r1' />
                        <Label
                          htmlFor='r1'
                          className=' text-base font-normal text-[#202020]'
                        >
                          Giao hàng tiêu chuẩn (2-3 ngày)
                        </Label>
                      </div>
                    </RadioGroup>
                    <div>
                      <p className=' text-sm text-[#745B3E]'>
                        Miễn phí vận chuyển đối với đơn hàng từ 500.000đ giao tại
                        nội thành Hà Nội, TP Hồ Chí Minh. Các địa chỉ khác: 30.000đ
                      </p>
                    </div>
                  </div> */}
                  <div className='flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>
                        Payment methods
                      </h3>
                    </div>
                    <RadioGroup>
                      <div className='flex flex-col gap-y-4'>
                        <div className='w-full flex items-center gap-x-4'>
                          <RadioGroupItem value={PAYMENT_COD} id='r1' onClick={() => setMethodPayment(PAYMENT_COD)} />
                          <Label
                            htmlFor='r1'
                            className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
                          >
                            <div className=' aspect-square relative w-full max-w-[50px] '>
                              <Image
                                alt='image'
                                src='/assets/images/checkout/payment.png'
                                fill
                                className='object-cover object-center rounded-[8px]'
                              />
                            </div>
                            <div>
                              <p className=' font-bold'>
                                Payment on delivery
                              </p>
                              <p className=' text-sm font-medium text-[#745B3E]'>
                                Customers will pay for all items upon receipt
                              </p>
                            </div>
                          </Label>
                        </div>
                        <div className='w-full flex items-center gap-x-4'>
                          <RadioGroupItem value={PAYMENT_ATM_BANKING} id='r2' onClick={() => setMethodPayment(PAYMENT_ATM_BANKING)} />
                          <Label
                            htmlFor='r2'
                            className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
                          >
                            <div className=' aspect-square relative w-full max-w-[50px] '>
                              <Image
                                alt='image'
                                src='/assets/images/checkout/chuyen-khoan-ngan-hang.png'
                                fill
                                className='object-cover object-center rounded-[8px]'
                              />
                            </div>
                            <div>
                              <p className=' font-bold'>Payment by bank transfer</p>
                              <p className=' text-sm font-medium text-[#745B3E]'>
                                Via banking app
                              </p>
                            </div>
                          </Label>
                        </div>
                        <div className='w-full flex items-center gap-x-4'>
                          <RadioGroupItem value={PAYMENT_MOMO_BANKING} id='r3' onClick={() => setMethodPayment(PAYMENT_MOMO_BANKING)} />
                          <Label
                            htmlFor='r3'
                            className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
                          >
                            <div className=' aspect-square relative w-full max-w-[50px] '>
                              <Image
                                alt='image'
                                src='/assets/images/checkout/momo.png'
                                fill
                                className='object-cover object-center rounded-[8px]'
                              />
                            </div>
                            <div>
                              <p className=' font-bold'>Payment by Momo</p>
                              <p className=' text-sm font-medium text-[#745B3E]'>
                                Via Momo banking app
                              </p>
                            </div>
                          </Label>
                        </div>
                        <div className='w-full flex items-center gap-x-4'>
                          <RadioGroupItem value={PAYMENT_METAMASK} id='r4' onClick={() => setMethodPayment(PAYMENT_METAMASK)} />
                          <Label
                            htmlFor='r4'
                            className='flex-1 flex items-center gap-x-4 text-base font-normal text-[#202020]'
                          >
                            <div className=' aspect-square relative w-full max-w-[50px] '>
                              <Image
                                alt='image'
                                src='/assets/images/checkout/metamask-icon.png'
                                fill
                                className='object-cover object-center rounded-[8px]'
                              />
                            </div>
                            <div>
                              <p className=' font-bold'>Payment by Metamask</p>
                              <p className=' text-sm font-medium text-[#745B3E]'>
                                Via Metamask app
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                  </div>
                </div>
              </div>
              <div className='col-span-2 max-[1024px]:order-1'>
                <CartInformationRight />
              </div>
            </div>
          </form>
        </Form>
      </Container>
    </div>
  );
};

export default CheckOut;
