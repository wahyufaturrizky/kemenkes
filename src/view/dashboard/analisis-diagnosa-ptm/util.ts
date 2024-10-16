import { EChartsOptionProps } from "@/components/graph-echarts";
import { formatNumber } from "@/helpers";
import { formatDate, formatDateChart } from "@/lib/utils";
import {
  SubHypertensionDistributionMapType,
  SubDataSectionType,
  DataPatientLostFollowUpType,
  DataControlledPatientIn3MonthType,
  DataDataResponeUncontrolledPatientIn3MonthTypeType,
} from "@/view/dashboard/analisis-diagnosa-ptm/type";
import { SubActivityPyramidType } from "@/view/dashboard/analisis-faktor-risiko/type";
import { dataProvinsi } from "@/view/dashboard/bayi-balita/graphOptions";
import { DataPatientUnderTreatmentType, SubHypertensionPyramidType } from "./type";
import { TotalParticipantBasedOnTimeType } from "@/view/dashboard/monitoring-faktor-risiko/type";

export const formatChartPiramida = ({
  dataHypertensionPyramidBasedOnParticipant,
}: {
  dataHypertensionPyramidBasedOnParticipant?: SubHypertensionPyramidType[];
}) => {
  const res = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const female = params.find((p: any) => p.seriesName === "Perempuan");
        const male = params.find((p: any) => p.seriesName === "Laki-laki");

        return (
          `${params[0].name}<br/>` +
          `Perempuan: ${Math.abs(female?.value)}%<br/>` +
          `Laki-laki: ${male?.value}%`
        );
      },
    },
    legend: {
      data: ["Perempuan", "Laki-laki"],
      bottom: 0,
      icon: "circle",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: -100, // Atur nilai minimum menjadi negatif
      max: 100, // Atur nilai maksimum menjadi positif
      axisLabel: {
        formatter: "{value}%",
        color: "#888",
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: [
        "Anak Usia Sekolah IV",
        "Usia Dewasa I",
        "Usia Dewasa II",
        "Usia Dewasa III",
        "Usia Dewasa IV",
      ],
      axisLabel: {
        color: "#444",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Perempuan",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideLeft",
          formatter: function (params: any) {
            return Math.abs(params.value) + "%";
          },
          color: "#fff",
        },
        data: dataHypertensionPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "perempuan")
          .map((mapping: SubActivityPyramidType) => -Math.abs(mapping.total_per_gender)), // Nilai negatif agar bergerak ke kiri
        itemStyle: {
          color: "#D84B4B", // Warna merah untuk "Perempuan"
        },
      },
      {
        name: "Laki-laki",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideRight",
          formatter: "{c}%",
          color: "#fff",
        },
        data: dataHypertensionPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "laki-laki")
          .map((mapping: SubActivityPyramidType) => mapping.total_per_gender), // Nilai positif agar bergerak ke kanan
        itemStyle: {
          color: "#00A2A2", // Warna biru untuk "Laki-laki"
        },
      },
    ],
  };
  return res;
};

export const formatChartPiramidaILP = ({
  dataHypertensionPyramidBasedOnParticipant,
}: {
  dataHypertensionPyramidBasedOnParticipant?: SubHypertensionPyramidType[];
}) => {
  const res = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        const female = params.find((p: any) => p.seriesName === "Perempuan");
        const male = params.find((p: any) => p.seriesName === "Laki-laki");

        return (
          `${params[0].name}<br/>` +
          `Perempuan: ${Math.abs(female?.value)}%<br/>` +
          `Laki-laki: ${male?.value}%`
        );
      },
    },
    legend: {
      data: ["Perempuan", "Laki-laki"],
      bottom: 0,
      icon: "circle",
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      min: -100, // Atur nilai minimum menjadi negatif
      max: 100, // Atur nilai maksimum menjadi positif
      axisLabel: {
        formatter: "{value}%",
        color: "#888",
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: [
        "Anak Usia Sekolah IV",
        "Usia Dewasa I",
        "Usia Dewasa II",
        "Usia Dewasa III",
        "Usia Dewasa IV",
      ],
      axisLabel: {
        color: "#444",
        fontWeight: "bold",
      },
    },
    series: [
      {
        name: "Perempuan",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideLeft",
          formatter: function (params: any) {
            return Math.abs(params.value) + "%";
          },
          color: "#fff",
        },
        data: dataHypertensionPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "perempuan")
          .map((mapping: SubActivityPyramidType) => -Math.abs(mapping.total_per_ilp)), // Nilai negatif agar bergerak ke kiri
        itemStyle: {
          color: "#D84B4B", // Warna merah untuk "Perempuan"
        },
      },
      {
        name: "Laki-laki",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideRight",
          formatter: "{c}%",
          color: "#fff",
        },
        data: dataHypertensionPyramidBasedOnParticipant
          ?.filter((filtering: SubActivityPyramidType) => filtering.gender === "laki-laki")
          .map((mapping: SubActivityPyramidType) => mapping.total_per_ilp), // Nilai positif agar bergerak ke kanan
        itemStyle: {
          color: "#00A2A2", // Warna biru untuk "Laki-laki"
        },
      },
    ],
  };
  return res;
};

export const formatChartActivityBasedOnRegion = ({
  dataHypertensionDistributionMapBasedOnParticipant,
}: {
  dataHypertensionDistributionMapBasedOnParticipant?: SubHypertensionDistributionMapType[];
}) => {
  const res = {
    grid: {
      left: "3%",
      right: "4%",
      bottom: "10%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      max: 100, // Atur nilai maksimum menjadi positif
      axisLabel: {
        formatter: "{value}%",
        color: "#888",
      },
      splitLine: {
        show: true,
      },
    },
    yAxis: {
      type: "category",
      data: dataHypertensionDistributionMapBasedOnParticipant?.map(
        (item: SubHypertensionDistributionMapType) => item.province_name
      ),
      axisLabel: {
        color: "#444",
        fontWeight: "bold",
      },
    },
    series: [
      {
        type: "bar",
        stack: "total",
        label: {
          show: true,
          position: "insideRight",
          formatter: "{c}%",
          color: "#fff",
        },
        data: dataHypertensionDistributionMapBasedOnParticipant?.map(
          (mapping: SubHypertensionDistributionMapType) => mapping.total_participant
        ),
        itemStyle: {
          color: "#00A2A2",
        },
      },
    ],
  };
  return res;
};

export const graphOptionsBoxChart = (data?: DataPatientUnderTreatmentType[]) => {
  const option: EChartsOptionProps = {
    color: ["#00B3AC"],
    xAxis: {
      type: "category",
      data: data?.map((mapping: DataPatientUnderTreatmentType) => formatDate(mapping.summary_date)),
      axisLabel: {
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data?.map((data: DataPatientUnderTreatmentType) => data.total_controlled_patients),
        type: "bar",
      },
    ],
  };
  return option;
};

export const mapChartSection = ({
  patientUnderTreatmentData,
  dataPatientLostFollowUpData,
  dataControlledPatientIn3MonthData,
  dataUncontrolledPatientIn3MonthData,
}: {
  patientUnderTreatmentData?: DataPatientUnderTreatmentType[];
  dataPatientLostFollowUpData?: DataPatientLostFollowUpType[];
  dataControlledPatientIn3MonthData?: DataControlledPatientIn3MonthType[];
  dataUncontrolledPatientIn3MonthData?: DataDataResponeUncontrolledPatientIn3MonthTypeType[];
}) => {
  const res: SubDataSectionType[] = [
    {
      title: "Analisa Penanganan PTM",
      subTitle: "",
      chart: [
        {
          title: "Pasien dalam Masa Pengobatan",
          subTitle: "Pasien hipertensi dengan minimal satu kali kunjungan 12 bulan terakhir",
          amount: formatNumber(
            Number(patientUnderTreatmentData?.reduce((a, b) => a + b.total_controlled_patients, 0))
          ),
          note1: "1,043 pasien terdaftar pada Jul-2023 dari",
          note2: "12,213 kumulatif pasien-pasien terdaftar",
          dataChart: patientUnderTreatmentData,
        },
        {
          title: "Pasien Lost to Follow Up",
          subTitle: "Pasien hipertensi yang tidak berkunjung dalam 1 bulan terakhir",
          amount: formatNumber(
            Number(
              dataPatientLostFollowUpData?.reduce((a, b) => a + b.total_controlled_patients, 0)
            )
          ),
          note1: "1,562 pasien yang tidak berkunjung dari Jul-2022 hingga Jul-2023 dari",
          note2: "12,213 kumulatif pasien-pasien terdaftar",
          dataChart: dataPatientLostFollowUpData,
        },
        {
          title: "Cascade Penanganan Hipertensi",
          subTitle: "Pasien hipertensi yang terdaftar, menjalani pengobatan, dan terkontrol",
          amount: formatNumber(
            Number(
              dataControlledPatientIn3MonthData?.reduce(
                (a, b) => a + b.total_controlled_patients,
                0
              )
            )
          ),
          note1: "",
          note2: "",
          dataChart: dataControlledPatientIn3MonthData,
        },
      ],
    },
    {
      title: "Hasil Penanganan Pasien Hipertensi",
      subTitle: "Hasil penanganan pasien yang diobati dalam range 3 bulan terakhir",
      chart: [
        {
          title: "",
          subTitle: "Pasien hippertensi terkontrol dalam 3 bulan teraksir",
          amount: formatNumber(
            Number(
              dataControlledPatientIn3MonthData?.reduce(
                (a, b) => a + b.total_controlled_patients,
                0
              )
            )
          ),
          note1: "4,800 pasien dengan BP < 140/90",
          note2: "",
          dataChart: dataControlledPatientIn3MonthData,
        },
        {
          title: "",
          subTitle: "Pasien hippertensi tidak terkontrol dalam 3 bulan teraksir",
          amount: formatNumber(
            Number(
              dataUncontrolledPatientIn3MonthData?.reduce(
                (a, b) => a + b.total_controlled_patients,
                0
              )
            )
          ),
          note1: "1,300 pasien dengan BP >= 140/90",
          note2: "",
          dataChart: dataUncontrolledPatientIn3MonthData,
        },
        {
          title: "",
          subTitle: "Pasien hippertensi yang tidak berkunjung dalam 3 bulan teraksir",
          amount: formatNumber(
            Number(
              dataUncontrolledPatientIn3MonthData?.reduce(
                (a, b) => a + b.total_controlled_patients,
                0
              )
            )
          ),
          note1: "1,726 pasien tanpa kunjungan",
          note2: "",
          dataChart: dataUncontrolledPatientIn3MonthData,
        },
      ],
    },
  ];

  return res;
};
