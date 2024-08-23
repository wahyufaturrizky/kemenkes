import { IoStarSharp } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { LuEye } from "react-icons/lu";
import { RiShareForwardLine } from "react-icons/ri";
import { RxDividerVertical } from "react-icons/rx";
import { cn } from "@/utils/cn";

interface BannerHighlightFooterProps {
  look: string
  comment: string
  share: string
  classNameShare?: string
}

const BannerHighlightFooter: React.FC<BannerHighlightFooterProps> = ({
  look, comment, share, classNameShare
}) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <IoStarSharp color="#FAC515" className="text-2xl" />
        <IoStarSharp color="#FAC515" className="text-2xl" />
        <IoStarSharp color="#FAC515" className="text-2xl" />
        <IoStarSharp color="#FAC515" className="text-2xl" />
        <IoStarSharp color="#FFFFFF" className="text-2xl" />
      </div>
      <GoDotFill color="#D9D9D9" />
      <div className="flex flex-wrap items-center gap-2">
        <LuEye color="#FFFFFF" />
        <div>{look} Kali Dilihat</div>
      </div>
      <GoDotFill color="#D9D9D9" />
      <div className="flex flex-wrap items-center gap-2">
        <LuEye color="#FFFFFF" />
        <div>{comment} Komentar</div>
      </div>
      <button className={cn(`flex items-center gap-2 bg-white shadow border rounded-lg px-4 py-2 text-cyan-300 ${classNameShare}`)}>
        <div className="flex items-center">
          <div className="flex items-center gap-1 text-sm">
            <div>
              <RiShareForwardLine />
            </div>
            <div>
              Bagikan
            </div>
          </div>
          <div>
            <RxDividerVertical />
          </div>
          <div className="text-sm">
            {share} Kali
          </div>
        </div>
      </button>
    </div>
  )
}

export default BannerHighlightFooter