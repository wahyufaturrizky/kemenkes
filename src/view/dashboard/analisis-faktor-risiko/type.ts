import {
  FormValuesMonitoringFaktorRisiko,
  subMenuType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormReset } from "react-hook-form";

export type FormValuesAnalisisFaktorRisiko = {
  filterSelamatDatang: string;
  subFilterSelamatDatang: string;
};

export interface initFilterSelamatDatangType {
  title: string;
  subTitle: string;
  subMenu: subMenuType[];
}

export interface DataResponeActivityPyramidType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataActivityPyramidType };
}

export interface DataResponeActivityCheckDistributionType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataActivityCheckDistributionType };
}

export interface DataResponeActivityBasedOnRegionType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataActivityBasedOnRegionType };
}

export interface DataActivityBasedOnRegionType {
  based_on_participant: SubActivityBasedOnRegionType[];
  based_on_visitation: SubActivityBasedOnRegionType[];
}

export interface SubActivityBasedOnRegionType {
  city_name: string;
  activity: string;
  total_participant: number;
  percentage: number;
}

export interface DataActivityCheckDistributionType {
  based_on_participant: SubActivityCheckDistribution[];
  based_on_visitation: SubActivityCheckDistribution[];
}

export interface SubActivityCheckDistribution {
  total_participant: number;
  province_name: string;
  percentage: number;
}

export interface DataResponeActivityPyramidType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataActivityPyramidType };
}

export interface DataActivityPyramidType {
  based_on_participant: SubActivityPyramidType[];
  based_on_visitation: SubActivityPyramidType[];
}

export interface SubActivityPyramidType {
  ilp_age: string;
  gender: string;
  total_per_gender: number;
  total_per_ilp: number;
}

export interface BoxDropDownSelectedProps {
  subName: string;
  control?: Control<FormValuesMonitoringFaktorRisiko, any>;
  subMenu: subMenuType[];
  reset?: UseFormReset<FormValuesMonitoringFaktorRisiko>;
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
