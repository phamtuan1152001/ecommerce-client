"use client"

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// @components
import { Container } from '@/components/ui/container';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"


// @types
import { CategoryType } from '@/types';

// @services
import { getCategories } from '@/lib/api';

// @constants
import { renderIcon } from './navbar.data';

export const Navbar = () => {
  const path = usePathname()
  const [listCategories, setListCategories] = useState<CategoryType[]>([{
    _id: "",
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    status: "",
    createdAt: "",
    updatedAt: "",
    __v: 0
  }])

  useEffect(() => {
    fetchGetListCategory()
  }, [])

  const fetchGetListCategory = async () => {
    try {
      const res: {
        retCode: number,
        retText: string,
        retData: CategoryType[]
      } = await getCategories()
      // console.log("res", res)
      if (res.retCode === 0) {
        const list = res.retData.map(item => {
          return {
            ...item,
            icon: renderIcon(item.slug)
          }
        })
        setListCategories(list)
      }
    } catch (err) {
      console.log("FETCHING FAIL!", err)
    }
  }

  return (
    <NavigationMenu className="bg-[#676767] shadow-[0px_5px_10px_0px_rgba(0, 0, 0, 0.10)]">
      <Container>
        <NavigationMenuList>
          <div className="flex items-center justify-between w-full">
            {listCategories?.length > 1
              ? listCategories?.map((item) => {
                const Icon = (item as any).icon;

                return (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger className={cn("bg-inherit text-white h-16 px-0 rounded-none hover:bg-backgroundColor-nav focus:bg-backgroundColor-nav data-[active]:bg-backgroundColor-nav data-[state=open]:bg-backgroundColor-nav hover:text-textColor-nav focus:text-textColor-nav data-[active]:text-textColor-nav data-[state=open]:text-textColor-nav", path.substring(1) === item.slug ? "text-textColor-nav bg-backgroundColor-nav" : "")}
                    >
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.slug}
                          className={`px-2 flex items-center space-x-1 h-16`}
                          scroll={true}
                        >
                          <Icon className="w-6 h-6" />
                          <span className="inline-block uppercase">
                            {item.name}
                          </span>
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuTrigger>
                  </NavigationMenuItem>
                );
              })
              : undefined}
          </div>
        </NavigationMenuList>
      </Container>
    </NavigationMenu>
  );
};
