import { formatNumber } from "@/helpers";
import { formatPercentage } from "@/lib/utils";
import {
  DataBloodDisorderType,
  SubHearingDisorderType,
  SubPPOKType,
  SubVisualDisorderType,
} from "@/view/dashboard/monitoring-diagnosa-ptm/type";
import { title } from "process";

export const labelKardiovaskular = {
  heart_disease: "Penyandang Penyakit Jantung",
  hypertension: "Penyandang Hipertensi",
  diabetes: "Penyandang Diabetes Melitus",
};

export const labelKardiovaskularThumb = {
  obesity: "Penyandang Obesitas",
  stroke: "Penderita Stroke",
};

export const formatBloodDisorderMap = (data?: DataBloodDisorderType) => {
  const {
    minor_disorder,
    minor_disorder_percentage,
    intermediete_disorder,
    intermediete_disorder_percentage,
    major_disorder,
    major_disorder_percentage,
  } = data || {};
  const res = [
    {
      title: "Minor",
      amount: formatNumber(Number(minor_disorder)),
      percentage: `${formatPercentage(
        Number(minor_disorder_percentage)
      )}% dari penyandang Thalassemia`,
    },
    {
      title: "Intermedia",
      amount: formatNumber(Number(intermediete_disorder)),
      percentage: `${formatPercentage(
        Number(intermediete_disorder_percentage)
      )}% dari penyandang Thalassemia`,
    },
    {
      title: "Mayor",
      amount: formatNumber(Number(major_disorder)),
      percentage: `${formatPercentage(
        Number(major_disorder_percentage)
      )}% dari penyandang Thalassemia`,
    },
  ];

  return res;
};

export const formatHearingDisorderMap = (data?: SubHearingDisorderType) => {
  const {
    positive_presbycusis,
    positive_presbycusis_percentage,
    positive_earwax,
    positive_earwax_percentage,
    positive_otitis,
    positive_otitis_percentage,
  } = data || {};

  const res = [
    {
      title: "Otitis",
      amount: formatNumber(Number(positive_otitis)),
      percentage: `${formatPercentage(
        Number(positive_otitis_percentage)
      )}% dari penyandang gangguan pendengaran`,
    },
    {
      title: "Prebikusis",
      amount: formatNumber(Number(positive_presbycusis)),
      percentage: `${formatPercentage(
        Number(positive_presbycusis_percentage)
      )}% dari penyandang gangguan pendengaran`,
    },
    {
      title: "Prebikusis",
      amount: formatNumber(Number(positive_earwax)),
      percentage: `${formatPercentage(
        Number(positive_earwax_percentage)
      )}% dari penyandang gangguan pendengaran`,
    },
  ];

  return res;
};

export const formatVisualDisorderMap = (data?: SubVisualDisorderType) => {
  const {
    positive_cataract,
    positive_cataract_percentage,
    positive_myopia,
    positive_myopia_percentage,
    positive_refreaction,
    positive_refreaction_percentage,
  } = data || {};

  const res = [
    {
      title: "Katarak",
      amount: formatNumber(Number(positive_cataract)),
      percentage: `${formatPercentage(
        Number(positive_cataract_percentage)
      )}% dari penyandang gangguan penglihatan`,
    },
    {
      title: "Miopia",
      amount: formatNumber(Number(positive_myopia)),
      percentage: `${formatPercentage(
        Number(positive_myopia_percentage)
      )}% dari penyandang gangguan penglihatan`,
    },
    {
      title: "Refraksi",
      amount: formatNumber(Number(positive_refreaction)),
      percentage: `${formatPercentage(
        Number(positive_refreaction_percentage)
      )}% dari penyandang gangguan penglihatan`,
    },
  ];

  return res;
};

export const formatPPOKMap = (data?: SubPPOKType) => {
  const { accerbation_ppok, accerbation_ppok_percentage, stable_ppok, stable_ppok_percentage } =
    data || {};

  const res = [
    {
      title: "Otitis",
      amount: formatNumber(Number(accerbation_ppok)),
      percentage: `${formatPercentage(
        Number(accerbation_ppok_percentage)
      )}% dari penyandang gangguan PPOK`,
    },
    {
      title: "Presbikusis",
      amount: formatNumber(Number(stable_ppok)),
      percentage: `${formatPercentage(
        Number(stable_ppok_percentage)
      )}% dari penyandang gangguan PPOK`,
    },
  ];

  return res;
};
