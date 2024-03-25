import React from "react";
import Link from 'next/link';

// @components
import { Container } from "@/components/ui/container";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import MenuNavBody from "./components/MenuNavBody";

// @constants
import { HEADER_NAV } from "./constants/header-nav.data";

const MenuNavigation = () => {
  return (
    <div className="md:w-[768px] lg:w-[1014px] xl:w-[1440px] 2xl:w-[1900px]">
      <NavigationMenu>
        <Container>
          <div className="flex flex-row justify-start items-center gap-12">
            <div className="flex flex-col justify-center items-center">
              <h2 className="font-bold text-base">GIỚI TÍNH</h2>
            </div>
            <NavigationMenuList className="flex flex-row justify-start items-center gap-4">
              {HEADER_NAV?.map((item: any, index: number) => {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger
                      className="hover:bg-inherit focus:bg-inherit data-[active]:bg-inherit data-[state=open]:bg-inherit hover:underline hover:underline-offset-8 data-[active]:underline data-[state=open]:underline data-[active]:underline-offset-8 data-[state=open]:underline-offset-8 data-[active]:font-bold data-[state=open]:font-bold"
                    >
                      <NavigationMenuLink asChild>
                        <Link href="" className="" scroll={true}>
                          {item.name}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <MenuNavBody />
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              })}
              <NavigationMenuIndicator />
            </NavigationMenuList>
          </div>
        </Container>
      </NavigationMenu>
    </div>
  );
};

export default MenuNavigation;
