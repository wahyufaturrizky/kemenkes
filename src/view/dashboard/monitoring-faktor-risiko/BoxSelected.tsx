import ChevronDownGreen from "@/assets/images/chevron-down-green.png";
import ChevronDown from "@/assets/images/chevron-down.png";
import Image from "next/image";
import { Controller } from "react-hook-form";
import BoxDropDownSelected from "./BoxDropDownSelected";
import { BoxSelectedProps } from "./type";

const BoxSelected = ({
  title,
  subTitle,
  control,
  name,
  subName,
  subMenu,
  reset,
}: BoxSelectedProps) => {
  return (
    <Controller
      name={name as never}
      control={control}
      render={({ field: { onChange, value } }) => {
        const isActive = value === subTitle;
        return (
          <div>
            <div
              onClick={() => onChange(subTitle)}
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
                <BoxDropDownSelected
                  reset={reset}
                  control={control}
                  subMenu={subMenu}
                  subName={subName}
                />
              </div>
            )}
          </div>
        );
      }}
    />
  );
};

export default BoxSelected;
