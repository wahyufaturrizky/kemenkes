import { cn } from "@/utils/cn"

interface SpinProps {
  className?: string
}
const Spin: React.FC<SpinProps> = ({ className }) => {
  return (
    <div className={cn(`absolute border-4 border-gray-200 border-t-4 border-t-blue-500 rounded-full w-10 h-10 spin-loader z-50 ${className}`)}></div>
  )
}

export default Spin