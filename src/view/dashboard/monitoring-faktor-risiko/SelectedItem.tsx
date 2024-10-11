import SearchIcon from "@/assets/images/search.png";
import Image from "next/image";

interface SelectedItemProps {}

const SelectedItem = ({}: SelectedItemProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="rounded-[4px] bg-[#E8F2F3] p-3.5">
        <Image alt="SearchIcon" src={SearchIcon} />
      </div>

      <div>
        <p className="text-[#292929] font-plus-jakarta-sans font-semibold text-sm">Deteksi Dini</p>
        <p className="font-normal font-plus-jakarta-sans text-xs">Monitoring/Overview</p>
      </div>
    </div>
  );
};

export default SelectedItem;
