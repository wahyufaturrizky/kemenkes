import {
  FormValuesMonitoringFaktorRisiko,
  subMenuType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import { AxiosResponse } from "axios";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormReset } from "react-hook-form";

export interface BoxChartType {
  title?: string;
  subTitle?: string;
  amount?: string;
  note1?: string;
  note2?: string;
  showLoading?: boolean;
  dataChart?: any[];
}

export type FormValuesAnalisisDiagnosaPTM = {
  filterSelamatDatang: string;
  subFilterSelamatDatang: string;
};

export interface DataResponeDataResponeUncontrolledPatientIn3MonthTypeType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataDataResponeUncontrolledPatientIn3MonthTypeType[] };
}

export interface DataDataResponeUncontrolledPatientIn3MonthTypeType {
  summary_date: string;
  total_controlled_patients: number;
  number_of_patient_to_total_patient: number;
}

export interface DataResponeControlledPatientIn3MonthType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataControlledPatientIn3MonthType[] };
}

export interface DataControlledPatientIn3MonthType {
  summary_date: string;
  total_controlled_patients: number;
  number_of_patient_to_total_patient: number;
}

export interface DataResponePatientLostFollowUpType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataPatientLostFollowUpType[] };
}

export interface DataPatientLostFollowUpType {
  summary_date: string;
  total_controlled_patients: number;
  number_of_patient_to_total_patient: number;
}

export interface DataResponePatientUnderTreatmentType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataPatientUnderTreatmentType[] };
}

export interface DataPatientUnderTreatmentType {
  summary_date: string;
  total_controlled_patients: number;
  number_of_patient_to_total_patient: number;
}

export interface SubDataSectionType {
  title: string;
  subTitle?: string;
  chart: ChartType[];
}

export interface ChartType {
  title?: string;
  subTitle?: string;
  amount?: string;
  note1?: string;
  note2?: string;
  dataChart?: any[];
}

export interface DataResponeHypertensionDistributionMapType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataHypertensionDistributionMapType };
}

export interface DataHypertensionDistributionMapType {
  based_on_participant: SubHypertensionDistributionMapType[];
  based_on_visitation: SubHypertensionDistributionMapType[];
}

export interface SubHypertensionDistributionMapType {
  total_participant: number;
  province_name: string;
  percentage: number;
}

export interface DataResponeHypertensionPyramidType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataHypertensionPyramidType };
}

export interface DataHypertensionPyramidType {
  based_on_participant: SubHypertensionPyramidType[];
  based_on_visitation: SubHypertensionPyramidType[];
}

export interface SubHypertensionPyramidType {
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
