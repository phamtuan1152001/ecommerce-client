'use client';

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import * as z from "zod"
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/navigation";

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
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio';
import { Textarea } from '@/components/ui/textarea';

import { PiHandbagThin } from 'react-icons/pi';
import { CartInformationRight } from '@/components/cart/cart-information-right';

import SelectionComponent from "@/components/form/selection-component";
// import Selection from "@/components/form/selection";
import BreadcrumbComponent from "@/components/bread-crumd";
import { DiaglogPopup } from "@/components/pop-up/dialog-popup";
import SlideInModal from "@/components/slide-in-modal";

// @validation
import { formSchema } from "@/validation/form-checkout";

// @api
import {
  getListProvinces,
  getListDistricts,
  getListDistrictsAsProvincesId,
  getListWardsAsDistrictId
} from "@/lib/api/common";

// @constants
import { PAYMENT_ATM_BANKING, PAYMENT_COD, SUCCESS } from "@/constants";

// @utility
import { parseInt } from "lodash";
import { getUserToken } from "@/utility/common";
import { toastNotiFail } from "@/utility/toast";

// @selector-cart
import { getCartSelector } from '@/redux/cart/selector';

// @api
import { postCreateOrder } from "@/lib/api/order";
import { deleteItemInCart } from "@/redux/cart/service";

// @svg
import { IconSuccess, IconFail, IconBackArrow } from "@/public/assets/svg";

// @action-cart
import { fetchCartRequest, resetCart } from "@/redux/cart/actions";

interface UserType {
  email: string;
  fullName: string;
  phone: string;
  provinceId: string;
  districtId: string;
  wardId: string;
  address: string;
  fullNameSender: string;
  phoneReceiver: string;
  fullNameReceiver: string;
  description: string;
  saveInfo: boolean;
}

const CheckOut = () => {
  const router = useRouter()
  const dispatch = useDispatch()

  const userCheckoutInfoRaw: string | null = localStorage.getItem("USER_INFO_CHECKOUT");
  const userCheckoutInfo: UserType = userCheckoutInfoRaw
    ? JSON.parse(userCheckoutInfoRaw) : {};
  const isAuthenticated = !!getUserToken()

  const carts = useSelector(getCartSelector);
  // console.log("carts", carts);

  const [listProvinces, setListProvinces] = React.useState([])
  const [listDistricts, setListDistricts] = React.useState([])
  const [listWards, setListWards] = React.useState([])
  const [methodPayment, setMethodPayment] = React.useState<string>("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullNameSender: "",
      phoneReceiver: "",
      fullNameReceiver: "",
      description: "",
      saveInfo: userCheckoutInfo.saveInfo ?? false,
      email: userCheckoutInfo.email ?? "",
      fullName: userCheckoutInfo.fullName ?? "",
      phone: userCheckoutInfo.phone ?? "",
      address: userCheckoutInfo.address ?? "",
      provinceId: userCheckoutInfo.provinceId ?? "",
      districtId: userCheckoutInfo.districtId ?? "",
      wardId: userCheckoutInfo.wardId ?? "",
    },
  })

  React.useEffect(() => {
    if (isAuthenticated) {
      if (!!userCheckoutInfoRaw) {
        fetchGetListProvinces()
        fetchGetListDistrictsAsProvincesId(parseInt(userCheckoutInfo.provinceId))
        fetchGetListWardsAsDistrictId(parseInt(userCheckoutInfo.districtId))
      } else {
        fetchGetListProvinces()
      }
    } else {
      window.location.href = "/"
    }
  }, [])

  const fetchGetListProvinces = async () => {
    try {
      const res = await getListProvinces()
      if (res?.statusCode === SUCCESS) {
        setListProvinces(res?.data?.items)
      } else {
        setListProvinces([])
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const fetchGetListDistrictsAsProvincesId = async (id: number) => {    
    try {
      const req = {
        provincesId: id
      }
      const res = await getListDistrictsAsProvincesId(req)
      if (res?.statusCode === SUCCESS) {
        setListDistricts(res?.data?.items)
      } else {
        return
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  const fetchGetListWardsAsDistrictId = async (id: number) => {
    try {
      const req = {
        districtId: id
      }
      const res = await getListWardsAsDistrictId(req)
      if (res?.statusCode === SUCCESS) {
        setListWards(res?.data)
      } else {
        return
      }
    } catch (err) {
      console.log("FETCH FAIL!", err);
    }
  }

  // Delete all item in cart after create order successfully
  const handleDeleteAllItemInCart = async (type: number, code: string) => {
    const promises = carts.items.map(async (item) => {
      try {
        const req = {
          productId: item.productId,
          accessToken: getUserToken()
        }
        await deleteItemInCart(req)
        return 
      } catch (err) {
        console.log("Err", err)
      }
    })
    Promise.all(promises)
      .then((results) => {
        dispatch(fetchCartRequest({
          accessToken: getUserToken()
        }));
        dispatch(resetCart());
        if (type === 1) {
          window.location.href = "/"
        } else {
          router.push(`/checkout/order-detail?orderId=${code}`)
        }
      })
      .catch((error) => {
        console.log('Error in one of the promises:', error);
        // Handle error
      });
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {    
    const {
      address,
      description,
      districtId,
      email,
      fullName,
      fullNameReceiver,
      fullNameSender,
      phone,
      phoneReceiver,
      provinceId,
      wardId,
      saveInfo
    } = values || {}
    const cartOrders = carts.items.map(item => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.product.onSale ? parseInt(item.product.salePrice) : parseInt(item.product.regularPrice),
        productName: item.product.name,
        variationId: item.variationId
      }
    })
    const req = {
      accessToken: getUserToken(),
      status: "order",
      note: /* description */ "Note payment",
      paymentMethod: methodPayment,
      // livestreamDate: "",
      // shopId: 0,
      orderAddress: {
        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        provinceId: parseInt(provinceId),
        districtId: parseInt(districtId),
        wardId: parseInt(wardId),
        fullAddress: address
      },
      items: cartOrders
    }
    if (!!methodPayment) {
      if (cartOrders?.length > 0) {
        try {
          const res = await postCreateOrder(req)
          if (res.statusCode === SUCCESS) {
            if (saveInfo) {
              const userInfoCheckout = {
                email,
                fullName,
                phone,
                provinceId,
                districtId,
                wardId,
                address,
                saveInfo
              }
              localStorage.setItem("USER_INFO_CHECKOUT", JSON.stringify(userInfoCheckout))
            } else {
              if (!!userCheckoutInfoRaw) {
                localStorage.removeItem("USER_INFO_CHECKOUT")
              }
            }
            DiaglogPopup({
              icon: <IconSuccess/>,
              title: "TẠO ĐƠN HÀNG THÀNH CÔNG",
              description: "Đơn hàng của bạn đã được tạo thành công",
              textButtonOk: methodPayment === PAYMENT_ATM_BANKING
                ? "Chuyển khoản ngân hàng"
                : "Trở về trang chủ",
              textButtonCancel: "Xem lại đơn",
              isBtnCancel: methodPayment === PAYMENT_ATM_BANKING ? false : true,
              closeOnClickOverlay: false,
              className: "max-[768px]:w-[380px]",
              onSubmit: () => {
                SlideInModal.hide()
                handleDeleteAllItemInCart(
                  methodPayment === PAYMENT_ATM_BANKING
                    ? 2
                    : 1
                  , res?.data?.id
                ) // type = 1 back to home page
                // router.push("/")
              },
              onCancle: () => { 
                SlideInModal.hide()
                handleDeleteAllItemInCart(2, res?.data?.id) // type = 2 push to order detail page
              }
            })
          } else {
            DiaglogPopup({
              icon: <IconFail/>,
              title: "TẠO ĐƠN HÀNG THẤT BẠI",
              description: "Đơn hàng của bạn đã được tạo thất bại",
              textButtonOk: "Đóng",
              textButtonCancel: "",
              isBtnCancel: false,
              closeOnClickOverlay: false,
              className: "max-[768px]:w-[380px]",
              onSubmit: () => {
                SlideInModal.hide()
              },
              onCancle: () => { }
            })
          }
        } catch (err) {
          console.log("FETCH FAIL!", err);
          DiaglogPopup({
            icon: <IconFail/>,
            title: "LỖI HỆ THỐNG",
            description: "Vui lòng thử lại sau",
            textButtonOk: "Đóng",
            textButtonCancel: "",
            isBtnCancel: false,
            closeOnClickOverlay: false,
            className: "max-[768px]:w-[380px]",
            onSubmit: () => {
              SlideInModal.hide()
            },
            onCancle: () => { }
          })
        }
      } else {
        DiaglogPopup({
          icon: <IconFail/>,
          title: "TẠO ĐƠN HÀNG THẤT BẠI",
          description: "Danh sách sản phẩm không được để trống",
          textButtonOk: "Đóng",
          textButtonCancel: "",
          isBtnCancel: false,
          closeOnClickOverlay: false,
          className: "max-[768px]:w-[380px]",
          onSubmit: () => {
            SlideInModal.hide()
          },
          onCancle: () => { }
        })
      }
    } else {
      toastNotiFail("Vui lòng chọn phương thức thanh toán")
    }
  }
  
  if (!isAuthenticated) {
    return null
  }

  return (
    <div className='bg-[#F5F5F5] py-6 max-[768px]:py-0'>
      <div className=" pb-5 max-[768px]:hidden">
        <Container>
          <BreadcrumbComponent breadcrumbs={[
              {
                title: "Giỏ hàng",
                to: "/"
              },
              {
                title: "Thanh toán",
                to: `/checkout`
              }
            ]}/>
        </Container>
      </div>

      <Container className="max-[768px]:px-0">
        {/* Header Back Icon for mobile */}
          <div className='flex flex-row justify-between items-center min-[1280px]:hidden bg-white px-3 pt-2'>
            <button className='flex flex-col justify-center items-center bg-backgroundColor-buttonCommon w-10 h-10 rounded-full' onClick={() => router.back()}>
              <IconBackArrow />
            </button>
          </div>
        {/* End */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid grid-cols-5 gap-6 max-[768px]:grid-cols-1 max-[768px]:gap-0'>
              <div className='bg-white col-span-3 max-[768px]:order-2'>
                <div className=' p-6 flex flex-col gap-y-12 max-[768px]:gap-y-6 max-[768px]:p-3'>
                  <div className=' flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>Thông Tin Liên Hệ</h3>
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
                                    placeholder='Nhập Email'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {/* {!getUserToken && (
                          <div className='flex-1 flex justify-end gap-x-2'>
                            <span>Bạn đã có tài khoản?</span>
                            <Link href='/' className='text-[#AA7809]'>
                              {' '}
                              Đăng nhập
                            </Link>
                          </div>
                        )} */}
                      </div>
                      {/* <div className=' flex items-center gap-x-1'>
                        <Checkbox className=' border-[#BFBFBF] w-[18px] h-[18px]' />
                        <p className=' text-[#202020]'>
                          Đăng ký nhận các thông tin khuyến mãi đầu tiên
                        </p>
                      </div> */}
                    </div>
                  </div>
                  <div className='flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>Địa Chỉ Giao Hàng</h3>
                    </div>
                    <div className=' flex flex-col gap-y-4 '>
                      <div className='grid grid-cols-2 gap-4 max-[768px]:grid-cols-1'>
                        <FormField
                          control={form.control}
                          name='fullName'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                Họ và tên
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                  placeholder='Nhập Họ và tên'
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
                                Số điện thoại
                              </FormLabel>
                              <FormControl>
                                <Input
                                  className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                  placeholder='Nhập số điện thoại'
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className='grid grid-cols-3 gap-4 max-[768px]:grid-cols-1'>
                        <FormField
                          control={form.control}
                          name='provinceId'
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className=' text-sm font-bold text-[#333333]'>
                                Tỉnh/Thành phố
                              </FormLabel>
                              <SelectionComponent
                                datas={listProvinces}
                                placeholder="Chọn Tỉnh/Thành phố"
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value)
                                  const data = form.getValues()
                                  fetchGetListDistrictsAsProvincesId(
                                    parseInt(data.provinceId)
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
                                Quận/Huyện
                              </FormLabel>
                              <SelectionComponent
                                datas={listDistricts}
                                placeholder="Chọn Quận/Huyện"
                                value={field.value}
                                onChange={(value) => {
                                  field.onChange(value)
                                  const data = form.getValues()
                                  fetchGetListWardsAsDistrictId(
                                    parseInt(data.districtId)
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
                                Phường/Xã
                              </FormLabel>
                              <SelectionComponent
                                datas={listWards}
                                placeholder="Chọn Phường/Xã"
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
                                  Số nhà, đường, khu vực
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                    placeholder='Nhập số nhà, đường, khu vực'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className=' flex items-center gap-x-1'>
                        {/* <Checkbox className='border-[#BFBFBF] w-[18px] h-[18px]' /> */}
                        <FormField
                          control={form.control}
                          name="saveInfo"
                          render={({ field }) => (
                            <FormItem className=" flex items-center">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className=" h-[18px] w-[18px] rounded-[6px] border-[#BFBFBF]" 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <p className=' text-[#202020]'>
                          Lưu thông tin cho lần thanh toán tiếp theo
                        </p>
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
                        Phương Thức Thanh Toán
                      </h3>
                    </div>
                    <RadioGroup>
                      <div className='flex flex-col gap-y-4'>
                        <div className='w-full flex items-center gap-x-4'>
                          <RadioGroupItem value='compact' id='r2' onClick={() => setMethodPayment(PAYMENT_COD)}/>
                          <Label
                            htmlFor='r2'
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
                                Thanh toán khi nhận hàng
                              </p>
                              <p className=' text-sm font-medium text-[#745B3E]'>
                                Quý khách hàng sẽ thanh toán hết mặt hàng khi
                                nhận hàng
                              </p>
                            </div>
                          </Label>
                        </div>
                        <div className='w-full flex items-center gap-x-4'>
                          <RadioGroupItem value='comfortabl' id='r3' onClick={() => setMethodPayment(PAYMENT_ATM_BANKING)}/>
                          <Label
                            htmlFor='r3'
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
                              <p className=' font-bold'>Thanh toán bằng phương thức chuyển khoản</p>
                              <p className=' text-sm font-medium text-[#745B3E]'>
                                Qua ứng dụng ngân hàng
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>

                  </div>
                  {/* <div className='flex flex-col gap-y-4'>
                    <div className=' flex items-center gap-x-2'>
                      <PiHandbagThin size={24} />
                      <h3 className=' text-[20px] font-bold'>Thông Tin Tặng Quà</h3>
                    </div>

                    <div className=' flex flex-col gap-y-4 '>
                      <div className=' flex items-center gap-x-1'>
                        <Checkbox className='border-[#BFBFBF] w-[18px] h-[18px]' />
                        <p className=' text-[#202020]'>
                          Gửi quà cho bạn bè và người thân
                          <span className=' font-bold pl-1'>
                            (30.000đ bao gồm phí gói quà và thiệp)
                          </span>
                        </p>
                      </div>
                      <div className=' flex gap-x-4 justify-between items-center'>
                        <div className=' flex-1'>
                          <FormField
                            control={form.control}
                            name='fullNameSender'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className=' text-sm font-bold text-[#333333]'>
                                  Họ và tên người gửi
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                    placeholder='Họ và tên người gửi'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className='flex-1'>
                          <FormField
                            control={form.control}
                            name='phoneReceiver'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className=' text-sm font-bold text-[#333333]'>
                                  Số điện thoại người nhận
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                    placeholder='Nhập số điện thoại'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div className='flex'>
                        <div className=' flex-1'>
                          <FormField
                            control={form.control}
                            name='fullNameReceiver'
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className=' text-sm font-bold text-[#333333]'>
                                  Họ và tên người nhận
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    className=' rounded-full py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381]'
                                    placeholder='Họ và tên người nhận'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <div>
                          <FormField
                            control={form.control}
                            name='description'
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Textarea
                                    placeholder='Ví dụ: Chúc mừng sinh nhật bạn (Tối đa 200 ký tự)'
                                    className=' rounded-[8px] py-2 px-4 border-none focus-visible:ring-transparent bg-[#F5F5F5] placeholder:text-sm placeholder:text-[#637381] h-[103px]'
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      <div>
                        <p className=' text-sm text-[#745B3E] font-medium'>
                          * Hóa đơn này sẽ không in giá
                        </p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className='col-span-2 max-[768px]:order-1'>
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
