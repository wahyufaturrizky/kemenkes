import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormReset } from "react-hook-form";

type ActivityType = "Setiap Hari" | "Tidak" | "Tidak Setiap Hari";
type SmokingType =
  | "Berhenti < 10 Tahun"
  | "Perokok Aktif"
  | "Perokok Pasif"
  | "Merokok"
  | "Tidak Pernah Merokok";

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

export interface DataResponeTotalParticipantType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataTotalParticipantType };
}

export interface DataResponseActivityType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataActivityType[] };
}

export interface DataResponseConsumptionType extends AxiosResponse {
  success: boolean;
  message: string;
  data: {
    data: DataConsumptionType;
  };
}

export interface DataResponseSmokingType extends AxiosResponse {
  success: boolean;
  message: string;
  data: {
    data: DataSmokingType;
  };
}

export interface DataSmokingType {
  smoking_exposure: ListSubType[];
  smoking: ListSubType[];
  smoking_10_to_18: ListSubType[];
  smoking_10_to_21: ListSubType[];
}

export interface DataConsumptionType {
  fruits_vegetables: ListSubType[];
  sugar: ListSubType[];
  salt: ListSubType[];
  fat: ListSubType[];
  alcohol: ListSubType[];
}

export interface ListSubType {
  status: ActivityType | SmokingType;
  total: number;
  percentage: number;
}

export interface DataActivityType {
  activity_type: ActivityType;
  total: number;
  percentage: number;
}

export interface DataTotalParticipantType {
  total_participant_based_on_gender: TotalParticipantBasedOnGenderType[];
  total_participant_based_on_time: TotalParticipantBasedOnTimeType[];
}

export interface TotalParticipantBasedOnGenderType {
  all_total: number;
  gender: string;
  total: number;
  percentage: number;
}

export interface TotalParticipantBasedOnTimeType {
  year: number;
  month: number;
  total: number;
}

export interface dataMonthsType {
  label: string;
  value: string;
}
