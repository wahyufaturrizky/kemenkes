import { EChartsOption } from "echarts-for-react";
import {
  TotalParticipantBasedOnTimeType,
  DataActivityType,
} from "@/view/dashboard/monitoring-faktor-risiko/type";
import { formatNumber } from "@/helpers";
import { formatDateChart } from "@/lib/utils";

export const formatChartBreakdownJenisKelamin = ({
  isBrowser,
  totalFemale,
  totalMale,
}: {
  isBrowser: boolean;
  totalFemale?: number;
  totalMale?: number;
}): EChartsOption => {
  return {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
      show: false,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        top: isBrowser && window?.innerWidth >= 2500 ? "-120px" : "-180px",
        radius: ["40%", "50%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: totalFemale, name: "Perempuan" },
          { value: totalMale, name: "Laki-laki" },
        ],
      },
    ],
  };
};

export const formatChartTrenBulananJumlahPeserta = ({
  total_participant_based_on_time,
  color = "#006A65",
}: {
  total_participant_based_on_time?: TotalParticipantBasedOnTimeType[];
  color?: string;
}): EChartsOption => {
  return {
    color: [color],
    tooltip: {
      trigger: "item",
      formatter: function (params: any) {
        return `${params.marker} ${params.name}: ${formatNumber(params.value)}`;
      },
    },
    xAxis: {
      type: "category",
      data: formatDateChart(total_participant_based_on_time || []),
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: total_participant_based_on_time?.map(
          (data: TotalParticipantBasedOnTimeType) => data.total
        ),
        type: "line",
      },
    ],
  };
};

export const accumulatorData = (data?: any[], key: string = "total") => {
  return data?.reduce((accumulator: number, currentValue: any) => {
    return accumulator + currentValue[key];
  }, 0);
};

export const labelGayaHidup: any = {
  alcohol: "Konsumsi Alkohol",
  fruits_vegetables: "Konsumsi Buah dan Sayur",
  sugar: "Konsumsi Gula",
  salt: "Konsumsi Garam",
  fat: "Konsumsi Lemak",
};

export const labelMerokok: any = {
  smoking_exposure: "Paparan Asap Rokok",
  smoking: "Status Merokok",
  smoking_10_to_18: "Status merokok umur 10-18",
  smoking_10_to_21: "Status merokok umur 10-21",
};
