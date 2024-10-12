import { Dispatch, SetStateAction } from "react";
import { Control, UseFormReset } from "react-hook-form";
export type FormValuesMonitoringFaktorRisiko = {
  filterSelamatDatang: string;
  subFilterSelamatDatang: string;
};

export interface SelectedItemType extends subMenuType {
  subName: string;
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  reset?: UseFormReset<FormValuesMonitoringFaktorRisiko>;
}

export interface initFilterSelamatDatangType {
  title: string;
  subTitle: string;
  subMenu: subMenuType[];
}

export interface BoxDropDownSelectedProps {
  subName: string;
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  subMenu: subMenuType[];
  reset?: UseFormReset<FormValuesMonitoringFaktorRisiko>;
}

export interface subMenuType {
  title: string;
  subTitle: string;
}

export interface BoxSelectedProps {
  title: string;
  subTitle: string;
  stateFilter?: string;
  reset?: UseFormReset<FormValuesMonitoringFaktorRisiko>;
  name: string;
  subName: string;
  subMenu: subMenuType[];
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  setStateFilter?: Dispatch<SetStateAction<string>>;
}
