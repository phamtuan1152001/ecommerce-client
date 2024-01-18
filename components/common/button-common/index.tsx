
import { cn } from "@/lib/utils"

interface ButtonCommonProps {
  title: string,
  icon: any,
  className?: string
}

export const ButtonCommon = ({title, icon, className} : ButtonCommonProps) => {
  return (
    <button className="px-6 py-3 bg-backgroundColor-buttonCommon rounded-full w-full focus:outline-0">
      <div className={cn("flex flex-row justify-center items-center gap-2", className)}>
        <div className="flex flex-col justify-center items-center">
          {icon}
        </div>
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-base font-semibold">{title}</h2>  
        </div>
      </div>
    </button>
  )
}