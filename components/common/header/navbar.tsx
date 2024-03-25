"use client"

import React from 'react';

import Link from 'next/link';

import { Container } from '@/components/ui/container';

import { MENU } from './navbar.data';

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

// @components
import MenuNavigation from '@/components/menu-navigation/MenuNavigation';

export const Navbar = () => {
  return (
    <NavigationMenu className="bg-[#676767] shadow-[0px_5px_10px_0px_rgba(0, 0, 0, 0.10)]">
      <Container>
        <NavigationMenuList>
          <div className="flex items-center justify-between w-full">
            {MENU.map((item) => {
              const Icon = item.icon;

              return (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuTrigger className="bg-inherit text-white h-16 px-0 rounded-none hover:bg-backgroundColor-nav focus:bg-backgroundColor-nav data-[active]:bg-backgroundColor-nav data-[state=open]:bg-backgroundColor-nav hover:text-textColor-nav focus:text-textColor-nav data-[active]:text-textColor-nav data-[state=open]:text-textColor-nav"
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
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
                  <NavigationMenuContent className='rounded-lg border'>
                    <MenuNavigation />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              );
            })}
          </div>
        </NavigationMenuList>
      </Container>
    </NavigationMenu>
  );
};
