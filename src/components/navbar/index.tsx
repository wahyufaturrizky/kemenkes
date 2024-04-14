import Image from "next/image"
import { Button, Dropdown } from "@/components"
import SatusehatLogo from "@/assets/images/satusehat-logo.png"
import { FiMenu } from "react-icons/fi";

const Navbar: React.FC = () => {
  return (
    <div className="flex py-6 gap-4">
      <div className="flex flex-1 items-center gap-6">
        <div className="cursor-pointer">
          <Image alt="satusehat" src={SatusehatLogo.src} width={216.81} height={48} />
        </div>
        <Dropdown text="Dashboard" subMenus={[]} />
        <Dropdown text="Dataset" subMenus={[]} />
        <Dropdown text="Bantuan" subMenus={[]} />
      </div>
      <div className="flex items-center gap-2">
        <Button text="Masuk" variant="outlined" />
        <Button text="Daftar" variant="contained" />
      </div>

      {/* Mobile */}
      <div className="flex flex-1 items-center md:hidden">
        <FiMenu className="text-primary" />
      </div>
      <div className="flex flex-1 items-center md:hidden">
        <div className="cursor-pointer">
          <Image alt="satusehat" src={SatusehatLogo.src} width={216.81} height={48} />
        </div>
      </div>
    </div>
  )
}

export default Navbar