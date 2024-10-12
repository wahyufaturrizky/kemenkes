import { Dispatch, SetStateAction } from "react";
import { Control } from "react-hook-form";
export type FormValuesMonitoringFaktorRisiko = {
  filterSelamatDatang: string;
  subFilterSelamatDatang: string;
};

export interface SelectedItemType extends subMenuType {
  subName: string;
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
}

export interface initFilterSelamatDatangType {
  title: string;
  subTitle: string;
  subMenu: subMenuType[];
}

export interface subMenuType {
  title: string;
  subTitle: string;
}

export interface BoxSelectedProps {
  title: string;
  subTitle: string;
  stateFilter?: string;
  name: string;
  subName: string;
  subMenu: subMenuType[];
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  setStateFilter?: Dispatch<SetStateAction<string>>;
}
