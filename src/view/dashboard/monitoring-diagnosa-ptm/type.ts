import {
  subMenuType,
  FormValuesMonitoringFaktorRisiko,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormReset } from "react-hook-form";
export type FormValuesMonitoringDiagnosaPTM = {
  filterSelamatDatang: string;
  subFilterSelamatDatang: string;
};

export interface BoxDropDownSelectedProps {
  subName: string;
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  subMenu: subMenuType[];
  reset?: UseFormReset<FormValuesMonitoringFaktorRisiko>;
}

export interface initFilterSelamatDatangType {
  title: string;
  subTitle: string;
  subMenu: subMenuType[];
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
