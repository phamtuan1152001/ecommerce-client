import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

// @img and svg
import NavImage from "../../../public/assets/images/nav/nav-image.png"

// @constants
import { NAV_DETAIL, LIST_BRAND } from '../constants/header-nav.data'

const MenuNavBody = () => {
  return (
    <div className='grid grid-cols-3 w-full mt-1'>
      <div className='col-span-2 bg-backgroundColor-listNav w-[1000px]'>
        <div className='flex flex-row justify-between items-center px-12 py-8'>
          {NAV_DETAIL?.map((item: any, index: number) => {
            return (
              <div className='flex flex-col justify-start' key={index}>
                <h2 className='font-bold text-base uppercase mb-2'>{item.name}</h2>
                <div>
                  {item.child?.map((ele: any, nth: number) => {
                    return (
                      <div className='flex flex-row justify-start' key={nth}>
                        <Link
                          href={""}
                          className='text-base font-normal hover:underline'
                          scroll={true}
                        >
                          {ele?.nameChild}
                        </Link>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center'>
          <Image
            alt='nav-image'
            src={NavImage}
            className='object-cover object-center rounded-l-lg'
          />
          <Link
            href={""}
            className={`text-base font-normal hover:underline`}
            scroll={true}
          >
            <span className="">
              Xem tất cả
            </span>
          </Link>
        </div>
      </div>
      {/* <div className='col-span-3 px-16 py-6'>
        <h2 className='font-bold text-base uppercase text-textColor-titleFooterNav mb-4'>Thương hiệu</h2>
        <div className='flex flex-row justify-between items-center'>
          {LIST_BRAND?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className='flex flex-row justify-around items-center p-4'
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
                  <div className='flex flex-col justify-center items-center'>
                    <Image
                      alt='image'
                      src={item?.image}
                      className='object-cover object-center rounded-l-lg'
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div> */}
    </div>
  )
}

export default MenuNavBody