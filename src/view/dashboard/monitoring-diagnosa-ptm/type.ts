import {
  subMenuType,
  FormValuesMonitoringFaktorRisiko,
  DataActivityType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import { Dispatch, SetStateAction } from "react";
import { Control, UseFormReset } from "react-hook-form";
import { AxiosResponse } from "axios";
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

export interface DataResponseDiseaseType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataDiseaseType };
}

export interface DataResponseBloodDisorderType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: DataBloodDisorderType };
}

export interface DataResponseThalassemaType extends AxiosResponse {
  success: boolean;
  message: string;
  data: { data: SubDiseaseType };
}

export interface DataResponseHearingDisorderType extends AxiosResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      based_on_participant: SubHearingDisorderType;
      based_on_visitation: SubHearingDisorderType;
    };
  };
}

export interface DataResponseVisualDisorderType extends AxiosResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      based_on_participant: SubVisualDisorderType;
      based_on_visitation: SubVisualDisorderType;
    };
  };
}

export interface DataResponsePPOKType extends AxiosResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      based_on_participant: SubPPOKType;
      based_on_visitation: SubPPOKType;
    };
  };
}

export interface DataResponseTableAggregateType extends AxiosResponse {
  success: boolean;
  message: string;
  data: {
    data: RowTableAggregateType[];
  };
}

export interface RowTableAggregateType {
  province: string;
  faskes: string;
  total_participant: number;
  total_involved_participant: number;
  grouper: string;
  total_grouper_participant: number;
}

export interface SubPPOKType {
  total: number;
  total_sufferer: number;
  percentage: number;
  accerbation_ppok: number;
  accerbation_ppok_percentage: number;
  stable_ppok: number;
  stable_ppok_percentage: number;
}

export interface SubVisualDisorderType {
  total: number;
  total_sufferer: number;
  percentage: number;
  positive_cataract: number;
  positive_cataract_percentage: number;
  positive_myopia: number;
  positive_myopia_percentage: number;
  positive_refreaction: number;
  positive_refreaction_percentage: number;
}

export interface SubHearingDisorderType {
  total: number;
  total_sufferer: number;
  percentage: number;
  positive_presbycusis: number;
  positive_presbycusis_percentage: number;
  positive_earwax: number;
  positive_earwax_percentage: number;
  positive_otitis: number;
  positive_otitis_percentage: number;
}

export interface DataBloodDisorderType {
  total_participant: number;
  total_sufferer: number;
  percentage: number;
  minor_disorder: number;
  minor_disorder_percentage: number;
  intermediete_disorder: number;
  intermediete_disorder_percentage: number;
  major_disorder: number;
  major_disorder_percentage: number;
}

export interface DataDiseaseType {
  heart_disease: SubDiseaseType;
  hypertension: SubDiseaseType;
  diabetes: SubDiseaseType;
  obesity: SubDiseaseType;
  stroke: SubDiseaseType;
}

export interface SubDiseaseType {
  total_participant: number;
  total_sufferer: number;
  percentage: number;
}
