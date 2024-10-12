import { Controller } from "react-hook-form";
import SelectedItem from "./SelectedItem";
import { BoxDropDownSelectedProps } from "./type";

const BoxDropDownSelected = ({ subName, control, subMenu, reset }: BoxDropDownSelectedProps) => {
  return (
    <Controller
      name={subName as never}
      control={control}
      render={() => {
        return (
          <div className="rounded-[12px] flex flex-col gap-4 px-2 py-3 shadow-[0px_8px_8px_-4px_#10182808] shadow-[0px_20px_24px_-4px_#10182814]">
            {subMenu.map((data) => (
              <SelectedItem
                key={data.subTitle}
                reset={reset}
                control={control}
                subName={subName}
                {...data}
              />
            ))}
          </div>
        );
      }}
    />
  );
};

export default BoxDropDownSelected;
