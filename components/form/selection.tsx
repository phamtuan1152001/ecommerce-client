"use client"
import React from "react"
import { cn } from "@/lib/utils"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

// @icons
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Check, ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react"

interface SelectionProps {
  datas: {
    id: number,
    codename: string,
    name: string,
    divisionType: string,
    isActive: boolean,
    phoneCode: string,
    regionId: number,
    provinceId: number
  }[],
  placeholder: string
  onChange: (id: number) => void
}

const Selection = ({ datas, placeholder, onChange }: SelectionProps) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  
  return (
    <div className=' flex items-center justify-center gap-x-2 py-2 px-4 bg-[#F5F5F5] rounded-full'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full bg-[#F5F5F5] font-normal h-auto p-0 border-none text-sm text-[#637381]">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between hover:text-[#637381]"
          >
            {value
              ? datas.find((data) => data.codename === value)?.name
              : placeholder}
            <MdKeyboardArrowDown className="ml-2 h-6 w-6 shrink-0 opacity-50 text-[#1F1F1F]" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Command>
            <CommandInput placeholder={placeholder} className="h-9" />
            {/* <CommandEmpty>No data found.</CommandEmpty> */}
            <CommandGroup>
              <ScrollArea className="h-72">
                {datas?.length > 0
                  ? datas.map((data) => (
                    <CommandItem
                      key={data.codename}
                      value={data.codename}
                      onSelect={(currentValue) => {
                        onChange(data.id)
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                      }}
                    >
                      {data.name}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === data.codename ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))
                  : (
                    <div className="flex flex-col justify-center items-center h-full">
                      <h3 className="text-sm font-semibold">Không có dữ liệu.</h3>
                    </div>
                  )}
              </ScrollArea>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Selection