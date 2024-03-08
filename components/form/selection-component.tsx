import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  FormControl
} from '@/components/ui/form';

interface SelectionComponentProps {
  datas: {
    id: string,
    name: string,
    type: string
  }[],
  placeholder: string,
  value: string,
  onChange: (...event: any) => void
}

const SelectionComponent = ({
  datas,
  placeholder,
  value,
  onChange
}: SelectionComponentProps) => {
  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger className="px-4 rounded-[99px] bg-[#F5F5F5] text-sm font-normal text-textColor-selectText">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {datas?.map((item, index) => {
          return (
            <SelectItem
              key={`${index}-${item?.id}`}
              value={item.id.toString()}
            >
              {item.name}
            </SelectItem>
          )
        })}
      </SelectContent>
    </Select>
  )
}

export default SelectionComponent