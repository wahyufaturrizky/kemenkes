import { Controller, Control } from "react-hook-form";
import SelectedItem from "./SelectedItem";
import { FormValuesMonitoringFaktorRisiko } from "./type";
import { subMenuType } from "@/view/dashboard/monitoring-faktor-risiko/type";

interface BoxDropDownSelectedProps {
  subName: string;
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  subMenu: subMenuType[];
}

const BoxDropDownSelected = ({ subName, control, subMenu }: BoxDropDownSelectedProps) => {
  return (
    <Controller
      name={subName as never}
      control={control}
      render={() => {
        return (
          <div className="rounded-[12px] flex flex-col gap-4 px-2 py-3 shadow-[0px_8px_8px_-4px_#10182808] shadow-[0px_20px_24px_-4px_#10182814]">
            {subMenu.map((data) => (
              <SelectedItem control={control} subName={subName} {...data} />
            ))}
          </div>
        );
      }}
    />
  );
};

export default BoxDropDownSelected;
