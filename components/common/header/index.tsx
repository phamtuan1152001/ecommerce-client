"use client"
import React from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery"

import { Navbar } from './navbar';
import { TopBar } from './top-bar';

// @mobile component
import { HeaderMobile } from '@/components/common/header-mobile';

export const Header = () => {
  const isMobile = useMediaQuery(768)

  return (
    <header
      className={`${isMobile ? "bg-backgroundColor-nav" : "pt-8 bg-[#727272]"}`}>
      {isMobile
        ? <HeaderMobile />
        : (
          <React.Fragment>
            <TopBar />
            <Navbar />
          </React.Fragment>
        )}
    </header>
  );
};
