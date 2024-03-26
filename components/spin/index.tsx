import "./spin.css"
import { ReactNode } from "react"
import { TailSpin } from "react-loader-spinner"
import { cn } from "@/lib/utils"

interface SpinnerProps {
  spinning: boolean,
  children?: ReactNode,
  className?: string
}

const Spinner = ({ spinning, children, className }: SpinnerProps) => {
  return (
    <>
      {/* Remember to add className "relative" in parent to to display, if not this spinner will be displayed cover the page */}
      {spinning && (
        <>
          <div className="spinner">
            <TailSpin
              height="40"
              width="40"
              color="#F4B324"
              radius="1"
              visible={true}
              ariaLabel="tail-spin-loading"
            />
          </div>
          {/* <!-- Overlay --> */}
          <div className={cn("absolute inset-0 z-50 bg-black/20 rounded-lg", className)}></div>
        </>
      )}
      {children}
    </>
  )
}

export default Spinner