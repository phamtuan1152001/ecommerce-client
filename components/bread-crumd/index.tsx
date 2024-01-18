"use client"

import React from "react"

// @components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb"

interface BreadcrumbComponentProps {
  breadcrumbs: {
    title: string,
    to: string,
  }[]
}

const BreadcrumbComponent = ({breadcrumbs}: BreadcrumbComponentProps) => {
  
  return (
    <Breadcrumb>
      {breadcrumbs.map((item, index) => {
        return (
          <BreadcrumbItem
            key={index}
            isCurrentPage={index === breadcrumbs.length - 1}
          >
            <BreadcrumbLink href={item.to}>{item.title}</BreadcrumbLink>
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}

export default BreadcrumbComponent