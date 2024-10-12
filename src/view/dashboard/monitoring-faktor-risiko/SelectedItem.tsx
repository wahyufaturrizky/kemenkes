import SearchIcon from "@/assets/images/search.png";
import { SelectedItemType } from "@/view/dashboard/monitoring-faktor-risiko/type";
import Image from "next/image";
import { Controller } from "react-hook-form";

const SelectedItem = ({ title, subTitle, subName, control, reset }: SelectedItemType) => {
  return (
    <Controller
      name={subName as never}
      control={control}
      render={({ field: { onChange, value } }) => {
        const isActive = value === title;
        return (
          <div
            onClick={() => {
              onChange(title);
              reset &&
                reset({
                  filterSelamatDatang: "",
                });
            }}
            className={`${
              isActive && "bg-[#006A65] p-3 rounded-[4px]"
            } flex items-center gap-3 cursor-pointer`}
          >
            <div className="bg-[#E8F2F3] rounded-[4px] p-3.5">
              <Image alt="SearchIcon" src={SearchIcon} />
            </div>

            <div>
              <p
                className={`${
                  isActive ? "text-white" : "text-[#292929]"
                } font-plus-jakarta-sans font-semibold text-sm`}
              >
                {title}
              </p>
              <p
                className={`${
                  isActive ? "text-white" : "text-[#292929]"
                } font-normal font-plus-jakarta-sans text-xs`}
              >
                {subTitle}
              </p>
            </div>
          </div>
        );
      }}
    />
  );
};

export default SelectedItem;
