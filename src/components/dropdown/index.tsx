import { StandardOptionsProps } from "@/models";
import { IoIosArrowDown } from "react-icons/io";

interface DropdownProps {
  text: string
  subMenus: StandardOptionsProps[]
}

const Dropdown: React.FC<DropdownProps> = ({
  text, subMenus
}) => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div>{text}</div>
      <div><IoIosArrowDown /></div>
    </div>
  )
}

export default Dropdown;