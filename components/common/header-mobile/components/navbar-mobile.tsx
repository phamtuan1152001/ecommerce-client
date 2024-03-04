"use client"

import React from "react";
import Link from 'next/link';
import Image from 'next/image'

// @components
import { Container } from "@/components/ui/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// @constants
import { MENU } from "../../header/navbar.data"
import { HEADER_NAV, NAV_DETAIL, LIST_BRAND } from "@/components/menu-navigation/constants/header-nav.data";
import { ScrollArea } from "@/components/ui/scroll-area"

const NavbarMobile = () => {
  const [activeNav, setActiveNav] = React.useState(0)
  const [activeTab, setActiveTab] = React.useState(0)
  return (
    <Container className="bg-[#676767] shadow-[0px_5px_10px_0px_rgba(0, 0, 0, 0.10)] w-full min-[360px]:px-0 h-full flex flex-col justify-between">
      <div className="flex flex-row justify-start h-full">
        <div className="flex flex-col justify-start">
          {MENU?.map((item: any, index: number) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`w-40 ${activeNav === index && "bg-backgroundColor-nav"}`}
                onClick={() => setActiveNav(index)}
              >
                <Link
                  href={item.href}
                  className={`p-3 flex items-center gap-3 h-16 text-sm ${activeNav === index ? "text-textColor-nav" : "text-white"}`}
                >
                  <Icon className="w-6 h-6" />
                  <span className={`inline-block uppercase ${index === 5 && "w-28"}`}>
                    {item.name}
                  </span>
                </Link>
              </div>
            )
          })}
        </div>
        <div className="bg-white w-full">
          <div className="flex flex-row justify-between items-center p-3">
            {HEADER_NAV?.map((item: any, index: number) => {
              return (
                <div key={index} className="flex flex-col justify-center items-centers" onClick={() => setActiveTab(index)}>
                  <Link
                    href=""
                    className={`text-base font-normal uppercase`}
                  >
                    <span
                      className={`${activeTab === index && "underline underline-offset-8 font-bold"}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                </div>
              )
            })}
          </div> {/* min-[430px]:h-[811px] min-[768px]:h-[955px] */}
          <div className="h-full overscroll-contain">{/* ScrollArea */}
            <div className="px-3 bg-backgroundColor-listNav mt-2">
              <div className="flex flex-col justify-start">
                {NAV_DETAIL?.map((item: any, index: number) => {
                  return (
                    <Accordion key={index} type="single" collapsible defaultValue="item-1">
                      <AccordionItem value={`item-${index + 1}`}>
                        <AccordionTrigger className="text-base font-bold uppercase hover:no-underline">
                          {item?.name}
                        </AccordionTrigger>
                        {item?.child?.map((ele: any, nth: number) => {
                          return (
                            <Link key={nth} href={ele?.path}>
                              <AccordionContent>
                                <span className="text-base font-normal">
                                  {ele?.nameChild}
                                </span>
                              </AccordionContent>
                            </Link>
                          )
                        })}
                      </AccordionItem>
                    </Accordion>
                  )
                })}
              </div>
            </div>
            {/* <div className="p-3">
              <h2 className="text-base font-bold uppercase text-textColor-titleFooterNav">Thương hiệu</h2>
              <div className="mt-4 flex flex-col justify-start gap-4">
                {LIST_BRAND?.map((item: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className='relative flex flex-row justify-around items-center p-4 rounded-full'
                      style={{
                        background: item?.background,
                        width: "186.906px",
                        height: "85.703px"
                      }}
                    >
                      {!!item?.logo && (
                        <div className='flex flex-col justify-center items-center'>
                          <Image
                            alt='logo'
                            src={item?.logo}
                            className='object-cover object-center rounded-l-lg'
                          />
                        </div>
                      )}
                      {!!item?.image && (
                        <div className='flex flex-col justify-center items-center z-10'>
                          <Image
                            alt='image'
                            src={item?.image}
                            className='object-cover object-center rounded-l-lg'
                          />
                        </div>
                      )}
                      <div className="absolute top-0 -right-4 -z-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="123" height="105" viewBox="0 0 123 105" fill="none">
                          <circle cx="61.4078" cy="43.7623" r="61.0865" fill="url(#paint0_linear_841_18756)" />
                          <defs>
                            <linearGradient id="paint0_linear_841_18756" x1="61.4078" y1="-17.3242" x2="61.4078" y2="104.849" gradientUnits="userSpaceOnUse">
                              <stop stopColor="white" stopOpacity="0.5" />
                              <stop offset="1" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div> */}
          </div>{/* ScrollArea */}
        </div>
      </div>
      <div className='min-[1280px]:hidden p-6 bg-backgroundColor-nav w-full'>
        <h3 className='text-sm text-white'>
          Hotline: <span className='font-bold'>0909 082 912</span>
        </h3>
      </div>
    </Container>
  )
}

export default NavbarMobile