import Image from "next/image";
import ChevronDown from "@/assets/images/chevron-down.png";
import ChevronDownGreen from "@/assets/images/chevron-down-green.png";
import { Dispatch, SetStateAction } from "react";
import BoxDropDownSelected from "./BoxDropDownSelected";

interface BoxSelectedProps {
  title?: string;
  subTitle?: string;
  stateFilter?: string;
  setStateFilter?: Dispatch<SetStateAction<string>>;
}

const BoxSelected = ({
  title = "",
  subTitle = "",
  stateFilter,
  setStateFilter,
}: BoxSelectedProps) => {
  const isActive = stateFilter === subTitle;
  return (
    <div>
      <div
        onClick={() => setStateFilter && setStateFilter(subTitle)}
        className={`${
          isActive ? "bg-[#006A65]" : "bg-[#FCFCFC] border border-[#D6D6D6]"
        } flex justify-between items-center h-[60px] px-4 rounded-[8px] cursor-pointer`}
      >
        <div>
          <p
            className={`${
              isActive ? "text-white" : "text-[#006A65]"
            } font-plus-jakarta-sans text-xs  font-semibold`}
          >
            {title}
          </p>
          <p
            className={`${
              isActive ? "text-white" : "text-[#006A65]"
            } text-base font-plus-jakarta-sans font-semibold`}
          >
            {subTitle}
          </p>
        </div>
        {isActive ? (
          <Image alt="satusehat" src={ChevronDown} />
        ) : (
          <Image alt="satusehat" src={ChevronDownGreen} />
        )}
      </div>

      {isActive && (
        <div className="mt-4">
          <BoxDropDownSelected />
        </div>
      )}
    </div>
  );
};

export default BoxSelected;
