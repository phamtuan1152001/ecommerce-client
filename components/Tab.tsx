"use client"
import Image from "next/image"
import React from "react"
import { useSnapshot } from "valtio"
import state from "@/store"

interface TabProps {
  keyId: string,
  tab: any,
  handleClick: () => void,
  isFilterTab?: boolean,
  isActiveTab?: boolean | string | undefined
}

const Tab = ({ keyId, tab, handleClick, isFilterTab, isActiveTab }: TabProps) => {
  const snap = useSnapshot(state)
  console.log("isActiveTab-1", isActiveTab);

  const activeStyles = isFilterTab && isActiveTab
    ? { backgroundColor: snap.color, opacity: 0.5 }
    : { backgroundColor: "transparent", opacity: 1 }

  return (
    <div
      key={tab.name}
      className={`tab-btn ${isFilterTab ? "rounded-full glassmorhism" : "rounded-4"}`}
      onClick={() => handleClick()}
      style={activeStyles}
    >
      <Image
        alt={tab.name}
        src={tab.icon}
        width={50}
        height={50}
        className={`${isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"}`}
        priority
      />
    </div>
  )
}

export default Tab